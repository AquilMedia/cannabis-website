import Link from 'next/link';
import React from 'react';

const forgotpassword: React.FC = () => {
    return (
        <div className='loginWrp'>
            <div className="container">
                <div className='row justify-content-center'>
                    <div className="col-md-7 col-lg-5">
                        <div className="cb_cardStyle_1 my-5">
                            <h1 className='f-w-M text-center f-size-24 mb-4 pb-1 text-black'>Forgot Password</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control form-control cst-form-f" 
                                    />
                                </div>
                                <button type="submit" className="btn cb_cmnBtn w-100">Send Email</button>
                            </form>
                            <div className='mt-2 text-center text-black'>Back to<Link href="/login" className='clr-green text-decoration-underline'> Login</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forgotpassword;