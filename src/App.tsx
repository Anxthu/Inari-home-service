import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Book = lazy(() => import('./pages/Book'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Auth = lazy(() => import('./pages/Auth'));
const ProDashboard = lazy(() => import('./pages/ProDashboard'));
const Profile = lazy(() => import('./pages/Profile'));

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import ProNavbar from './components/ProNavbar';

function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  
  // Hide Navbar and Footer on the Auth page
  const hideNavFooter = location.pathname === '/auth';
  const isPro = user?.role === 'professional';
  const isProRoute = location.pathname.startsWith('/pro-dashboard') || (isPro && location.pathname === '/profile');

  return (
    <>
      <ScrollToTop />
      {!hideNavFooter && (isPro ? <ProNavbar /> : <Navbar />)}
      
      <div className="flex-grow">
        <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<PageTransition>{user?.role === 'professional' ? <Navigate to="/pro-dashboard" /> : <Home />}</PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              
              <Route path="/book/:serviceId?" element={<PageTransition><Book /></PageTransition>} />
              <Route path="/auth" element={<PageTransition>{user ? <Navigate to={user.role === 'professional' ? '/pro-dashboard' : '/dashboard'} /> : <Auth />}</PageTransition>} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<PageTransition>{user?.role === 'customer' ? <Dashboard /> : <Navigate to="/auth" />}</PageTransition>} />
              <Route path="/pro-dashboard" element={<PageTransition>{user?.role === 'professional' ? <ProDashboard /> : <Navigate to="/auth" />}</PageTransition>} />
              <Route path="/pro-dashboard/earnings" element={<PageTransition>{user?.role === 'professional' ? <ProDashboard /> : <Navigate to="/auth" />}</PageTransition>} />
              <Route path="/profile" element={<PageTransition>{user ? <Profile /> : <Navigate to="/auth" />}</PageTransition>} />
              
              {/* 404 Catch-all */}
              <Route path="*" element={
                <PageTransition>
                  <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
                    <div className="text-center px-6">
                      <h1 className="text-[120px] md:text-[180px] font-black text-slate-100 leading-none tracking-tighter">404</h1>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#283628] -mt-6 mb-4">Page not found</h2>
                      <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
                      <a href="/" className="inline-flex items-center gap-2 bg-[#283628] text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors">Go Home</a>
                    </div>
                  </div>
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>

      {/* Global WhatsApp FAB (Hidden on booking flow to reduce distraction) */}
      {!location.pathname.startsWith('/book') && (
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:shadow-green-500/30"
          aria-label="WhatsApp Support"
          onClick={(e) => { e.preventDefault(); alert('WhatsApp support coming soon!'); }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </a>
      )}

      {!hideNavFooter && !isProRoute && <Footer />}
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as any).lenis = lenis;

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-slate-900 overflow-hidden font-sans selection:bg-accent-green selection:text-white flex flex-col relative">
        <LoadingScreen onComplete={() => setIsLoading(false)} />
        
        {!isLoading && <AppRoutes />}
      </div>
    </AuthProvider>
  );
}

export default App;
