import { useRef, useEffect } from 'react';
import { Search, CalendarCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose your service',
    desc: 'Browse from 20+ categories, customize add-ons, and see transparent pricing before you commit.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Pick a time & pro',
    desc: 'Select a verified professional, choose a convenient date and time slot — all in under 2 minutes.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Sit back & relax',
    desc: 'Your expert arrives fully equipped. Pay after the job is done. Not happy? We fix it free.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = gsap.utils.toArray('.hiw-step');
    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FAFAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8EDE8] text-[#283628] text-xs font-bold uppercase tracking-wider mb-6">
            Simple as 1-2-3
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#283628] mb-4">
            How Inari works
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            From search to service — the entire experience takes less than 3 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="hiw-step relative bg-white rounded-[32px] p-10 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
              >
                {/* Large background number */}
                <span className="absolute -top-4 -right-2 text-[120px] font-black text-slate-100/80 leading-none select-none pointer-events-none group-hover:text-[#E8EDE8] transition-colors duration-500">
                  {step.number}
                </span>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#283628] text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#283628] mb-3">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>

                {/* Connector line (hidden on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-slate-200 z-20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
