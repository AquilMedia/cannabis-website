import React, { useState } from 'react';
import Link from 'next/link';



const Onlineprescription: React.FC = () => {
    const [identificationFileName, setIdentificationFileName] = useState('Upload your ID document');

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
        ) => {
        const file = event.target.files?.[0];
        const inputId = event.target.id;

        if (inputId === 'uploadIdentification') {
            if (file) {
                setIdentificationFileName(file.name);
            } else {
                setIdentificationFileName('No File chosen');
            }
        }
    };

    return (
        <div className="secWrap tp-md cb_innerPg_wrp">
            <div className="container">
                    <h1 className="f-w-M text-center f-size-24 mb-4 pb-1 text-black">Prescription</h1>
                    <div className="text-center mb-4 pb-md-3">
                        <h4 className="text-black f-size-22 f-w-N mb-0">Online Prescription</h4>
                    </div>

                    <div className="cb_wrapSteps_tab overflow-y-auto">
                        <ul className="nav flex-nowrap cb_stepsTab">
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
                        </ul>
                    </div>

                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab_step_1" role="tabpanel">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">
                                <div className="mb-4 pb-lg-2">
                                    <div className="text-black f-size-20 line_H_1_2">Medical Questionnaire</div>
                                    <div>for Big Purple Dragon</div>
                                </div>

                                <div className="cb_cardStyle_1 spc-sm">
                                    <div className="text-black line_H_1_3 mb-4">Have you ordered the same product before?</div>
                                    <div className="">
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-3">
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="radio" name="sameProduct" /> Yes, I have used this product before</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="radio" name="sameProduct" /> No, this is my first time</label> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4">What medical complaints do you have?</div>
                                    <div className="row row-gap-2">
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Chronic Pain</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Anxiety</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Depression</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Insomnia</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Epilepsy</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Cancer Treatment Side Effects</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Multiple Sclerosis</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> PTSD</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Arthritis</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Migraine</label>
                                        </div>
                                        <div className="col-sm-6 col-lg-5 d-flex">
                                            <label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" /> Other</label>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-2">Anamnesis (Medical History)</div>
                                    <div>
                                       <textarea className="form-control cst-form-f resize-none" placeholder="Please describe your medical history, previous treatments, and current symptoms..." rows={3}></textarea>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-2">Expected Therapy Effects</div>
                                    <div>
                                       <textarea className="form-control cst-form-f resize-none" placeholder="What effects are you hoping to achieve with this treatment?" rows={3}></textarea>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-3">Exclusion Criteria <span className="f-f-size-14 primary-clr">(Please check any that apply to you:)</span> </div>
                                    <div className="">
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-2">
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Pregnancy</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Breastfeeding</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Severe Heart Condition</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Psychosis</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Substance Abuse History</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Allergy to Cannabis</label> </li>
                                            <li className="d-flex"><label className="d-flex gap-2"><input className="cb_input_rc" type="checkbox" />Under 18 years old</label> </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-2">Current Medications</div>
                                    <div>
                                       <textarea className="form-control cst-form-f resize-none" placeholder="Please list any medications you are currently taking..." rows={3}></textarea>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 cardYellow spc-sm mt-4">
                                    <div className="d-flex gap-2">
                                        <div className="iconSpc_tp">
                                            <i className="cb-icon cb-file text-black f-size-20"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="text-black mb-1">Important Medical Information:</div>
                                            <ul className="d-flex flex-column row-gap-1 list_align_L">
                                                <li>Cannabis may interact with other medications</li>
                                                <li>Do not drive or operate machinery while using this medication</li>
                                                <li>Keep away from children and pets</li>
                                                <li>Store in a cool, dry place</li>
                                                <li>Consult your doctor if you experience any adverse effects</li>
                                            </ul>

                                            <div>
                                                <label className="d-flex gap-2 f-w-SB"><input className="cb_input_rc" type="checkbox" />I have read and understood the above information</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button className="btn cb_cmnBtn px-4">Complete Questionnaire</button>
                                </div>
                                
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn px-4 ms-auto">Next</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_step_2" role="tabpanel">
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
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter First Name"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter Last Name"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter Email Address"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="number" className="form-control cst-form-f" placeholder="Enter Mobile Number"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="mm/dd/yyyy"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <h5 className="secondary-clr f-size-14 f-w-M mb-2">Address Information</h5>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter Street Address"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter City"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter Postal Code"></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control cst-form-f" placeholder="Enter Country"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4">Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto">Next</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_step_3" role="tabpanel">
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
                                            onChange={handleFileChange}
                                        />
                                        <label className="cb_uploadField_wrap" htmlFor="uploadIdentification">
                                            <span className="btn chooseBtn">Choose File</span>
                                            <span className="min-w-0">
                                            <span className="fileName">{identificationFileName}</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

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
                                
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4">Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto">Next</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_step_4" role="tabpanel">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">
                                <div className="mb-4 pb-lg-2">
                                    <div className="text-black f-size-20 line_H_1_2">Delivery Method</div>
                                    <div>Choose how you'd like to receive your medication</div>
                                </div>

                                <div className="cb_cardStyle_1 spc-sm">
                                    <div className="d-flex gap-3">
                                        <div className="iconSpc_tp">
                                            <input className="cb_input_rc" type="radio" name="deliveryMethod" />
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
                                            <input className="cb_input_rc" type="radio" name="deliveryMethod" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="mb-4">
                                                <div className="text-black line_H_1_3"><i className="textsm-icon cb-icon cb-location me-1"></i> Pharmacy Pickup</div>
                                                <div>Collect from nearest pharmacy</div>
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
                                                                <li>Same day availability</li>
                                                                <li>Pharmacy consultation</li>
                                                                <li>No delivery charges</li>
                                                                <li>ID verification required</li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-5 col-xl-4">
                                                    <div className="text-black mb-1">$ Cost</div>
                                                    <div className="clr-green">Free</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 d-flex justify-content-between gap-2">
                                <button className="btn cb_cmnBtn btn-o px-4">Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto">Next</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_step_5" role="tabpanel">
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
                        <div className="tab-pane fade" id="tab_step_6" role="tabpanel">
                            <div className="cb_cardStyle_1 cb_prescriptn_card">

                                <div className="text-center mb-4 pb-3">
                                    <div className="mb-3"><i className="lg-iconform cb-icon cb-circle-check clr-green"></i></div>
                                    <div className="f-size-28 clr-green f-w-M line_H_1_2 mb-1">Prescription Approved!</div>
                                    <div>Your prescription has been approved. Review your order details below.</div>
                                </div>

                                <div className="mb-4 pb-lg-2">
                                    <div className="text-black f-size-20 line_H_1_2">Order Summary</div>
                                    <div>Review your order details before placing</div>
                                </div>

                                <div className="cb_cardStyle_1 spc-sm">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-circle-tick me-1"></i> Product Information</div>
                                    <div className="row row-gap-2">
                                        <div className="col-md-8">
                                            <span className="text-black">Big Purple Dragon</span> <br />
                                            Medical Cannabis Product
                                        </div>
                                        <div className="col-md-4 align-self-end text-md-end">
                                            <span className="cb_cstLabel_3">Prescription Required</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-user me-1"></i> Patient Information</div>
                                    <div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Name: </span> Demo Demo</li>
                                            <li><span className="text-black">Email: </span> demo@gmail.com</li>
                                            <li><span className="text-black">Phone: </span> 9876543210</li>
                                            <li><span className="text-black">Date of Birth: </span> 1992-08-18</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-file me-1"></i> Prescription Details</div>
                                    <div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Type: </span> Uploaded Prescription</li>
                                            <li><span className="text-black">File: </span> sample.pdf</li>
                                            <li><span className="text-black">Legal Document: </span> sample.pdf</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="text-black line_H_1_3 mb-4"><i className="textsm-icon cb-icon cb-file me-1"></i> Delivery Method</div>
                                    <div>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Method: </span> Home Delivery</li>
                                            <li>2-3 business days delivery</li>
                                        </ul>
                                    </div>
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
                                <button className="btn cb_cmnBtn btn-o px-4">Previous</button>
                                <button className="btn cb_cmnBtn px-4 ms-auto">Place Order</button>
                            </div>
                        </div>
                    </div>
            </div>
      
        </div>
    );
};

export default Onlineprescription;