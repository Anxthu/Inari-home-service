import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Wrench, Zap, Paintbrush, ArrowUpRight, X, Check, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

type ServiceDetail = {
  title: string;
  icon: React.ElementType;
  image: string;
  tagline: string;
  price: string;
  duration: string;
  path: string;
  steps: string[];
  includes: string[];
  excludes: string[];
};

const services: ServiceDetail[] = [
  {
    title: 'Home Cleaning',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
    tagline: 'Spotless spaces, every time.',
    price: '₹499',
    duration: '2-3 hrs',
    path: '/book/home-cleaning',
    steps: ['Select rooms & add-ons', 'We assign a verified cleaner', 'Professional arrives at your door'],
    includes: ['Floor mopping & vacuuming', 'Bathroom deep scrub', 'Kitchen counter wipe-down', 'Dusting all surfaces'],
    excludes: ['Heavy furniture moving', 'Exterior window cleaning', 'Ceiling fan deep clean (add-on)']
  },
  {
    title: 'Plumbing Service',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop',
    tagline: 'Fix leaks before they fix you.',
    price: '₹349',
    duration: '1-2 hrs',
    path: '/book/plumbing',
    steps: ['Describe the issue', 'Get matched with a plumber', 'Same-day repair at your home'],
    includes: ['Tap & faucet repair', 'Pipe leak fixing', 'Drain unclogging', 'Flush tank repair'],
    excludes: ['Full bathroom renovation', 'Underground pipe work', 'Water tank installation']
  },
  {
    title: 'Electrical Repair',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    tagline: 'Safe wiring. Bright living.',
    price: '₹299',
    duration: '1-2 hrs',
    path: '/book/electrical',
    steps: ['Pick the electrical issue', 'Certified electrician is assigned', 'Issue resolved with warranty'],
    includes: ['Switchboard repair', 'Fan installation', 'Light fixture setup', 'MCB/fuse replacement'],
    excludes: ['Complete house rewiring', 'Solar panel installation', 'Generator setup']
  },
  {
    title: 'Home Painting',
    icon: Paintbrush,
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=800&auto=format&fit=crop',
    tagline: 'Walls that tell your story.',
    price: '₹1,999',
    duration: '1-3 days',
    path: '/book/painting',
    steps: ['Choose rooms & finish type', 'Color consultation included', 'Professional painters arrive'],
    includes: ['Wall preparation & priming', 'Two coats of premium paint', 'Furniture covering', 'Post-paint cleanup'],
    excludes: ['Wallpaper removal', 'Structural crack repair', 'Exterior scaffolding work']
  },
];

export default function TiltedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.service-card');

    gsap.fromTo(cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeService]);

  return (
    <>
      <div ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
              Everything your <br className="hidden md:block"/>home needs.
            </h2>
            <p className="text-base md:text-lg text-slate-500 font-medium">Expert services, delivered to your doorstep.</p>
          </div>
          <Link to="/services" className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 font-semibold text-sm hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all">
            View all categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveService(service)}
                className="service-card rounded-[28px] md:rounded-[32px] p-6 md:p-8 flex flex-col justify-between min-h-[240px] md:min-h-[340px] group relative overflow-hidden text-left cursor-pointer shadow-xl hover:shadow-2xl transition-shadow"
              >
                {/* Photo background */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 transition-all duration-500" />

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <Icon size={24} className="md:w-7 md:h-7 text-white" />
                </div>

                {/* Bottom */}
                <div className="relative z-10 flex items-end justify-between mt-auto">
                  <div>
                    <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-1">From {service.price}</p>
                    <h3 className="text-lg md:text-2xl font-bold text-white leading-tight">
                      {service.title.split(' ').map((word, idx) => <span key={idx} className="block">{word}</span>)}
                    </h3>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 flex-shrink-0 border border-white/20">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── SERVICE DETAIL MODAL ─── */}
      {activeService && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center py-6 md:py-10 px-4 overflow-y-auto"
          onClick={() => setActiveService(null)}
          style={{ touchAction: 'none' }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-[32px] w-full max-w-2xl shadow-2xl flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {/* Scrollable inner */}
            <div 
              className="overflow-y-auto overscroll-contain flex-1 rounded-[32px] scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch', maxHeight: '80vh' }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
            {/* Hero Image */}
            <div className="relative h-56 md:h-72 rounded-t-[32px] overflow-hidden">
              <img src={activeService.image} alt={activeService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <button 
                onClick={() => setActiveService(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all border border-white/20"
              >
                <X size={18} />
              </button>
              
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <activeService.icon size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-white/70">{activeService.tagline}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{activeService.title}</h2>
              </div>
            </div>

            {/* Info Pills */}
            <div className="flex gap-3 px-8 -mt-5 relative z-10">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-lg border border-slate-100 flex items-center gap-2">
                <IndianRupee size={16} className="text-[#283628]" />
                <div>
                  <p className="text-xs font-bold text-slate-400">Starting</p>
                  <p className="text-lg font-bold text-[#283628]">{activeService.price}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl px-5 py-3 shadow-lg border border-slate-100 flex items-center gap-2">
                <Clock size={16} className="text-[#283628]" />
                <div>
                  <p className="text-xs font-bold text-slate-400">Duration</p>
                  <p className="text-lg font-bold text-[#283628]">{activeService.duration}</p>
                </div>
              </div>
            </div>

            <div className="p-8 pt-6">
              {/* How It Works */}
              <h3 className="text-xl font-bold text-[#283628] mb-5">How It Works</h3>
              <div className="space-y-4 mb-10">
                {activeService.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#283628] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="pt-1.5">
                      <p className="font-medium text-slate-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* What's Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">What's Included</h4>
                  <div className="space-y-3">
                    {activeService.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-green-600" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Not Included</h4>
                  <div className="space-y-3">
                    {activeService.excludes.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <X size={12} className="text-slate-400" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link 
                to={activeService.path}
                onClick={() => setActiveService(null)}
                className="block w-full py-4 bg-[#283628] text-white text-center rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Book {activeService.title} <ArrowRight size={20} />
              </Link>
            </div>
            </div>{/* end scrollable inner */}
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
