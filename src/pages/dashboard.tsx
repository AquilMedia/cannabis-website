import { useAuth } from '@/context/AuthContext';
import { getOrderDetails, getPatientinfo, updatepassword, updatePatientinfo } from '@/services/user';
import React, { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {

    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

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
    const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };
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
        country: ''
    });

    console.log(user?.token)
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

    useEffect(() => {
        if (user?.token) {
            fetchPatientInfo();
            fetchOrderDetails();
        }
    }, [user]);
    const UpdateAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await updatePatientinfo(user?.token, {
                address_line1: profile.address_line1,
                city: profile.city,
                zip: profile.zip,
                country: profile.country,
            });

            toast.success("Address updated successfully!");
            fetchPatientInfo();
        } catch (error: any) {
            toast.error(error.message || "Failed to update address");
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

                                                            <span className={`cb_cstLabel_3 ${(order.status)}`}>
                                                                Order Status: {order.status}
                                                            </span>

                                                            <span className={`cb_cstLabel_3 ${(order.payment_status)}`}>
                                                                Payment Status: {order.payment_status}
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
                                                            <span className="text-black">Delivery: </span>
                                                            <span className="primary-clr">
                                                                {order.delivery_method === "homeDelivery"
                                                                    ? "Home Delivery"
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

                                        {/* <div>Download and manage your invoices</div> */}

                                    </div>
                                    <form onSubmit={UpdateAddress}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="address_line1">Address</label>
                                                    <input
                                                        type="text"
                                                        id="address_line1"
                                                        className="form-control cst-form-f"
                                                        value={profile.address_line1}
                                                        onChange={(e) =>
                                                            setProfile({ ...profile, address_line1: e.target.value })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        className="form-control cst-form-f"
                                                        value={profile.city}
                                                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
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
                                                        onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
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
                                                        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" className="btn cb_cmnBtn">
                                                Update Address
                                            </button>
                                        </div>
                                    </form>

                                    {/* <div className="cb_cardStyle_1 spc-sm mt-4">
                                        <div className="mb-4 d-flex gap-3 flex-column flex-md-row align-items-start justify-content-between">
                                            <div className="d-flex gap-3 align-items-start">
                                                <div>
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5"> Invoice #INV-001</div>
                                                    <div className="line_H_1_3"> Order: ORD-001</div>
                                                </div>
                                                <span className="cb_cstLabel_3">Paid</span>
                                            </div>
                                            <div className="d-flex gap-3 align-items-start">
                                                <div className='text-md-end text-start'>
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5"> €89.90</div>
                                                    <div className="line_H_1_3"> 2024-01-15</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-center gap-3 flex-wrap'>
                                            <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100" data-bs-toggle="modal" data-bs-target="#invoices"><span className="cb-icon cb-show"></span> View Details</button>
                                            <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100"><span className="cb-icon cb-download"></span> Download PDF</button>
                                        </div>
                                    </div>
                                    <div className="cb_cardStyle_1 spc-sm mt-4">
                                        <div className="mb-4 d-flex gap-3 flex-column flex-md-row align-items-start justify-content-between">
                                            <div className="d-flex gap-3 align-items-start">
                                                <div>
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5"> Invoice #INV-002</div>
                                                    <div className="line_H_1_3"> Order: ORD-001</div>
                                                </div>
                                                <span className="cb_cstLabel_3 lab-orange">Pending</span>
                                            </div>
                                            <div className="d-flex gap-3 align-items-start">
                                                <div className='text-md-end text-start'>
                                                    <div className="text-black line_H_1_3 f-w-SB mb__5"> €89.90</div>
                                                    <div className="line_H_1_3"> 2024-01-15</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-center gap-3 flex-wrap'>
                                            <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100" data-bs-toggle="modal" data-bs-target="#invoices"><span className="cb-icon cb-show"></span> View Details</button>
                                            <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100"><span className="cb-icon cb-download"></span> Download PDF</button>
                                        </div>
                                    </div> */}

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
                                                <span className="cb_cstLabel_3 lab-orange">
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
                                                    <div className="text-black line_H_1_3">
                                                        <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>{" "}
                                                        Order Information
                                                    </div>
                                                </div>
                                                <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
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

                                    <div className="mb-3">
                                        <div className="text-black line_H_1_3 f-w-SB mb__5">
                                            Delivery Information
                                        </div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li>
                                                <span className="text-black">Delivery Method: </span>{" "}
                                                <span className="primary-clr">
                                                    {selectedOrder.delivery_method === "homeDelivery"
                                                        ? "Home Delivery"
                                                        : "Pharmacy Pickup"}
                                                </span>
                                            </li>
                                            <li>
                                                <span className="text-black">Address: </span>{" "}
                                                <span className="primary-clr">
                                                    {selectedOrder.delivery_method === "homeDelivery"
                                                        ? selectedOrder.shippingAddress?.address_line1 ||
                                                        "N/A"
                                                        : selectedOrder.pharmacist?.address || "N/A"}
                                                </span>
                                            </li>
                                            <li>
                                                <span className="text-black">Payment Status: </span>{" "}
                                                <span className="primary-clr">{selectedOrder.payment_status}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-0">
                                            <div className="text-black line_H_1_3">
                                                <i className="textsm-icon cb-icon cb-circle-tick me-1"></i>{" "}
                                                Product Information
                                            </div>
                                        </div>

                                        <div className="row row-gap-2 mb-3">
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
                                                            <div className="f-size-14 f-w-SB mb__5 clr-green">
                                                                €{item.price} - {item.weight} {item.weight_unit}
                                                            </div>
                                                            <div className="f-size-14 f-w-SB mb__5 clr-green">
                                                                Quantity:{item.quantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="d-flex justify-content-between mt-3">
                                                <div>
                                                    <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
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
                                                <div className="text-black f-w-SB f-size-20">
                                                    Total: €{selectedOrder.total_amount} -
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
                                                    })()} -
                                                    {selectedOrder.items?.reduce(
                                                        (sum: number, item: { quantity: number }) => sum + (item.quantity || 0),
                                                        0
                                                    )} Q
                                                </div>





                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-4">Loading order details...</div>
                        )}
                    </div>

                </div>
            </div>



            {/* <div className="modal fade cb_cstModal " id="invoices">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 pb-1">
                            <div className="flex-grow-1">
                                <div className="d-flex gap-2 align-items-center">
                                    <div className="d-flex gap-3 flex-grow-1 align-items-center mb__5">
                                        <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0">Invoice Details - INV-001</h5>
                                        <span className="cb_cstLabel_3">Paid</span>
                                    </div>
                                    <button type="button" className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="line_H_1_3 primary-clr">Invoice information and payment details</div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="sepLine mb-3 pb-3">
                                <div className="row row-gap-3">
                                    <div className="col-md-6">
                                        <div className="text-black line_H_1_3 f-w-SB mb__5">Invoice Information</div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Invoice ID: </span> <span className='primary-clr'>INV-001</span></li>
                                            <li><span className="text-black">Order ID: </span> <span className='primary-clr'>ORD-001</span></li>
                                            <li><span className="text-black">Date: </span> <span className='primary-clr'>2024-01-15</span></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="text-black line_H_1_3 f-w-SB mb__5">Payment Details</div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Amount: </span> <span className='primary-clr'>€89.90</span></li>
                                            <li><span className="text-black">Payment Method: </span> <span className='primary-clr'>Credit Card</span></li>
                                            <li><span className="text-black">Transaction ID: </span> <span className='primary-clr'>TXN-001-2024</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-black line_H_1_3 f-w-SB mb__5">Billing Address</div>
                                <div><span className="text-black">Akshay Bhujbal <br />Unter den Linden 1, Berlin 10117 <br /> <Link href={''} className="text-black">akshay.b@aquilmedia.in</Link></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Dashboard;

