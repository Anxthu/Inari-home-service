import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── HEADER ANIMATION ───
      if (headerRef.current) {
        const words = headerRef.current.querySelectorAll('.word-reveal');
        gsap.fromTo(words,
          { y: 100, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
        );
      }

      // ─── CONTENT REVEAL ───
      if (infoRef.current && formRef.current) {
        gsap.fromTo([infoRef.current, formRef.current],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.6 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#FDFDFD] min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* ═══════════════════════════════════════════════════════════════
            HEADER — Typography First
        ═══════════════════════════════════════════════════════════════ */}
        <div ref={headerRef} className="mb-20 md:mb-32" style={{ perspective: '1000px' }}>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 word-reveal">Contact Us</p>
          <h1 className="text-6xl md:text-[90px] lg:text-[110px] font-bold tracking-tight text-[#283628] leading-[0.95] overflow-hidden mb-8">
            <span className="word-reveal inline-block">Let's&nbsp;</span>
            <span className="word-reveal inline-block">start&nbsp;</span>
            <span className="word-reveal inline-block">a</span>
            <br />
            <span className="word-reveal inline-block text-slate-300 mt-2">conversation.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl word-reveal leading-relaxed">
            Whether you need assistance with a booking, want to partner with us, or just want to drop by our HQ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ═══════════════════════════════════════════════════════════════
              CONTACT INFO — Bento Grid
          ═══════════════════════════════════════════════════════════════ */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col gap-6">
            
            {/* HQ Card */}
            <div className="bg-[#F6F6F6] rounded-[32px] p-10 md:p-12 hover:bg-white border border-transparent hover:border-slate-200/60 hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-[#283628] text-white rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={24} />
              </div>
              <h3 className="text-3xl font-bold text-[#283628] mb-4 tracking-tight">Global HQ</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-lg mb-8">
                4th Floor, Prestige Tech Park,<br/>
                Indiranagar, Bangalore — 560038<br/>
                Karnataka, India
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#283628] font-bold text-lg hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Get Directions <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Methods Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#F6F6F6] rounded-[32px] p-8 hover:bg-white border border-transparent hover:border-slate-200/60 hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 bg-white text-[#283628] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#283628] group-hover:text-white transition-colors duration-500">
                  <Phone size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#283628] mb-2 tracking-tight">Call us</h3>
                <p className="text-slate-500 font-medium">1800-INARI-CARE</p>
                <p className="text-slate-400 text-sm mt-1">Mon-Sat, 9am - 8pm</p>
              </div>

              <div className="bg-[#F6F6F6] rounded-[32px] p-8 hover:bg-white border border-transparent hover:border-slate-200/60 hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 bg-white text-[#283628] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#283628] group-hover:text-white transition-colors duration-500">
                  <Mail size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#283628] mb-2 tracking-tight">Email us</h3>
                <p className="text-slate-500 font-medium">hello@inari.com</p>
                <p className="text-slate-400 text-sm mt-1">We reply within 24hrs</p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              CONTACT FORM — High Contrast
          ═══════════════════════════════════════════════════════════════ */}
          <div ref={formRef} className="lg:col-span-7 bg-[#283628] rounded-[40px] p-10 md:p-16 relative overflow-hidden">
             {/* Subtle aesthetic blur */}
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

             <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">Send a message</h2>
             
             <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-white/60 font-bold text-xs uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border-none focus:ring-0 text-white rounded-2xl px-6 py-4 placeholder:text-white/20 font-medium text-lg focus:bg-white/10 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-white/60 font-bold text-xs uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border-none focus:ring-0 text-white rounded-2xl px-6 py-4 placeholder:text-white/20 font-medium text-lg focus:bg-white/10 transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-white/60 font-bold text-xs uppercase tracking-widest">Subject</label>
                  <select className="w-full bg-white/5 border-none focus:ring-0 text-white rounded-2xl px-6 py-4 font-medium text-lg appearance-none focus:bg-white/10 transition-colors">
                    <option value="" className="text-slate-800">Select a topic</option>
                    <option value="support" className="text-slate-800">Support & Feedback</option>
                    <option value="partner" className="text-slate-800">Partner with us</option>
                    <option value="press" className="text-slate-800">Press & Media</option>
                    <option value="other" className="text-slate-800">Other</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-white/60 font-bold text-xs uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border-none focus:ring-0 text-white rounded-2xl px-6 py-4 placeholder:text-white/20 font-medium text-lg focus:bg-white/10 transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full font-bold text-lg rounded-full py-5 transition-colors mt-4 flex items-center justify-center gap-2 ${
                    isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-[#283628] hover:bg-slate-200'
                  } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <><Loader2 size={24} className="animate-spin" /> Sending...</>
                  ) : isSubmitted ? (
                    <><CheckCircle2 size={24} /> Message Sent!</>
                  ) : (
                    'Send Message'
                  )}
                </button>
             </form>
          </div>

        </div>
      </div>
    </main>
  );
}
