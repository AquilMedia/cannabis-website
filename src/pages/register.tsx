// pages/register.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { registerUser } from '@/services/user';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Register: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
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
            await registerUser({ name, email, password, phone });
            router.push('/login');
            toast.success('Registration successful');
        } catch (err: any) {
             toast.error(err.message || 'Registration failed');
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="login-page">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link href="/login">Already have an account? Login</Link>
            <style jsx>{`
  .login-page {
    max-width: 450px;
    margin: 60px auto;
    padding: 30px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .login-page h1 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: #444;
  }

  .form-control {
    width: 100%;
    padding: 10px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-control:focus {
    border-color: #318138;
  }

  .btn-primary {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #318138;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .btn-primary:hover {
    background-color: #245a29ff;
  }

  a {
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #318138;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    text-align: center;
    margin-top: 10px;
  }
`}</style>

        </div>
    );
};

export default Register;
