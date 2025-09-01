import Loader from '@/components/common/Loader';
import Seo from '@/components/common/Seo';
import { getBlogDetails } from '@/services/user';
import { getImageUrl } from '@/utils/ImageUrls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Blogdetails: React.FC = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [loading, setLoading] = useState(false);
    const [prductDetails, setProductDetails] = useState<any>(null);
    useEffect(() => {
        if (slug) {
            fetchProductsDetails(slug);
        }
    }, [slug]);

    const fetchProductsDetails = async (id: string | string[]) => {
        setLoading(true);
        try {
            const response = await getBlogDetails(id);
            setProductDetails(response.data || []);
        } catch (error: any) {
            toast.error(error.message || "Failed to load products");
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
                    <Seo
                        title={prductDetails?.meta_title || prductDetails?.title || "Blog Details"}
                        description={
                            prductDetails?.meta_description ||
                            prductDetails?.content?.slice(0, 150) ||
                            "Read our latest blog post."
                        }
                        keywords={prductDetails?.meta_keywords || "blog, articles, news"}
                        image={getImageUrl(prductDetails?.featured_image) || "/assets/images/blogImg.jpg"}

                    />
                    <div className="secWrap bt-md tp-md section-bg">
                        <div className="container">
                            <div data-aos="fade-up" className='mb__15'>
                                <Link href={"/blog"} className="btn cb_linkBtn"><i className="cb-icon cb-arrow-left"></i> Back to Blogs</Link>
                            </div>

                            <div className="row justify-content-center g-0">
                                <div className='col-lg-8'>
                                    <div className="text-black f-size-38 f-w-B mb__20 line_H_1_2" data-aos="fade-up">{prductDetails?.title}</div>
                                    <div className="blogInfo flex-wrap d-flex column-gap-4 row-gap-3 mb__10" data-aos="fade-up">
                                        <div className="primary-clr f-size-14 d-flex align-items-center gap-2"><i className="cb-icon cb-user f-size-12"></i>By {prductDetails?.author?.name}</div>
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
                                        <div className="blogDe-Img rounded-4 overflow-hidden mb__20" data-aos="fade-up">
                                            <img src={getImageUrl(prductDetails?.featured_image) || '../assets/images/blogImg.jpg'} className="w-100" alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "../assets/images/blogImg.jpg" }} />
                                        </div>
                                        <div className="last-p" data-aos="fade-up">
                                            <div dangerouslySetInnerHTML={{ __html: prductDetails?.content || '' }} />
                                        </div>

                                    </div>


                                    <div>
                                        <div className=" f-size-34 f-w-B clr-black mb__20" data-aos="fade-up">Recent Blog</div>
                                        <div className="row row-gap-4">
                                            {prductDetails?.recentBlogs?.map((item: any, index: number) => {
                                                return (
                                                    <div key={index} className="col-sm-6 col-md-6 col-lg-6">
                                                        <Link
                                                            href={{
                                                                pathname: `/blog/${item.slug}`,
                                                                query: { id: item.id }
                                                            }}
                                                            className="blogCard h-100 d-flex flex-column"
                                                            data-aos="fade-up"
                                                        >

                                                            <div className="blogContent p-3 d-flex flex-column flex-grow-1">
                                                                <div className="blogInfo d-flex gap-3 mb__10">
                                                                    <div className="primary-clr f-size-14 d-flex align-items-center gap-1"><span className="cb-icon cb-calendar f-size-12"></span>{item.created_at.split("T")[0]}</div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <div className="f-size-18 f-w-M clr-black mb__5 truncate-2">{item.title}</div>
                                                                    <div className="primary-clr truncate-3" dangerouslySetInnerHTML={{ __html: item.content || '' }}></div>
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
                </>
            )}
        </>
    );
};

export default Blogdetails;