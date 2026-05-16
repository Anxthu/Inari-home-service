import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFC] pt-12 md:pt-24 relative overflow-hidden flex flex-col min-h-[80vh]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full relative z-10 flex-grow flex flex-col justify-between">
        
        {/* Dark CTA Box */}
        <div className="bg-[#1A1A1A] text-white rounded-[40px] p-12 md:p-24 text-center relative flex flex-col items-center justify-center min-h-[450px] shadow-2xl overflow-hidden mt-8">
          
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="relative z-10 w-full flex flex-col items-center flex-grow justify-center pb-12">
            <h2 className="text-4xl md:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.05] mb-8 max-w-3xl mx-auto">
              Your home deserves <br className="hidden md:block" /> better care.
            </h2>
            <Link to="/services" className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-200 transition-colors shadow-lg">
              Book a service <ArrowUpRight size={20} />
            </Link>
          </div>

          {/* Floating White Pill Bar (Inside bottom of dark box) */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-20 bg-white rounded-2xl md:rounded-full py-5 px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-xs md:text-sm font-bold text-[#1A1A1A] shadow-xl">
             <Link to="/about" className="hover:text-slate-500 transition-colors">About Us</Link>
             <Link to="/services" className="hidden md:block hover:text-slate-500 transition-colors">Services</Link>
             <Link to="/contact" className="hover:text-slate-500 transition-colors">Contact</Link>
             <a href="mailto:hello@inari.in" className="hover:text-slate-500 transition-colors">hello@inari.in</a>
          </div>
        </div>

        {/* Additional Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 md:mt-32 mb-16 relative z-20">
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Services</h4>
            <Link to="/book/home-cleaning" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Deep Cleaning</Link>
            <Link to="/book/plumbing" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Plumbing</Link>
            <Link to="/book/electrical" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Electrical</Link>
            <Link to="/book/painting" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Painting</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Company</h4>
            <Link to="/about" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Our Story</Link>
            <Link to="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Careers</Link>
            <Link to="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Press</Link>
            <Link to="/contact" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Legal</h4>
            <Link to="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Terms of Service</Link>
            <Link to="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Refund Policy</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Social</h4>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">Instagram</a>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">X (Twitter)</a>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-[#283628] transition-colors">LinkedIn</a>
          </div>
        </div>

        {/* Bottom Text Line */}
        <div className="mt-8 mb-8 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-wider relative z-20">
          <p>© 2026 • Inari Home Care</p>
          <p>Made with care</p>
          <p>Bangalore, IN</p>
        </div>

      </div>

      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 pointer-events-none flex items-end justify-center select-none">
        <span className="text-[25vw] font-black text-slate-200/40 tracking-tighter" style={{ lineHeight: '0.72' }}>
          INARI
        </span>
      </div>
    </footer>
  );
}
