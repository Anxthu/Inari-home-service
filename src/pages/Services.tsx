import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const services = [
  {
    id: 'home-cleaning',
    name: 'Deep Home Cleaning',
    description: 'Complete top-to-bottom sanitization of your home. Includes floor scrubbing, bathroom deep cleaning, kitchen degreasing, and cobweb removal.',
    price: 'Starting at ₹1,499',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
    includes: ['Mechanized equipment', 'Safe chemicals', 'Professional crew']
  },
  {
    id: 'ac-service',
    name: 'AC Servicing & Repair',
    description: 'Expert AC maintenance to keep your cooling optimal. Includes foam jet cleaning, gas pressure check, and filter sanitization.',
    price: 'Starting at ₹499',
    rating: '4.8',
    image: '/ac_repair.png',
    includes: ['30-day warranty', 'Genuine spare parts', 'No hidden fees']
  },
  {
    id: 'electrical',
    name: 'Electrical Works',
    description: 'From fixing a loose switchboard to complete house wiring. Our licensed electricians ensure your home is safe and fully functional.',
    price: 'Starting at ₹199',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    includes: ['Safety first protocol', 'Transparent pricing', 'Quick arrival']
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    description: 'Quick fixes for leaking taps, clogged drains, and pipe installations. We handle the mess so you don\'t have to.',
    price: 'Starting at ₹199',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    includes: ['Same-day service', 'Clean-up post work', 'Expert diagnosis']
  },
  {
    id: 'painting',
    name: 'Professional Painting',
    description: 'Transform your space with our premium painting services. We handle everything from wall prep to the final coat and post-paint cleanup.',
    price: 'Custom Quote',
    rating: '4.9',
    image: '/painting_serivecs.png',
    includes: ['Free consultation', 'Premium paints', 'Furniture masking']
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    description: 'Safe, odorless, and highly effective pest control treatments. Say goodbye to cockroaches, termites, and mosquitoes.',
    price: 'Starting at ₹899',
    rating: '4.7',
    image: '/pest_control.png',
    includes: ['Odorless chemicals', 'Pet & child safe', '90-day guarantee']
  },
  {
    id: 'carpentry',
    name: 'Carpentry Works',
    description: 'Expert carpentry solutions for your home. From custom furniture assembly to door repairs and modular fittings.',
    price: 'Starting at ₹299',
    rating: '4.8',
    image: '/carpenting_service.png',
    includes: ['Custom designs', 'Premium wood options', 'Expert craftsmanship']
  },
  {
    id: 'appliance-repair',
    name: 'Appliance Repair',
    description: 'Quick and reliable repair for all major home appliances including refrigerators, washing machines, and microwaves.',
    price: 'Starting at ₹299',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=800&auto=format&fit=crop',
    includes: ['Genuine spare parts', 'Multi-brand support', '30-day service warranty']
  }
];

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All Services');

  const filteredServices = services.filter(service => {
    if (activeFilter === 'All Services') return true;
    if (activeFilter === 'Most Popular') return parseFloat(service.rating) >= 4.9;
    if (activeFilter === 'Under ₹500') {
      const priceMatch = service.price.match(/₹(\d+,?\d*)/);
      if (priceMatch) {
        const numericPrice = parseInt(priceMatch[1].replace(',', ''), 10);
        return numericPrice < 500;
      }
      return false;
    }
    if (activeFilter === 'Premium') {
      if (service.price === 'Custom Quote') return true;
      const priceMatch = service.price.match(/₹(\d+,?\d*)/);
      if (priceMatch) {
        const numericPrice = parseInt(priceMatch[1].replace(',', ''), 10);
        return numericPrice >= 500;
      }
      return true;
    }
    return true;
  });

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );
    }
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    }
  }, []);

  return (
    <main className="pt-40 pb-32 bg-[#FDFDFD] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div ref={headerRef} className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Service Catalog</p>
            <h1 className="text-6xl md:text-[90px] lg:text-[110px] font-bold tracking-tight text-[#283628] leading-[0.95] mb-8">
              Our Services.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Professional, verified, and transparent. Explore our complete range of home care solutions designed for your peace of mind.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 self-start md:self-end">
            <div className="flex items-center gap-3 px-6 py-3 bg-[#F6F6F6] rounded-full text-sm font-bold text-[#283628]">
              <ShieldCheck size={18} className="text-[#283628]" /> Fully Verified
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-[#F6F6F6] rounded-full text-sm font-bold text-[#283628]">
              <Zap size={18} className="text-[#283628]" /> Fast Booking
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-16 scrollbar-hide">
          {['All Services', 'Most Popular', 'Under ₹500', 'Premium'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-8 py-3.5 rounded-full font-bold text-sm transition-colors border ${
                activeFilter === filter 
                  ? 'bg-[#283628] text-white border-[#283628] shadow-md' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-white leading-tight">{service.name}</h3>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/30">
                    ★ {service.rating}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <CheckCircle2 size={16} className="text-[#3D5A3D]" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Footer / CTA */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="font-bold text-[#283628]">{service.price}</div>
                  <Link 
                    to={`/book/${service.id}`}
                    className="flex items-center gap-2 px-6 py-3 bg-[#283628] text-white rounded-full font-bold text-sm hover:bg-black transition-colors shadow-md"
                  >
                    Book Now <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
