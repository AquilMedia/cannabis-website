import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAboutUspageData } from "@/services/user";
import Loader from "@/components/Loader";

interface AboutData {
  title: string;
  content: string;
  meta_description?: string;
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response: { data: AboutData } = await getAboutUspageData();
        setAboutData(response.data);
        setLoading(false);
      } catch (err: any) {
        toast.error(err.message || "Failed to load About Us data");
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
                    <div className="text-black f-size-38 f-w-B line_H_1 mb__15"> About Digital Clinic </div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos facere qui fugiat dolor voluptas alias dignissimos earum eum, id quo eveniet totam. Esse enim officiis iste temporibus perferendis aperiam nemo.</p>
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
                <div className="col-md-10">
                  <div className="text-center">
                    <div className=" f-size-34 f-w-B clr-black">Our Mission</div>
                    <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi provident ea libero dolorum asperiores sed inventore voluptatibus unde excepturi impedit eum et cumque perspiciatis saepe a modi consectetur explicabo itaque repellat, optio nostrum doloremque aperiam! Commodi fugiat iusto quam iste iure exercitationem, vitae atque architecto odio porro similique, nisi consequuntur?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="secWrap section-bg">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="section-title text-center mb__30">
                    <div className="title f-size-34 f-w-B clr-black" data-aos="fade-up" data-aos-delay="300">Our Services</div>
                    <div className="subtitle" data-aos="fade-up" data-aos-delay="400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non molestiae eum cupiditate amet ab quae inventore explicabo tempore, vitae maxime. </div>
                  </div>
                </div>
              </div>



              <div className="row justify-content-center row-gap-4">
                <div className="col-sm-6 col-lg-4">
                  <div className="aboutBx h-100" data-aos="fade-up" data-aos-delay="300">
                    <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                      <span className="cb-icon cb-circle-tick"></span>
                    </div>
                    <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                      Online Prescription Creation
                    </div>
                    <div className="about-summary text-center">
                      Complete medical questionnaire and get approved prescriptions from licensed doctors
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <div className="aboutBx h-100" data-aos="fade-up" data-aos-delay="300">
                    <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                      <span className="cb-icon cb-security"></span>
                    </div>
                    <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                      Prescription Upload
                    </div>
                    <div className="about-summary text-center">
                      Upload your existing prescription and order medical cannabis products
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <div className="aboutBx h-100" data-aos="fade-up" data-aos-delay="300">
                    <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                      <span className="cb-icon cb-heart"></span>
                    </div>
                    <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                      Doctor Consultation
                    </div>
                    <div className="about-summary text-center">
                      Direct consultation with certified medical cannabis specialists
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )}</>

  );
};

export default About;
