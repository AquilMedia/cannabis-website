import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getCartList, getMedicalQuestions, getPatientinfo, medicalQuestionnaire, uploadPrescriptionDr } from '@/services/user';
import { useAuth } from '@/context/AuthContext';
import MedicalQuestionnaire from '@/components/MedicalQuestionnaire';
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import OrderConfirmationModal from '@/Modals/OrderConfirmationModal';
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import PendingOrderPage from '@/Modals/pending-order';

const geocodingClient = mbxGeocoding({
    accessToken: "sk.eyJ1Ijoic2FteWFiaXNhbGVoIiwiYSI6ImNtM2ZmdnkxMTBqMXMyaXNlcHMzeTV1cmEifQ.p3Zc6DhFHND0OAD7FCRKtA"
});
const Onlineprescription: React.FC = () => {
    const router = useRouter();

    const { user } = useAuth();
    const [questions, setQuestions] = useState<any[]>([]);
    const [questionsans, setQuestionsAns] = useState<any[]>([]);
    const [showPendingOrderModal, setShowPendingOrderModal] = useState(false);

    const [total, setTotal] = useState(0);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [responses, setResponses] = useState<any>({});
    const [cartItems, setCartItems] = useState<any[]>([]);
    const { fetchCartData } = useCart();

    const [legalDocImgName, setlegalDocImgName] = useState("Upload your ID document");
    const [step, setStep] = useState(1);
    useEffect(() => {
        getPatientinfoData();

        fetchCart();
    }, []);
    const fetchCart = async () => {
        try {
            const data = await getCartList(user?.token);
            if (data?.success) {
                setCartItems(data.cartItems || []);
                setTotal(data.summary?.total_cart_price || 0);
                console.log('data.cartItems', data.cartItems);

            } else {
                toast.error(data?.message || "Failed to load cart items");
            }
        } catch (err) {
            toast.error("Failed to load cart items");
        }
    };
    const getPatientinfoData = async () => {
        try {
            const res = await getPatientinfo(user?.token);

            if (!res || !res.success) {
                throw new Error("No patient info found");
            }

            // if (res.pendingOrders === 1) {

            //     setShowPendingOrderModal(true);
            //     return;
            // }
           setFormData((prev) => ({
  ...prev,
  legalDocUrl: res.user.legalDocument
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${res.user.legalDocument}`
    : "",
  patientInfo: {
    ...prev.patientInfo,
    firstName: res.user.firstName || "",
    lastName: res.user.lastName || "",
    email: res.user.email || "",
    phone: res.user.phone || "",
    dob: res.user.dob ? res.user.dob.replace(/[{}]/g, "") : "",

    addressline1: res.address?.address_line1 || "",
    city: res.address?.city || "",
    postalCode: res.address?.zip || "",
    country: res.address?.country || "",
    latitude: res.address?.latitude ? Number(res.address.latitude) : undefined,
    longitude: res.address?.longitude ? Number(res.address.longitude) : undefined,
  }
}));


        } catch (error) {
            console.error("Error starting new order:", error);
            toast.error("Failed to fetch patient info");
        }
    };


    const totalSteps = 5;
    const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);

    interface PatientInfo {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dob: string;
        addressline1: string;
        city: string;
        postalCode: string;
        country: string;
        latitude?: number;
        longitude?: number;
    }


    interface FormDataType {
        legalDocUrl: any;

        legalDocImg: File | null;
        deliveryMethod: string;
        patientInfo: PatientInfo;
    }

    const [formData, setFormData] = useState<FormDataType>({
legalDocUrl:"",
        legalDocImg: null,
        deliveryMethod: "",
        patientInfo: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: "",
            addressline1: "",
            city: "",
            postalCode: "",
            country: "",
            latitude: undefined,
            longitude: undefined,
        },
    });
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getMedicalQuestions(user?.token);
                if (data?.success) {
                    setQuestions(data.questions || []);
                } else {
                    toast.error(data?.message || "Failed to load questions");
                }
            } catch (err) {
                toast.error("Failed to load questions");
            }
        };

        fetchQuestions();
    }, [user?.token]);
    const handleNextClick = () => {
        if (!formData.deliveryMethod) {
            toast.error("Please select a delivery method before continuing.");
            return;
        }
        goNext();
    };
    const handleComplete = async (responses: any) => {
        console.log("Final responses:", responses);
        setQuestionsAns(responses);
        toast.success("Questionnaire completed successfully!");
        goNext();
        // try {
        //     const res = await medicalQuestionnaire(responses, user?.token);

        //     if (!res.success) {
        //         throw new Error("Failed to create order");
        //     }

        //     toast.success("Questionnaire completed successfully!");
        //     goNext();
        // } catch (err) {
        //     console.error("Error:", err);
        //     toast.error("Error creating order");
        // }
    };
    const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, deliveryMethod: e.target.value }));
    };
    const goNext = () => {
        setStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const goPrev = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };
    const isActive = (num: number) => (step === num ? "active" : "disabled");

    interface MapboxContextItem {
        id: string;
        text: string;
    }

    interface MapboxFeature {
        place_name: string;
        center: [number, number];
        context?: MapboxContextItem[];
    }

    const handleSearch = async (e: { target: { value: any; }; }) => {
        const query = e.target.value;

        setFormData((prev) => ({
            ...prev,
            patientInfo: { ...prev.patientInfo, addressline1: query }
        }));

        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await geocodingClient
                .forwardGeocode({
                    query,
                    autocomplete: true,
                    limit: 5
                })
                .send();

            const results = response.body.features || [];
            setSuggestions(results);
        } catch (err) {
            console.error("Mapbox search error:", err);
        }
    };
    const handleContinueWithDocument = () => {
        if (!formData.legalDocImg) {
            toast.error("Please upload a valid government-issued ID before continuing.");
            return;
        }

        goNext();
    };
    const selectSuggestion = (suggestion: MapboxFeature) => {
        let city = "";
        let state = "";
        let postalCode = "";
        let country = "";

        suggestion.context?.forEach((item) => {
            if (item.id.startsWith("place.")) city = item.text;
            else if (item.id.startsWith("region.")) state = item.text;
            else if (item.id.startsWith("postcode.")) postalCode = item.text;
            else if (item.id.startsWith("country.")) country = item.text;
        });

        setFormData((prev) => ({
            ...prev,
            patientInfo: {
                ...prev.patientInfo,
                addressline1: suggestion.place_name,
                city,
                postalCode,
                country,
                latitude: suggestion.center[1],
                longitude: suggestion.center[0],
            },
        }));

        // Clear suggestions dropdown
        setSuggestions([]);
    };


    const handleSavePatientInfo = () => {
        const { firstName, lastName, email, phone, dob, addressline1, city, postalCode, country } = formData.patientInfo;

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !dob.trim() ||
            !addressline1.trim() ||
            !city.trim() ||
            !postalCode.trim() ||
            !country.trim()
        ) {
            toast.error("Please fill in all required fields.");


            return;
        }
        goNext();
    };




    const handleSubmit = async () => {
        try {
            const fd = new FormData();

            const items = cartItems.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                price: item.inventory_price,
                weight: item.weight,
                weight_unit: item.weight_unit,
                quantity: item.quantity,
                pharmacist_id: item.pharmacist_id
            }));
            //    console.log(questionsans);


            fd.append("items", JSON.stringify(items));

            fd.append("legalDocImg", formData.legalDocImg ?? "");
            fd.append("questions", JSON.stringify(questionsans));

            fd.append("patientInfo", JSON.stringify(formData.patientInfo));

            fd.append("deliveryMethod", formData.deliveryMethod);




            const res = await uploadPrescriptionDr(fd, user?.token);
            if (!res.success) {
                throw new Error("Failed to create order");
            }
            toast.success(" Your order Placed");

            setOrderId(res.orderNumber);
            setShowOrderModal(true);

            fetchCartData();

        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleModalClose = () => {
        setShowOrderModal(false);
        router.push("/dashboard");
    };

    return (
        <div className="secWrap tp-md cb_innerPg_wrp">
            {showOrderModal && (
                <OrderConfirmationModal
                    orderId={orderId}
                    onClose={handleModalClose}
                />
            )}
            <div className="container">
                {showPendingOrderModal && (
                    <PendingOrderPage


                    />
                )}


                <h1 className="f-w-M text-center f-size-24 mb-4 pb-1 text-black">Prescription</h1>
                <div className="text-center mb-4 pb-md-3">
                    <h4 className="text-black f-size-22 f-w-N mb-0">Online Prescription</h4>
                </div>

                <div className="cb_wrapSteps_tab overflow-y-auto">
                    <ul className="nav flex-nowrap cb_stepsTab">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <li className="nav-item" key={num}>
                                <button
                                    className={`nav-link ${isActive(num)}`}
                                    onClick={() => setStep(num)}
                                >
                                    <span className="nbr">{num}</span>
                                    <span className="nav-text">
                                        {[
                                            "Medical Questionnaire",
                                            "Patient Information",
                                            "Legal Document",
                                            "Delivery Method",

                                            "Order Summary",
                                        ][num - 1]}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* <ul className="nav flex-nowrap cb_stepsTab">
                        <li className="nav-item">
                            <button data-bs-toggle="tab" data-bs-target="#tab_step_1" className="nav-link active">
                                <span className="nbr">1</span>
                                <span className="nav-text">Medical Questionnaire</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button data-bs-toggle="tab" data-bs-target="#tab_step_2" className="nav-link">
                                <span className="nbr">2</span>
                                <span className="nav-text">Patient Information</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button data-bs-toggle="tab" data-bs-target="#tab_step_3" className="nav-link">
                                <span className="nbr">3</span>
                                <span className="nav-text">Legal Document</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button data-bs-toggle="tab" data-bs-target="#tab_step_4" className="nav-link">
                                <span className="nbr">4</span>
                                <span className="nav-text">Delivery Method</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button data-bs-toggle="tab" data-bs-target="#tab_step_5" className="nav-link">
                                <span className="nbr">5</span>
                                <span className="nav-text">Submit for Review</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button data-bs-toggle="tab" data-bs-target="#tab_step_6" className="nav-link">
                                <span className="nbr">6</span>
                                <span className="nav-text">Order Summary</span>
                            </button>
                        </li>
                    </ul> */}
                </div>

                <div className="tab-content">
                    {step === 1 && (
                        <>
                            {questions.length > 0 ? (
                                <MedicalQuestionnaire questions={questions} onSubmit={handleComplete} />
                            ) : (
                                <p>Loading questions...</p>
                            )}
                        </>
                    )}
                    {step === 2 && (
                        <div className={`tab-pane fade ${step === 2 ? "show active" : ""}`} id="tab_step_2">
                            <form onSubmit={handleSavePatientInfo}>
                                <div className="cb_cardStyle_1 cb_prescriptn_card">
                                    <div className="mb-4 pb-lg-2">
                                        <div className="text-black f-size-20 line_H_1_2">Patient Information</div>
                                        <div>Please provide your personal details</div>
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="secondary-clr f-size-14 f-w-M mb-2">Personal Details</h5>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input value={formData.patientInfo.firstName} type="text" required name="firstName" className="form-control cst-form-f" placeholder="Enter First Name"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input type="text" required value={formData.patientInfo.lastName} name="lastName" className="form-control cst-form-f" placeholder="Enter Last Name"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <input type="text" required name="email" value={formData.patientInfo.email} className="form-control cst-form-f" placeholder="Enter Email Address"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input  type="tel" required name="phone" value={formData.patientInfo.phone} className="form-control cst-form-f" placeholder="Enter phone Number"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input type="text" required name="dob" value={formData.patientInfo.dob} className="form-control cst-form-f" placeholder="mm/dd/yyyy"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="secondary-clr f-size-14 f-w-M mb-2">Address Information</h5>

                                        {/* Search Address */}
                                        <div className="form-group position-relative">
                                            <input
                                                type="text"
                                                required
                                                name="addressline1"
                                                value={formData.patientInfo.addressline1}
                                                onChange={handleSearch}
                                                className="form-control cst-form-f"
                                                placeholder="Search Address"
                                            />

                                            {suggestions.length > 0 && (
                                                <ul className="list-group position-absolute w-100">
                                                    {suggestions.map((s, index) => (
                                                        <li
                                                            key={index}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => selectSuggestion(s)}
                                                        >
                                                            {s.place_name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* City, Postal Code, Country */}
                                        <div className="row mt-2">
                                            <div className="col-sm-6 col-md-4">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    required
                                                    value={formData.patientInfo.city}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            patientInfo: { ...prev.patientInfo, city: e.target.value },
                                                        }))
                                                    }
                                                    className="form-control cst-form-f"
                                                    placeholder="City"
                                                />
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <input
                                                    type="text"
                                                    required
                                                    name="postalCode"
                                                    value={formData.patientInfo.postalCode}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            patientInfo: { ...prev.patientInfo, postalCode: e.target.value },
                                                        }))
                                                    }
                                                    className="form-control cst-form-f"
                                                    placeholder="Postal Code"
                                                />
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <input
                                                    required
                                                    type="text"
                                                    name="country"
                                                    value={formData.patientInfo.country}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            patientInfo: { ...prev.patientInfo, country: e.target.value },
                                                        }))
                                                    }
                                                    className="form-control cst-form-f"
                                                    placeholder="Country"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="mt-4 d-flex justify-content-between gap-2">
                                    {/* <button className="btn cb_cmnBtn btn-o px-4" onClick={goPrev}>Previous</button> */}
                                    <button className="btn cb_cmnBtn px-4 ms-auto" type="submit">Save Patient Information</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {step === 3 && (
                        <div className={`tab-pane fade ${step === 3 ? "show active" : ""}`} id="tab_step_3">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">
                                <div className="mb-4 pb-lg-2">
                                    <div className="text-black f-size-20 line_H_1_2">Legal Document Upload</div>
                                    <div>Please upload a valid government-issued ID</div>
                                </div>
                                <div className="mb-3">
                                    <h5 className="secondary-clr f-size-14 f-w-M mb-0">Identification Document</h5>
                                    <div className="f-size-12">Accepted documents: Passport, Driver's License, National ID Card</div>
                                </div>

                                <div className="form-group">
                                    <div className="fieldWrap_upload">
                                        <input
                                            className="d-none"
                                            type="file"
                                            id="uploadIdentification"
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    legalDocImg: e.target.files?.[0] ?? null, // File or null
                                                }))
                                            }

                                        />
                                        <label className="cb_uploadField_wrap" htmlFor="uploadIdentification">
                                            <span className="btn chooseBtn">Choose File</span>
                                            <span className="min-w-0">
                                                <span className="fileName">{legalDocImgName}</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>


                               {/* Show uploaded file OR pre-fetched API doc */}
{(formData.legalDocImg || formData.legalDocUrl) && (
    <div className="mt-3">
        {formData.legalDocImg ? (
            // Local uploaded file
            formData.legalDocImg.type.includes("image") ? (
                <img
                    src={URL.createObjectURL(formData.legalDocImg)}
                    alt="Uploaded Document"
                    style={{ maxWidth: "200px", border: "1px solid #ccc", borderRadius: "5px" }}
                />
            ) : formData.legalDocImg.type === "application/pdf" ? (
                <iframe
                    src={URL.createObjectURL(formData.legalDocImg)}
                    title="PDF Preview"
                    width="100%"
                    height="300px"
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                />
            ) : (
                <p className="text-muted">
                    File uploaded: {formData.legalDocImg?.name || "No file uploaded"}
                </p>
            )
        ) : (
            // API-provided doc
            <img
                src={formData.legalDocUrl}
                alt="Legal Document"
                style={{ maxWidth: "200px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
        )}
    </div>
)}



                                <div className="cb_cardStyle_1 spc-sm cardBg">
                                    <div className="d-flex gap-2">
                                        <div className="iconSpc_tp">
                                            <i className="cb-icon cb-file text-black f-size-20"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="text-black mb-1">Document Requirements:</div>
                                            <ul className="mb-0">
                                                <li className="mb-1">Document must be clear and legible</li>
                                                <li className="mb-1">All corners of the document must be visible</li>
                                                <li className="mb-1">Document must be current and not expired</li>
                                                <li className="mb-1">Name on document must match patient information</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="text-center mt-4">
                                                       <button className="btn cb_cmnBtn px-4">Continue with Document</button>
                                                   </div> */}
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4" onClick={goPrev}>Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto" onClick={handleContinueWithDocument}>  Continue with Document</button>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div className={`tab-pane fade ${step === 4 ? "show active" : ""}`} id="tab_step_4">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">
                                <div className="mb-4 pb-lg-2">
                                    <div className="text-black f-size-20 line_H_1_2">Delivery Method</div>
                                    <div>Choose how you'd like to receive your medication</div>
                                </div>

                                <div className="cb_cardStyle_1 spc-sm">
                                    <div className="d-flex gap-3">
                                        <div className="iconSpc_tp">
                                            <input
                                                className="cb_input_rc"
                                                type="radio"
                                                value="homeDelivery"
                                                name="deliveryMethod"
                                                checked={formData.deliveryMethod === "homeDelivery"}
                                                onChange={handleDeliveryChange}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="mb-4">
                                                <div className="text-black line_H_1_3"><i className="textsm-icon cb-icon cb-truck me-1"></i> Home Delivery</div>
                                                <div>Delivered to your address</div>
                                            </div>
                                            <div className="row row-gap-3">
                                                <div className="col-md-6 col-lg-5 col-xl-4">
                                                    <div className="d-flex gap-2">
                                                        <div className="iconSpc_tp">
                                                            <i className="textsm-icon cb-icon cb-clock text-black"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="text-black mb-1">Details</div>
                                                            <ul className="mb-0 f-size-14 d-flex flex-column row-gap-1 list_align_L">
                                                                <li>2-3 business days</li>
                                                                <li>Tracking included</li>
                                                                <li>Secure packaging</li>
                                                                <li>ID verification required</li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-5 col-xl-4">
                                                    <div className="text-black mb-1">$ Cost</div>
                                                    <div className="clr-green">Free for orders over €50</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="d-flex gap-3">
                                        <div className="iconSpc_tp">
                                            <input
                                                className="cb_input_rc"
                                                type="radio"
                                                value="pharmacyPickup"
                                                name="deliveryMethod"
                                                checked={formData.deliveryMethod === "pharmacyPickup"}
                                                onChange={handleDeliveryChange}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="mb-4">
                                                <div className="text-black line_H_1_3">
                                                    <i className="textsm-icon cb-icon cb-location me-1"></i> Pharmacy Pickup
                                                </div>
                                            </div>

                                            {cartItems.length > 0 && (
                                                <div className="mb-3">
                                                    <b>{cartItems[0].pharmacist_name}</b> <br />
                                                    <small>{cartItems[0].pharmacist_address}</small>
                                                </div>
                                            )}

                                            <div className="row row-gap-3">
                                                <div className="col-md-6 col-lg-5 col-xl-4">
                                                    <div className="d-flex gap-2">
                                                        <div className="iconSpc_tp">
                                                            <i className="textsm-icon cb-icon cb-clock text-black"></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="text-black mb-1">Pickup Information</div>
                                                            <ul className="mb-0 f-size-14 d-flex flex-column row-gap-1 list_align_L">
                                                                <li>Same-day pickup if prescription & payment are received before 1:00 PM</li>
                                                                <li>Next working day pickup if received after 1:00 PM</li>
                                                                <li>Pharmacy consultation available</li>
                                                                <li>No delivery charges</li>
                                                                <li>ID verification required</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-lg-5 col-xl-4">
                                                    <div className="col-12 mt-2">
                                                        <div className="text-black mb-1">Opening Hours</div>
                                                        <ul className="mb-0 f-size-14 list_align_L">
                                                            <li>Mon – 08:30 – 18:30</li>
                                                            <li>Tue – 08:30 – 18:30</li>
                                                            <li>Wed – 08:30 – 18:30</li>
                                                            <li>Thu – 08:30 – 18:30</li>
                                                            <li>Fri – 08:30 – 18:30</li>
                                                            <li>Sat – 08:30 – 13:00</li>
                                                            <li>Sun – Closed</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-lg-5 col-xl-4">
                                                    <div className="text-black mb-1">Cost</div>
                                                    <div className="clr-green">Free</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="text-center mt-4">
                                    <button className="btn cb_cmnBtn px-4">Continue with Pickup</button>
                                </div> */}
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4" onClick={goPrev}>Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto" onClick={handleNextClick}>Continue with Pickup</button>
                            </div>
                        </div>
                    )}
                    {/* {step === 5 && (
                        <div className={`tab-pane fade ${step === 5 ? "show active" : ""}`}  role="tabpanel">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">

                                <div className="text-center mb-4 pb-3">
                                    <div className="mb-3"><i className="lg-iconform cb-icon cb-circle-close clr-red"></i></div>
                                    <div className="f-size-28 clr-red f-w-M line_H_1_2 mb-1">Prescription Requires Review</div>
                                    <div>Our doctor needs additional information before approving your prescription.</div>
                                </div>

                                <div className="cb_cardStyle_1 cardRed spc-sm">
                                    <div className="f-w-SB f-size-18 clr-darkred line_H_1_3 mb-2">Reason for Review:</div>
                                    <div className="f-size-18 clr-red">Insufficient medical history provided</div>
                                </div>

                                <div className="text-center mt-4">
                                    <span className="alerterror_Msg_cst text-black">
                                        <i className="icon cb-icon cb-circle-close"></i>
                                        Requires Additional Information
                                    </span>
                                </div>

                                <div className="mt-4 pt-2">
                                    <div className="text-center mb-3">Please contact our support team or schedule a consultation to provide additional information.</div>
                                    <div className="d-flex justify-content-center gap-2 gap-sm-3 flex-wrap">
                                        <button className="btn cb_cmnBtn btn-o px-sm-4">Contact Support</button>
                                        <button className="btn cb_cmnBtn btn-o px-sm-4">Schedule Consultation</button>
                                    </div>
                                </div>




                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4">Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto">Next</button>
                            </div>
                        </div>

                    )}  */}
                    {step === 5 && (
                        <div className={`tab-pane fade ${step === 5 ? "show active" : ""}`} id="tab_step_5">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">
                                <div className="mb-4 pb-lg-2">
                                    <div className="text-black f-size-20 line_H_1_2">Order Summary</div>
                                    <div>Review your order details before placing</div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm">
                                    <div className="cb_cardStyle_1 spc-sm">
                                        <div className="text-black line_H_1_3 mb-4">
                                            <i className="textsm-icon cb-icon cb-circle-tick me-1"></i> Product Information
                                        </div>

                                        {/* Pharmacy Info - from first item */}
                                        {cartItems.length > 0 && (
                                            <div className="mb-3">
                                                <b>Pharmacy:</b> {cartItems[0].pharmacist_name} <br />
                                                <small>{cartItems[0].pharmacist_address}</small>
                                            </div>
                                        )}

                                        {/* Products List */}
                                        <div className="row row-gap-2 mb-3">
                                            {cartItems.map((item) => (
                                                <div className="col-md-12" key={item.cart_item_id}>
                                                    <div className="border rounded p-2 mb-2">
                                                        <span className="text-black">{item.product_name}</span> <br />
                                                        <small>Medical Cannabis Product</small> <br />
                                                        <small className="text-muted">
                                                            {item.weight} {item.weight_unit} — €{Number(item.inventory_price).toFixed(2)}
                                                        </small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>



                                        <div className="text-end">
                                            <span className="cb_cstLabel_3">Prescription Required</span> <br />
                                            <span className="fw-bold">
                                                Total: €{Number(total || 0).toFixed(2)}
                                            </span>

                                        </div>
                                    </div>



                                </div>

                                <div className="cb_cardStyle_1 spc-sm">
                                    <div className="text-black line_H_1_3 mb-4">
                                        <i className="textsm-icon cb-icon cb-circle-tick me-1"></i> Prescription
                                    </div>

                                    {/* Prescription Section */}
                                    <div className="border rounded p-2 mb-3">
                                        <span className="text-black">Prescription (online service)</span> <br />
                                        <small className="text-muted">€14.20</small>
                                        <div className="mt-2">

                                        </div>

                                        <div className="mt-2">
                                            <b>Diagnose:</b>{" "}
                                            {questionsans

                                                .filter((res) => res.id === 1) // pick the correct question (e.g., Diagnose)
                                                .map((res) => res.answer)
                                                .join(", ")}
                                        </div>

                                    </div>

                                    {/* Video Consultation Section
      <div className="border rounded p-2">
        <span className="text-black">Guaranteed video consultation with a specialist doctor</span> <br />
        <small className="text-muted">€39.00</small>
        <div className="mt-2">
        
        </div>
    
          <div className="mt-2">
            <small>
              A video call is not always required to issue a prescription. The treating doctor decides whether a video
              call is required in a specific individual case. However, if you want to have a guaranteed video call
              regardless of the doctor's individual decision, you can book it for an additional charge.
            </small>
          </div>
    
      </div> */}
                                </div>


                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-user me-1"></i> Patient Information</div>
                                    <div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Name: </span>{formData.patientInfo.firstName} {formData.patientInfo.lastName}</li>
                                            <li><span className="text-black">Email: </span> {formData.patientInfo.email}</li>
                                            <li><span className="text-black">Phone: </span> {formData.patientInfo.phone}</li>
                                            <li><span className="text-black">Date of Birth: </span>{formData.patientInfo.dob}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-file me-1"></i> Prescription Details</div>
                                    <div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Type: </span> Uploaded </li>
                                            {/* <li><span className="text-black">Prescription : </span>   {formData.prescriptionImg ? formData.prescriptionImg.name : "Not uploaded"}

                                            </li> */}
                                            <li>
                                                <span className="text-black">Legal Document: </span>
                                                {formData.legalDocImg ? formData.legalDocImg.name : "Not uploaded"}
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    {formData.deliveryMethod === "homeDelivery" && (
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <div className="cb_cardStyle_1 spc-sm mt-4">
                                                <li>
                                                    <div className="text-black line_H_1_3 mb-4">
                                                        <i className="textsm-icon cb-icon cb-file me-1"></i> Delivery Method
                                                    </div>
                                                    Home Delivery
                                                </li>



                                                <div className="text-black line_H_1_3 mb-4 mt-4">
                                                    Address Information
                                                </div>
                                                <div>
                                                    <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                                        <li>
                                                            {`${formData.patientInfo.addressline1}, ${formData.patientInfo.city}, ${formData.patientInfo.postalCode}, ${formData.patientInfo.country}`}

                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </ul>
                                    )}

                                    {formData.deliveryMethod === "pharmacyPickup" && (
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <div className="cb_cardStyle_1 spc-sm mt-4">
                                                <div className="text-black line_H_1_3 mb-4">
                                                    <i className="textsm-icon cb-icon cb-file me-1"></i> Delivery Method
                                                </div>

                                                <li>Pharmacy Pickup</li>


                                                {cartItems.length > 0 && (
                                                    <li>
                                                        <b>{cartItems[0].pharmacist_name}</b> <br />
                                                        <small>{cartItems[0].pharmacist_address}</small>
                                                    </li>
                                                )}
                                            </div>
                                        </ul>
                                    )}
                                </div>


                                <div className="cb_cardStyle_1 cardYellow spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-file me-1"></i> Payment Information</div>
                                    <div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Payment Method: </span> Offline Payment</li>
                                            <li>Our pharmacist will contact you within 24 hours to arrange payment and finalize your order.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 cardBlue spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4">Important</div>
                                    <div>
                                        <ul className="list_align_L d-flex flex-column row-gap-1 text-black">
                                            <li>A licensed pharmacist will review your prescription</li>
                                            <li>You will be contacted within 24 hours</li>
                                            <li>Payment will be processed offline</li>
                                            <li>Valid ID required for delivery/pickup</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4" onClick={goPrev}>Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto" onClick={handleSubmit}>Place Order</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Onlineprescription;