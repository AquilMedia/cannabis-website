import React from 'react';

const Faq: React.FC = () => {
    return (
        <>
        <div
            className="inner_sec_banner position-relative"
            style={{
              backgroundImage: `url("assets/images/listing-banner.jpg")`,
            }}
          >
            {/* {showLogin && <LoginModal onClose={() => setShowLogin(false)} />} */}
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="innerBanner_cont text-center position-relative">
                    <div className="filterIcon text-white mb__25 f-size-60 line_H_1"> <i className="cb-icon cb-filter"></i> </div>
                    <div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up"> Frequently Asked Questions </div>
                    <div className="txtSummary f-size-18 text-white" data-aos="fade-up"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div className="secWrap">
                <div className="container">
                    <div className="cb_cardStyle_1 mb__25"  data-aos="fade-up">
                        <div className="mb__10">
                            <div className="text-black f-size-22 f-w-SB"> <span className="cb-icon cb-question-mark clr-green"></span> General Questions</div>
                        </div>

                        <div className="accordion cstAccordion" id="faq">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-1">
                               Lorem ipsum dolor sit amet.
                            </button>
                            </h2>
                            <div id="faq-1" className="accordion-collapse collapse show" data-bs-parent="#faq">
                            <div className="accordion-body">
                                <div className="last-p">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ab quasi illo dolor tempora, ratione veritatis quas error veniam fuga harum, nobis est neque nam ducimus saepe in inventore consequatur esse. Odit, ut recusandae laborum commodi, quae hic magnam ex, deserunt suscipit odio harum non voluptatibus ratione molestiae eos repellendus.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-2">
                                Lorem ipsum dolor sit amet.
                            </button>
                            </h2>
                            <div id="faq-2" className="accordion-collapse collapse" data-bs-parent="#faq">
                            <div className="accordion-body">
                                <div className="last-p">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti facilis consectetur eius similique saepe quas repellat? Porro voluptatem corporis repellat!</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-3">
                                Lorem ipsum dolor sit amet.
                            </button>
                            </h2>
                            <div id="faq-3" className="accordion-collapse collapse" data-bs-parent="#faq">
                            <div className="accordion-body">
                                <div className="last-p">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, saepe sunt? Iste accusamus ad, veritatis repudiandae minus eaque tenetur quam.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="cb_cardStyle_1 mb__25"  data-aos="fade-up">
                        <div className="mb__10">
                            <div className="text-black f-size-22 f-w-SB"> <span className="cb-icon cb-upload clr-green"></span> Upload Existing Prescription</div>
                        </div>

                        <div className="accordion cstAccordion" id="faq-uplPre">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-4">
                               Lorem ipsum dolor sit amet.
                            </button>
                            </h2>
                            <div id="faq-4" className="accordion-collapse collapse show" data-bs-parent="#faq-uplPre">
                            <div className="accordion-body">
                                <div className="last-p">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ab quasi illo dolor tempora, ratione veritatis quas error veniam fuga harum, nobis est neque nam ducimus saepe in inventore consequatur esse. Odit, ut recusandae laborum commodi, quae hic magnam ex, deserunt suscipit odio harum non voluptatibus ratione molestiae eos repellendus.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-5">
                                Lorem ipsum dolor sit amet.
                            </button>
                            </h2>
                            <div id="faq-5" className="accordion-collapse collapse" data-bs-parent="#faq-uplPre">
                            <div className="accordion-body">
                                <div className="last-p">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti facilis consectetur eius similique saepe quas repellat? Porro voluptatem corporis repellat!</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-6">
                                Lorem ipsum dolor sit amet.
                            </button>
                            </h2>
                            <div id="faq-6" className="accordion-collapse collapse" data-bs-parent="#faq-uplPre">
                            <div className="accordion-body">
                                <div className="last-p">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, saepe sunt? Iste accusamus ad, veritatis repudiandae minus eaque tenetur quam.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Faq;