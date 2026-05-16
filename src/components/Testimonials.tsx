import { useEffect, useRef } from 'react';
import { Star, BadgeCheck, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'Priya Sharma', location: 'Indiranagar', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', text: 'Finally, a platform where the professionals actually show up on time and don\'t leave a mess.', highlight: 'show up on time' },
  { name: 'Rahul Desai', location: 'Koramangala', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', text: 'The AC repair guy explained exactly what was wrong before charging me. Absolute game changer.', highlight: 'explained exactly what was wrong' },
  { name: 'Ananya V', location: 'Whitefield', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', text: 'Booking a deep clean used to take 3 phone calls and haggling. Now it takes exactly 3 taps on my phone.', highlight: 'exactly 3 taps' },
  { name: 'Karthik N', location: 'HSR Layout', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', text: 'Transparent pricing is why I keep coming back. No more arguing over hidden fees after the job is done.', highlight: 'Transparent pricing' },
  { name: 'Sneha P', location: 'Jayanagar', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', text: 'The background verification gives me so much peace of mind as a single woman living alone in the city.', highlight: 'peace of mind' },
  { name: 'Vikram S', location: 'Marathahalli', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', text: 'They left my bathroom looking brand new. The attention to detail was honestly shocking. Highly recommend!', highlight: 'attention to detail' },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = gsap.utils.toArray('.review-card');

    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-[#FAFAFC] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 text-sm font-bold text-slate-600 mb-4 md:mb-6">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <span>4.9/5 Average Rating</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4 md:mb-6">
            Trusted by 50,000+ homes
          </h2>
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Don't just take our word for it. Here's what your neighbors have to say.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, i) => {
            const parts = review.text.split(review.highlight);

            return (
              <div key={i} className="review-card bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden flex flex-col justify-between">

                {/* Decorative Quote Icon */}
                <div className="absolute -top-4 -right-4 opacity-50 group-hover:scale-110 transition-transform duration-500">
                  <Quote size={100} className="fill-slate-100 text-slate-100" />
                </div>

                <div className="relative z-10 mb-6 md:mb-8">
                  <div className="flex items-center gap-1 mb-4 md:mb-6 text-amber-400">
                    {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">
                    {parts[0]}
                    <span className="font-bold text-slate-900">{review.highlight}</span>
                    {parts[1]}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-slate-100 pt-4 md:pt-6 mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{review.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <BadgeCheck size={18} className="text-[#283628] mb-0.5" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
