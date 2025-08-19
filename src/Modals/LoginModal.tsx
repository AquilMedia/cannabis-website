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
  const [error, setError] = useState<{ 
      email?: string;
      password?: string; 
  }>({});
   const [showPassword, setShowPassword] = useState({
    password: false,
    });
        const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

   const validateField = (name: string, value: string) => {
     let message = "";
      if (name === "email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) message = "Enter a valid email address";
      }

      if (name === "password") {
          if (value.length < 6) message = "Password must be at least 6 characters";
      }

      setError((prev) => ({ ...prev, [name]: message }));

      return message === "";
  }

   const validateForm = () => {
        const validations = [
        validateField('email', email),
        validateField('password', password),
        ];
        return validations.every((isValid) => isValid);
    };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
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
      className='row g-0'
    >
      <div className="cb_cardStyle_1 bg-white col-4" style={{ position: 'relative' }}>
        <h1 className='f-w-M text-center f-size-24 mb-4 pb-1 text-black'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="modal-email">Email:</label>
            <input
              type="email"
              id="modal-email"
              className="form-control form-control cst-form-f"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
            />
            {error.email && <span className='errorMsg'>{error.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="modal-password">Password:</label>
            <div className="icon_field">
            <input
              type={showPassword.password ? "text" : "password"}
              id="modal-password"
              className="form-control form-control cst-form-f"
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
          <button type="submit" className="btn cb_cmnBtn w-100" disabled={loading}>
             {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                "Login"
              )}
          </button>
        </form>

        <div className='mt-2 text-center text-black'>Don't have an account?<Link href="/register" className='clr-green text-decoration-underline'> Register</Link></div>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'transparent',
            border: 'none',
            fontSize: 25,
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
