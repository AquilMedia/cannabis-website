import Loader from '@/components/common/Loader';
import { getFaqData } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Faq: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [faqData, setFaqData] = useState<any>(null);
    useEffect(() => {
        fetchFaqData();
        setLoading(true);
    }, []);
    const fetchFaqData = async () => {
        try {
            const response = await getFaqData();
            setFaqData(response)
        } catch (error: any) {
            toast.error(error.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
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
                                        <div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up"> Frequently Asked Questions </div>
                                        <div className="txtSummary f-size-18 text-white" data-aos="fade-up"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="secWrap">
                        <div className="container">

                            <div className="cb_cardStyle_1 mb__25" data-aos="fade-up">
                                <div className="mb__10">
                                    <div className="text-black f-size-22 f-w-SB"> <span className="cb-icon cb-question-mark clr-green"></span> General Questions </div>
                                </div>

                                {!loading && faqData && faqData.contents && (
                                    <div className="accordion cstAccordion" id="faq">
                                        {faqData.contents.map((item: any, index: number) => (
                                            <div className="accordion-item" key={item.id}>
                                                <h2 className="accordion-header" id={`heading-${item.id}`}>
                                                    <button
                                                        className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#collapse-${item.id}`}
                                                        aria-expanded={index === 0 ? 'true' : 'false'}
                                                        aria-controls={`collapse-${item.id}`}
                                                    >
                                                        {item.title}
                                                    </button>
                                                </h2>
                                                <div
                                                    id={`collapse-${item.id}`}
                                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                    data-bs-parent="#faq"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="last-p">
                                                            <p>{item.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </>
            )}
        </>

    );
};

export default Faq;