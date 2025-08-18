import Link from 'next/link';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
    const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
    return (
        <>
        <div className="secWrap tp-md bt-md">
            <div className="container">
                 <div className="mb__25">
                    <div className="text-black f-size-34 f-w-SB">Dashboard</div>
                    <div>Welcome back, Akshay!</div>
                </div>
                <div>
                    <div className="cb_tabsWrapp overflow-y-auto mb__30">
                        <ul className="nav cb_cstTab flex-nowrap">
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_1" className="nav-link text-nowrap active"><span className="cb-icon cb-user f-size-14"></span> Profile</button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_2" className="nav-link  text-nowrap"><span className="cb-icon cb-setting f-size-14"></span>Security </button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_3" className="nav-link  text-nowrap"><span className="cb-icon cb-bag-cart"></span> Orders </button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_4" className="nav-link  text-nowrap"><span className="cb-icon cb-file  f-size-14"></span> Invoices </button> </li>
                        </ul>
                    </div>
                     <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab_1" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                <div className="mb__25">
                                    <div className="text-black f-size-22 f-w-SB">Profile Details</div>
                                    <div>Update your personal information and contact details</div>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="fname">First Name</label>
                                                <input type="text" id="fname" className="form-control form-control cst-form-f" value={'Akshay'} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                             <div className="form-group">
                                                <label htmlFor="lname">Last Name</label>
                                                <input type="text" id="lname" className="form-control form-control cst-form-f" value={'Bhujbal'} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <label htmlFor="dob">Date of Birth</label>
                                                    <input type="date" id="dob" className="form-control cst-form-f" required value={'08/02/2025'} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" id="email" className="form-control form-control cst-form-f" value={'akshay.b@aquilmedia.in'} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type="number" id="phone" className="form-control form-control cst-form-f" value={'99559595559'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div><button type="submit" className="btn cb_cmnBtn">Update Profile</button></div>
                                </form>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_2" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                 <div className="mb__25">
                                    <div className="text-black f-size-22 f-w-SB">Change Password</div>
                                    <div>Update your password to keep your account secure</div>
                                </div>
                                 <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="currentPassword">Current Password</label>
                                            <div className="icon_field">
                                            <input
                                                type={showPassword.current ? "text" : "password"}
                                                id="currentPassword"
                                                className="form-control form-control cst-form-f"
                                            />
                                            <button
                                                type="button"
                                                className="btn p-0 border-0 fieldIcon"
                                                onClick={() => togglePassword("current")}
                                            >
                                                <i
                                                className={`cb-icon ${
                                                    showPassword.current ? "cb-show" : "cb-hide"
                                                }`}
                                                ></i>
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
                                                className="form-control form-control cst-form-f"
                                            />
                                            <button
                                                type="button"
                                                className="btn p-0 border-0 fieldIcon"
                                                onClick={() => togglePassword("new")}
                                            >
                                                <i
                                                className={`cb-icon ${
                                                    showPassword.new ? "cb-show" : "cb-hide"
                                                }`}
                                                ></i>
                                            </button>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm New Password</label>
                                            <div className="icon_field">
                                            <input
                                                type={showPassword.confirm ? "text" : "password"}
                                                id="confirmPassword"
                                                className="form-control form-control cst-form-f"
                                            />
                                            <button
                                                type="button"
                                                className="btn p-0 border-0 fieldIcon"
                                                onClick={() => togglePassword("confirm")}
                                            >
                                                <i
                                                className={`cb-icon ${
                                                    showPassword.confirm ? "cb-show" : "cb-hide"
                                                }`}
                                                ></i>
                                            </button>
                                            </div>
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

                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="mb-4 d-flex gap-3 flex-column flex-md-row align-items-start justify-content-between">
                                        <div className="d-flex gap-3 align-items-start">
                                            <div>
                                                <div className="text-black line_H_1_3 f-w-SB mb__5"> Invoice #INV-001</div>
                                                <div className="line_H_1_3"> 2024-01-15</div>
                                            </div>
                                            <span className="cb_cstLabel_3">Completed</span>
                                        </div>
                                        <div className="d-flex gap-3 align-items-start">
                                            <div className='text-md-end text-start'>
                                                <div className="text-black line_H_1_3 f-w-SB mb__5"> €89.90</div>
                                                <div className="line_H_1_3"> Prescription</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-end flex-wrap row-gap-3'>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Product: </span> Medical Cannabis Oil 10ml</li>
                                            <li><span className="text-black">Doctor: </span> Ravi Jordan</li>
                                            <li><span className="text-black">Prescription: </span> PR-12345</li>
                                        </ul>

                                        <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100" data-bs-toggle="modal" data-bs-target="#orderHistory"><span className="cb-icon cb-show"></span> View Details</button>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="mb-4 d-flex gap-3 flex-column flex-md-row align-items-start justify-content-between">
                                        <div className="d-flex gap-3 align-items-start">
                                            <div>
                                                <div className="text-black line_H_1_3 f-w-SB mb__5"> Order #ORD-001</div>
                                                <div className="line_H_1_3"> 2024-01-15</div>
                                            </div>
                                            <span className="cb_cstLabel_3 lab-orange">Ongoing</span>
                                        </div>
                                        <div className="d-flex gap-3 align-items-start">
                                            <div className='text-md-end text-start'>
                                                <div className="text-black line_H_1_3 f-w-SB mb__5"> €89.90</div>
                                                <div className="line_H_1_3"> Prescription</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-end flex-wrap row-gap-3'>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Product: </span> Medical Cannabis Oil 10ml</li>
                                            <li><span className="text-black">Doctor: </span> Ravi Jordan</li>
                                            <li><span className="text-black">Prescription: </span> PR-12345</li>
                                        </ul>

                                        <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100" data-bs-toggle="modal" data-bs-target="#orderHistory"><span className="cb-icon cb-show"></span> View Details</button>
                                    </div>
                                </div>
                                <div className="cb_cardStyle_1 spc-sm mt-4">
                                    <div className="mb-4 d-flex gap-3 flex-column flex-md-row align-items-start justify-content-between">
                                        <div className="d-flex gap-3 align-items-start">
                                            <div>
                                                <div className="text-black line_H_1_3 f-w-SB mb__5"> Order #ORD-001</div>
                                                <div className="line_H_1_3"> 2024-01-15</div>
                                            </div>
                                            <span className="cb_cstLabel_3 lab-red">Failed</span>
                                        </div>
                                        <div className="d-flex gap-3 align-items-start">
                                            <div className='text-md-end text-start'>
                                                <div className="text-black line_H_1_3 f-w-SB mb__5"> €89.90</div>
                                                <div className="line_H_1_3"> Prescription</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-end flex-wrap row-gap-3'>
                                        <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                            <li><span className="text-black">Product: </span> Medical Cannabis Oil 10ml</li>
                                            <li><span className="text-black">Doctor: </span> Ravi Jordan</li>
                                            <li><span className="text-black">Prescription: </span> PR-12345</li>
                                        </ul>

                                        <div className='d-flex gap-3 flex-wrap ord-BtnfullW'>
                                            <button className="btn cb_cmnBtn btn-o px-sm-4 mob-w100 flex-grow-1 flex-md-grow-0" data-bs-toggle="modal" data-bs-target="#orderHistory"><span className="cb-icon cb-show"></span> View Details</button>
                                            <button className="btn cb_cmnBtn px-sm-4 mob-w100 flex-grow-1 flex-md-grow-0">Retry Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_4" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                <div className="mb__25">
                                    <div className="text-black f-size-22 f-w-SB">Invoices</div>
                                    <div>Download and manage your invoices</div>
                                </div>

                                <div className="cb_cardStyle_1 spc-sm mt-4">
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
                                </div>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


       {/* Modal */}
        <div className="modal fade cb_cstModal " id="orderHistory">
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header border-bottom-0 pb-1">
                <div className="flex-grow-1">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="d-flex gap-3 flex-grow-1 align-items-center mb__5">
                            <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0">Order Details - ORD-001</h5>
                            <span className="cb_cstLabel_3">Completed</span>
                        </div>
                        <button type="button" className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="line_H_1_3 primary-clr">Complete information about your order</div>
                </div>
            </div>
            <div className="modal-body">
                <div className="sepLine mb-3 pb-3">
                    <div className="row row-gap-3">
                        <div className="col-md-6">
                            <div className="text-black line_H_1_3 f-w-SB mb__5">Order Information</div>
                            <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                <li><span className="text-black">Order ID: </span> <span className='primary-clr'>ORD-001</span></li>
                                <li><span className="text-black">Date: </span> <span className='primary-clr'>2024-01-15</span></li>
                                <li><span className="text-black">Type: </span> <span className='primary-clr'>Prescription</span></li>
                                <li><span className="text-black">Total: </span> <span className='primary-clr'>€89.90</span></li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div className="text-black line_H_1_3 f-w-SB mb__5">Medical Information</div>
                            <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                                <li><span className="text-black">Product: </span> <span className='primary-clr'>Medical Cannabis Oil 10ml</span></li>
                                <li><span className="text-black">Prescribing Doctor: </span> <span className='primary-clr'>Ravi Jordan</span></li>
                                <li><span className="text-black">Prescription ID: </span> <span className='primary-clr'>PR-12345</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-black line_H_1_3 f-w-SB mb__5">Delivery Information</div>
                    <ul className="list-unstyled m-0 d-flex flex-column row-gap-1">
                        <li><span className="text-black">Address: </span> <span className='primary-clr'>Unter den Linden 1, Berlin 10117</span></li>
                        <li><span className="text-black">Phone: </span> <span className='primary-clr'>+49 123 456 789</span></li>
                        <li><span className="text-black">Email: </span> <span className='primary-clr'>akshay.b@aquilmedia.in</span></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        </div>

       {/* Modal 2*/}
        <div className="modal fade cb_cstModal " id="invoices">
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
        </div>
        </>
    );
};

export default Dashboard;