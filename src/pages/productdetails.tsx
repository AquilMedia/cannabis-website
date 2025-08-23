import Slider from 'react-slick';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { getProductsDetails } from '@/services/user';
import { toast } from 'react-toastify';
import PharmacistSelector from '@/components/PharmacistSelector';
import LoginModal from '@/Modals/LoginModal';
import { useAuth } from '@/context/AuthContext';
const Productdetails: React.FC = () => {
    const { user } = useAuth();

    const pharmacistSelectorRef = useRef<any>(null);
    const handleAddToCart = (prductDetails: any, quantity: any) => {
        if (!user?.token) {
            setShowLogin(true);
            return;
        }
        console.log(prductDetails);

        pharmacistSelectorRef.current.openSelector(prductDetails, quantity);
    };

    const { id } = useRouter().query;
    const [prductDetails, setPrductDetails] = useState<any>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null);

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPharmacyId(event.target.value);
    };

    const testimonialCarousel = {
        slidesToShow: 3,
        infinite: false,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            }
        ],
    };

    const [quantity, setQuantity] = useState<string>("1");

    const parseQuantity = (value: string) => {
        const number = parseFloat(value);
        return isNaN(number) ? 0 : number;
    };

    const increaseQty = () => {
        const current = parseQuantity(quantity);
        const newQty = current + 1;
        setQuantity(newQty.toString());
    };
    const decreaseQty = () => {
        const current = parseQuantity(quantity);
        const newQty = current > 1 ? current - 1 : 1;
        setQuantity(newQty.toString());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };


    const fetchProductsDetails = async () => {
        try {
            const response = await getProductsDetails(id);
            console.log(response);
            setPrductDetails(response.data || [])
        } catch (error: any) {
            toast.error(error.message || 'Failed to load products');
        }
    };

    useEffect(() => {
        fetchProductsDetails();
    }, [id]);

    return (
        <div className="secWrap pt-3">
            <PharmacistSelector ref={pharmacistSelectorRef} />
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

            <div className="container">
                <div className="mb-3" data-aos="fade-up">
                    <Link href="/shop" className="btn cb_linkBtn"><i className="cb-icon cb-arrow-left"></i> Back to Products</Link>

                </div>
                <div className="mb-4 pb-4">
                    <div className="row row-gap-4">
                        <div className="col-lg-6">
                            <div className="cb_prodDtl_img overflow-hidden" data-aos="fade-up">
                                <img src={`${prductDetails?.image}`} className="w-100" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "assets/images/dummy-product.jpg"}} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex gap-2 flex-wrap mb-3" data-aos="fade-up">
                                <span className="cb_cstLabel fill">{prductDetails?.genetic?.title}</span>
                                <span className="cb_cstLabel">THC {prductDetails?.thc}%</span>
                                <span className="cb_cstLabel">CBD {prductDetails?.cbd}%</span>
                            </div>
                            <h2 className="text-black cb_prod_title f-w-SB mb-0" data-aos="fade-up">{prductDetails?.name}</h2>
                            <div className="f-size-18" data-aos="fade-up">{prductDetails?.subtitle}</div>
                            {prductDetails?.inventory?.[0] && (
                                <div
                                    className="mt-1 cb_prod_price f-w-M clr-green"
                                    data-aos="fade-up"
                                >
                                    €{prductDetails.inventory[0].price} / {prductDetails.inventory[0].weight_unit}
                                </div>
                            )}
                            <div className="mt-3 pb-3" data-aos="fade-up">
                                <h5 className="f-size-18 f-w-M clr-green mb-2 pb-1">Product Description</h5>
                                <div>{prductDetails?.description}</div>
                            </div>

                            {/* <div className="mt-3 pb-1" data-aos="fade-up">
                                <h5 className="f-size-18 f-w-M clr-green mb-2">Complaints</h5>
                                <div className="row g-0">
                                    <div className="col-md-10 col-lg-12 col-xl-9">
                                        <div className="row row-gap-3">
                                           
                                            <div className="row row-gap-3">
                                                {prductDetails?.complaints?.map((item: any, index: number) => {
                                                    const [title, count] = Object.entries(item)[0] as [string, any];
                                                    return (
                                                        <div key={index} className="col-6 col-sm-4">
                                                            <div>{title}</div>
                                                            <div className="text-black">{count}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="mt-3 pb-1" data-aos="fade-up">
                                <h5 className="f-size-18 f-w-M clr-green mb-2">Effects</h5>
                                <div className="row g-0">
                                    <div className="col-md-10 col-lg-12 col-xl-9">
                                        <div className="row row-gap-3">
                                         
                                            {prductDetails?.effects?.map((item: any, index: number) => {
                                                const [title, count] = Object.entries(item)[0] as [string, any];
                                                return (
                                                    <div key={index} className="col-6 col-sm-4">
                                                        <div>{title}</div>
                                                        <div className="text-black">{count}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="mt-3 pb-1" data-aos="fade-up">
                                <div className="cb_border_1 rounded-3 d-flex gap-3 cb_card_PrescriptionInfo">
                                    <i className="cb-icon cb-security text-black f-size-22 mt-1"></i>
                                    <div className="flex-grow-1">
                                        <div className="f-size-16 text-black">Prescription Required</div>
                                        <div>This product requires a valid prescription. Maximum 100g/100ml per order as per German law.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 d-flex flex-wrap gap-3" data-aos="fade-up">
                                <div className="cb_qty_selector field-w">
                                    <button className='btn decreaseQty' onClick={decreaseQty}>
                                        <i className="cb-icon cb-minus"></i>
                                    </button>
                                    {prductDetails?.inventory?.[0] && (
                                        <input
                                            type="text"
                                            className="form-control qtyValue"
                                            value={`${quantity} / ${prductDetails.inventory[0].weight_unit}`}
                                            onChange={handleChange}
                                            readOnly
                                        />
                                    )}
                                    <button className='btn increaseQty' onClick={increaseQty} >
                                        <i className="cb-icon cb-plus"></i>
                                    </button>
                                </div>

                                {prductDetails && (
                                    <button onClick={() => handleAddToCart(prductDetails, quantity)} className="btn cb_cmnBtn text-nowrap flex-grow-1">
                                        <i className="cb-icon cb-cart"></i> Add to Cart
                                    </button>
                                )}



                                {/* <button className="btn cb_cmnBtn btn-o flex-grow-1" data-bs-toggle="modal" data-bs-target="#modal-pharmacy"><i className="cb-icon cb-location"></i> Buy from Pharmacy</button> */}

                            </div>




                        </div>

                    </div>
                </div>


                <div className="mb-5" data-aos="fade-up">
                    <div className="cb_tabsWrapp overflow-y-auto mb__30">
                        <ul className="nav cb_cstTab flex-nowrap">
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_1" className="nav-link text-nowrap active">Effects</button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_2" className="nav-link  text-nowrap">Complaints </button> </li>
                            <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_3" className="nav-link  text-nowrap">Terpenes </button> </li>
                            {/* <li className="nav-item"> <button data-bs-toggle="tab" data-bs-target="#tab_4" className="nav-link  text-nowrap">Beta-Myrcen </button> </li> */}
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="tab_1" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                <div className="row">
                                    {!prductDetails?.effects || prductDetails.effects.length === 0 ? (
                                        <div className="col-12 text-center">
                                            <p className="f-size-18 clr-black mb-0">No Data found.</p>
                                        </div>
                                    ) : (
                                        prductDetails?.effects?.map((item: any, index: number) => {
                                            const [title, count] = Object.entries(item)[0] as [string, any];
                                            return (
                                                <div key={index} className="col-md-3">
                                                    <div><strong className="f-w-SB text-black">{title}:</strong> {count}</div>
                                                </div>
                                            );
                                        }))}
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_2" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                <div className="row row-gap-3">
                                    {!prductDetails?.complaints || prductDetails.complaints.length === 0 ? (
                                        <div className="col-12 text-center">
                                            <p className="f-size-18 clr-black mb-0">No Data found.</p>
                                        </div>
                                    ) : (
                                        prductDetails?.complaints?.map((item: any, index: number) => {
                                            const [title, count] = Object.entries(item)[0] as [string, any];
                                            return (
                                                <div key={index} className="col-md-3">
                                                    <div><strong className="f-w-SB text-black">{title}:</strong> {count}</div>
                                                </div>
                                            );
                                        }))}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab_3" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                <div className="row">
                                    {!prductDetails?.terpenes || prductDetails.terpenes.length === 0 ? (
                                        <div className="col-12 text-center">
                                            <p className="f-size-18 clr-black mb-0">No Data found.</p>
                                        </div>
                                    ) : (
                                        prductDetails?.terpenes?.map((item: any, index: number) => {
                                            const [title, count] = Object.entries(item)[0] as [string, any];
                                            return (
                                                <div key={index} className="col-md-3">
                                                    <div><strong className="f-w-SB text-black">{title}:</strong> {count}</div>
                                                </div>
                                            );
                                        }))}
                                </div>
                            </div>
                        </div>
                        {/* <div className="tab-pane fade" id="tab_4" role="tabpanel">
                            <div className="cb_cardStyle_1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Effects: </strong>
                                            Mood-enhancing, Stress relieving, Anti-inflammatory, Antibacterial, Antioxidant
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Flavors: </strong>
                                            Sweet, Lemony
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <strong className="f-w-SB text-black">Complaints: </strong>
                                            Depression, Stress, Inflammations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div>
                    <h4 className="f-size-34 f-w-B text-black mb-4" data-aos="fade-up">Latest Health Insights</h4>
                    <div className="row row-gap-4">
                        <div className="col-md-6 d-flex flex-column">
                            <div className="cb_post_card flex-grow-1" data-aos="fade-up">
                                <div className="headWrapper d-flex">
                                    <div className="iconbx">
                                        <i className="cb-icon cb-brain"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <span className="cb_cstLabel_2 mb-1">THC 25%</span>
                                        <div className="cb_post_title">
                                            <Link href="/" className="linkText text-black">Indica Strains Effective for Anxiety Relief</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="post_summary f-size-14">New research confirms indica varieties reduce anxiety symptoms by 70%</div>
                                <div className="bt_wrapp f-size-14 d-flex gap-2 justify-content-between">
                                    <div>5 min read</div>
                                    <div>
                                        <Link href="/" className="text-black">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column">
                            <div className="cb_post_card flex-grow-1" data-aos="fade-up">
                                <div className="headWrapper d-flex">
                                    <div className="iconbx">
                                        <i className="cb-icon cb-leaf"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <span className="cb_cstLabel_2 mb-1">Safety & Usage</span>
                                        <div className="cb_post_title">
                                            <Link href="/" className="linkText text-black">Vaporizing Cannabis Flowers Safer Than Smoking</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="post_summary f-size-14">Study shows vaporization preserves therapeutic compounds while reducing toxins</div>
                                <div className="bt_wrapp f-size-14 d-flex gap-2 justify-content-between">
                                    <div>3 min read</div>
                                    <div>
                                        <Link href="/" className="text-black">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-5 pt-4">
                    <div className="text-center mb-4" data-aos="fade-up">
                        <h4 className="f-size-34 f-w-B text-black mb-2">Patient Satisfaction</h4>
                        <div>Real experiences from our patients using medical cannabis</div>
                    </div>

                    <div className="row row-gap-3">
                        <div className="col-sm-6 col-md-4 d-flex flex-column">
                            <div className="cb_patientSatisfaction_card text-center flex-grow-1" data-aos="fade-up">
                                <div className="lg_text f-w-B clr-green">94%</div>
                                <div>Patient Satisfaction Rate</div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 d-flex flex-column">
                            <div className="cb_patientSatisfaction_card text-center flex-grow-1" data-aos="fade-up">
                                <div className="lg_text f-w-B clr-green">15,000+</div>
                                <div>Patients Treated</div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 d-flex flex-column">
                            <div className="cb_patientSatisfaction_card text-center flex-grow-1" data-aos="fade-up">
                                <div className="lg_text f-w-B clr-green">4.8/5</div>
                                <div>Average Rating</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3" data-aos="fade-up">
                        <Slider {...testimonialCarousel} className='cb_cstSlider arrow-sm-stl'>
                            <div>
                                <div className="cb_testimonialCard">
                                    <div className="wrap_head d-flex">
                                        <div className="pic_wrap"><i className="cb-icon cb-users"></i></div>
                                        <div className="flex-grow-1 align-self-center line_H_1_2">
                                            <div className="cont-head f-w-M text-black">Maria K.</div>
                                            <div className="cont-subText">Chronic Pain</div>
                                        </div>
                                    </div>
                                    <div className="cb_testimonialStars">
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                    </div>
                                    <div className="mt-1 testimonial_summary f-size-14">
                                        "Cannabis oil has changed my life. After years of prescription painkillers, I finally found natural relief that works."
                                    </div>
                                    <div className="bt_Info_row text-black f-size-14">
                                        Berlin, Germany
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="cb_testimonialCard">
                                    <div className="wrap_head d-flex">
                                        <div className="pic_wrap"><i className="cb-icon cb-users"></i></div>
                                        <div className="flex-grow-1 align-self-center line_H_1_2">
                                            <div className="cont-head f-w-M text-black">Maria K.</div>
                                            <div className="cont-subText">Chronic Pain</div>
                                        </div>
                                    </div>
                                    <div className="cb_testimonialStars">
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                    </div>
                                    <div className="mt-1 testimonial_summary f-size-14">
                                        "Cannabis oil has changed my life. After years of prescription painkillers, I finally found natural relief that works."
                                    </div>
                                    <div className="bt_Info_row text-black f-size-14">
                                        Berlin, Germany
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="cb_testimonialCard">
                                    <div className="wrap_head d-flex">
                                        <div className="pic_wrap"><i className="cb-icon cb-users"></i></div>
                                        <div className="flex-grow-1 align-self-center line_H_1_2">
                                            <div className="cont-head f-w-M text-black">Maria K.</div>
                                            <div className="cont-subText">Chronic Pain</div>
                                        </div>
                                    </div>
                                    <div className="cb_testimonialStars">
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                        <i className="cb-icon cb-star"></i>
                                    </div>
                                    <div className="mt-1 testimonial_summary f-size-14">
                                        "Cannabis oil has changed my life. After years of prescription painkillers, I finally found natural relief that works."
                                    </div>
                                    <div className="bt_Info_row text-black f-size-14">
                                        Berlin, Germany
                                    </div>
                                </div>
                            </div>
                        </Slider>


                    </div>
                </div>

                <div className="mt-4 pt-4">
                    <div className="cb_border_1 rounded-3 p-4 cb_cardHelp" data-aos="fade-up">
                        <div className="flex-grow-1">
                            <h5 className="f-w-SB f-size-24 text-black mb-1">Need Help?</h5>
                            <div className="f-size-14">Our team is available to assist with product selection and prescription guidance.</div>
                            <div className="mt-3">
                                <button className="btn cb_cmnBtn btn-o flex-grow-1"><i className="cb-icon cb-phone"></i> Contact Support</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade cb_cstModal" id="modal-pharmacy">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content primary-clr">
                        <div className="modal-header border-bottom-0 pb-1">
                            <div className="flex-grow-1">
                                <div className="d-flex gap-2 align-items-center">
                                    <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0 flex-grow-1">Select pharmacy</h5>
                                    <button type="button" className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="line_H_1_3">({prductDetails?.inventory?.filter((item: any) => item.status).length || 0}) pharmacies</div>
                            </div>

                        </div>
                        <div className="modal-body">
                            <div className="f-size-16 f-w-M clr-green mb-3">Top Pharmacies ({prductDetails?.inventory?.filter((item: any) => item.status).length || 0})</div>
                            <ul className="list-unstyled m-0 d-flex flex-column row-gap-3">
                                {prductDetails?.inventory?.map((item: any, index: number) => {
                                    const price = item.price;
                                    const pharmacist = item.pharmacist || {};
                                    const storeName = pharmacist.store_name || "Unknown Store";
                                    const address = pharmacist.address || "Address not available";
                                    return (
                                        <li key={index} className="cb_pharmaItem">
                                            <input className="d-none pharmaInput_item" type="radio" name="pharmacy" id={`pharmacy_${index}`} value={pharmacist.id} checked={selectedPharmacyId === pharmacist.id} onChange={handleChange2} />
                                            <label htmlFor={`pharmacy_${index}`} className="cb_pharmacyCard f-size-14 w-100">
                                                <div className="d-flex gap-2 mb-1 line_H_1_3">
                                                    <div className="flex-grow-1 f-size-16 f-w-M clr-green">{storeName}</div>
                                                    <div className="f-size-16 f-w-M clr-green text-nowrap">€{price} / g</div>
                                                </div>

                                                <div className="cb_iconInfo mb-1">
                                                    <div> <i className="icon cb-icon cb-location"></i></div>
                                                    {address}</div>

                                                <div className="d-flex flex-wrap gap-3 row-gap-2">
                                                    <div className="cb_iconInfo"><i className="icon cb-icon cb-truck"></i> Same day delivery</div>
                                                    <div className="cb_iconInfo"><i className="icon cb-icon cb-clock"></i> Consultation</div>
                                                </div>
                                            </label>
                                        </li>
                                    );
                                    // <li className="cb_pharmaItem">
                                    //     <input className="d-none pharmaInput_item" type="radio" name="pharmacy" id="pharmacy_2"/>
                                    //     <label htmlFor="pharmacy_2" className="cb_pharmacyCard f-size-14 w-100">
                                    //         <div className="d-flex gap-2 line_H_1_3 mb-1">
                                    //             <div className="flex-grow-1 f-size-16 f-w-M clr-green">Grafenberger-Apotheke</div>
                                    //             <div className="f-size-16 f-w-M clr-green text-nowrap">€7.75 / g</div>
                                    //         </div>

                                    //         <div className="cb_iconInfo mb-1">
                                    //             <div> <i className="icon cb-icon cb-location"></i></div> Grafenberger Allee 409, 40235 Düsseldorf</div>

                                    //         <div className="d-flex flex-wrap gap-3 row-gap-2">
                                    //             <div className="cb_iconInfo"><i className="icon cb-icon cb-truck"></i> Next day delivery</div>
                                    //             <div className="cb_iconInfo"><i className="icon cb-icon cb-clock"></i> Standard</div>
                                    //         </div>
                                    //     </label>
                                    // </li>
                                })}
                            </ul>
                        </div>
                        <div className="modal-footer justify-content-center border-top-0 pt-2 pb-4">
                            <button type="button" className="btn m-0 cb_cmnBtn">Select Pharmacy</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="mt-3">
                Selected Pharmacy ID: {selectedPharmacyId ?? "None"}
            </div> */}
        </div>
    );
};

export default Productdetails;