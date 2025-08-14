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
    const [error, setError] = useState('');
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
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
                        required
                        value={fname}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="lname"
                        className="form-control cst-form-f"
                        required
                        value={lname}
                        onChange={(e) => setlName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        className="form-control cst-form-f"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
 
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control cst-form-f"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
 
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control cst-form-f"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
 
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control cst-form-f"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
 
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control cst-form-f"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
 
                <button type="submit" className="btn cb_cmnBtn w-100">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='mt-2 text-center'><Link href="/login" className='text-black '>Already have an account? <span className='clr-green'>Login</span></Link></div>
        </div>
          </div>
        </div>
        </div>
        </div>
    );
};
 
export default Register;