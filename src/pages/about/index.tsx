import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAboutUsData } from "@/services/user";
import Loader from "@/components/common/Loader";

interface AboutContent {
  id: number;
  slug: string;
  title: string;
  description: string;
  position: string;
  section: string;
  content: string;
  status: boolean;
}

interface AboutData {
  slug: string;
  title: string;
  content: string;
  contents: AboutContent[];
  meta_description?: string;
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response: AboutData = await getAboutUsData();
        setAboutData(response);
        console.log("About Us Data:", response?.content);
      } catch (err: any) {
        toast.error(err.message || "Failed to load About Us data");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="secWrap section-bg">
            <div className="container">
              <div className="row align-items-center row-gap-4">
                <div className="col-lg-6 order-lg-1">
                  <div className="abImg rounded-4 overflow-hidden">
                    <img src="assets/images/ab-img.jpg" className="w-100" alt="" />
                  </div>
                </div>

                <div className="col-lg-6 order-lg-0">

                  <div className="mb__25">
                    <div className="text-black f-size-38 f-w-B line_H_1 mb__15">
                      {aboutData?.title}
                    </div>
                    <p>{aboutData?.content}</p>

                  </div>
                  <ul className="list-unstyled abTagWrp flex-wrap">
                    <li><i className="cb-icon cb-user"></i> 10,000+ Patients</li>
                    <li><i className="cb-icon cb-certificate"></i> Licensed Clinic</li>
                    <li><i className="cb-icon cb-clock"></i> 24/7 Support</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

          <div className="secWrap">
            <div className="container">
              <div className="row g-0 justify-content-center">
                {aboutData?.contents
                  .filter((item) => item.position === "1" && item.status)
                  .map((item) => (
                    <div className="col-md-10">
                      <div className="text-center">
                        <div className=" f-size-34 f-w-B clr-black">{item.title}</div>
                        <div className="">{item.content}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {aboutData?.contents
            .filter((item) => item.position === "2" && item.status)
            .map((item) => {
              const services = JSON.parse(item.content);
              return (
                <div className="secWrap section-bg" key={item.id}>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <div className="section-title text-center mb__30">
                          <div
                            className="title f-size-34 f-w-B clr-black"
                            data-aos="fade-up"
                            data-aos-delay="300"
                          >
                            {item.title}
                          </div>
                          {item.description && (
                            <div
                              className="subtitle"
                              data-aos="fade-up"
                              data-aos-delay="400"
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center row-gap-4">
                      {services.map((service: any, idx: number) => (
                        <div className="col-sm-6 col-lg-4" key={idx}>
                          <div
                            className="aboutBx h-100"
                            data-aos="fade-up"
                            data-aos-delay="300"
                          >
                            <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                              <span className={`cb-icon ${service.icon}`}></span>
                            </div>
                            <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                              {service.title}
                            </div>
                            <div className="about-summary text-center">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

        </>
      )}</>

  );
};

export default About;
