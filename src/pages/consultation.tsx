import React from 'react';
import { useRouter } from "next/navigation";
const Consultation: React.FC = () => {
           const router = useRouter();
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
                                            <button  onClick={handleCheckout} className="btn cb_cmnBtn px-4">Upload Prescription</button>
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
                                            <button className="btn cb_cmnBtn px-4">Start Questionnaire</button>
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