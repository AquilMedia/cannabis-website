import React, { useState } from 'react';
import { useRouter } from "next/navigation";
const Consultation: React.FC = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const handleCheckout = async () => {
        router.push("/uploadprescription");
    };

    return (
        <div className="secWrap tp-md cb_innerPg_wrp">
            <div className="container">
                <h1 className="f-w-M text-center f-size-24 mb-4 pb-1 text-black">Prescription for Big Purple Dragon</h1>

                <div className="text-center mb-4 pb-md-3">
                    <h4 className="text-black f-size-18 f-w-N">Choose Prescription Method</h4>
                    <div>Select how you would like to provide your prescription</div>
                </div>

                <div className="row g-0 justify-content-center">
                    <div className="col-xl-9 col-lg-9">
                        <div className="row row-gap-4">
                            <div className="col-md-6 d-flex flex-column">
                                <div className="cb_chooseMethod_card text-center flex-grow-1 d-flex flex-column">
                                    <div className="flex-grow-1">
                                        <i className="icon d-inline-flex cb-icon cb-upload clr-green"></i>
                                        <div className="infoCont_wrap">
                                            <div className="text-black f-size-18 line_H_1_3 mb-1">Upload Prescription</div>
                                            <div>Patient Satisfaction Rate</div>
                                        </div>
                                    </div>
                                    <div className="btn_wrapper">
                                        <button onClick={handleCheckout} className="btn cb_cmnBtn px-4">Upload Prescription</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex flex-column">
                                <div className="cb_chooseMethod_card text-center flex-grow-1 d-flex flex-column">
                                    <div className="flex-grow-1">
                                        <i className="icon d-inline-flex cb-icon cb-notepad clr-green"></i>
                                        <div className="infoCont_wrap">
                                            <div className="text-black f-size-18 line_H_1_3 mb-1">Create Online Prescription</div>
                                            <div>Complete a medical questionnaire for online consultation</div>
                                        </div>
                                    </div>
                                    <div className="btn_wrapper">
                                        <button data-bs-toggle="modal"  data-bs-target="#doctorConsultModal" onClick={() => setShowModal(true)} className="btn cb_cmnBtn px-4">Create Online Prescription</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div
                className={`modal fade cb_cstModal ${showModal ? "show d-block" : ""}`}
                id="doctorConsultModal"
                tabIndex={-1}
                role="dialog"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0 pb-1">
                            <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                                <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0">
                                    Choose Consultation Method
                                </h5>
                              <button
                                                type="button"
                                                className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                                                    onClick={() => setShowModal(false)}

                                            ></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row g-4 text-center">
                                <div className="col-md-6">
                                    <div className="cb_chooseMethod_card text-center d-flex flex-column h-100">
                                        <div className="flex-grow-1">

                                            <div className="infoCont_wrap mt-2">
                                                <h5 className="text-black f-size-18 line_H_1_3 mb-1">
                                                    Text-Based Prescription
                                                </h5>
                                                <p className="mb-2">Fill out a form to create an online prescription.</p>
                                            </div>
                                        </div>
                                        <div className="btn_wrapper mt-3">
                                            <button
                                            data-bs-dismiss="modal"
                                                className="btn cb_cmnBtn px-4"
                                                onClick={() => {
                                                    setShowModal(false);
                                                    router.push("/onlineprescription");
                                                }}
                                            >
                                                Start Questionnaire
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="cb_chooseMethod_card text-center d-flex flex-column h-100">
                                        <div className="flex-grow-1">

                                            <div className="infoCont_wrap mt-2">
                                                <h5 className="text-black f-size-18 line_H_1_3 mb-1">
                                                    Doctor Consultation
                                                </h5>
                                                <p className="mb-2">This feature is <strong>Coming Soon</strong> </p>
                                            </div>
                                        </div>
                                        <div className="btn_wrapper mt-3">
                                            <button
                                             aria-label="Close"
                                              data-bs-dismiss="modal"
                                                className="btn cb_cmnBtn px-4"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Consultation;