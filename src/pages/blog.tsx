import Loader from "@/components/Loader";
import { getBlogspageData } from "@/services/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const BlogsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [blogData, setBlogData] = useState<any>(null);
  const fetchProductsDetails = async () => {
    setLoading(true);
    try {
      const response = await getBlogspageData();
      console.log(response);
      setBlogData(response.data || [])
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load products');
    }
  };

  useEffect(() => {

    fetchProductsDetails();
  }, []);


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
            {/* {showLogin && <LoginModal onClose={() => setShowLogin(false)} />} */}
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="innerBanner_cont text-center position-relative">
                    <div className="filterIcon text-white mb__25 f-size-60 line_H_1"> <i className="cb-icon cb-filter"></i> </div>
                    <div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up"> Blog </div>
                    <div className="txtSummary f-size-18 text-white" data-aos="fade-up"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="secWrap">
            <div className="container">
              <div className="row row-gap-4">
                {blogData?.map((item: any, index: number) => {
                  return (
                    <div key={index} className="col-sm-6 col-md-6 col-lg-4">
                      <Link href={`/blogDetails?slug=${item.slug}&id=${item.id}`} className="blogCard h-100 d-flex flex-column" data-aos="fade-up">
                        <div className="blogImg"><img src={item.featured_image} className="w-100" alt=""
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "assets/images/blogImg.jpg" }}
                        />
                        </div>
                        <div className="blogContent p-3 d-flex flex-column flex-grow-1">
                          <div className="blogInfo d-flex gap-3 mb__10">
                            <div className="primary-clr f-size-14 d-flex align-items-center gap-1"><span className="cb-icon cb-calendar f-size-12"></span>{item.created_at.split("T")[0]}</div>
                            <div className="primary-clr f-size-14 d-flex align-items-center gap-1"><span className="cb-icon cb-user f-size-12"></span>{item.author.name}</div>
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
        </>
      )}
    </>
  );
}

export default BlogsPage;
