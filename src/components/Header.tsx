import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
    // const { likes } = useLike();
    // const { user, logout } = useAuth();

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="assets/images/Digital-Clinic-Area_logo.png" className="w-100" alt="" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                            <div className="navMng-In mx-auto">
                            <ul className="navbar-nav me-auto ms-auto">
                            <li className="nav-item">
                                <a className="nav-link f-size-18 f-w-M" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link f-size-18 f-w-M" href="/shop">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link f-size-18 f-w-M" href="/about">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link f-size-18 f-w-M" href="/blog">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link f-size-18 f-w-M" href="/contact">Contact Us</a>
                            </li>
                            </ul>
                            </div>
                            <div className="head_right_sec">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                <a href="tel:+49123456789" className="d-flex gap-1 align-items-center">
                                    <div className="call_icon">
                                    <img src="images/call-icon.svg" className="w-100" alt="" />
                                    </div>
                                    <div className="call_txt primary-clr">
                                    +49 123 456 789
                                    </div>
                                </a>
                                </li>
                                <li className="list-inline-item">
                                <a href="/login" className="login_btn f-size-18 f-w-M line_H_1"> Login </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;