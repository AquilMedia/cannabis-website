import Loader from '@/components/common/Loader';
import { getContactUsData, saveContactForm } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface ContactData {
    slug: string;
    title: string;
    content: string;
    contents: ContactContent[];
    meta_description?: string;
}
interface ContactContent {
    id: number;
    slug: string;
    title: string;
    description: string;
    position: string;
    section: string;
    content: string;
    status: boolean;
}
const Contact: React.FC = () => {
    const [contactData, setContactData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const contactInfoSection = contactData?.contents.find(
        (item) => item.position === "1" && item.status
    );
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });
    const [error, setError] = useState<{
        fname?: string;
        lname?: string;
        phone?: string;
        email?: string;
        subject?: string;
        message?: string;
    }>({});
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response: ContactData = await getContactUsData();
                setContactData(response);
                console.log("Contact Us Data:", response?.content);
            } catch (err: any) {
                toast.error(err.message || "Failed to load Contact Us data");
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        validateField(id, value);
    };
    const validateField = (name: string, value: string) => {
        let message = "";

        if (name === "fname") {
            if (!value.trim()) message = "First name is required";
            else if (!/^[A-Za-z]+$/.test(value.trim())) message = "Invalid first name";
        }

        if (name === "lname") {
            if (!value.trim()) message = "Last name is required";
            else if (!/^[A-Za-z]+$/.test(value.trim())) message = "Invalid last name";
        }

        if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) message = "Enter a valid email address";
        }

        if (name === "phone") {
            if (!value.trim()) message = "Phone number is required";
            else if (!/^\d{5,15}$/.test(value)) message = "Enter a valid phone number";
        }

        if (name === "subject") {
            if (!value.trim()) message = "Subject is required";
        }

        if (name === "message") {
            if (!value.trim()) message = "Message is required";
        }

        setError((prev) => ({ ...prev, [name]: message }));
        return message === "";
    };
    const validateForm = () => {
        const validations = Object.entries(formData).map(([key, value]) =>
            validateField(key, value)
        );
        return validations.every((v) => v === true);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            name: `${formData.fname} ${formData.lname}`,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
        };

        try {
            await saveContactForm(payload);

            toast.success("Message sent successfully!");
            setFormData({ fname: "", lname: "", phone: "", email: "", subject: "", message: "" });
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send message");
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
                                        <div className="bannerHeading f-size-60 text-white f-w-B line_H_1" data-aos="fade-up">    {contactData?.title} </div>
                                        <div className="txtSummary f-size-18 text-white" data-aos="fade-up">{contactData?.content} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="secWrap">
                        <div className="container">
                            <div className="row row-gap-3">
                                <div className="col-md-12 col-lg-7">
                                    <div className='cb_cardStyle_1' data-aos="fade-up">
                                        <div className="mb__25">
                                            <div className="text-black f-size-22 f-w-SB">Get In Touch</div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="fname">First Name</label>
                                                        <input
                                                            type="text"
                                                            id="fname"
                                                            className="form-control cst-form-f"
                                                            value={formData.fname}
                                                            onChange={handleChange}
                                                        />
                                                        {error.fname && <span className="errorMsg">{error.fname}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lname">Last Name</label>
                                                        <input
                                                            type="text"
                                                            id="lname"
                                                            className="form-control cst-form-f"
                                                            value={formData.lname}
                                                            onChange={handleChange}
                                                        />
                                                        {error.lname && <span className="errorMsg">{error.lname}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Phone Number</label>
                                                        <input
                                                            type="text"
                                                            id="phone"
                                                            className="form-control cst-form-f"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                        />
                                                        {error.phone && <span className="errorMsg">{error.phone}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email Address</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            className="form-control cst-form-f"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                        {error.email && <span className="errorMsg">{error.email}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="subject">Subject</label>
                                                        <input
                                                            type="text"
                                                            id="subject"
                                                            className="form-control cst-form-f"
                                                            value={formData.subject}
                                                            onChange={handleChange}
                                                        />
                                                        {error.subject && <span className="errorMsg">{error.subject}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="message">Message</label>
                                                        <textarea
                                                            id="message"
                                                            rows={3}
                                                            className="form-control cst-form-f"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                        />
                                                        {error.message && <span className="errorMsg">{error.message}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button type="submit" className="btn cb_cmnBtn">
                                                    Send Message
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-5">
                                    <div className='cb_cardStyle_1 h-100' data-aos="fade-up">
                                        <div className="mb__25">
                                            <div className="text-black f-size-22 f-w-SB"> {contactInfoSection?.title}</div>
                                            <div>{contactInfoSection?.description} </div>
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: contactInfoSection?.content || '' }} />
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

export default Contact;