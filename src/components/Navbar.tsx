import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, X, UserCircle, LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden relative z-50 flex items-center justify-center text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" className="flex-shrink-0 relative z-50 mr-4">
              <img src="Inari%20Logo_black.png" alt="Inari" className="h-6 transition-all" />
            </Link>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 mr-4">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`transition-colors ${
                    location.pathname === link.to 
                      ? 'text-[#283628] font-bold' 
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="hidden xl:flex flex-1 max-w-[300px] bg-white rounded-full items-center justify-between pl-5 pr-1.5 py-1.5 border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-slate-400"
              />
              <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0">
                <Search size={16} />
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 self-end md:self-auto">
            
            <Link 
              to="/services" 
              className="px-6 py-2.5 bg-[#283628] text-white rounded-full font-bold text-sm hover:bg-black transition-colors shadow-sm hidden lg:block"
            >
              Book Now
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="pl-4 pr-1 py-1 rounded-full bg-white flex items-center gap-3 border border-slate-200/60 shadow-sm hover:bg-slate-50 transition-colors ml-2"
                aria-label="Toggle user profile menu"
                aria-expanded={isProfileDropdownOpen}
              >
                <span className="text-sm font-semibold text-slate-700">{user ? user.name.split(' ')[0] : 'Account'}</span>
                <img 
                  src={user ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop" : "https://ui-avatars.com/api/?name=User&background=f1f5f9&color=64748b"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 flex flex-col z-50 overflow-hidden">
                  {user ? (
                    <>
                      <Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <UserCircle size={16} /> My Profile
                      </Link>
                      <Link to={user.role === 'professional' ? '/pro-dashboard' : '/dashboard'} onClick={() => setIsProfileDropdownOpen(false)} className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <LayoutDashboard size={16} /> {user.role === 'professional' ? 'Pro Workspace' : 'My Bookings'}
                      </Link>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button onClick={() => { logout(); setIsProfileDropdownOpen(false); }} className="px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 text-left transition-colors">
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setIsProfileDropdownOpen(false)} className="px-4 py-3 text-sm font-bold text-[#283628] hover:bg-[#FAFAFC] flex items-center gap-2 transition-colors">
                      <UserCircle size={16} /> Login / Sign Up
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } pt-24 px-6 pb-8 flex flex-col md:hidden`}
      >
        <div className="bg-white rounded-full flex items-center justify-between pl-6 pr-2 py-2 border border-slate-200/60 shadow-sm mb-8">
          <input 
            type="text" 
            placeholder="Search coming soon..." 
            disabled
            className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-slate-400 opacity-50 cursor-not-allowed"
          />
          <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            <Search size={16} />
          </button>
        </div>

        <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 rounded-2xl bg-[#283628] text-white text-center text-lg font-bold mb-6 block hover:bg-black transition-colors">
          Book Now
        </Link>

        <nav className="flex flex-col gap-6 text-2xl font-bold tracking-tight text-slate-900">
          <Link to="/" className="pb-4 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" className="pb-4 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/about" className="pb-4 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="pb-4 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </nav>

        <div className="mt-auto space-y-4 pt-8">
          {user ? (
            <div className="space-y-2">
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-bold text-slate-900 bg-slate-50 p-3 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                  <UserCircle size={20} />
                </div>
                My Profile
              </Link>
              <Link to={user.role === 'professional' ? '/pro-dashboard' : '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-bold text-slate-900 bg-slate-50 p-3 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                  <LayoutDashboard size={20} />
                </div>
                {user.role === 'professional' ? 'Pro Workspace' : 'My Bookings'}
              </Link>
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-4 mt-2 rounded-xl border-2 border-red-100 text-lg font-bold text-red-600 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 rounded-xl border-2 border-slate-200 text-lg font-bold text-slate-900 flex items-center justify-center hover:bg-slate-50">
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
