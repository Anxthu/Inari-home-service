import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, IndianRupee, UserCircle, HelpCircle, Bell, LogOut, Menu, X } from 'lucide-react';

export default function ProNavbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/pro-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/pro-dashboard/earnings', label: 'Earnings', icon: IndianRupee },
    { to: '/profile', label: 'Profile', icon: UserCircle },
    { to: '/contact', label: 'Help', icon: HelpCircle },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-sm' : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/pro-dashboard" className="flex items-center gap-3 relative z-50">
            <img src="/logo-black.png" alt="Inari" className="h-6 md:h-7" />
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-[#283628] text-white text-[10px] font-bold uppercase tracking-wider">Pro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to || 
                (link.to === '/pro-dashboard' && location.pathname === '/pro-dashboard');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                    isActive 
                      ? 'bg-[#E8EDE8] text-[#283628]' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-200/50">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200/50 hover:bg-slate-100 transition-colors"
                aria-label="Toggle user profile menu"
                aria-expanded={isProfileOpen}
              >
                <div className="w-8 h-8 rounded-full bg-[#283628] text-white flex items-center justify-center text-xs font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name.split(' ')[0]}</p>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Online</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden">
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                    <UserCircle size={16} /> Settings
                  </Link>
                  <div className="h-px bg-slate-100 my-1" />
                  <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 text-left transition-colors">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } pt-24 px-6 pb-8 flex flex-col md:hidden`}
      >
        <nav className="flex flex-col gap-2 mt-4">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-colors ${
                  isActive ? 'bg-[#E8EDE8] text-[#283628]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#283628] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Icon size={20} />
                </div>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 space-y-3">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#283628] text-white flex items-center justify-center font-bold text-lg">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{user?.name}</p>
              <p className="text-sm font-bold text-green-600">Online · Accepting Jobs</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); setIsMobileMenuOpen(false); }}
            className="w-full py-4 rounded-xl border-2 border-red-100 text-lg font-bold text-red-600 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
