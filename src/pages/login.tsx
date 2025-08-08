// pages/login.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/user';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
const Login: React.FC = () => {
    const { user, login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await loginUser({ email, password });
            const fullUser = { ...response.data.user, token: response.data.token }; // include token
            login(fullUser);
            toast.success('Login successful');
            router.push('/');
        } catch (err: any) {
            toast.error(err.message || 'Login failed');
            setError(err.message || 'Login failed');
        }
    };

    if (user) {
        return (
            <div className="login-page">
                <h1>You are already logged in as {user.name}</h1>
                <Link href="/">Go to Home</Link>
            </div>
        );
    }

    return (

        <div className="login-page">
            <h1>Login</h1>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link href="/register">Don't have an account? Register</Link>
            <style jsx>{`
  .login-page {
    max-width: 400px;
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
`}</style>

        </div>
    );
};

export default Login;
