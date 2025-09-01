import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CartModal from '@/components/Modals/CartModal';
import { useCart } from '@/context/CartContext';
import { useRouter, usePathname } from "next/navigation";
import LoginModal from '@/components/Modals/LoginModal';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [showCartModal, setShowCartModal] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const hideCartRoutes = ["/uploadprescription", "/onlineprescription", "/consultation"];
    const hideCart = hideCartRoutes.includes(pathname);
    const { summary } = useCart();
    const { fetchCartData } = useCart();
    const logoutSubmit = () => {
        logout();
        fetchCartData();
    };
    return (
        <>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            <header className="header">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid">
                                <Link className="navbar-brand" href="/">
                                    <img src="assets/images/Digital-Clinic-Area_logo.png" className="w-100" alt="" />
                                </Link >
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
                                </div>
                                <div className="head_right_sec d-flex gap-2 gap-md-3">
                                    <ul className="list-inline mb-0 headTopicon">
                                        <li>
                                            <Link href="tel:+49123456789" className='headIcon'><i className="cb-icon cb-phone"></i></Link>
                                        </li>
                                        <li>
                                            <div className="dropdown userDropdown">
                                                <a className='headIcon' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="cb-icon cb-user"></i>
                                                </a>

                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    {user ? (
                                                        <>
                                                            <li className='mb__5 d-grid'><span className='clr-green f-w-SB text-truncate'>Hello, <span>{user.name}</span></span></li>
                                                            <li className="d-inline-flex w-100 mb__10">
                                                                <Link href="/dashboard" className="btn cb_cmnBtn btn-o px-4 w-100"> Dashboard </Link >
                                                            </li>
                                                            <li className="d-inline-flex w-100"> <Link href={''} onClick={logoutSubmit} className="btn cb_cmnBtn px-4 w-100"> Logout </Link >
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li className="d-inline-flex w-100">
                                                                <Link href="/login" className="btn cb_cmnBtn px-4 w-100"> Login </Link >
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                    {!hideCart && (
                                        <div>
                                            <button className="cartButtonTop" onClick={() => {
                                                if (user) {
                                                    setShowCartModal(true);
                                                } else {
                                                    setShowLogin(true);
                                                }
                                            }}>
                                                <i className="cb-icon cb-cart"></i>
                                                <span className="proNoBadge d-md-none">{summary.total_items}</span>
                                                {summary && (
                                                    <>
                                                        {user ? (
                                                            <span className="cartBadge d-none d-md-inline-block ms-2">
                                                                {summary.total_items} | €{Number(summary.total_cart_price || 0).toFixed(2)}
                                                            </span>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </>
                                                )}

                                            </button>
                                            {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
                                        </div>
                                    )}
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
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