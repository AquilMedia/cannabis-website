import { useAuth } from '@/context/AuthContext';
import { getOrderDetails, getPatientinfo, UpdateAddressinfo, updatepassword, updatePatientinfo } from '@/services/user';
import React, { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import Loader from '@/components/common/Loader';
const Dashboard: React.FC = () => {
    const geocodingClient = mbxGeocoding({
        accessToken:
            "sk.eyJ1Ijoic2FteWFiaXNhbGVoIiwiYSI6ImNtM2ZmdnkxMTBqMXMyaXNlcHMzeTV1cmEifQ.p3Zc6DhFHND0OAD7FCRKtA",
    });
    interface MapboxContextItem {
        id: string;
        text: string;
    }
    interface MapboxFeature {
        place_name: string;
        center: [number, number];
        context?: MapboxContextItem[];
    }
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [error, setError] = useState<{
        fname?: string;
        lname?: string;
        dob?: string;
        email?: string;
        phone?: string;
        newPassword?: string;
        confirmPassword?: string;
        passwords?: { newPassword?: string; confirmPassword?: string };
    }>({});
    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        dob: '',
        email: '',
        phone: '',
        address_line1: "",
        city: '',
        zip: '',
        country: '',
        longitude: '',
        latitude: ''

    });
    useEffect(() => {
        if (user?.token) {
            fetchPatientInfo();
            fetchOrderDetails();
        }
    }, [user]);

    const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };
    const getStatusClass = (status: string) => {
        switch (status) {
            case "Neu":
                return "lab-blue"; // fresh/new
            case "In Bearbeitung":
                return "lab-yellow"; // processing
            case "Bestätigt":
                return "lab-green"; // confirmed
            case "Versandt":
                return "lab-purple"; // shipped
            case "Abgeschlossen":
                return "lab-teal"; // completed
            case "Abholbereit":
                return "lab-indigo"; // ready for pickup
            case "Abgefüllt/Hergestellt":
                return "lab-cyan"; // manufactured
            case "Warten sonstiger Grund":
                return "lab-orange"; // waiting other reason
            case "Warten auf Kundenfeedback":
                return "lab-pink"; // waiting for customer
            case "Warten auf Arztfeedback":
                return "lab-lime"; // waiting for doctor
            case "Warten auf Ware":
                return "lab-amber"; // waiting for stock
            case "Abgebrochen":
                return "lab-red"; // cancelled
            default:
                return "lab-gray"; // unknown / fallback
        }
    };
    const getPaymentStatusClass = (status: string) => {
        switch (status) {
            case "Offen":
                return "lab-yellow"; // open / pending
            case "Fehlgeschlagen":
                return "lab-red"; // failed
            case "Erhalten":
                return "lab-green"; // received
            case "Bezahlt":
                return "lab-blue"; // paid
            case "GKV Abrechnung":
                return "lab-purple"; // GKV billing
            case "Boten Abrechnung":
                return "lab-teal"; // Courier billing
            case "Pickup Abrechnung":
                return "lab-indigo"; // pickup billing
            default:
                return "lab-gray"; // unknown / fallback
        }
    };
    const fetchPatientInfo = async () => {
        try {
            const response = await getPatientinfo(user?.token);
            const data = response.user || {};
            const dataaddress = response.address || {};

            setProfile({
                fname: data.firstName || '',
                lname: data.lastName || '',
                dob: data.dob ? data.dob.split('T')[0] : '',
                email: data.email || '',
                phone: data.phone || '',
                address_line1: dataaddress.address_line1 || '',
                city: dataaddress.city || '',
                zip: dataaddress.zip || '',
                country: dataaddress.country || '',
                longitude: dataaddress.longitude || '',
                latitude: dataaddress.latitude || '',
            });


        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || error.message || 'Failed to load patient info'
            );
        }
    };

    const fetchOrderDetails = async () => {
        try {
            const response = await getOrderDetails(user?.token);
            if (response.success) {
                console.log(response.orders);
                setOrders(response.orders || []);
            } else {
                toast.error(response.message || "Failed to load orders");
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || error.message || "Failed to load orders"
            );
        }
    };

    const validateField = (name: string, value: string) => {
        let message = "";

        if (name === "fname") {
            if (!value.trim()) message = "First name is required";
            else if (!/^[A-Za-z]+$/.test(value.trim())) message = "Invalid name";
        }

        if (name === "lname") {
            if (!value.trim()) message = "Last name is required";
            else if (!/^[A-Za-z]+$/.test(value.trim())) message = "Invalid name";
        }
        if (name === "dob") {
            if (!value.trim()) {
                message = "Date of birth is required";
            } else {
                const dob = new Date(value);
                if (dob.toString() === "Invalid Date") {
                    message = "Please enter a valid date";
                } else {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (dob > today) {
                        message = "Date of birth cannot be in the future";
                    }
                }
            }
        }

        if (name === "phone") {
            const phoneRegex = /^(\+49)?[0-9]{5,15}$/;
            if (!phoneRegex.test(value)) message = "Enter a valid German phone number";
        }


        setError((prev) => ({ ...prev, [name]: message }));

        return message === "";
    };
    const validateForm = () => {
        const validations = [
            validateField('fname', profile.fname),
            validateField('lname', profile.lname),
            validateField('dob', profile.dob),
            validateField('phone', profile.phone),
        ];
        return validations.every((isValid) => isValid);
    };
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        const data = {
            name: `${profile.fname} ${profile.lname}`,
            phone: profile.phone,
            dob: profile.dob,
        };
        try {
            const response = await updatePatientinfo(data, user?.token);
            if (!response.success) {
                throw new Error(response.message || "Failed to update profile");
            }
            toast.success("Profile updated successfully!");
            fetchPatientInfo();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };
    const changePasswordvalidation = (name: string, value: string) => {
        let message = "";

        if (name === "newPassword") {
            if (value.length < 6) message = "Password must be at least 6 characters";
        }

        if (name === "confirmPassword") {
            if (value !== passwords.newPassword) message = "Passwords do not match";
        }

        setError((prev) => ({
            ...prev,
            passwords: {
                ...prev.passwords,
                [name]: message,
            },
        }));

        return message === "";
    };
    const changePassworForm = () => {
        const validations = [
            changePasswordvalidation("newPassword", passwords.newPassword),
            changePasswordvalidation("confirmPassword", passwords.confirmPassword),
        ];
        return validations.every((isValid) => isValid);
    };
    const changePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!changePassworForm()) return;
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        const payload = {
            password: passwords.currentPassword,
            newPassword: passwords.newPassword,
        };

        try {
            const response = await updatepassword(payload, user?.token,);

            if (!response.success) {
                throw new Error(response.message || "Failed to change password");
            }

            toast.success("Password changed successfully!");
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setError((prev) => ({ ...prev, passwords: {} }));
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setProfile((prev) => ({ ...prev, address_line1: query }));

        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await geocodingClient
                .forwardGeocode({
                    query,
                    autocomplete: true,
                    limit: 5,
                    countries: ["de"],
                })
                .send();

            setSuggestions(response.body.features || []);
        } catch (err) {
            console.error("Mapbox search error:", err);
        }
    };
    const selectSuggestion = (suggestion: MapboxFeature) => {
        let city = "";
        let postalCode = "";
        let country = "";

        suggestion.context?.forEach((item) => {
            if (item.id.startsWith("place.")) city = item.text;
            else if (item.id.startsWith("postcode.")) postalCode = item.text;
            else if (item.id.startsWith("country.")) country = item.text;
        });

        setProfile((prev) => ({
            ...prev,
            address_line1: suggestion.place_name,
            city,
            zip: postalCode,
            country,
            latitude: String(suggestion.center[1]),
            longitude: String(suggestion.center[0]),
        }));

        setSuggestions([]);
    };
    const UpdateAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !profile.address_line1?.trim() ||
            !profile.city?.trim() ||
            !profile.zip?.trim() ||
            !profile.country?.trim() ||
            !profile.latitude ||
            !profile.longitude
        ) {
            toast.error("All fields are required!");
            return;
        }

        const data = {
            address_line1: profile.address_line1,
            city: profile.city,
            zip: profile.zip,
            country: profile.country,
            latitude: profile.latitude,
            longitude: profile.longitude,
        };

        try {
            await UpdateAddressinfo(data, user?.token);

            toast.success("Address updated successfully!");
            fetchPatientInfo();
        } catch (error: any) {
            toast.error(error.message || "Failed to update address");
        }
    };

    return (
        <>
            <div className="secWrap tp-md bt-md">
                <div className="container">
                    <div className="mb__25">
                        <div className="text-black f-size-34 f-w-SB">Dashboard</div>
                        <div>Welcome back, {profile?.fname}!</div>
                    </div>
                    <div>
                        <div className="cb_tabsWrapp overflow-y-auto mb__30">
                            <ul className="nav cb_cstTab flex-nowrap">
                                <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_1" className="nav-link text-nowrap active"><span className="cb-icon cb-user f-size-14"></span> Profile</button> </li>
                                <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_4" className="nav-link  text-nowrap"><span className="cb-icon cb-file  f-size-14"></span> Delivery Address </button> </li>

                                <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_2" className="nav-link  text-nowrap"><span className="cb-icon cb-setting f-size-14"></span>Security </button> </li>
                                <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_3" className="nav-link  text-nowrap"><span className="cb-icon cb-bag-cart"></span> Orders </button> </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tab_1" role="tabpanel">
                                <div className="cb_cardStyle_1">
                                    <div className="mb__25">
                                        <div className="text-black f-size-22 f-w-SB">Profile Details</div>
                                        <div>Update your personal information and contact details</div>
                                    </div>
                                    <form onSubmit={handleUpdateProfile}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="fname">First Name</label>
                                                    <input
                                                        type="text"
                                                        id="fname"
                                                        className="form-control cst-form-f"
                                                        value={profile.fname}
                                                        onChange={(e) => {
                                                            setProfile({ ...profile, fname: e.target.value });
                                                            validateField("fname", e.target.value);
                                                        }}
                                                    />
                                                    {error.fname && <span className='errorMsg'>{error.fname}</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lname">Last Name</label>
                                                    <input
                                                        type="text"
                                                        id="lname"
                                                        className="form-control cst-form-f"
                                                        value={profile.lname}
                                                        onChange={(e) => {
                                                            setProfile({ ...profile, lname: e.target.value });
                                                            validateField("lname", e.target.value);
                                                        }}
                                                    />
                                                    {error.lname && <span className='errorMsg'>{error.lname}</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="dob">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        id="dob"
                                                        className="form-control cst-form-f"
                                                        value={profile.dob}
                                                        onChange={(e) => {
                                                            setProfile({ ...profile, dob: e.target.value });
                                                            validateField("dob", e.target.value);
                                                        }}
                                                    />
                                                    {error.dob && <span className='errorMsg'>{error.dob}</span>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        className="form-control cst-form-f"
                                                        value={profile.email}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        className="form-control cst-form-f"
                                                        value={profile.phone || ""}
                                                        onChange={(e) => {
                                                            setProfile({ ...profile, phone: e.target.value });
                                                            validateField("phone", e.target.value);
                                                        }}
                                                        placeholder="+49 1512 3456789"
                                                    />
                                                    {error.phone && <span className='errorMsg'>{error.phone}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn cb_cmnBtn">
                                                Update Profile
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab_2" role="tabpanel">
                                <div className="cb_cardStyle_1">
                                    <div className="mb__25">
                                        <div className="text-black f-size-22 f-w-SB">Change Password</div>
                                        <div>Update your password to keep your account secure</div>
                                    </div>
                                    <form onSubmit={changePassword}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="currentPassword">Current Password</label>
                                                    <div className="icon_field">
                                                        <input
                                                            type={showPassword.current ? "text" : "password"}
                                                            id="currentPassword"
                                                            className="form-control cst-form-f"
                                                            value={passwords.currentPassword}
                                                            onChange={(e) => {
                                                                setPasswords({ ...passwords, currentPassword: e.target.value });
                                                                changePasswordvalidation("password", e.target.value);
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn p-0 border-0 fieldIcon"
                                                            onClick={() => togglePassword("current")}
                                                        >
                                                            <i className={`cb-icon ${showPassword.current ? "cb-show" : "cb-hide"}`} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="newPassword">New Password</label>
                                                    <div className="icon_field">
                                                        <input
                                                            type={showPassword.new ? "text" : "password"}
                                                            id="newPassword"
                                                            className="form-control cst-form-f"
                                                            value={passwords.newPassword}
                                                            onChange={(e) => {
                                                                setPasswords({ ...passwords, newPassword: e.target.value })
                                                                changePasswordvalidation("newPassword", e.target.value);
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn p-0 border-0 fieldIcon"
                                                            onClick={() => togglePassword("new")}
                                                        >
                                                            <i className={`cb-icon ${showPassword.new ? "cb-show" : "cb-hide"}`} />
                                                        </button>
                                                    </div>
                                                    {error.passwords?.newPassword && <span className='errorMsg'>{error.passwords.newPassword}</span>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                                    <div className="icon_field">
                                                        <input
                                                            type={showPassword.confirm ? "text" : "password"}
                                                            id="confirmPassword"
                                                            className="form-control cst-form-f"
                                                            value={passwords.confirmPassword}
                                                            onChange={(e) => {
                                                                setPasswords({ ...passwords, confirmPassword: e.target.value })
                                                                changePasswordvalidation("confirmPassword", e.target.value);
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn p-0 border-0 fieldIcon"
                                                            onClick={() => togglePassword("confirm")}
                                                        >
                                                            <i className={`cb-icon ${showPassword.confirm ? "cb-show" : "cb-hide"}`} />
                                                        </button>
                                                    </div>
                                                    {error.passwords?.confirmPassword && <span className='errorMsg'>{error.passwords.confirmPassword}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" className="btn cb_cmnBtn">
                                                Change Password
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab_3" role="tabpanel">
                                <div className="cb_cardStyle_1">
                                    <div className="mb__25">
                                        <div className="text-black f-size-22 f-w-SB">Order History</div>
                                        <div>View all your orders including prescriptions and online consultations</div>
                                    </div>
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <div className="cb_cardStyle_1 spc-sm mt-4" key={order.id}>
                                                <div className="mb-4 d-flex gap-3 flex-column flex-md-row align-items-start justify-content-between">
                                                    <div className="d-flex gap-3 align-items-start">
                                                        <div>
                                                            <div className="text-black line_H_1_3 f-w-SB mb__5">
                                                                Order ID : {order.id}
                                                            </div>
                                                            <div className="line_H_1_3">
                                                                {new Date(order.created_at).toLocaleDateString()}
                                                            </div>
                                                        </div>

                                                        <div className="d-flex gap-3 align-items-start">
                                                            <span className={`cb_cstLabel_3 ${getStatusClass(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>


                                                    </div>

                                                    <div className="d-flex gap-3 align-items-start">
                                                        <div className="text-md-end text-start">
                                                            <div className="text-black line_H_1_3 f-w-SB mb__5">
                                                                €{order.total_amount}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-end flex-wrap row-gap-3">

                                                    <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                                        <li>
                                                            <span className="text-black">  Payment Status:  </span>

                                                            <span className={`cb_cstLabel_3 ${getPaymentStatusClass(order.payment_status)}`}>
                                                                {order.payment_status}
                                                            </span>
                                                        </li>
                                                        <li>

                                                            <span className="text-black">Delivery: </span>
                                                            <span className="primary-clr">
                                                                {order.delivery_method === "homeDelivery"
                                                                    ? "Home Delivery"
                                                                    : order.delivery_method === "Courier"
                                                                        ? "Courier"
                                                                        : "Pharmacy Pickup"}
                                                            </span>

                                                        </li>
                                                        <li>
                                                            <span className="primary-clr">
                                                                Address :   {order.delivery_method === "homeDelivery"
                                                                    ? order.shippingAddress?.address_line1 || "N/A"
                                                                    : order.pharmacist?.address || "N/A"}
                                                            </span>
                                                        </li>
                                                    </ul>


                                                    <button
                                                        className="btn cb_cmnBtn btn-o px-sm-4 mob-w100 flex-grow-1 flex-md-grow-0"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#orderHistory"
                                                        onClick={() => setSelectedOrder(order)}
                                                    >
                                                        <span className="cb-icon cb-show"></span> View Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="mt-4">No orders found</div>
                                    )}


                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab_4" role="tabpanel">
                                <div className="cb_cardStyle_1">
                                    <div className="mb__25">
                                        <div className="text-black f-size-22 f-w-SB">Delivery Address</div>
                                        <div>Update your Address</div>


                                    </div>
                                    <form onSubmit={UpdateAddress}>
                                        <div className="row">

                                            <div className="col-md-12 position-relative">
                                                <div className="form-group">
                                                    <label htmlFor="address_line1">Address</label>
                                                    <input
                                                        type="text"
                                                        id="address_line1"
                                                        className="form-control cst-form-f"
                                                        value={profile.address_line1}
                                                        onChange={handleSearch}
                                                    />
                                                </div>


                                                {suggestions.length > 0 && (
                                                    <ul className="list-group position-absolute w-100 shadow">
                                                        {suggestions.map((s, i) => (
                                                            <li
                                                                key={i}
                                                                className="list-group-item list-group-item-action"
                                                                onClick={() => selectSuggestion(s)}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                {s.place_name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        className="form-control cst-form-f"
                                                        value={profile.city}
                                                        onChange={(e) =>
                                                            setProfile({ ...profile, city: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="zip">ZIP Code</label>
                                                    <input
                                                        type="text"
                                                        id="zip"
                                                        className="form-control cst-form-f"
                                                        value={profile.zip}
                                                        onChange={(e) =>
                                                            setProfile({ ...profile, zip: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="country">Country</label>
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        className="form-control cst-form-f"
                                                        value={profile.country}
                                                        onChange={(e) =>
                                                            setProfile({ ...profile, country: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" className="btn cb_cmnBtn mt-3">
                                                {profile.country && profile.country.trim() !== "" ? "Update Address" : "Add Address"}
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal fade cb_cstModal" id="orderHistory">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        {selectedOrder ? (
                            <>

                                <div className="modal-header border-bottom-0 pb-1">
                                    <div className="flex-grow-1">
                                        <div className="d-flex gap-2 align-items-center">
                                            <div className="d-flex gap-3 flex-grow-1 align-items-center mb__5">
                                                <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0">
                                                    Order Details - {selectedOrder.id}
                                                </h5>
                                                <span className={`cb_cstLabel_3 ${getStatusClass(selectedOrder.status)}`}>
                                                    {selectedOrder.status}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="line_H_1_3 primary-clr">
                                            Complete information about your order
                                        </div>
                                    </div>
                                </div>


                                <div className="modal-body">

                                    <div className="sepLine mb-3 pb-3">
                                        <div className="row row-gap-3">
                                            <div className="col-md-12">
                                                <div className="d-flex justify-content-between align-items-center mb-0">
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5">
                                                        <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>{" "}
                                                        Order Information
                                                    </div>
                                                </div>
                                                <ul className="list-unstyled m-0 d-flex flex-column row-gap-1 ms-4">
                                                    <li>
                                                        <span className="text-black">Order ID: </span>{" "}
                                                        <span className="primary-clr">{selectedOrder.id}</span>
                                                    </li>
                                                    <li>
                                                        <span className="text-black">Date: </span>{" "}
                                                        <span className="primary-clr">
                                                            {new Date(selectedOrder.created_at).toLocaleDateString()}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sepLine mb-3 pb-3">
                                        <div className="text-black line_H_1_3 f-w-SB mb__5">
                                            <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>
                                            Delivery Information
                                        </div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1 ms-4">
                                            <li>
                                                <span className="text-black">Delivery Method: </span>{" "}
                                                <span className="primary-clr">
                                                    {selectedOrder.delivery_method === "homeDelivery"
                                                        ? "Home Delivery"
                                                        : selectedOrder.delivery_method === "Courier"
                                                            ? "Courier"
                                                            : "Pharmacy Pickup"}



                                                </span>
                                            </li>
                                            <li>
                                                <span className="text-black">Address: </span>{" "}
                                                <span className="primary-clr">
                                                    {selectedOrder.delivery_method === "homeDelivery" || selectedOrder.delivery_method === "Courier"
                                                        ? selectedOrder.shippingAddress?.address_line1 || "N/A"
                                                        : selectedOrder.pharmacist?.address || "N/A"}

                                                </span>
                                            </li>
                                            <li>
                                                <span className="text-black">Payment Status: </span>{" "}
                                                <span className={`cb_cstLabel_3 ${getPaymentStatusClass(selectedOrder.payment_status)}`}>
                                                    {selectedOrder.payment_status}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    {selectedOrder.orderPrescription && (
                                        <>
                                            <div className="sepLine mb-3 pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-0">
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5">
                                                        <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>{" "}
                                                        Prescription Status
                                                    </div>
                                                    <ul className="list-unstyled m-0 d-flex flex-column row-gap-1 ms-4">
                                                        <li>
                                                            <span className={`cb_cstLabel_3 ${getPaymentStatusClass(selectedOrder.orderPrescription?.status)}`}>
                                                                {selectedOrder.orderPrescription?.status}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <ul className="list-unstyled m-0 d-flex flex-column row-gap-1 ms-4">

                                                    <li>
                                                        <span className="text-black">Prescription Payment Status :</span>{" "}

                                                        <span className={`cb_cstLabel_3 ${getPaymentStatusClass(selectedOrder.orderPrescription?.payment_status)}`}>
                                                            {selectedOrder.orderPrescription?.payment_status}
                                                        </span>
                                                    </li>
                                                    {selectedOrder.orderPrescription?.prescriptionDoctor && (
                                                        <li>
                                                            <span className="text-black">Prescription Doctor Name :</span>{" "}
                                                            <span className="text-black">
                                                                {selectedOrder.orderPrescription.prescriptionDoctor.name}
                                                            </span>
                                                        </li>
                                                    )}

                                                </ul>
                                            </div>
                                            <div className="sepLine mb-3 pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-0">
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5">
                                                        <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>{" "}
                                                        Product Information
                                                    </div>
                                                </div>

                                                <ul className="list-unstyled m-0 d-flex flex-column row-gap-1 ms-4">
                                                    <li>
                                                        <span className="text-black">Pharmacy: </span>
                                                        {selectedOrder.pharmacist?.store_name || "N/A"}
                                                    </li>
                                                    <li>
                                                        <span className="text-black">Address: </span>
                                                        {selectedOrder.pharmacist?.address || "N/A"}
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-0">
                                            <div className="text-black line_H_1_3 f-w-SB mb__5">
                                                <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>{" "}
                                                Product Information
                                            </div>
                                        </div>

                                        <div className="row">
                                            {selectedOrder.items.map((item: {
                                                quantity: ReactNode; id: React.Key | null | undefined; product: { image: any; name: any; thc: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; cbd: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; product_name: any; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; weight: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; weight_unit: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
                                            }) => (
                                                <div className="col-md-12" key={item.id}>
                                                    <div className="cartItem d-flex gap-3">
                                                        <div className="cartImg">
                                                            <img
                                                                className="w-100"
                                                                src={item.product?.image || "assets/images/dummy-product.jpg"}
                                                                alt={item.product?.name || "Product"}
                                                            />
                                                        </div>
                                                        <div className="itemDetails flex-grow-1">
                                                            <div className="f-size-18 f-w-SB clr-black mb__5">
                                                                {item.product?.name || item.product_name}
                                                            </div>
                                                            <div className="productSummary mb__15">
                                                                THC: {item.product?.thc}% | CBD: {item.product?.cbd}%
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <div className="f-size-14 f-w-SB mb__5 clr-green">
                                                                €{item.price} - {item.weight} {item.weight_unit}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="text-black f-w-SB f-size-20">Total</div>
                                                <div className="text-black f-w-SB f-size-20">
                                                    €{selectedOrder.total_amount} -
                                                    {(() => {
                                                        let totalWeight = 0;

                                                        selectedOrder.items?.forEach(
                                                            (item: { weight: string; weight_unit: string; quantity: number }) => {
                                                                const weight = parseFloat(item.weight) || 0;
                                                                const qty = item.quantity || 0;

                                                                if (item.weight_unit === "g" || item.weight_unit === "ml") {
                                                                    totalWeight += weight * qty;
                                                                }
                                                            }
                                                        );

                                                        return totalWeight > 0 ? `${totalWeight} g/ml` : "";
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-4"><Loader /></div>
                        )}
                    </div>

                </div>
            </div>



        </>
    );
};

export default Dashboard;

