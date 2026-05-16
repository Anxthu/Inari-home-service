import { useAuth } from '../context/AuthContext';
import { Calendar, CheckCircle2, ArrowUpRight, MapPin, ReceiptText, Clock, X, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const isNewUser = !!user?.isNewPro; // reusing the flag for new customers too

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  const mockBookings = [
    {
      id: 'INR-3921',
      service: 'Electrical Works',
      professional: 'Suresh Menon',
      professionalImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      date: 'Today, 13 June',
      time: '02:00 PM - 03:00 PM',
      status: 'On the way',
      statusColor: 'bg-emerald-50 text-emerald-700',
      amount: '₹1499'
    },
    {
      id: 'INR-3890',
      service: 'AC Servicing',
      professional: 'Vikram Singh',
      professionalImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      date: '10 June 2024',
      time: '10:00 AM - 11:30 AM',
      status: 'Completed',
      statusColor: 'bg-slate-100 text-slate-600',
      amount: '₹999'
    }
  ];

  // Show empty state for brand new users
  if (isNewUser) {
    return (
      <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-32">
        <div className="max-w-[700px] mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#E8EDE8] flex items-center justify-center mx-auto mb-6">
              <Sparkles size={36} className="text-[#283628]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#283628] tracking-tight mb-3">
              Welcome to Inari, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-slate-500 font-medium text-lg">Your account is all set. Book your first home service to get started.</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-lg mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">What you can do</h3>
            <div className="space-y-4">
              {[
                { emoji: '🏠', title: 'Book a Service', desc: 'Browse 8+ categories from deep cleaning to electrical repair' },
                { emoji: '⭐', title: 'Verified Professionals', desc: 'Every pro is background-checked and certified' },
                { emoji: '💬', title: 'Real-time Tracking', desc: 'Track your professional\'s arrival and job progress live' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F6F6]">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="font-bold text-[#283628] text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/services" className="block w-full py-5 bg-[#283628] text-white font-bold text-lg rounded-full hover:bg-black transition-colors shadow-lg text-center">
            Browse Services
          </Link>
          <button onClick={() => updateUser({ isNewPro: false })} className="block w-full text-center text-slate-400 text-xs font-medium mt-4 hover:text-slate-600 transition-colors">
            Skip to dashboard preview →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8" ref={containerRef}>
        
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Personal Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#283628]">
            Welcome back, <br className="md:hidden" />
            <span className="text-slate-400">{user?.name?.split(' ')[0]}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Upcoming Booking Banner */}
            <div className="bg-[#283628] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-[50px] -translate-y-1/2 translate-x-1/3"></div>
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                      Upcoming
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">AC Deep Cleaning</h2>
                    <p className="text-white/60 font-medium flex items-center gap-2">
                      <Calendar size={16} /> Tomorrow, 10:00 AM
                    </p>
                 </div>
                 <button onClick={() => setSelectedBooking(mockBookings[0])} className="bg-white text-[#283628] px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors self-start md:self-auto flex items-center gap-2">
                   View Details <ArrowUpRight size={16} />
                 </button>
               </div>
            </div>

            {/* Bookings List */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#283628] tracking-tight">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} onClick={() => setSelectedBooking(booking)} className="bg-white border border-slate-200/60 rounded-[32px] p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      {/* Left: Service Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#F6F6F6] rounded-2xl flex items-center justify-center text-[#283628]">
                          {booking.status === 'Completed' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#283628]">{booking.service}</h4>
                          <p className="text-slate-500 font-medium text-sm">{booking.date} • {booking.time}</p>
                        </div>
                      </div>

                      {/* Right: Pro Info & Status */}
                      <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto w-full border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                        <div className="flex items-center gap-3">
                          <img src={booking.professionalImg} alt={booking.professional} className="w-10 h-10 rounded-full object-cover grayscale" />
                          <div className="hidden sm:block">
                            <p className="text-sm font-bold text-[#283628]">{booking.professional}</p>
                            <p className="text-xs font-medium text-slate-500">Professional</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-lg font-bold text-[#283628]">{booking.amount}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mt-1 ${booking.statusColor}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-[#F6F6F6] rounded-[32px] p-8">
               <h3 className="text-xl font-bold text-[#283628] tracking-tight mb-6">Quick Actions</h3>
               <div className="space-y-3">
                 <Link to="/book" className="w-full flex items-center justify-between bg-white p-4 rounded-2xl hover:shadow-md transition-shadow group text-left">
                   <span className="font-bold text-[#283628]">Book New Service</span>
                   <ArrowUpRight size={18} className="text-slate-400 group-hover:text-[#283628]" />
                 </Link>
                 <button className="w-full flex items-center justify-between bg-white p-4 rounded-2xl hover:shadow-md transition-shadow group text-left">
                   <span className="font-bold text-[#283628]">Manage Addresses</span>
                   <MapPin size={18} className="text-slate-400 group-hover:text-[#283628]" />
                 </button>
                 <button className="w-full flex items-center justify-between bg-white p-4 rounded-2xl hover:shadow-md transition-shadow group text-left">
                   <span className="font-bold text-[#283628]">Payment Methods</span>
                   <ReceiptText size={18} className="text-slate-400 group-hover:text-[#283628]" />
                 </button>
               </div>
             </div>

             <div className="bg-[#E8EDE8] rounded-[32px] p-8 text-center">
               <h3 className="text-xl font-bold text-[#283628] tracking-tight mb-2">Need help?</h3>
               <p className="text-[#3D5A3D] font-medium mb-6">Our concierge is available 24/7.</p>
               <button className="bg-[#283628] text-white w-full rounded-full py-4 font-bold hover:bg-black transition-colors">
                 Contact Support
               </button>
             </div>
          </div>

        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}></div>
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedBooking.id}</span>
                <h3 className="text-2xl font-bold text-[#283628] tracking-tight">{selectedBooking.service}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="w-10 h-10 bg-[#F6F6F6] rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              
              {/* Status */}
              <div className="bg-[#F6F6F6] p-6 rounded-[24px]">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Status</p>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${selectedBooking.status === 'Completed' ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'}`}></div>
                  <span className="text-xl font-bold text-[#283628]">{selectedBooking.status}</span>
                </div>
              </div>

              {/* Schedule & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200/60 rounded-[24px] p-5">
                  <Calendar size={20} className="text-[#3D5A3D] mb-3" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Schedule</p>
                  <p className="text-sm font-bold text-[#283628]">{selectedBooking.date}</p>
                  <p className="text-xs font-medium text-slate-500">{selectedBooking.time}</p>
                </div>
                <div className="border border-slate-200/60 rounded-[24px] p-5">
                  <MapPin size={20} className="text-[#3D5A3D] mb-3" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-bold text-[#283628]">HSR Layout</p>
                  <p className="text-xs font-medium text-slate-500">Sector 4</p>
                </div>
              </div>

              {/* Professional */}
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Assigned Professional</p>
                <div className="flex items-center gap-4 bg-white border border-slate-200/60 p-4 rounded-[24px]">
                  <img src={selectedBooking.professionalImg} alt={selectedBooking.professional} className="w-14 h-14 rounded-full object-cover grayscale" />
                  <div>
                    <h4 className="font-bold text-[#283628] flex items-center gap-2">
                      {selectedBooking.professional}
                      <ShieldCheck size={16} className="text-blue-500" />
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">4.9 ★ • 120+ Jobs</p>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Payment Summary</p>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm font-medium text-slate-600">
                    <span>Base Fare</span>
                    <span>{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-green-600">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-xl font-bold text-[#283628]">{selectedBooking.amount}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white">
               {selectedBooking.status === 'Completed' ? (
                 <button className="w-full py-4 bg-[#F6F6F6] text-[#283628] font-bold rounded-2xl hover:bg-slate-200 transition-colors">
                   Download Invoice
                 </button>
               ) : (
                 <div className="flex gap-3">
                   <button className="flex-1 py-4 bg-[#283628] text-white font-bold rounded-2xl hover:bg-black transition-colors">
                     Track Pro
                   </button>
                   <button className="px-6 py-4 bg-[#F6F6F6] text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors">
                     Cancel
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
