import { useAuth } from '@/context/AuthContext';
import { filtersData, saveSubscribeForm } from '@/services/user';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Footer: React.FC = () => {
  const [filterData, setFilterData] = useState<any[]>([]);
  const [formData, setFormData] = useState({ email: "" });

  useEffect(() => {
    getFiltersData();
  }, []);

  const getFiltersData = async () => {
    try {
      const response = await filtersData();
      setFilterData(response.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load filters");
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const payload = { email: formData.email };

    try {
      const res = await saveSubscribeForm(payload);
      toast.success(res?.message || "You have been subscribed");
      setFormData({ email: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }

  };

  return (
    <div>
      <div className="secWrap home_sec_six green-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb__30">
                <div className="title f-size-34 f-w-B text-white" data-aos="fade-up" data-aos-delay="300"> Stay Informed About Medical Cannabis </div>
                <div className="subtitle opacity-5 text-white" data-aos="fade-up" data-aos-delay="400"> Get the latest research, legal updates, and health insights delivered to your inbox. Join our community of informed patients and healthcare professionals. </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb__40">
            <div className="col-lg-6">
              <div className="newsletter_sec mb__15" data-aos="fade-up" data-aos-delay="300">
                <form onSubmit={handleSubmit}>
                  <div className="d-lg-flex align-items-center justify-content-center gap-2">
                    <div className="formGroup w-100">
                      <input
                        type="email"
                        placeholder="Enter your Email Address"
                        className="cst-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ email: e.target.value })}
                      />
                    </div>
                    <div className="subscribe_btnWrap">
                      <button type="submit" className="subscribe_btn secondary-clr">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="subtitle opacity-5 text-white text-center" data-aos="fade-up" data-aos-delay="600"> No spam. Unsubscribe anytime. Your privacy is protected. </div>
            </div>
          </div>

          {/* <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row justify-content-center row-gap-3">
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="300">
                    <div className="subscTitle f-size-24 text-white f-w-B"> 10,000+ </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Subscribers </div>
                  </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="400">
                    <div className="subscTitle f-size-24 text-white f-w-B"> Weekly </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Updates </div>
                  </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="500">
                    <div className="subscTitle f-size-24 text-white f-w-B"> Expert </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Content </div>
                  </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3">
                  <div className="subBx text-center" data-aos="fade-up" data-aos-delay="600">
                    <div className="subscTitle f-size-24 text-white f-w-B"> Free </div>
                    <div className="subsc_subTitle text-white opacity-5 f-size-18"> Forever </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="footer overflow-hidden">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4">
              <div className="footer-widget" data-aos="fade-up" data-aos-delay="300">
                <div className="footerLogo mb__15">
                  <img src="assets/images/footer-logo.png" className="footer-logo" alt="" />
                </div>
                <div className="footerTxt_summary text-white opacity-8 line_H_1_3 mb__25">
                  Germany's leading digital clinic for medical cannabis. Professional, legal, and secure access to quality cannabis products with 24/7 medical support.
                </div>
                <div className="cont_info">
                  <div className="footerTitle text-white mb__10"> Contact Information </div>
                  <div className="contcList mb__25">
                    <ul className="list-unstyled mb-0">
                      <li className="list-block-item mb__10">
                        <Link href="tel:+4917640587385" className="d-flex align-items-center gap-2">
                          <div className="contIcon">
                            <img src="assets/images/cont-icon-1.svg" className="w-100" alt="" />
                          </div>
                          <div className="contTxt text-white opacity-8">
                            +49 176 40 58 73 85
                          </div>
                        </Link>
                      </li>
                      <li className="list-block-item mb__10">
                        <Link href="mailto:xyz@deinarztundapotheker.de" className="d-flex align-items-center gap-2">
                          <div className="contIcon">
                            <img src="assets/images/cont-icon-2.svg" className="w-100" alt="" />
                          </div>
                          <div className="contTxt text-white opacity-8">
                            xyz@deinarztundapotheker.de
                          </div>
                        </Link>
                      </li>
                      <li className="list-block-item mb__10">
                        <Link href="#" className="d-flex align-items-center gap-2">
                          <div className="contIcon">
                            <img src="assets/images/cont-icon-3.svg" className="w-100" alt="" />
                          </div>
                          <div className="contTxt text-white opacity-8">
                            Berlin, Germany
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="socialWrap">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <Link href="" className="social-icon" target="_blank"> <img src="assets/images/social-icon-1.svg" className="w-100" alt="" /> </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link href="" className="social-icon" target="_blank"> <img src="assets/images/social-icon-2.svg" className="w-100" alt="" /> </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link href="" className="social-icon" target="_blank"> <img src="assets/images/social-icon-3.svg" className="w-100" alt="" /> </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link href="" className="social-icon" target="_blank"> <img src="assets/images/social-icon-4.svg" className="w-100" alt="" /> </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="footer_right_sec">
                <div className="row justify-content-between">
                  <div className="col-md-4 col-lg-auto">
                    <div className="footer-widget" data-aos="fade-up" data-aos-delay="400">
                      <div className="footerTitle text-white mb__10"> Product Categories </div>
                      <div className="footer_linksWrap">
                        <ul className="list-unstyled">
                          {((filterData as any)?.categories || []).map((cat: any) => (
                            <li key={cat.id} className="footer-item mb__5">
                              <Link
                                href="/shop"
                                className="footer-link text-white opacity-8"
                              >
                                {cat.title}
                              </Link>
                            </li>
                          ))}
                        </ul>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-auto">
                    <div className="footer-widget" data-aos="fade-up" data-aos-delay="500">
                      <div className="footerTitle text-white mb__10"> Quick Links </div>
                      <div className="footer_linksWrap">
                        <ul className="list-unstyled">
                          <li className="footer-item mb__5"> <Link href="/about" className="footer-link text-white opacity-8"> About Us </Link></li>
                          <li className="footer-item mb__5"> <Link href="/Imprint" className="footer-link text-white opacity-8"> Imprint </Link></li>
                          <li className="footer-item mb__5"> <Link href="/consultation" className="footer-link text-white opacity-8"> Consultation </Link></li>
                          <li className="footer-item mb__5"> <Link href="/faq" className="footer-link text-white opacity-8"> FAQs </Link></li>
                          <li className="footer-item mb__5"> <Link href="/blog" className="footer-link text-white opacity-8"> Blog </Link></li>
                          <li className="footer-item mb__5"> <Link href="/contact" className="footer-link text-white opacity-8"> Contact </Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-auto">
                    <div className="footer-widget" data-aos="fade-up" data-aos-delay="600">
                      <div className="footerTitle text-white mb__10"> Legal </div>
                      <div className="footer_linksWrap">
                        <ul className="list-unstyled">
                          <li className="footer-item mb__5"> <Link href="/termsConditions" className="footer-link text-white opacity-8"> Terms & Conditions </Link></li>
                          <li className="footer-item mb__5"> <Link href="/privacyPolicy" className="footer-link text-white opacity-8"> Privacy Policy </Link></li>

                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyrightTxt text-center opacity-8 text-white" >

                © 2025 Digital Clinic. All rights reserved. | Licensed Medical Cannabis Provider in Germany
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  );
};

export default Footer;