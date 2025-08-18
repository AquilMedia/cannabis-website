import React from 'react';

const Contact: React.FC = () => {
    return (
        <>
            <div
				className="inner_sec_banner position-relative"
				style={{
					backgroundImage: `url("assets/images/listing-banner.jpg")`,
				}}
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="innerBanner_cont text-center position-relative">
								<div className="filterIcon text-white mb__25 f-size-60 line_H_1"> <i className="cb-icon cb-filter"></i> </div>
								<div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up"> Contact Us </div>
								<div className="txtSummary f-size-18 text-white" data-aos="fade-up"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </div>
							</div>
						</div>
					</div>
				</div>
			</div>

            <div className="secWrap">
                <div className="container">
                    <div className="row row-gap-3">
                        <div className="col-md-12 col-lg-7">
                            <div className='cb_cardStyle_1' data-aos="fade-up">
                                <div className="mb__25">
                                    <div className="text-black f-size-22 f-w-SB">Get In Touch</div>
                                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi?</div>
                                </div>
                                <form action="">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="fname">First Name</label>
                                                <input type="text" id="fname" className="form-control form-control cst-form-f" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="lname">Last Name</label>
                                                <input type="text" id="lname" className="form-control form-control cst-form-f" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type="number" id="phone" className="form-control form-control cst-form-f" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <input type="email" id="email" className="form-control form-control cst-form-f" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="message">Message</label>
                                                <textarea id="message" rows={3} className="form-control form-control cst-form-f"> </textarea>
                                            </div>
                                        </div>
                                    </div>
                                     <div><button type="submit" className="btn cb_cmnBtn">Send Message</button></div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div className='cb_cardStyle_1 h-100' data-aos="fade-up">
                                <div className="mb__25">
                                    <div className="text-black f-size-22 f-w-SB">Contact Information</div>
                                    <div>Lorem ipsum dolor sit </div>
                                </div>

                                <ul className='list-unstyled mb-0 d-flex flex-column row-gap-4'>
                                    <li className='contactInfo d-flex align-items-start gap-3'>
                                        <div className='conInfoIcon'><span className="cb-icon cb-phone"></span></div>
                                        <div>
                                            <div className="f-w-SB text-black line_H_1_2">Phone</div>
                                            <div className="">+49 123 456 789</div>
                                        </div>
                                    </li>
                                    <li className='contactInfo d-flex align-items-start gap-3'>
                                        <div className='conInfoIcon'><span className="cb-icon cb-message"></span></div>
                                        <div>
                                            <div className="f-w-SB text-black line_H_1_2">Email</div>
                                            <div className="">info@digitalclinic.de</div>
                                        </div>
                                    </li>
                                    <li className='contactInfo d-flex align-items-start gap-3'>
                                        <div className='conInfoIcon'><span className="cb-icon cb-location"></span></div>
                                        <div>
                                            <div className="f-w-SB text-black line_H_1_2">Address</div>
                                            <div className="">Musterstraße 123 <br /> 10115 Berlin, Germany</div>
                                        </div>
                                    </li>
                                    <li className='contactInfo d-flex align-items-start gap-3'>
                                        <div className='conInfoIcon'><span className="cb-icon cb-clock"></span></div>
                                        <div>
                                            <div className="f-w-SB text-black line_H_1_2">Business Hours</div>
                                            <div>Mon-Fri: 8:00 AM - 6:00 PM <br /> Sat: 9:00 AM - 2:00 PM <br /> Sun: Emergency only</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;