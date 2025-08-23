import Loader from '@/components/Loader';
import { getTermsData } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Terms: React.FC = () => {

      const [loading, setLoading] = useState(false);
        const [termsData, setTermsData] = useState<any>(null);
            const fetchPrivacyData = async () => {
                        try {
                            const response = await getTermsData();
                            // console.log(response.content);
                            setTermsData(response)
                        } catch (error: any) {
                            toast.error(error.message || 'Failed to load products');
                        }finally {
                             setLoading(false);
                    }
                    };
                
            useEffect(() => {
                fetchPrivacyData();
                setLoading(true);
            }, []);

    return (
        <>
        {loading ? (
         <Loader/>
             ) : (
                <div>
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
                                {/* <div className="filterIcon text-white mb__25 f-size-60 line_H_1">  <span className="cb-icon cb-balance"></span></div> */}
                                <div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up">{termsData?.title} </div>
                                {/* <div className="txtSummary f-size-18 text-white" data-aos="fade-up"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="secWrap">
                <div className="container">
                      <div className='cb_cardStyle_1' data-aos="fade-up">
                        <div className="mb__15">
                            <div className="text-black f-size-22 f-w-SB">{termsData?.title}</div>
                        </div>
                        <div className="last-p">
                           {termsData?.content}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            )}
        </>
    );
};

export default Terms;