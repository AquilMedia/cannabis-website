import React, { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/services/user';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Register: React.FC = () => {
    const router = useRouter();
    const [fname, setName] = useState('');
    const [lname, setlName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<{ 
        fname?: string; 
        lname?: string; 
        dob?: string; 
        email?: string; 
        phone?: string; 
        password?: string; 
        confirmPassword?: string; 
    }>({});

     const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    });
        const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };
 
  const validateField = (name: string, value: string) => {
        let message = "";

        if (name === "fname") {
            if (!value.trim()) message = "First name is required";
            else if (!/^[A-Za-z]+$/.test(value.trim())) message = "Invalid name";
        }

        if (name === "lname") {
            if (!value.trim()) message = "Last name is required";
            else if (!/^[A-Za-z]+$/.test(value.trim())) message = "Invalid name";
        }
        if (name === "dob") {
        if (!value.trim()) {
            message = "Date of birth is required";
        } else {
            const dob = new Date(value);
            if (dob.toString() === "Invalid Date") {
            message = "Please enter a valid date";
            } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (dob > today) {
                message = "Date of birth cannot be in the future";
            }
            }
        }
        }
        if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) message = "Enter a valid email address";
        }

        if (name === "phone") {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) message = "Enter a valid 10-digit phone number";
        }

        if (name === "password") {
            if (value.length < 6) message = "Password must be at least 6 characters";
        }

        if (name === "confirmPassword") {
            if (value !== password) message = "Passwords do not match";
        }

        setError((prev) => ({ ...prev, [name]: message }));

        return message === "";
};

    const validateForm = () => {
        const validations = [
        validateField('fname', fname),
        validateField('lname', lname),
        validateField('dob', dob),
        validateField('email', email),
        validateField('phone', phone),
        validateField('password', password),
        validateField('confirmPassword', confirmPassword),
        ];
        return validations.every((isValid) => isValid);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
           const name = `${fname} ${lname}`;
            await registerUser({ name, dob, email, password, phone });
            router.push('/login');
            toast.success('Registration successful');
        } catch (err: any) {
             toast.error(err.message || 'Registration failed');
            setError(err.message || 'Registration failed');
        }
    };
 
    return (
        <div className='loginWrp'>
          <div className="container">
          <div className='row justify-content-center'>
          <div className="col-md-7 col-lg-5">
              <div className=" cb_cardStyle_1 my-5">
            <h1 className='f-w-M text-center f-size-24 mb-4 pb-1 text-black'>Register</h1>
 
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="fname"
                        className="form-control cst-form-f"
                        value={fname}
                        onChange={(e) => {
                            setName(e.target.value)
                            validateField("fname", e.target.value);
                        }}
                    />
                    {error.fname && <span className='errorMsg'>{error.fname}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        className="form-control cst-form-f"
                        value={lname}
                        onChange={(e) => {
                            setlName(e.target.value);
                            validateField("lname", e.target.value);
                        }}
                    />
                    {error.lname && <span className='errorMsg'>{error.lname}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        className="form-control cst-form-f"
                        value={dob}
                        onChange={(e) => {
                            setDob(e.target.value);
                            validateField("dob", e.target.value);
                        }}
                    />
                    {error.dob && <span className='errorMsg'>{error.dob}</span>}
                </div>
 
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control cst-form-f"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            validateField("email", e.target.value);
                        }}
                    />
                    {error.email && <span className='errorMsg'>{error.email}</span>}
                </div>
 
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control cst-form-f"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value.replace(/[^0-9]/g, ""));
                             validateField("phone", e.target.value);
                        }}
                    />
                    {error.phone && <span className='errorMsg'>{error.phone}</span>}
                </div>
 
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="icon_field">
                    <input
                        type={showPassword.password ? "text" : "password"}
                        id="password"
                        className="form-control cst-form-f"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                             validateField("password", e.target.value);
                        }}
                    />
                    <button
                        type="button"
                        className="btn p-0 border-0 fieldIcon"
                        onClick={() => togglePassword("password")}
                    >
                        <i
                        className={`cb-icon ${
                            showPassword.password ? "cb-show" : "cb-hide"
                        }`}
                        ></i>
                    </button>
                    </div>
                    {error.password && <span className='errorMsg'>{error.password}</span>}
                </div>
 
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="icon_field">
                    <input
                        type={showPassword.confirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="form-control cst-form-f"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            validateField("confirmPassword", e.target.value);
                        }}
                    />
                    <button
                        type="button"
                        className="btn p-0 border-0 fieldIcon"
                        onClick={() => togglePassword("confirmPassword")}
                    >
                        <i
                        className={`cb-icon ${
                            showPassword.confirmPassword ? "cb-show" : "cb-hide"
                        }`}
                        ></i>
                    </button>
                    </div>
                    {error.confirmPassword && <span className='errorMsg'>{error.confirmPassword}</span>}
                </div>
 
                <button type="submit" className="btn cb_cmnBtn w-100">Register</button>
            </form>
            <div className='mt-2 text-center text-black'>Already have an account?<Link href="/login" className='clr-green text-decoration-underline'> Login</Link></div>
        </div>
          </div>
        </div>
        </div>
        </div>
    );
};
 
export default Register;