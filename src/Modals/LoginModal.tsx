import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { loginUser } from '@/services/user';
import { toast } from 'react-toastify';

const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const fullUser = { ...response.data.user, token: response.data.token };
      login(fullUser);
      toast.success('Login successful');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div className="login-page" style={{ position: 'relative' }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="modal-email">Email:</label>
            <input
              type="email"
              id="modal-email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-password">Password:</label>
            <input
              type="password"
              id="modal-password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <Link href="/register">Don't have an account? Register</Link>
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
        <style jsx>{`
          .login-page {
            max-width: 400px;
            margin: 0 auto;
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
    </div>
  );
};

export default LoginModal;
