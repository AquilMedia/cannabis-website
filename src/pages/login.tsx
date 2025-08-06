import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const { user, login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        router.push('/'); 
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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link href="/register" className="register-link">
                Don't have an account? Register
            </Link>
        </div>
    );
};

export default Login;