import { getBlogDetails } from '@/services/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Blogdetails: React.FC = () => {
const { id } = useRouter().query;
const [prductDetails, setPrductDetails] = useState<any>(null);
    const fetchProductsDetails = async () => {
            try {
                const response = await getBlogDetails(id);
                console.log(response.data);
                setPrductDetails(response.data || [])
            } catch (error: any) {
                toast.error(error.message || 'Failed to load products');
            }
        };
    
        useEffect(() => {
            fetchProductsDetails();
        }, [id]);

    return (
        <div className="contact-page">
           <div className="secWrap bt-md tp-md section-bg">
                 <div className="container">
                    <div data-aos="fade-up" className='mb__15'>
                        <Link href={"/blog"} className="btn cb_linkBtn"><i className="cb-icon cb-arrow-left"></i> Back to Blogs</Link>
                    </div>

                    <div className="row justify-content-center g-0">
                        <div className='col-lg-8'>
                            <div className="text-black f-size-38 f-w-B mb__20 line_H_1_2">{prductDetails?.title}</div>
                             <div className="blogInfo flex-wrap d-flex column-gap-4 row-gap-3 mb__10">
                                <div className="primary-clr f-size-14 d-flex align-items-center gap-2"><i className="cb-icon cb-user f-size-12"></i>By Dr. Sarah Weber</div>
                                <div className="primary-clr f-size-14 d-flex align-items-center gap-2"><i className="cb-icon cb-calendar f-size-12"></i>Published {prductDetails?.published_at.split("T")[0]}</div>
                                <div className="primary-clr f-size-14 d-flex align-items-center gap-2"><i className="cb-icon cb-clock"></i>Last updated {prductDetails?.updated_at.split("T")[0]}</div>
                            </div>
                        </div>
                    </div>
                 </div>
           </div>
           <div className="secWrap bt-md tp-md">
                 <div className="container">
                    <div className="row justify-content-center g-0">
                        <div className='col-lg-8'>
                            <div className='mb__40'>
                                <div className="blogDe-Img rounded-4 overflow-hidden mb__20">
                                <img src={prductDetails?.featured_image} className="w-100" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/assets/images/blogImg.jpg` }} />
                                </div>
                                <div className="lats-p">
                                    <p>{prductDetails?.content}</p>
                                </div>
                            </div>

                           
                            <div>
                                <div className=" f-size-34 f-w-B clr-black mb__20">Recent Blog</div>
                                <div className="row row-gap-4">
                                    {prductDetails?.recentBlogs?.map((item: any, index: number) => {
                                        return (
                                    <div key={index} className="col-sm-6 col-md-6 col-lg-6">
                                        <Link href={`/blogDetails?slug=${item.slug}&id=${item.id}`}  className="blogCard h-100 d-flex flex-column" data-aos="fade-up">
                                        <div className="blogContent p-3 d-flex flex-column flex-grow-1">
                                            <div className="blogInfo d-flex gap-3 mb__10">
                                                <div className="primary-clr f-size-14 d-flex align-items-center gap-1"><span className="cb-icon cb-calendar f-size-12"></span>{item.created_at.split("T")[0]}</div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="f-size-18 f-w-M clr-black mb__5 truncate-2">{item.title}</div>
                                                <div className="primary-clr truncate-3">{item.content}</div>
                                            </div>
                                            <div className="mt-3">
                                                <button className="btn cb_cmnBtn px-4">Read More</button>
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                    );
                                    })}
                                    </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default Blogdetails;