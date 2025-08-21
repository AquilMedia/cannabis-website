import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { getHomepageData } from '@/services/user';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import LoginModal from '@/Modals/LoginModal';
const Home: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [ignore, setIgnore] = useState(false);
  const { user } = useAuth();
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
      
        const response = await getHomepageData();
        setData(response.data);
      } catch (err: any) {
        toast.error(err.message || 'Failed to load homepage');
      }
    };

    fetchHomepageData();
  }, [user]);

  useEffect(() => {
    let openTimer: NodeJS.Timeout;
    if (!user && !ignore) {
      openTimer = setTimeout(() => setShowModal(true), 10000);
    }
    return () => clearTimeout(openTimer);
  }, [user, ignore]);

  const handleClose = () => {
    setShowModal(false);
    setIgnore(true);
  };

  const settings = {
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    fade: true
  };



useEffect(() => {
  if (!user) {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 10000); 
    return () => clearTimeout(timer); 
  }
}, [user]);



  return (
    <div>
      <div className="secWrap home_sec_one bgWrap" style={{ backgroundImage: "url('assets/images/banner-bg.jpg')" }}>
        {/* style="background-image: url(assets/images/banner-bg.jpg)" */}
        <div className="container">
       {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
         )}
          <div className="row">
            <div className="col-lg-5 order-lg-2">
              <div data-aos="fade-up" data-aos-delay="600">
                <Slider {...settings} className="main-slider cstArrows">
                  {data?.sectionOne
                    ?.find((item: { meta_key: string }) => item.meta_key === "gallery")
                    ?.meta_value &&
                    (Object.values(
                      JSON.parse(
                        data.sectionOne.find((item: { meta_key: string }) => item.meta_key === "gallery")!.meta_value
                      )
                    ) as string[]).map((imgUrl: string, index: number) => (
                      <div className="slide-item" key={index}>
                        <div className="banner-img position-relative overflow-hidden">
                          <img src={imgUrl} alt={`slide-${index}`} className="w-100" />
                        </div>
                      </div>
                    ))}
                </Slider>

              </div>
            </div>
            <div className="col-lg-7">
              <div className="slider-cont">
                <div className="legelTxt d-inline-block mb__20" data-aos="fade-up" data-aos-delay="300">
                  <div className="d-flex align-items-center f-size-14 f-w-M secondary-clr gap-1 line_H_1">
                    <img src="assets/images/legel-icon.svg" />
                    {data?.sectionOne.find((item: { meta_key: string; }) => item.meta_key === "hero_info")?.meta_value || ""}
                  </div>
                </div>
                <div className="sliderHead_txt f-size-60 f-w-B line_H_1 clr-black mb__20" data-aos="fade-up" data-aos-delay="400">
                  Lorem ipsum is <span className="secondary-clr">  {data?.sectionOne.find((item: { meta_key: string; }) => item.meta_key === "heading")?.meta_value || ""}</span> text commonly
                </div>
                <div className="txtSummary mb__20" data-aos="fade-up" data-aos-delay="500">
                  {data?.sectionOne.find((item: { meta_key: string; }) => item.meta_key === "sub_heading")?.meta_value || ""}
                </div>
                <div className="counting_sec" data-aos="fade-up" data-aos-delay="600">
                  <div className="d-md-flex align-items-center gap-2 justify-content-between">
                    <div className="countBx">
                          <div className="d-flex align-items-center gap-2">
                            <div className="countIcon d-flex align-items-center justify-content-center">
                              <span className="cb-icon cb-users"></span>
                            </div>
                            <div className="couningTxt_sec">
                          <div className="couningTxt_title clr-black f-w-M line_H_1">5000+</div>
                          <div className="couningTxt_subtitle"> Happy Patients </div>
                              </div>
                      </div>
                    </div>

                    <div className="countBx">
                      <div className="d-flex align-items-center gap-2">
                        <div className="countIcon d-flex align-items-center justify-content-center">
                          <span className="cb-icon cb-clock"></span>
                        </div>
                        <div className="couningTxt_sec">
                          <div className="couningTxt_title clr-black f-w-M line_H_1">24/7</div>
                          <div className="couningTxt_subtitle"> Support Available </div>
                              </div>
                            </div>
                          </div>

                    <div className="countBx">
                      <div className="d-flex align-items-center gap-2">
                        <div className="countIcon d-flex align-items-center justify-content-center">
                          <span className="cb-icon cb-security"></span>
                        </div>
                        <div className="couningTxt_sec">
                          <div className="couningTxt_title clr-black f-w-M line_H_1">100%</div>
                          <div className="couningTxt_subtitle"> Legal & Secure </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="home_sec_two section-bg">
        <div className="secWrap">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="section-title text-center mb__30">
                  <div className="title f-size-34 f-w-B clr-black" data-aos="fade-up" data-aos-delay="300">   {data?.sectionTwo?.heading || "About Medical Cannabis"}</div>
                  <div className="subtitle" data-aos="fade-up" data-aos-delay="400">{data?.sectionTwo?.content ||
                    "Medical cannabis is a proven treatment option for various conditions. In Germany, it has been legal for medical use since 2017, providing patients with safe, regulated access to cannabis-based ."}</div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {data?.sectionTwo?.dataList?.map((item: {
                icon: string | undefined; title: any; description: any; 
}, index: number) => (
                <div className="col-sm-6 col-lg-4" key={index}>
                  <div
                    className="aboutBx mb__30"
                    data-eq="aboutBx-hq"
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 100}
                  >
                    <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                      {/* <img
                    src={
                      item?.icon
                        ? `assets/images/${item.icon}.svg`
                        : `assets/images/about-icon-${index + 1}.svg`
                    }
                    className="aboutIcon-img"
                    alt={item?.title || "about"}
                  /> */}
                      <span className={item.icon}></span>
                    </div>
                    <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                      {item?.title || "Default Title"}
                    </div>
                    <div className="about-summary text-center">
                      {item?.description || "Default description goes here."}
                    </div>
                  </div>
                </div>
              ))}

              {/* <div className="col-sm-6 col-lg-4">
                <div className="aboutBx mb__30" data-eq="aboutBx-hq" data-aos="fade-up" data-aos-delay="300">
                  <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                    <img src="assets/images/about-icon-1.svg" className="aboutIcon-img" alt="" />
                  </div>
                  <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                    Pain Management
                  </div>
                  <div className="about-summary text-center">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="aboutBx mb__30" data-eq="aboutBx-hq" data-aos="fade-up" data-aos-delay="400">
                  <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                    <img src="assets/images/about-icon-2.svg" className="aboutIcon-img" alt="" />
                  </div>
                  <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                    Neurological Support
                  </div>
                  <div className="about-summary text-center">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="aboutBx mb__30" data-eq="aboutBx-hq" data-aos="fade-up" data-aos-delay="500">
                  <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                    <img src="assets/images/about-icon-3.svg" className="aboutIcon-img" alt="" />
                  </div>
                  <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                    Mental Health
                  </div>
                  <div className="about-summary text-center">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="aboutBx mb__30" data-eq="aboutBx-hq" data-aos="fade-up" data-aos-delay="600">
                  <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                    <img src="assets/images/about-icon-4.svg" className="aboutIcon-img" alt="" />
                  </div>
                  <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                    Legal Compliance
                  </div>
                  <div className="about-summary text-center">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="aboutBx mb__30" data-eq="aboutBx-hq" data-aos="fade-up" data-aos-delay="700">
                  <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                    <img src="assets/images/about-icon-5.svg" className="aboutIcon-img" alt="" />
                  </div>
                  <div className="about-title text-center f-size-18 f-w-M clr-black mb__10">
                    Quality Assured
                  </div>
                  <div className="about-summary text-center">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row justify-content-center mb__30">
              <div className="col-lg-8">
                <div className="germen_fremework text-center" data-aos="fade-up" data-aos-delay="600">
                  <div className="germenTitle f-size-22 f-w-B mb__10 clr-black">German Legal Framework</div>
                  <div className="txtSummary text-center mb__20">
                    Since March 2017, medical cannabis has been available on prescription in Germany. Patients with serious illnesses can receive cannabis flowers, extracts, or finished medicines containing cannabis when conventional therapies are not sufficient or cause severe side effects.
                  </div>
                  <div className="legelList_wrap">
                    <ul className="list-inline mb-0 d-flex flex-wrap justify-content-center">
                      <li className="list-inline-item secondary-clr f-w-M d-flex align-items-center gap-2"> <img src="assets/images/fully-legal.png" alt="" /> <span>Fully Legal</span> </li>
                      <li className="list-inline-item secondary-clr f-w-M d-flex align-items-center gap-2"> <img src="assets/images/doctor-prescribed.png" alt="" /> <span>Doctor Prescribed</span> </li>
                      <li className="list-inline-item secondary-clr f-w-M d-flex align-items-center gap-2"> <img src="assets/images/safe-regulated.png" alt="" /> <span>Safe & Regulated</span> </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt__80">
              <div className="col-lg-8">
                <div className="section-title text-center mb__30">
                  <div className="title f-size-34 f-w-B clr-black" data-aos="fade-up" data-aos-delay="300">  {data?.sectionThree?.heading || "Professional Medical Consultation"}</div>
                  <div className="subtitle" data-aos="fade-up" data-aos-delay="400"> {data?.sectionThree?.content ||
                    "Our certified doctors provide professional consultations to ensure you receive the right medical cannabis treatment for your needs."}</div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">

              <div className="row justify-content-center">
                {data?.sectionThree?.dataList?.map((item: { title: any; description: any; }, index: number) => (
                  <div className="col-md-6" key={index}>
                    <div
                      className="consulationBx position-relative overflow-hidden"
                      data-aos="fade-up"
                      data-aos-delay={300 + (index || 0) * 300}
                    >
                      <div className="consu-img position-relative">
                        <img src="assets/images/consultant-img-2.jpg" className="w-100" alt="" />
                      </div>
                      <div className="cons-cont">
                        <div className="cons-title f-size-22 text-white f-w-SB">
                          {item?.title || "Default Title"}
                        </div>
                        <div className="cons-title text-white">
                          {item?.description || "Default description goes here."}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="col-md-6">
                <div className="consulationBx position-relative overflow-hidden" data-aos="fade-up" data-aos-delay="600">
                  <div className="consu-img position-relative">
                    <img src="assets/images/consultant-img-2.jpg" className="w-100" alt="" />
                  </div>
                  <div className="cons-cont">
                    <div className="cons-title f-size-22 text-white f-w-SB"> Safe & Legal Treatment </div>
                    <div className="cons-title text-white"> Compliant with German medical cannabis regulationss </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="secWrap home_sec_three pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div
                  className="title f-size-34 f-w-B clr-black"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {data?.sectionFour?.heading || "How to Order Cannabis"}
                </div>
                <div
                  className="subtitle"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {data?.sectionFour?.content ||
                    "Simple, secure process to get your medical cannabis prescription and delivery"}
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="nav nav-tabs cstNav_tabs mb__40 justify-content-center"
                id="nav-tab"
                role="tablist"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {data?.sectionFour?.section?.map((sec: {
                  icon: string | undefined; title: any; 
}, idx: React.Key | null | undefined) => (
                  <button
                    key={idx}
                    className={`nav-link ${idx === 0 ? "active" : ""}`}
                    id={`nav-tab-${idx}`}
                    data-bs-toggle="tab"
                    data-bs-target={`#tab-pane-${idx}`}
                    type="button"
                    role="tab"
                    aria-controls={`tab-pane-${idx}`}
                    aria-selected={idx === 0}
                  >
                    <div className="tab-nav">
                      <div className="tabNav-icon mx-auto mb__5">
                              <i className={sec?.icon} ></i>

                        {/* <img src="assets/images/tab-icon-1.svg" className="w-100" /> */}
                      </div>
                      <div className="tab_txt text-center secondary-clr">
                        {sec?.title || "Untitled"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div
                className="tab-content"
                id="nav-tabContent"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                {data?.sectionFour?.section?.map((sec: { dataList: { step: any; title: any; description: any; }[]; }, idx: React.Key | null | undefined) => (
                  <div
                    key={idx}
                    className={`tab-pane fade ${idx === 0 ? "active show" : ""}`}
                    id={`tab-pane-${idx}`}
                    role="tabpanel"
                    aria-labelledby={`nav-tab-${idx}`}
                  >
                    <div className="row">
                      {sec?.dataList?.map((stepItem: {
                        [x: string]: string | undefined; step: any; title: any; description: any; 
}, stepIdx: number) => (
                        <div className="col-sm-6 col-lg-3" key={stepIdx}>
                          <div className="prescriptionBx" data-eq="preHq">
                            <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">

                              <span className={stepItem?.icon}></span>
                            </div>
                            <div className="stepNum mx-auto mb__10">
                              {stepItem?.step || stepIdx + 1}
                            </div>
                            <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                              {stepItem?.title || "Untitled Step"}
                            </div>
                            <div className="about-summary text-center line_H_1_3">
                              {stepItem?.description || ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="secWrap home_sec_three pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div className="title f-size-34 f-w-B clr-black" data-aos="fade-up" data-aos-delay="300">How to Order Cannabis</div>
                <div className="subtitle" data-aos="fade-up" data-aos-delay="400"> Simple, secure process to get your medical cannabis prescription and delivery </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="nav nav-tabs cstNav_tabs mb__40 justify-content-center" id="nav-tab" role="tablist" data-aos="fade-up" data-aos-delay="300">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                  <div className="tab-nav">
                    <div className="tabNav-icon mx-auto mb__5">
                      <img src="assets/images/tab-icon-1.svg" className="w-100" />
                    </div>
                    <div className="tab_txt text-center secondary-clr"> If Prescription Available </div>
                  </div>
                </button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                  <div className="tab-nav">
                    <div className="tabNav-icon mx-auto mb__5">
                      <img src="assets/images/tab-icon-2.svg" className="w-100" />
                    </div>
                    <div className="tab_txt text-center secondary-clr"> If No Prescription </div>
                  </div>
                </button>
              </div>
              <div className="tab-content" id="nav-tabContent" data-aos="fade-up" data-aos-delay="600">
                <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div className="row">
                    <div className="col-sm-6 col-lg-3">
                      <div className="prescriptionBx" data-eq="preHq">
                        <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                          <img src="assets/images/pre-icon-1.svg" className="aboutIcon-img" alt="" />
                        </div>
                        <div className="stepNum mx-auto mb__10"> 1 </div>
                        <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                          Upload Prescription
                        </div>
                        <div className="about-summary text-center line_H_1_3">
                          Upload your existing cannabis prescription from your doctor
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <div className="prescriptionBx" data-eq="preHq">
                        <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                          <img src="assets/images/pre-icon-2.svg" className="aboutIcon-img" alt="" />
                        </div>
                        <div className="stepNum mx-auto mb__10"> 2 </div>
                        <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                          Fill Delivery Details
                        </div>
                        <div className="about-summary text-center line_H_1_3">
                          Provide your delivery address and contact information
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <div className="prescriptionBx" data-eq="preHq">
                        <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                          <img src="assets/images/pre-icon-3.svg" className="aboutIcon-img" alt="" />
                        </div>
                        <div className="stepNum mx-auto mb__10"> 3 </div>
                        <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                          Confirmation Email
                        </div>
                        <div className="about-summary text-center line_H_1_3">
                          Receive order confirmation and tracking information
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <div className="prescriptionBx" data-eq="preHq">
                        <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                          <img src="assets/images/pre-icon-4.svg" className="aboutIcon-img" alt="" />
                        </div>
                        <div className="stepNum mx-auto mb__10"> 4 </div>
                        <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                          Pharmacy Contact
                        </div>
                        <div className="about-summary text-center line_H_1_3">
                          Our partner pharmacy will call to arrange delivery
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div className="text-center"> Comming Soon.. </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div> */}
      <div className="secWrap home_sec_four">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div
                  className="title f-size-34 f-w-B clr-black"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {data?.sectionFive?.heading || "Why Trust Digital Clinic?"}
                </div>
                <div
                  className="subtitle"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  {data?.sectionFive?.content ||
                    "Your health and safety are our top priorities. We maintain the highest standards of medical care and legal compliance."}
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {data?.sectionFive?.dataList?.map((item: {
              icon: string | undefined; title: any; description: any; 
}, idx: number) => (
              <div className="col-sm-6 col-md-3" key={idx}>
                <div
                  className="whyTrust_bx mb__30"
                  data-aos="fade-up"
                  data-aos-delay={300 + idx * 100}
                >
                  <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                    <span className={item?.icon}></span>
                  </div>
                  <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                    {item?.title || "Title"}
                  </div>
                  <div className="about-summary text-center line_H_1_3">
                    {item?.description || ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center mt__80">
            <div className="col-lg-8">
              <div
                className="why_digitalBx_wrap"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="why_digitalBx text-center">
                      <div className="whyTitle_digital f-size-22 f-w-SB secondary-clr">99.8%</div>
                      <div className="sub_whyTitle_digital clr-black">Patient Satisfaction</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="why_digitalBx text-center">
                      <div className="whyTitle_digital f-size-22 f-w-SB secondary-clr">48h</div>
                      <div className="sub_whyTitle_digital clr-black">Average Response Time</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="why_digitalBx text-center">
                      <div className="whyTitle_digital f-size-22 f-w-SB secondary-clr">ISO 27001</div>
                      <div className="sub_whyTitle_digital clr-black">Security Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="secWrap home_sec_four">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div className="title f-size-34 f-w-B clr-black" data-aos="fade-up" data-aos-delay="300">Why Trust Digital Clinic?</div>
                <div className="subtitle" data-aos="fade-up" data-aos-delay="600"> Your health and safety are our top priorities. We maintain the highest standards of medical care and legal compliance. </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6 col-md-3">
              <div className="whyTrust_bx mb__30" data-aos="fade-up" data-aos-delay="300">
                <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                  <img src="assets/images/why-trust-icon-1.svg" className="aboutIcon-img" alt="" />
                </div>
                <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                  100% Legal
                </div>
                <div className="about-summary text-center line_H_1_3">
                  Fully compliant with German medical cannabis regulations
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="whyTrust_bx mb__30" data-aos="fade-up" data-aos-delay="400">
                <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                  <img src="assets/images/why-trust-icon-2.svg" className="aboutIcon-img" alt="" />
                </div>
                <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                  24/7 Support
                </div>
                <div className="about-summary text-center line_H_1_3">
                  Round-the-clock medical and customer support available
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="whyTrust_bx mb__30" data-aos="fade-up" data-aos-delay="500">
                <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                  <img src="assets/images/why-trust-icon-3.svg" className="aboutIcon-img" alt="" />
                </div>
                <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                  Secure Payment
                </div>
                <div className="about-summary text-center line_H_1_3">
                  Bank-level encryption and secure payment processing
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="whyTrust_bx mb__30" data-aos="fade-up" data-aos-delay="600">
                <div className="aboutIcon d-flex align-items-center justify-content-center mx-auto mb__15">
                  <img src="assets/images/why-trust-icon-4.svg" className="aboutIcon-img" alt="" />
                </div>
                <div className="about-title text-center f-size-18 f-w-M clr-black mb__5">
                  Certified Doctors
                </div>
                <div className="about-summary text-center line_H_1_3">
                  Licensed German physicians specialized in cannabis therapy
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt__80">
            <div className="col-lg-8">
              <div className="why_digitalBx_wrap" data-aos="fade-up" data-aos-delay="600">
                <div className="row">
                  <div className="col-md-4">
                    <div className="why_digitalBx text-center">
                      <div className="whyTitle_digital f-size-22  f-w-SB secondary-clr"> 99.8% </div>
                      <div className="sub_whyTitle_digital clr-black"> Patient Satisfaction </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="why_digitalBx text-center">
                      <div className="whyTitle_digital f-size-22  f-w-SB secondary-clr"> 48h </div>
                      <div className="sub_whyTitle_digital clr-black"> Average Response Time </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="why_digitalBx text-center">
                      <div className="whyTitle_digital f-size-22  f-w-SB secondary-clr"> ISO 27001 </div>
                      <div className="sub_whyTitle_digital clr-black"> Security Certified </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="secWrap home_sec_five section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div className="title f-size-34 f-w-B clr-black" data-aos="fade-up" data-aos-delay="300">Latest Cannabis Health Insights</div>
                <div className="subtitle" data-aos="fade-up" data-aos-delay="400"> Stay informed with the latest research, legal updates, and medical insights about cannabis therapy </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <Link href="#" className="insightsBx d-block mb__30" data-eq="insightHq" data-aos="fade-up" data-aos-delay="300">
                <div className="insightsBx-img"> <img src="assets/images/insights-img-1.jpg" className="w-100" alt="" /> </div>
                <div className="insight_cont">
                  <div className="insight_date d-flex align-items-center gap-1 mb__15">
                    <div className="dateIcon"> <img src="assets/images/date-icon.svg" className="date-icon" /> </div>
                    <div className="date_txt f-size-14 clr-black">15.1.2024 </div>
                  </div>
                  <div className="insight_categoery f-size-14 f-w-M secondary-clr mb__15"> Medical Guide </div>
                  <div className="insights-title f-size-18 f-w-SB clr-black line_H_1_3 mb__15"> Understanding Medical Cannabis Dosage in Germany </div>
                  <div className="insight_summary f-size-14 primary-clr line_H_1_3">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown...
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-sm-6 col-lg-3">
              <Link href="#" className="insightsBx d-block mb__30" data-eq="insightHq" data-aos="fade-up" data-aos-delay="400">
                <div className="insightsBx-img"> <img src="assets/images/insights-img-2.jpg" className="w-100" alt="" /> </div>
                <div className="insight_cont">
                  <div className="insight_date d-flex align-items-center gap-1 mb__15">
                    <div className="dateIcon"> <img src="assets/images/date-icon.svg" className="date-icon" /> </div>
                    <div className="date_txt f-size-14 clr-black">15.1.2024 </div>
                  </div>
                  <div className="insight_categoery f-size-14 f-w-M secondary-clr mb__15"> Medical Guide </div>
                  <div className="insights-title f-size-18 f-w-SB clr-black line_H_1_3 mb__15"> Understanding Medical Cannabis Dosage in Germany </div>
                  <div className="insight_summary f-size-14 primary-clr line_H_1_3">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown...
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-sm-6 col-lg-3">
              <Link href="#" className="insightsBx d-block mb__30" data-eq="insightHq" data-aos="fade-up" data-aos-delay="500">
                <div className="insightsBx-img"> <img src="assets/images/insights-img-3.jpg" className="w-100" alt="" /> </div>
                <div className="insight_cont">
                  <div className="insight_date d-flex align-items-center gap-1 mb__15">
                    <div className="dateIcon"> <img src="assets/images/date-icon.svg" className="date-icon" /> </div>
                    <div className="date_txt f-size-14 clr-black">15.1.2024 </div>
                  </div>
                  <div className="insight_categoery f-size-14 f-w-M secondary-clr mb__15"> Medical Guide </div>
                  <div className="insights-title f-size-18 f-w-SB clr-black line_H_1_3 mb__15"> Understanding Medical Cannabis Dosage in Germany </div>
                  <div className="insight_summary f-size-14 primary-clr line_H_1_3">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown...
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-sm-6 col-lg-3">
              <Link href="#" className="insightsBx d-block mb__30" data-eq="insightHq" data-aos="fade-up" data-aos-delay="600">
                <div className="insightsBx-img"> <img src="assets/images/insights-img-4.jpg" className="w-100" alt="" /> </div>
                <div className="insight_cont">
                  <div className="insight_date d-flex align-items-center gap-1 mb__15">
                    <div className="dateIcon"> <img src="assets/images/date-icon.svg" className="date-icon" /> </div>
                    <div className="date_txt f-size-14 clr-black">15.1.2024 </div>
                  </div>
                  <div className="insight_categoery f-size-14 f-w-M secondary-clr mb__15"> Medical Guide </div>
                  <div className="insights-title f-size-18 f-w-SB clr-black line_H_1_3 mb__15"> Understanding Medical Cannabis Dosage in Germany </div>
                  <div className="insight_summary f-size-14 primary-clr line_H_1_3">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown...
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="viewAll_article text-center" data-aos="fade-up" data-aos-delay="300">
                <Link href="" className="viewAll_article_btn">
                  <div className="d-flex align-items-center gap-1 justify-content-center">
                    <div className="viewTxt f-size-16 f-w-M secondary-clr">
                      View All Articles
                    </div>
                    <div className="btn-arrow">
                      <img src="assets/images/btn-arrow.svg" className="btn-arrow" alt="" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {data?.sectionSix?.length > 0 && (
        <div className="secWrap home_sec_five section-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="section-title text-center mb__30">
                  <div
                    className="title f-size-34 f-w-B clr-black"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    Latest Cannabis Health Insights
                  </div>
                  <div
                    className="subtitle"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    Stay informed with the latest research, legal updates, and medical
                    insights about cannabis therapy
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {data?.sectionSix.map((item: { id: React.Key | null | undefined; slug: any; published_at: string | number | Date; category: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; excerpt: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: number) => (
                <div
                  key={item.id}
                  className="col-sm-6 col-lg-3"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 100}
                >
                  <Link
                    href={`/articles/${item.slug}`}
                    className="insightsBx d-block mb__30"
                    data-eq="insightHq"
                  >
                    <div className="insightsBx-img">
                      <img src="assets/images/insights-img-1.jpg" className="w-100" alt="" />
                    </div>
                    <div className="insight_cont">
                      <div className="insight_date d-flex align-items-center gap-1 mb__15">
                        <div className="dateIcon">
                          <img
                            src="assets/images/date-icon.svg"
                            className="date-icon"
                            alt="Date"
                          />
                        </div>
                        <div className="date_txt f-size-14 clr-black">
                          {new Date(item.published_at).toLocaleDateString("en-GB")}
                        </div>
                      </div>
                      <div className="insight_categoery f-size-14 f-w-M secondary-clr mb__15">
                        {item.category?.name}
                      </div>
                      <div className="insights-title f-size-18 f-w-SB clr-black line_H_1_3 mb__15">
                        {item.title}
                      </div>
                      <div className="insight_summary f-size-14 primary-clr line_H_1_3">
                        {item.excerpt}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div
                  className="viewAll_article text-center"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <Link href="/articles" className="viewAll_article_btn">
                    <div className="d-flex align-items-center gap-1 justify-content-center">
                      <div className="viewTxt f-size-16 f-w-M secondary-clr">
                        View All Articles
                      </div>
                      <div className="btn-arrow">
                        <img
                          src="assets/images/btn-arrow.svg"
                          className="btn-arrow"
                          alt="Arrow"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="secWrap home_sec_six green-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div className="title f-size-34 f-w-B clr-black text-white" data-aos="fade-up" data-aos-delay="300"> Stay Informed About Medical Cannabis </div>
                <div className="subtitle opacity-5 text-white" data-aos="fade-up" data-aos-delay="400"> Get the latest research, legal updates, and health insights delivered to your inbox. Join our community of informed patients and healthcare professionals. </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb__40">
            <div className="col-lg-6">
              <div className="newsletter_sec mb__15" data-aos="fade-up" data-aos-delay="300">
                <form>
                  <div className="d-lg-flex align-items-center justify-content-center gap-2">
                    <div className="formGroup w-100">
                      <input type="text" name="" placeholder="Enter your Email Address" className="cst-input" />
                    </div>
                    <div className="subscribe_btnWrap">
                      <button type="submit" className="subscribe_btn secondary-clr"> Subscribe </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="subtitle opacity-5 text-white text-center" data-aos="fade-up" data-aos-delay="600"> No spam. Unsubscribe anytime. Your privacy is protected. </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row justify-content-center">
                <div className="col-sm-6 col-lg-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="300">
                    <div className="subscTitle f-size-24 text-white f-w-B"> 10,000+ </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Subscribers </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="400">
                    <div className="subscTitle f-size-24 text-white f-w-B"> Weekly </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Updates </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="500">
                    <div className="subscTitle f-size-24 text-white f-w-B"> Expert </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Content </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="600">
                    <div className="subscTitle f-size-24 text-white f-w-B"> Free </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Forever </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default Home;