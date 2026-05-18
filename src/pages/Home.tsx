import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight, ArrowRight, Tag, Star } from 'lucide-react';

const categories = [
  { name: 'Cleaning', id: 'home-cleaning' },
  { name: 'Plumbing', id: 'plumbing' },
  { name: 'Electrical', id: 'electrical' },
  { name: 'Painting', id: 'painting' },
  { name: 'AC Service', id: 'ac-service' },
  { name: 'Carpentry', id: 'carpentry' },
  { name: 'Pest Control', id: 'pest-control' },
  { name: 'Appliances', id: 'appliance-repair' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Dynamic Content Map based on active category
  const contentMap: Record<string, any> = {
    default: {
      leftCard: {
        title: "Top Services",
        price: "₹1,499",
        rating: "4.9",
        serviceName: "Home Cleaning",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
      },
      centerTopCard: {
        title: "Featured Services",
        subtitle: "Find verified professionals for all home needs",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
        rating: "4.9"
      },
      centerBottomCard: {
        tag: "EXCLUSIVE",
        title: "Premium Deep Clean",
        desc: "Complete top-to-bottom sanitization of your home.",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=400&auto=format&fit=crop"
      }
    },
    'home-cleaning': {
      leftCard: { title: "Cleaning", price: "₹1,499", rating: "4.9", serviceName: "Deep Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" },
      centerTopCard: { title: "Sofa Cleaning", subtitle: "Remove tough stains and dust mites", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop", rating: "4.8" },
      centerBottomCard: { tag: "POPULAR", title: "Bathroom Cleaning", desc: "Hard water stain removal and sanitization.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop" }
    },
    'plumbing': {
      leftCard: { title: "Plumbing", price: "₹199", rating: "4.8", serviceName: "Leak Repair", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
      centerTopCard: { title: "Drain Cleaning", subtitle: "Unclog drains and restore water flow", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop", rating: "4.8" },
      centerBottomCard: { tag: "ESSENTIAL", title: "Pipe Installation", desc: "New pipe fitting and connection repairs.", image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=400&auto=format&fit=crop" }
    },
    'electrical': {
      leftCard: { title: "Electrical", price: "₹199", rating: "4.9", serviceName: "Wiring Repair", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop" },
      centerTopCard: { title: "Switchboard Fix", subtitle: "Safe repairs by licensed electricians", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop", rating: "4.9" },
      centerBottomCard: { tag: "SAFETY FIRST", title: "Fan Installation", desc: "Ceiling and exhaust fan setup with warranty.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop" }
    },
    'painting': {
      leftCard: { title: "Painting", price: "Custom", rating: "4.9", serviceName: "Wall Painting", image: "painting_serivecs.png" },
      centerTopCard: { title: "Interior Painting", subtitle: "Premium paints with a flawless finish", image: "painting_serivecs.png", rating: "4.9" },
      centerBottomCard: { tag: "TRANSFORM", title: "Texture Painting", desc: "Designer textures to elevate any room.", image: "painting_serivecs.png" }
    },
    'ac-service': {
      leftCard: { title: "AC Service", price: "₹499", rating: "4.8", serviceName: "Foam Jet Clean", image: "ac_repair.png" },
      centerTopCard: { title: "AC Repair", subtitle: "Gas refill and compressor check", image: "ac_repair2.webp", rating: "4.7" },
      centerBottomCard: { tag: "QUICK FIX", title: "AC Installation", desc: "Professional setup for split & window units.", image: "ac_repair.png" }
    },
    'carpentry': {
      leftCard: { title: "Carpentry", price: "₹299", rating: "4.8", serviceName: "Furniture Repair", image: "carpenting_service.png" },
      centerTopCard: { title: "Custom Furniture", subtitle: "Bespoke shelves, cabinets and fittings", image: "carpenting_service.png", rating: "4.8" },
      centerBottomCard: { tag: "CRAFTED", title: "Door & Window Fix", desc: "Hinge replacement, alignment and polishing.", image: "carpenting_service.png" }
    },
    'pest-control': {
      leftCard: { title: "Pest Control", price: "₹899", rating: "4.7", serviceName: "Full Home Treatment", image: "pest_control.png" },
      centerTopCard: { title: "Cockroach Control", subtitle: "Odorless gel treatment with 90-day warranty", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop", rating: "4.7" },
      centerBottomCard: { tag: "SAFE", title: "Termite Shield", desc: "Deep anti-termite treatment for wood and walls.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop" }
    },
    'appliance-repair': {
      leftCard: { title: "Appliances", price: "₹299", rating: "4.7", serviceName: "Washing Machine", image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=800&auto=format&fit=crop" },
      centerTopCard: { title: "Fridge Repair", subtitle: "Cooling issues, gas refill and compressor fix", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=800&auto=format&fit=crop", rating: "4.7" },
      centerBottomCard: { tag: "MULTI-BRAND", title: "Microwave Repair", desc: "Quick diagnostics and same-day repair service.", image: "https://images.unsplash.com/photo-1574269909862-7e3d7dea29b0?q=80&w=400&auto=format&fit=crop" }
    }
  };

  const currentContent = contentMap[activeCategory || 'default'] || contentMap['default'];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 pb-12 pt-32">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* ─── CATEGORY PILLS ROW ─── */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveCategory(null)}
            className="flex-shrink-0 w-12 h-12 rounded-[16px] bg-white border border-slate-200/60 shadow-sm flex flex-col gap-1 items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <div className="w-4 h-0.5 bg-slate-700 rounded-full"></div>
            <div className="w-3 h-0.5 bg-slate-700 rounded-full mr-1"></div>
            <div className="w-4 h-0.5 bg-slate-700 rounded-full"></div>
          </button>
          
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-6 py-3.5 rounded-[16px] text-sm font-bold transition-all shadow-sm border ${
                  isActive 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-slate-600 border-slate-200/60 hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* ─── MAIN BENTO GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[750px]">

          {/* ── LEFT COLUMN (SPAN 4) ── */}
          <div className="lg:col-span-4 rounded-[40px] bg-[#D1D1D1] relative overflow-hidden flex flex-col shadow-inner min-h-[500px]">
            {/* Soft glow/texture could go here */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#E2E2E2] to-[#CACACA] opacity-50"></div>
            
            <h2 className="relative z-10 text-5xl font-medium text-[#283628] tracking-tight p-10 pt-12 transition-all duration-500">
              {currentContent.leftCard.title}
            </h2>

            {/* Floating Glass Card */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-8 mt-4 mb-24">
              <div className="w-full bg-white/70 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden group">
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{currentContent.leftCard.price}</h3>
                    <p className="text-sm font-medium text-slate-500">{currentContent.leftCard.serviceName}</p>
                  </div>
                  <div className="px-3 py-1.5 bg-white/80 rounded-full flex items-center gap-1.5 text-sm font-bold text-slate-800 shadow-sm">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    {currentContent.leftCard.rating}
                  </div>
                </div>

                <div className="h-48 w-full relative mb-8">
                  <img 
                    src={currentContent.leftCard.image} 
                    alt="Service" 
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 w-full px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 text-red-500 hover:scale-110 transition-transform">
                    <Heart size={18} className="fill-current" />
                  </button>
                  <Link to={`/book/${activeCategory || 'home-cleaning'}`} className="flex-1 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                    Book Now
                  </Link>
                </div>
                
                {/* Floating pill mimicking the design */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-white/30 backdrop-blur-md rounded-full border border-white/40 group-hover:opacity-0 transition-opacity"></div>

              </div>
            </div>

            {/* Bottom Book Now CTA */}
            <Link to={`/book/${activeCategory || 'home-cleaning'}`} className="absolute bottom-8 left-8 right-8 h-16 bg-[#283628] rounded-full flex items-center justify-between p-2 pl-8 shadow-[0_8px_30px_rgba(40,54,40,0.3)] group/btn hover:-translate-y-1 transition-all duration-300">
              <span className="text-white font-bold text-lg tracking-wide">Book Now</span>
              <div className="w-12 h-12 rounded-full bg-white text-[#283628] flex items-center justify-center group-hover/btn:-rotate-45 transition-transform duration-500 shadow-md">
                <ArrowRight size={24} className="stroke-[2.5px]" />
              </div>
            </Link>
          </div>

          {/* ── CENTER COLUMN (SPAN 5) ── */}
          <div className="lg:col-span-5 flex flex-col gap-5 h-full">
            
            {/* Top Large Card */}
            <div className="flex-[3] rounded-[40px] bg-[#E8E8E8] relative overflow-hidden group shadow-sm border border-slate-200/40">
              <img 
                src={currentContent.centerTopCard.image} 
                alt="Featured" 
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
              
              <div className="absolute top-10 left-10">
                <h2 className="text-4xl font-medium text-white tracking-tight mb-2">
                  {currentContent.centerTopCard.title}
                </h2>
                <p className="text-white/80 font-medium text-lg">
                  {currentContent.centerTopCard.subtitle}
                </p>
              </div>

              <div className="absolute bottom-8 left-8 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 text-sm font-bold text-slate-900 shadow-lg border border-white/50">
                <Tag size={14} className="text-slate-700" />
                {currentContent.centerTopCard.rating} Rating
              </div>
            </div>

            {/* Bottom Split Area */}
            <div className="flex-[2] flex flex-col sm:flex-row gap-5">
              {/* Info Block */}
              <div className="flex-[1.5] rounded-[32px] bg-white border border-slate-200/60 shadow-sm p-8 flex flex-col justify-center">
                <span className="px-3 py-1 border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest w-fit mb-6">
                  {currentContent.centerBottomCard.tag}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  {currentContent.centerBottomCard.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {currentContent.centerBottomCard.desc}
                </p>
              </div>

              {/* Image Block */}
              <div className="flex-1 rounded-[32px] bg-[#EBEBEB] relative overflow-hidden group shadow-sm border border-slate-200/40 min-h-[200px]">
                <img 
                  src={currentContent.centerBottomCard.image} 
                  alt="Detail" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-sm">
                  <Heart size={14} className="fill-current" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Link to={`/book/${activeCategory || 'home-cleaning'}`} className="pl-5 pr-1.5 py-1.5 bg-[#D2CFC7]/90 backdrop-blur-md rounded-full flex items-center gap-3 shadow-lg border border-white/20 hover:bg-[#C1BEB6] transition-colors">
                    <span className="text-sm font-bold text-slate-800">Book</span>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                      <ArrowUpRight size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN (SPAN 3) ── */}
          <div className="lg:col-span-3 flex flex-col gap-5 h-full">
            
            {/* Our Pros Card */}
            <div className="flex-1 rounded-[32px] bg-white border border-slate-200/60 shadow-sm p-8 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Our Pros</h4>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <p className="text-slate-800 font-medium text-sm leading-relaxed mb-6">
                  <span className="font-bold">Our Pros</span> deliver luxurious, professional home services.
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
                ].map((img, i) => (
                  <img key={i} src={img} alt="Pro" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                ))}
                <div className="w-8 h-px bg-slate-300 ml-2"></div>
              </div>
            </div>

            {/* Get A Bonus Card */}
            <div className="flex-[1.2] rounded-[32px] bg-white border border-slate-200/60 shadow-sm p-8 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Get An Offer</h4>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <p className="text-slate-800 font-bold text-[15px] leading-relaxed mb-6">
                  Discover our latest exclusive discounts.
                </p>
              </div>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-5 py-3 rounded-full border border-slate-200/80 text-sm font-medium outline-none focus:border-slate-400 transition-colors"
                />
                <button className="w-full py-3.5 rounded-full bg-black text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-md">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Join Us Card */}
            <Link to="/auth" state={{ role: 'professional' }} className="flex-1 rounded-[32px] bg-white border border-slate-200/60 shadow-sm p-8 flex flex-col relative overflow-hidden group cursor-pointer hover:border-slate-300 transition-colors">
              <div className="flex items-start justify-between mb-4 relative z-10">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Join Us</h4>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-black group-hover:text-white transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <p className="text-slate-800 font-bold text-[13px] leading-relaxed relative z-10 w-2/3">
                Join us as a professional, earn more and grow.
              </p>
              
              {/* Overlapping images mimicking the bottom right corner */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F0EDE8] rounded-2xl rotate-12 shadow-lg border-4 border-white overflow-hidden group-hover:rotate-6 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop" alt="Work" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute -bottom-2 right-12 w-28 h-28 bg-[#E8EDE8] rounded-2xl -rotate-6 shadow-xl border-4 border-white overflow-hidden group-hover:-rotate-12 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop" alt="Work" className="w-full h-full object-cover opacity-90" />
              </div>
            </Link>

          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — BRAND MANIFESTO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mt-32 md:mt-44 mb-32 md:mb-44 px-2">
          <div className="max-w-[1100px] mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">Our Promise</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#283628] leading-[1.1] mb-8">
              Your home is your sanctuary.
              <br />
              <span className="text-slate-400">We treat it like one.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Every professional on Inari is background-verified, trained, and insured. We don't just send a worker — we send someone who cares about your space as much as you do.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — EDITORIAL "HOW IT WORKS"
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-32 md:mb-44">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 px-4">The Process</p>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#283628] mb-16 md:mb-24 px-4">
              Booked in 2 minutes.<br />Done right the first time.
            </h3>

            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-32">
              <div className="rounded-[40px] overflow-hidden h-[350px] md:h-[500px] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop" 
                  alt="Browse Services" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-[#283628]">Step 01</span>
                </div>
              </div>
              <div className="px-4 lg:px-8">
                <h4 className="text-2xl md:text-4xl font-bold text-[#283628] tracking-tight mb-6">Choose what you need</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                  Browse 20+ service categories — from deep cleaning to electrical work. Customize add-ons, see transparent pricing, and know exactly what you're paying for before you commit.
                </p>
                <Link to="/services" className="inline-flex items-center gap-2 text-[#283628] font-bold hover:gap-4 transition-all group">
                  Explore services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-32">
              <div className="px-4 lg:px-8 order-2 lg:order-1">
                <h4 className="text-2xl md:text-4xl font-bold text-[#283628] tracking-tight mb-6">Pick your pro & time</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                  Every professional is background-checked and rated by real customers. Select your preferred expert, pick a slot that works for you, and confirm — all in under 2 minutes.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Pro" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Pro" />
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Pro" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">500+ verified professionals</p>
                </div>
              </div>
              <div className="rounded-[40px] overflow-hidden h-[350px] md:h-[500px] relative group order-1 lg:order-2">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop" 
                  alt="Pick a professional" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-[#283628]">Step 02</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="rounded-[40px] overflow-hidden h-[350px] md:h-[500px] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" 
                  alt="Relax" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-[#283628]">Step 03</span>
                </div>
              </div>
              <div className="px-4 lg:px-8">
                <h4 className="text-2xl md:text-4xl font-bold text-[#283628] tracking-tight mb-6">Sit back. We handle it.</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                  Your expert arrives fully equipped, on time. Track their arrival in real-time, verify with a 4-digit OTP, and pay only after the job is done. Not happy? We fix it free.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-[#E8EDE8] text-[#283628] rounded-full text-sm font-bold">Live Tracking</span>
                  <span className="px-4 py-2 bg-[#E8EDE8] text-[#283628] rounded-full text-sm font-bold">OTP Verified</span>
                  <span className="px-4 py-2 bg-[#E8EDE8] text-[#283628] rounded-full text-sm font-bold">Pay After Service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — CURATED PROOF (TESTIMONIALS)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#283628] rounded-[40px] p-10 md:p-20 lg:p-24 mb-32 md:mb-44 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-green-200/60 mb-12">What our customers say</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-10">
                "Finally, a service that respects my time and my home."
              </blockquote>
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop" className="w-12 h-12 rounded-full object-cover border-2 border-white/20" alt="Customer" />
                <div>
                  <p className="text-white font-bold">Priya Sharma</p>
                  <p className="text-green-200/60 text-sm font-medium">Deep Cleaning · Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10">
              <div className="bg-white/5 backdrop-blur-md rounded-[28px] p-8 border border-white/10">
                <p className="text-white/90 text-lg font-medium leading-relaxed mb-6">
                  "The electrician arrived on time, explained everything he was doing, and cleaned up after. I've used Inari three times now — never going back to random listings."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" alt="Customer" />
                  <div>
                    <p className="text-white font-bold text-sm">Arjun Menon</p>
                    <p className="text-green-200/50 text-xs font-medium">Electrical Work · Kochi</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-[28px] p-8 border border-white/10">
                <p className="text-white/90 text-lg font-medium leading-relaxed mb-6">
                  "Booked an AC service in under a minute. The technician was verified, polite, and done in 40 minutes flat. This is how every service should work."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" alt="Customer" />
                  <div>
                    <p className="text-white font-bold text-sm">Meera Nair</p>
                    <p className="text-green-200/50 text-xs font-medium">AC Service · Trivandrum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">10K+</p>
              <p className="text-green-200/60 text-sm font-medium mt-1">Homes serviced</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">4.9</p>
              <p className="text-green-200/60 text-sm font-medium mt-1">Average rating</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">500+</p>
              <p className="text-green-200/60 text-sm font-medium mt-1">Verified pros</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white">98%</p>
              <p className="text-green-200/60 text-sm font-medium mt-1">Satisfaction rate</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — ELEVATED FINAL CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#283628] leading-[1.1] mb-6">
              Ready to experience<br />the difference?
            </h2>
            <p className="text-lg text-slate-500 font-medium mb-10 max-w-xl mx-auto">
              Book your first service today. No commitments, no hidden fees — just premium home care, done right.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="inline-flex items-center gap-3 px-10 py-5 bg-[#283628] text-white rounded-full font-bold text-lg hover:bg-black transition-colors shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Book a Service <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-5 bg-white text-[#283628] rounded-full font-bold text-lg border border-slate-200 hover:border-slate-300 transition-colors shadow-sm">
                Browse Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
