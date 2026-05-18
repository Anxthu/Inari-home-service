import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('inari_loaded');
    
    if (hasLoaded) {
      onComplete();
      return;
    }

    if (!containerRef.current || !logoRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('inari_loaded', 'true');
        onComplete();
      }
    });

    // Reset initial states
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0, filter: 'blur(10px)' });
    gsap.set('.loading-text-char', { y: 20, opacity: 0 });
    gsap.set('.loading-reveal-panel', { scaleY: 1 });

    // 1. Reveal logo with a subtle scale & blur filter drop
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out'
    })
    // 2. Stagger text appearance
    .to('.loading-text-char', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: 'back.out(1.7)'
    }, "-=0.6")
    // 3. Hold for a moment to let the user see the high-res logo
    .to({}, { duration: 0.8 })
    // 4. Dramatic panel reveal (slides up/down revealing the site)
    .to('.loading-reveal-panel', {
      scaleY: 0,
      transformOrigin: (i) => i % 2 === 0 ? "top" : "bottom",
      duration: 1,
      ease: 'power4.inOut',
      stagger: 0.1
    })
    // 5. Hide container
    .set(containerRef.current, { display: 'none' });

  }, [onComplete]);

  const hasLoaded = sessionStorage.getItem('inari_loaded');
  if (hasLoaded) return null;

  const titleText = "INARI".split('');

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Reveal Panels */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="loading-reveal-panel flex-1 bg-[#283628] h-full origin-bottom"></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <img 
          ref={logoRef}
          src="logo-highres.png" 
          alt="Inari" 
          className="w-24 md:w-32 h-auto object-contain drop-shadow-2xl brightness-0 invert"
        />
        
        <div ref={textRef} className="flex overflow-hidden">
          {titleText.map((char, i) => (
            <span key={i} className="loading-text-char text-3xl md:text-5xl font-bold tracking-[0.2em] text-[#F0EDE8]">
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
