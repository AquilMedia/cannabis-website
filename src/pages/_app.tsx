import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/assets/css/cb-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../public/assets/css/stylesheet.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LikeProvider } from '../context/LikeContext';
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';


function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
    const router = useRouter();
    const noLayoutRoutes = ['/login', '/register'];
    const hideLayout = noLayoutRoutes.includes(router.pathname);

    useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

    const content = hideLayout ? (
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

    return (
        <AuthProvider>
            <LikeProvider>{content}</LikeProvider>
        </AuthProvider>
    );
}

export default MyApp;