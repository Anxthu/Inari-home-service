import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion, ShieldCheck, Clock, BadgeCheck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How are the professionals verified?",
    answer: "Every professional on Inari goes through a strict 4-step background check. This includes government ID verification, residential address proof, skill assessment testing, and a comprehensive criminal background check before they can accept their first booking."
  },
  {
    question: "What if I am not satisfied with the service?",
    answer: "Your satisfaction is guaranteed. If the service doesn't meet our quality standards, we will either send a different professional to fix the issue for free, or process a full refund. No arguments, no hassle."
  },
  {
    question: "Are there any hidden charges?",
    answer: "Never. The price you see before confirming your booking is the final price for the labor. If spare parts are required (e.g., in plumbing or electrical work), the professional will provide a transparent estimate and proceed only after your approval."
  },
  {
    question: "Do I need to provide cleaning supplies?",
    answer: "No, our professionals come fully equipped. For cleaning services, they bring industry-grade, safe chemicals and all necessary tools. You just need to provide water and electricity."
  },
  {
    question: "How do I reschedule or cancel a booking?",
    answer: "You can easily reschedule or cancel any booking directly from the 'My Bookings' section in your dashboard. Cancellations made 2 hours prior to the service time are completely free of charge."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[#FAFAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* ─── BENTO GRID LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* ── LEFT: Header + Trust Cards (Sticky) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Title Card */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-200/40">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E8EDE8] text-[#283628] mb-6">
                <MessageCircleQuestion size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Common<br/>questions
              </h2>
              <p className="text-slate-500 text-lg font-medium mb-6">
                Everything you need to know about booking with Inari.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#283628] text-white font-bold text-sm hover:bg-black transition-colors shadow-md">
                Still have questions? Contact us
              </Link>
            </div>

            {/* Trust Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-[24px] p-6 border border-slate-200/40 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-[#E8EDE8] flex items-center justify-center mb-4">
                  <ShieldCheck size={20} className="text-[#283628]" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">100%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Background Verified</p>
              </div>
              <div className="bg-white rounded-[24px] p-6 border border-slate-200/40 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-[#E8EDE8] flex items-center justify-center mb-4">
                  <Clock size={20} className="text-[#283628]" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">60 min</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Response Time</p>
              </div>
              <div className="bg-white rounded-[24px] p-6 border border-slate-200/40 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-[#E8EDE8] flex items-center justify-center mb-4">
                  <BadgeCheck size={20} className="text-[#283628]" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">₹0</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hidden Charges</p>
              </div>
              <div className="rounded-[24px] p-6 text-white flex flex-col items-start" style={{ backgroundColor: '#283628' }}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Headphones size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold mb-1">24/7</p>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Support</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: FAQ Accordion ── */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`bg-white rounded-[24px] md:rounded-[28px] overflow-hidden transition-all duration-300 border ${
                    isOpen ? 'border-[#283628]/20 shadow-md' : 'border-slate-200/50 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none"
                  >
                    <span className={`text-base md:text-lg font-bold transition-colors pr-4 ${isOpen ? 'text-[#283628]' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-[#283628] text-white rotate-180' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 md:px-7 pb-6 md:pb-7 text-slate-500 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
