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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await loginUser({ email, password });
      const fullUser = { ...response.data.user, token: response.data.token };
      login(fullUser);
      toast.success('Login successful');
      router.push('/');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
      setError(err.message || 'Login failed');
    }
  };
 
  // if (user) {
  //   return (
  //     <div className="login-page">
  //       <h1>You are already logged in as {user.name}</h1>
  //       <Link href="/">Go to Home</Link>
  //     </div>
  //   );
  // }
 
  return (
  <div className='loginWrp'>
    <div className="container">
      <div className='row justify-content-center'>
        <div className="col-md-7 col-lg-5">
          <div className="cb_cardStyle_1 my-5">
            <h1 className='f-w-M text-center f-size-24 mb-4 pb-1 text-black'>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control form-control cst-form-f" 
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value)
                    validateField("email", e.target.value);
                  }} 
                />
                {error.email && <span className='errorMsg'>{error.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="icon_field">
                <input 
                  type={showPassword.password ? "text" : "password"}
                  id="password" 
                  className="form-control form-control cst-form-f" 
                  value={password} 
                  onChange={(e) => {
                    setPassword(e.target.value)
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
                   <div className='text-end mt-1 f-size-14'><Link href="/forgotpassword" className='clr-green text-decoration-underline'>Forgot Password</Link></div>
              </div>
              <button type="submit" className="btn cb_cmnBtn w-100">Login</button>
            </form>
             
             <div className='mt-2 text-center text-black'>Don't have an account? <Link href="/register" className='clr-green text-decoration-underline'><span>Register</span></Link></div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
 
export default Login;