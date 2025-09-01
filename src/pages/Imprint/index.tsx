import { getImpressumData } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/common/Loader';


const HowItWorks: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [impressumData, setImpressumData] = useState<any>(null);
    useEffect(() => {
        fetchImpressumData();
        setLoading(true);
    }, []);

    const fetchImpressumData = async () => {
        try {
            const response = await getImpressumData();

            setImpressumData(response)
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
                                        <div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up">{impressumData?.title} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="secWrap">
                        <div className="container">
                            <div className='cb_cardStyle_1' data-aos="fade-up">
                                <div className="mb__15">
                                    <div className="text-black f-size-22 f-w-SB">{impressumData?.title}</div>
                                </div>
                                <div
                                    className="last-p"
                                    dangerouslySetInnerHTML={{
                                        __html: impressumData?.content || '',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HowItWorks;
