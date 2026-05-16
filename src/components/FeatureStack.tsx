import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Search, Activity, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: ShieldCheck, title: 'Verified Professionals', desc: 'Every professional on Inari goes through a 4-step verification: government ID check, address verification, skill assessment, and background screening.' },
  { icon: Search, title: 'Transparent Pricing', desc: 'See the full price before you book. No hidden charges. No last-minute additions. What you see is what you pay — always.' },
  { icon: Activity, title: 'Live Tracking', desc: 'Know exactly when your professional will arrive. Track them on the map in real time from the moment they leave for your home.' },
  { icon: Zap, title: '60-Minute Response', desc: 'For emergency services, we guarantee a professional at your door within 60 minutes. Available in Bangalore, Mumbai, Delhi, Hyderabad, and Chennai.' },
];

export default function FeatureStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.stack-card');

    gsap.fromTo(cards,
      {
        x: (i: number) => i * -20,
        y: (i: number) => i * 10,
        rotation: (i: number) => -15 + (i * 2),
        opacity: 0
      },
      {
        x: (i: number) => i * 15,
        y: (i: number) => i * -15,
        rotation: (i: number) => 25 + (i * 4),
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left: Stacked cards graphic */}
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
          <div className="absolute top-0 left-0 z-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Trusted in<br/>
              <span className="text-accent-green">20+ cities.</span>
            </h2>
            <p className="mt-3 md:mt-4 text-slate-500 font-medium text-base md:text-lg">Bringing reliable home services<br/>to your neighborhood.</p>
          </div>

          <div className="relative w-full h-full mt-32 md:mt-40 ml-4 md:ml-10">
             {['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'].map((city, i) => (
               <div
                 key={city}
                 className="stack-card absolute top-1/3 left-[15%] md:left-1/4 w-[240px] md:w-[340px] h-[80px] md:h-[120px] rounded-[24px] md:rounded-[32px] shadow-2xl border border-white/40 backdrop-blur-xl flex items-center justify-center"
                 style={{
                   background: `linear-gradient(135deg, hsl(${140 + (i * 20)}, 80%, 95%), white)`,
                   zIndex: 10 - i,
                 }}
               >
                 <span className="text-xl md:text-2xl font-bold text-slate-800 drop-shadow-sm">{city}</span>
                 <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,_black_1px,_transparent_0)] bg-[size:16px_16px]"></div>
               </div>
             ))}
          </div>
        </div>

        {/* Right: Feature list */}
        <div className="flex flex-col gap-8 md:gap-12 lg:pl-12">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="border-b border-slate-100 pb-8 md:pb-12 last:border-0">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-50 flex items-center justify-center text-accent-green flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-xl md:text-3xl font-medium tracking-tight text-slate-900">{feat.title}</h3>
                </div>
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed max-w-md pl-12 md:pl-14">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
