import React from 'react';
import Link from 'next/link';

const Register: React.FC = () => {
    return (
        <div className="login-page">
            <h1>Register</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <Link href="/login" className="register-link">
                Already have an account? Login
            </Link>
        </div>
    );
};

export default Register;