import { forgotPassword, updateresetPasswordFront } from '@/services/user';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [otpToken, setOtpToken] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [error, setError] = useState<{
        email?: string;
        otp?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});
    const [resendTimer, setResendTimer] = useState(0);
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        validateField(id, value);
    };
    const validateField = (name: string, value: string) => {
        let message = "";

        if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) message = "Enter a valid email address";
        }

        if (name === "otp" && step === 2) {
            if (!value.trim()) message = "OTP is required";
        }

        if (name === "newPassword" && step === 3) {
            if (!value.trim()) message = "Password is required";
            else if (value.length < 6) message = "Password must be at least 6 characters";
        }

        if (name === "confirmPassword" && step === 3) {
            if (value !== formData.newPassword) message = "Passwords do not match";
        }

        setError((prev) => ({ ...prev, [name]: message }));
        return message === "";
    };
    const validateForm = () => {
        let fields: string[] = [];
        if (step === 1) fields = ["email"];
        else if (step === 2) fields = ["email", "otp"];
        else if (step === 3) fields = ["newPassword", "confirmPassword"];

        const validations = fields.map((field) => validateField(field, formData[field as keyof typeof formData]));
        return validations.every((v) => v === true);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            if (step === 1) {
                await forgotPassword({ email: formData.email });
                toast.success("OTP sent to your email!");
                setStep(2);
                setResendTimer(120);

            } else if (step === 2) {
                const response = await forgotPassword({
                    email: formData.email,
                    otp: Number(formData.otp),
                });

                if (response?.data?.token) {
                    setOtpToken(response.data.token);
                }

                toast.success("OTP verified! Enter your new password.");
                setStep(3);

            } else if (step === 3) {
                if (!otpToken) {
                    toast.error("OTP token missing. Please verify OTP again.");
                    return;
                }
                const data = {
                    newPassword: formData.newPassword
                };
                await updateresetPasswordFront(data, otpToken);
                toast.success("Password reset successfully!");
                router.push("/login");
                setStep(1);
                setFormData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
                setOtpToken(null);
            }

        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed");
        } finally {
            setLoading(false);
        }
    };
    const handleResendOtp = async () => {
        if (resendTimer > 0) return;
        try {

            await forgotPassword({ email: formData.email });
            toast.success("OTP resent successfully!");
            setResendTimer(120);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <div className='loginWrp'>
            <div className="container">
                <div className='row justify-content-center'>
                    <div className="col-md-7 col-lg-5">
                        <div className="cb_cardStyle_1 my-5">
                            <h1 className='f-w-M text-center f-size-24 mb-4 pb-1 text-black'>Forgot Password</h1>
                            <form onSubmit={handleSubmit}>
                                {step >= 1 && (
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control cst-form-f"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={step > 1}
                                        />
                                        {error.email && <span className='errorMsg'>{error.email}</span>}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="form-group mb-3">
                                        <label htmlFor="otp">OTP</label>
                                        <input
                                            type="text"
                                            id="otp"
                                            className="form-control cst-form-f"
                                            value={formData.otp}
                                            onChange={handleChange}
                                        />
                                        {error.otp && <span className='errorMsg'>{error.otp}</span>}
                                        <div className='mt-2'>
                                            {loading && (
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                            )}

                                            <button
                                                type="button"
                                                className="btn btn-link p-0"
                                                onClick={handleResendOtp}
                                                disabled={resendTimer > 0 || loading}
                                            >
                                                Resend OTP {resendTimer > 0 ? `(${resendTimer}s)` : ""}
                                            </button>

                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <>
                                        <div className="form-group mb-3">
                                            <label htmlFor="newPassword">New Password</label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                className="form-control cst-form-f"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                            />
                                            {error.newPassword && <span className='errorMsg'>{error.newPassword}</span>}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                className="form-control cst-form-f"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                            {error.confirmPassword && <span className='errorMsg'>{error.confirmPassword}</span>}
                                        </div>
                                    </>
                                )}

                                <button type="submit" className="btn cb_cmnBtn w-100" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : null}
                                    {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
                                </button>

                            </form>

                            <div className='mt-2 text-center text-black'>
                                Back to <Link href="/login" className='clr-green text-decoration-underline'>Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
