import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Handshake, Search, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── HERO PARALLAX ───
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // ─── HERO TEXT REVEAL ───
      if (heroTextRef.current) {
        const words = heroTextRef.current.querySelectorAll('.hero-word');
        gsap.fromTo(words,
          { y: 100, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
        );
        gsap.fromTo(heroTextRef.current.querySelector('.hero-sub'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.0 }
        );
      }

      // ─── STORY SECTION REVEAL ───
      if (storyRef.current) {
        const storyText = storyRef.current.querySelector('.story-text');
        const storyImg = storyRef.current.querySelector('.story-img');
        
        if (storyText) {
          gsap.fromTo(storyText,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: storyRef.current, start: 'top 75%' }
            }
          );
        }
        if (storyImg) {
          gsap.fromTo(storyImg,
            { x: 50, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out',
              scrollTrigger: { trigger: storyRef.current, start: 'top 75%' }
            }
          );
        }

        // Parallax on story image
        const storyImgInner = storyRef.current.querySelector('.story-img img');
        if (storyImgInner) {
          gsap.to(storyImgInner, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      }

      // ─── STATS COUNTER ANIMATION ───
      if (statsRef.current) {
        const statNums = statsRef.current.querySelectorAll('.stat-num');
        statNums.forEach((el) => {
          gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' }
            }
          );
        });
      }

      // ─── VALUES STAGGER ───
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-card');
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' }
          }
        );
      }

      // ─── GALLERY PARALLAX ───
      if (galleryRef.current) {
        const imgs = galleryRef.current.querySelectorAll('.gallery-item');
        imgs.forEach((img, i) => {
          gsap.fromTo(img,
            { y: 60 + i * 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: galleryRef.current, start: 'top 80%' }
            }
          );
          // Inner parallax
          const inner = img.querySelector('img');
          if (inner) {
            gsap.to(inner, {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            });
          }
        });
      }

      // ─── TEAM REVEAL ───
      if (teamRef.current) {
        const members = teamRef.current.querySelectorAll('.team-card');
        gsap.fromTo(members,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: teamRef.current, start: 'top 80%' }
          }
        );
      }

      // ─── CTA REVEAL ───
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
          }
        );
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#FDFDFD] min-h-screen overflow-hidden selection:bg-[#283628] selection:text-white">

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Typography first, stark contrast
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center">
        
        <div ref={heroTextRef} className="max-w-5xl z-10 relative mb-16 md:mb-24" style={{ perspective: '1000px' }}>
          <p className="hero-sub text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">About Inari</p>
          <h1 className="text-6xl md:text-[90px] lg:text-[110px] font-bold tracking-tight text-[#283628] leading-[0.95] overflow-hidden">
            <span className="hero-word inline-block">The&nbsp;</span>
            <span className="hero-word inline-block">new&nbsp;</span>
            <span className="hero-word inline-block">standard&nbsp;</span>
            <br />
            <span className="hero-word inline-block text-slate-300">for&nbsp;</span>
            <span className="hero-word inline-block text-slate-300">home&nbsp;</span>
            <span className="hero-word inline-block text-slate-300">care.</span>
          </h1>
        </div>

        {/* Minimalist Inset Parallax Image */}
        <div className="w-full md:w-3/4 lg:w-2/3 h-[400px] md:h-[500px] rounded-[32px] overflow-hidden relative self-end shadow-2xl">
           <img 
              ref={heroImgRef}
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop" 
              alt="Beautiful modern home" 
              className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover will-change-transform"
            />
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* ═══════════════════════════════════════════════════════════════
            ORIGIN STORY — Bento-style, refined typography
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={storyRef} className="py-24 md:py-32 border-t border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="story-text lg:col-span-5">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Our Origin</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#283628] leading-[1.1] mb-8">
                It shouldn't be this hard to fix a leaking pipe.
              </h2>
            </div>
            
            <div className="lg:col-span-7">
               <div className="story-img rounded-[32px] overflow-hidden h-[300px] md:h-[450px] relative mb-12">
                <img 
                  src="/group.png" 
                  alt="Inari Team" 
                  className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover will-change-transform"
                />
              </div>
              
              <div className="story-text grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-slate-500 font-medium leading-relaxed">
                <div>
                  <p className="mb-6">
                    In 2023, our founders spent days trying to find reliable home maintenance in Bangalore. Unverified technicians, hidden costs, and endless phone calls — just to get a simple job done.
                  </p>
                  <p className="text-[#283628] font-bold">
                    We realized the entire industry was broken. So we built Inari.
                  </p>
                </div>
                <div>
                  <p>
                    Not just another aggregator. We're building an end-to-end ecosystem where every professional is strictly vetted, every price is transparent, and every service is backed by our absolute quality guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STATS — Minimalist grid, no dark background
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={statsRef} className="py-24 md:py-32 border-t border-slate-200/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { num: '50K+', label: 'Households served across India' },
              { num: '10K+', label: 'Verified professionals in our network' },
              { num: '4.9', icon: <Star className="inline fill-[#283628] text-[#283628] ml-1 -mt-2" size={32} />, label: 'Average customer satisfaction rating' },
              { num: '<3m', label: 'Average time to book a service' },
            ].map((stat, i) => (
              <div key={i} className="stat-num border-l-2 border-slate-200/60 pl-6">
                <p className="text-5xl md:text-7xl font-bold text-[#283628] tracking-tight mb-4">
                  {stat.num}{stat.icon}
                </p>
                <p className="text-slate-500 font-medium text-base md:text-lg max-w-[200px] leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            VALUES — Stark contrast, monochromatic icons
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={valuesRef} className="py-24 md:py-32 border-t border-slate-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#283628] leading-[1.1] max-w-xl">
              The Inari Promise
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-md">
              We don't compromise on quality. Our core values dictate every feature we build and every professional we onboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Absolute Trust', desc: '4-step background verification for every professional. Zero exceptions.' },
              { icon: Zap, title: 'Rapid Response', desc: 'Average booking confirmation: under 3 minutes. Same-day arrivals.' },
              { icon: Search, title: 'Transparency', desc: 'Fixed, upfront pricing. No hidden labor charges, no surprises.' },
              { icon: Handshake, title: 'Guarantee', desc: 'Not satisfied? We fix it free or process a full refund. No fine print.' }
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="value-card bg-[#F6F6F6] p-8 md:p-10 rounded-[32px] hover:bg-white border border-transparent hover:border-slate-200/60 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-[#283628] text-white rounded-full flex items-center justify-center mb-8">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#283628] mb-3 tracking-tight">{v.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            EDITORIAL GALLERY
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={galleryRef} className="py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[600px]">
            <div className="gallery-item md:col-span-8 rounded-[32px] overflow-hidden relative group min-h-[400px]">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop" alt="Electrician" className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-transform duration-700 will-change-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#283628]/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <p className="font-bold text-3xl tracking-tight mb-1">Verified expertise.</p>
                <p className="font-medium text-lg opacity-90">Every skill, double-checked.</p>
              </div>
            </div>
            <div className="gallery-item md:col-span-4 rounded-[32px] overflow-hidden relative group min-h-[400px]">
              <img src="/ac_repair2.webp" alt="AC Professional" className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transition-transform duration-700 will-change-transform" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TEAM — Clean, borderless, editorial layout
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={teamRef} className="py-24 md:py-32 border-t border-slate-200/60">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#283628] leading-[1.1]">
              Leadership
            </h2>
             <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">The People</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: 'Aditya Menon', role: 'Co-founder & CEO', bio: 'Former product leader at Urban Company. Dedicated to solving real-world infrastructure problems through clean design.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
              { name: 'Priya Krishnamurthy', role: 'Co-founder & CTO', bio: "Full-stack architect. Built Inari's proprietary verification and scheduling engine from the ground up.", img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
              { name: 'Rohan Bhat', role: 'Head of Operations', bio: 'Operations veteran. Manages and scales our network of 10,000+ professionals across India.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop' }
            ].map((member, i) => (
              <div key={i} className="team-card group">
                <div className="aspect-[4/5] w-full rounded-[32px] overflow-hidden bg-slate-100 mb-8">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#283628] mb-1">{member.name}</h3>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">{member.role}</p>
                  <p className="text-slate-500 font-medium leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FINAL CTA — Minimalist pill buttons
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={ctaRef} className="py-32 md:py-48 text-center border-t border-slate-200/60">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#283628] leading-[1.05] mb-8">
              Join the movement.
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto">
              Whether you need a service or want to build a career as a verified professional — Inari is the platform for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="inline-flex items-center gap-3 px-10 py-4 bg-[#283628] text-white rounded-full font-bold text-lg hover:bg-black transition-colors">
                Book a Service
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-[#F6F6F6] text-[#283628] rounded-full font-bold text-lg hover:bg-[#E8E8E8] transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
