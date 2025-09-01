import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/assets/css/cb-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../public/assets/css/stylesheet.css';
import type { AppProps } from 'next/app';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { CartProvider } from '@/context/CartContext';
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .catch((err) => console.error('Bootstrap JS load failed', err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Head>
          <link rel="icon" href="assets/favicon.ico" />
        </Head>
        <AppContent Component={Component} pageProps={pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </AuthProvider>
  );
}

type AppContentProps = {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
};

function AppContent({ Component, pageProps }: AppContentProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const noLayoutRoutes = [''];
  const hideLayout = noLayoutRoutes.includes(router.pathname);
  const protectedRoutes = ["/dashboard", "/onlineprescription", "/uploadprescription", "/consultation"];

  useEffect(() => {
    if (loading) return;

    if (protectedRoutes.includes(router.pathname) && !user) {
      router.replace("/");
    }
  }, [router.pathname, user, loading]);

  return hideLayout ? (
    <Component {...pageProps} />
  ) : (
    <div className="body-wrapper">
      <Header />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}



export default MyApp;
