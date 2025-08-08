import Link from 'next/link';
import React from 'react';

const Productdetails: React.FC = () => {
    return (
        <div className="secWrap pt-3">
            <div className="container">
                <div className="mb-3">
                    <Link href="/" className="btn cb_linkBtn"><i className="cb-icon cb-arrow-left"></i> Back to Products</Link>

                </div>
                <div className="mb-4 pb-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="cb_prodDtl_img overflow-hidden">
                                <img src="/assets/images/prod-detail.jpg" className="w-100" alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex gap-2 flex-wrap mb-3">
                                <span className="cb_cstLabel fill">Hybrid</span>
                                <span className="cb_cstLabel">THC 25%</span>
                                <span className="cb_cstLabel">CBD 1%</span>
                            </div>
                            <h2 className="text-black cb_prod_title f-w-SB mb-0">Big Purple Dragon</h2>
                            <div className="f-size-18">Remexian 25/1 BPD</div>
                            <div className="mt-2 cb_prod_price f-w-M clr-green">€6.67 / g</div>

                            <div className="mt-3 pb-3">
                                <h5 className="f-size-18 f-w-M clr-green mb-2 pb-1">Product Description</h5>
                                <div>Remexian 25/1 BPD is a Hybrid flower of the strain Big Purple Dragon with a THC level of 25% and a CBD level of 1%. The main terpenes are Limonen, Caryophyllen, Guaiol, Beta-Myrcen.</div>
                            </div>

                            <div className="mt-3 pb-1">
                                <h5 className="f-size-18 f-w-M clr-green mb-2">Complaints</h5>
                                <div className="row g-0">
                                    <div className="col-xl-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div>Inflammations</div>
                                                <div className="text-black">4/4</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div>Stress</div>
                                                <div className="text-black">3/4</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div>Anxiety</div>
                                                <div className="text-black">2/4</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 pb-1">
                                <h5 className="f-size-18 f-w-M clr-green mb-2">Effects</h5>
                                <div className="row g-0">
                                    <div className="col-xl-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div>Anti-inflammatory</div>
                                                <div className="text-black">4/4</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div>Antibacterial</div>
                                                <div className="text-black">2/4</div>
                                            </div>
                                            <div className="col-md-4">
                                                <div>Antioxidant</div>
                                                <div className="text-black">2/4</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 pb-1">
                                <div className="cb_border_1 rounded-3 d-flex gap-3 cb_card_PrescriptionInfo">
                                    <i className="cb-icon cb-security text-black f-size-22 mt-1"></i>
                                    <div className="flex-grow-1">
                                        <div className="f-size-16 text-black">Prescription Required</div>
                                        <div>This product requires a valid prescription. Maximum 100g/100ml per order as per German law.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 d-flex gap-3">

                                <button className="btn cb_cmnBtn flex-grow-1"><i className="cb-icon cb-cart"></i> Add to Cart</button>
                                <button className="btn cb_cmnBtn btn-o flex-grow-1"><i className="cb-icon cb-cart"></i> Buy from Pharmacy</button>

                            </div>




                        </div>

                    </div>
                </div>


                <div className="mb-5">
                    <div className="cb_tabsWrapp mb__30">
                        <ul className="nav cb_cstTab">
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_1" className="nav-link active">Limonen</button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_2" className="nav-link ">Caryophyllen </button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_3" className="nav-link ">Guaiol </button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_4" className="nav-link ">Beta-Myrcen </button> </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab_1" role="tabpanel">
                            <div className="eb_cardStyle_1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Effects:</strong>
                                             Mood-enhancing, Stress relieving, Anti-inflammatory, Antibacterial, Antioxidant
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Flavors:</strong>
                                             Sweet, Lemony
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Complaints:</strong>
                                             Depression, Stress, Inflammations
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_2" role="tabpanel">
                            <div className="eb_cardStyle_1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Effects:</strong>
                                             Mood-enhancing, Stress relieving, Anti-inflammatory, Antibacterial, Antioxidant
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Flavors:</strong>
                                             Sweet, Lemony
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Complaints:</strong>
                                             Depression, Stress, Inflammations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_3" role="tabpanel">
                            <div className="eb_cardStyle_1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Effects:</strong>
                                             Mood-enhancing, Stress relieving, Anti-inflammatory, Antibacterial, Antioxidant
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Flavors:</strong>
                                             Sweet, Lemony
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Complaints:</strong>
                                             Depression, Stress, Inflammations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_4" role="tabpanel">
                            <div className="eb_cardStyle_1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Effects:</strong>
                                             Mood-enhancing, Stress relieving, Anti-inflammatory, Antibacterial, Antioxidant
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Flavors:</strong>
                                             Sweet, Lemony
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Complaints:</strong>
                                             Depression, Stress, Inflammations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="f-size-34 f-w-B text-black mb-4">Latest Health Insights</h4>
                </div>

                <div className="mt-4 pt-3">
                    <div className="cb_border_1 rounded-3 p-4">
                        <div className="flex-grow-1">
                            <h5 className="f-w-SB f-size-24 text-black mb-1">Need Help?</h5>
                            <div className="f-size-14">Our team is available to assist with product selection and prescription guidance.</div>
                            <div className="mt-2">
                                <button className="btn cb_cmnBtn btn-o flex-grow-1"><i className="cb-icon cb-phone"></i> Contact Support</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>




        </div>
    );
};

export default Productdetails;