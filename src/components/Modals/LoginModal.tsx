import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { login } = useAuth();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login();
        onClose();
    };

    useEffect(() => {
        // Auto-close modal after 30 seconds
        const timer = setTimeout(onClose, 30000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                background: '#fff',
                padding: 32,
                borderRadius: 8,
                minWidth: 320,
                boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
                position: 'relative'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </form>
                <Link href="/register" className="register-link">
                    Don't have an account? Register
                </Link>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 20,
                        cursor: 'pointer'
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default LoginModal;