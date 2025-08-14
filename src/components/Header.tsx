import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CartModal from '@/Modals/CartModal';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [showCartModal, setShowCartModal] = useState(false);
const { summary } = useCart();
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <Link className="navbar-brand" href="/">
                                    <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/assets/images/Digital-Clinic-Area_logo.png`} className="w-100" alt="" />
                                </Link >
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                                    <div className="navMng-In mx-auto">
                                        <ul className="navbar-nav me-auto ms-auto">
                                            <li className="nav-item">
                                                <Link className="nav-link f-size-18 f-w-M" href="/">Home</Link >
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link f-size-18 f-w-M" href="/shop">Shop</Link >
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link f-size-18 f-w-M" href="/about">About Us</Link >
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link f-size-18 f-w-M" href="/blog">Blog</Link >
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link f-size-18 f-w-M" href="/contact">Contact Us</Link >
                                            </li>

                                        </ul>
                                    </div>

                                    <div className="head_right_sec">
                                        <ul className="list-inline mb-0 headTopicon">
                                            {/* <li className="list-inline-item">
                                                <Link href="tel:+49123456789" className="d-flex gap-1 align-items-center">
                                                    <div className="call_icon">
                                                        <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/assets/images/call-icon.svg`} className="w-100" alt="" />
                                                    </div>
                                                    <div className="call_txt primary-clr">
                                                        +49 123 456 789
                                                    </div>
                                                </Link >
                                            </li> */}

                                            <li>
                                                <Link href="tel:+49123456789" className='headIcon'><i className="cb-icon cb-phone"></i></Link>
                                            </li>
                                            <li>
                                                <div className="dropdown userDropdown">
                                                    <a  className='headIcon' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="cb-icon cb-user"></i>
                                                    </a>

                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                        {user ? (
                                                            <>
                                                                <li className='mb__5 d-grid'><span className='clr-green f-w-SB text-truncate'>Hello, <span>{user.name}</span></span></li>
                                                                <li className="d-inline-flex w-100"> <Link href={''} onClick={logout} className="login_btn f-size-18 f-w-M line_H_1 w-100 text-center"> Logout </Link >
                                                                </li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <li className="d-inline-flex w-100">
                                                                    <Link href="/login" className="login_btn f-size-18 f-w-M line_H_1 w-100 text-center"> Login </Link >
                                                                </li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>

                                </div>

                                <div className="ms-3">
                                    <button className="cartButtonTop" onClick={() => setShowCartModal(true)}>
                                        <i className="cb-icon cb-cart me-2"></i>
                                        {summary && (
                                          <span className="cartBadge">
                                                {summary.total_items} | €
                                                {Number(summary.total_cart_price || 0).toFixed(2)}
                                            </span>
                                        )}
                                    </button>
                                    {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
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