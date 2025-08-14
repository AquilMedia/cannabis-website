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
      const fullUser = { ...response.data.user, token: response.data.token };
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
  <div className='loginWrp'>
    <div className="container">
      <div className='row justify-content-center'>
        <div className="col-md-7 col-lg-5">
          <div className="cb_cardStyle_1 my-5">
            <h1 className='f-w-M text-center f-size-24 mb-4 pb-1 text-black'>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="form-control form-control cst-form-f" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" className="form-control form-control cst-form-f" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn cb_cmnBtn w-100">Login</button>
            </form>
             <div className='mt-2 text-center'><Link href="/register" className='text-black'>Don't have an account?  <span className='clr-green'>Register</span></Link></div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
 
export default Login;