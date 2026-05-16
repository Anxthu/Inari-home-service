import { ShieldCheck, Banknote, Sparkles } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheStandard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#F0EDE8]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#283628] mb-6 leading-tight">
            Home care, without <br className="hidden md:block" /> the headaches.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            We removed the friction from home services. No haggling, no delays, no unverified technicians. Just seamless execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {[
            {
              icon: ShieldCheck,
              title: "Verified Experts",
              desc: "Only the top 2% of applicants pass our strict 4-step background check and practical skill assessment."
            },
            {
              icon: Banknote,
              title: "Upfront Pricing",
              desc: "What you see is what you pay. Absolutely no hidden labor charges, surge pricing, or last-minute fees."
            },
            {
              icon: Sparkles,
              title: "Inari Guarantee",
              desc: "If you aren't completely satisfied with the service, we will redo it for free or process a full refund."
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div 
                key={i} 
                ref={el => cardsRef.current[i] = el}
                className="bg-white rounded-[40px] p-10 md:p-12 text-center border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto bg-[#FAFAFC] border border-slate-100 rounded-full flex items-center justify-center text-[#283628] mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-[#283628] mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
