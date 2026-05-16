import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, IndianRupee, Star, MapPin, Clock, ArrowRight, Navigation, CheckCircle2, Phone, MessageSquare, ChevronDown, TrendingUp, Wallet, AlertCircle, Plus } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

// ── Count-up animation hook ──
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return { count, ref };
}

// ── Mock Data ──
const upcomingJobs = [
  { 
    id: 'JOB-2847', service: 'Deep Home Cleaning', time: '10:00 AM - 12:00 PM', 
    location: 'Koramangala, Bangalore', address: '#42, 4th Cross, 6th Block, Koramangala',
    status: 'Starting soon', customer: 'Priya Sharma', customerPhone: '+91 98765 43210',
    customerImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    amount: '₹1,499', items: ['3 BHK Full Clean', 'Bathroom Deep Scrub', 'Kitchen Degreasing']
  },
  { 
    id: 'JOB-2848', service: 'AC Servicing (2 Units)', time: '02:30 PM - 04:00 PM', 
    location: 'Indiranagar, Bangalore', address: '#18, 12th Main, Indiranagar',
    status: 'Scheduled', customer: 'Rahul Desai', customerPhone: '+91 87654 32100',
    customerImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    amount: '₹899', items: ['Split AC Foam Jet Clean x2', 'Gas Pressure Check', 'Filter Sanitization']
  },
  { 
    id: 'JOB-2849', service: 'Electrical Repair', time: '05:00 PM - 06:00 PM', 
    location: 'HSR Layout, Bangalore', address: '#7, Sector 2, HSR Layout',
    status: 'Scheduled', customer: 'Ananya V', customerPhone: '+91 76543 21000',
    customerImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    amount: '₹349', items: ['Switchboard Replacement', 'Fan Regulator Install']
  }
];

const pastJobs = [
  { id: 'JOB-2840', service: 'Plumbing Repair', date: '04 May 2026', amount: '₹549', rating: 5, customer: 'Karthik N' },
  { id: 'JOB-2835', service: 'Deep Home Cleaning', date: '03 May 2026', amount: '₹1,999', rating: 5, customer: 'Sneha P' },
  { id: 'JOB-2831', service: 'AC Servicing', date: '02 May 2026', amount: '₹499', rating: 4, customer: 'Vikram S' },
  { id: 'JOB-2828', service: 'Electrical Repair', date: '01 May 2026', amount: '₹299', rating: 5, customer: 'Meera K' },
];

const earningsData = {
  today: 4250,
  thisWeek: 18750,
  thisMonth: 67200,
  payouts: [
    { date: '01 May 2026', amount: '₹12,450', method: 'HDFC Bank ****1234', status: 'Completed' },
    { date: '24 Apr 2026', amount: '₹15,800', method: 'HDFC Bank ****1234', status: 'Completed' },
    { date: '17 Apr 2026', amount: '₹11,200', method: 'HDFC Bank ****1234', status: 'Completed' },
  ],
  weeklyBreakdown: [
    { day: 'Mon', amount: 3200 },
    { day: 'Tue', amount: 4100 },
    { day: 'Wed', amount: 2800 },
    { day: 'Thu', amount: 4250 },
    { day: 'Fri', amount: 0 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 0 },
  ]
};

export default function ProDashboard() {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobStatuses, setJobStatuses] = useState<Record<string, string>>({
    'JOB-2847': 'Starting soon',
    'JOB-2848': 'Scheduled',
    'JOB-2849': 'Scheduled',
  });

  // OTP State
  const [showOtpInput, setShowOtpInput] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState('');

  // Extra Charges State
  const [showExtraChargeForm, setShowExtraChargeForm] = useState<string | null>(null);
  const [extraChargeReason, setExtraChargeReason] = useState('');
  const [extraChargeAmount, setExtraChargeAmount] = useState('');
  const [jobExtraCharges, setJobExtraCharges] = useState<Record<string, { reason: string, amount: string }[]>>({});

  // Determine active tab from URL
  const isEarningsRoute = location.pathname.includes('/earnings');
  const [activeTab, setActiveTab] = useState(isEarningsRoute ? 'earnings' : 'active');

  useEffect(() => {
    if (isEarningsRoute) setActiveTab('earnings');
  }, [isEarningsRoute]);

  const earningsCount = useCountUp(earningsData.today);
  const jobsCount = useCountUp(142);
  const ratingCount = useCountUp(49); // 4.9 * 10

  if (!user || user.role !== 'professional') {
    return <Navigate to="/auth" />;
  }

  const [showNewProBanner, setShowNewProBanner] = useState(!!user.isNewPro);

  const handleDismissBanner = () => {
    setShowNewProBanner(false);
    updateUser({ isNewPro: false });
  };

  const handleVerifyOtpAndStart = (jobId: string) => {
    if (otpValue.length === 4) { // Mock verification
      setJobStatuses(prev => ({ ...prev, [jobId]: 'In Progress' }));
      setShowOtpInput(null);
      setOtpValue('');
    } else {
      alert('Please enter a valid 4-digit OTP from the customer.');
    }
  };

  const handleCompleteJob = (jobId: string) => {
    setJobStatuses(prev => ({ ...prev, [jobId]: 'Completed' }));
  };

  const handleAddExtraCharge = (jobId: string) => {
    if (!extraChargeReason || !extraChargeAmount) return;
    
    setJobExtraCharges(prev => ({
      ...prev,
      [jobId]: [...(prev[jobId] || []), { reason: extraChargeReason, amount: extraChargeAmount }]
    }));
    
    setExtraChargeReason('');
    setExtraChargeAmount('');
    setShowExtraChargeForm(null);
  };

  const tabs = [
    { key: 'active', label: 'Active Jobs', count: upcomingJobs.filter(j => jobStatuses[j.id] !== 'Completed').length },
    { key: 'past', label: 'Past Bookings' },
    { key: 'earnings', label: 'Earnings' },
  ];

  // ── NEW PROFESSIONAL: PENDING VERIFICATION VIEW ──
  if (showNewProBanner) {
    return (
      <div className="pt-24 md:pt-28 pb-24 bg-[#FAFAFC] min-h-screen">
        <div className="max-w-[700px] mx-auto px-4 md:px-6">
          
          {/* Welcome Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-[#E8EDE8] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} className="text-[#283628]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#283628] tracking-tight mb-3">
              Welcome to Inari, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Your application is being reviewed by our team.
            </p>
          </div>

          {/* Status Tracker */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-lg mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Application Status</h3>
            
            <div className="space-y-0">
              {[
                { label: 'Application Submitted', sub: 'Your details and documents have been received', done: true },
                { label: 'Document Verification', sub: 'Our team is reviewing your uploaded documents', active: true },
                { label: 'Background Check', sub: 'We conduct a quick background verification', done: false },
                { label: 'Account Activation', sub: 'You\'ll receive an SMS once you\'re approved', done: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      item.done ? 'bg-green-100 text-green-600' : item.active ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-slate-100 text-slate-300'
                    }`}>
                      {item.done ? <CheckCircle2 size={20} /> : <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-amber-500' : 'bg-slate-300'}`} />}
                    </div>
                    {i < 3 && <div className={`w-0.5 h-12 ${item.done ? 'bg-green-200' : 'bg-slate-100'}`} />}
                  </div>
                  <div className="pb-8">
                    <p className={`font-bold text-sm ${item.done ? 'text-green-700' : item.active ? 'text-amber-700' : 'text-slate-400'}`}>{item.label}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Timeline */}
          <div className="bg-amber-50 border border-amber-200/50 rounded-[24px] p-6 mb-8">
            <div className="flex gap-3 items-start">
              <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">Expected Timeline</p>
                <p className="text-sm text-amber-700 font-medium leading-relaxed">
                  Verification typically takes <strong>24–48 hours</strong>. You'll receive an SMS at your registered number once your account is activated and you can start accepting jobs.
                </p>
              </div>
            </div>
          </div>

          {/* What you can do */}
          <div className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">While you wait</h3>
            <div className="space-y-4">
              {[
                { emoji: '📱', text: 'Keep your phone handy — we may call for a quick verification' },
                { emoji: '📸', text: 'Ensure your profile photo is professional and clear' },
                { emoji: '📋', text: 'Familiarize yourself with Inari\'s service guidelines' },
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#F6F6F6]">
                  <span className="text-xl">{tip.emoji}</span>
                  <p className="text-sm font-medium text-slate-600">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Dashboard Button */}
          <button onClick={handleDismissBanner}
            className="w-full py-5 bg-[#283628] text-white font-bold text-lg rounded-full hover:bg-black transition-colors shadow-lg">
            Preview Dashboard
          </button>
          <p className="text-center text-slate-400 text-xs font-medium mt-3">
            This will show a preview of your dashboard with sample data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-24 bg-[#FAFAFC] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#283628] tracking-tight mb-1">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-slate-500 font-medium">
              You have {upcomingJobs.filter(j => jobStatuses[j.id] !== 'Completed').length} jobs scheduled for today.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <span className="text-sm font-bold text-slate-700">Accepting Jobs</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-lg flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Today's Earnings</p>
              <p className="text-3xl font-bold text-slate-900" ref={earningsCount.ref}>₹{earningsCount.count.toLocaleString()}</p>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">+₹850 today</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE8] text-[#283628] flex items-center justify-center">
              <IndianRupee size={22} />
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-lg flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Jobs Completed</p>
              <p className="text-3xl font-bold text-slate-900">{jobsCount.count}</p>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-2 inline-block">+3 this week</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE8] text-[#283628] flex items-center justify-center">
              <Calendar size={22} />
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-lg flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overall Rating</p>
              <p className="text-3xl font-bold text-slate-900">{(ratingCount.count / 10).toFixed(1)}/5</p>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-2 inline-block">★ Top 5% Pro</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE8] text-[#283628] flex items-center justify-center">
              <Star size={22} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 mb-8 border border-slate-100 shadow-sm w-fit">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.key 
                  ? 'bg-[#283628] text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${
                  activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB: Active Jobs ── */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {upcomingJobs.filter(j => jobStatuses[j.id] !== 'Completed').length === 0 ? (
              <div className="bg-white rounded-[32px] p-16 border border-slate-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-[#E8EDE8] rounded-full flex items-center justify-center mx-auto mb-6 text-[#283628]">
                  <Calendar size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#283628] mb-2">No active jobs</h3>
                <p className="text-slate-500 font-medium">All jobs are completed for today. Great work! 🎉</p>
              </div>
            ) : (
              upcomingJobs.filter(j => jobStatuses[j.id] !== 'Completed').map(job => {
                const isExpanded = expandedJob === job.id;
                const status = jobStatuses[job.id];
                const baseAmount = parseInt(job.amount.replace(/\D/g, ''));
                const extraAmount = jobExtraCharges[job.id]?.reduce((sum, c) => sum + parseInt(c.amount || '0'), 0) || 0;
                const totalAmount = baseAmount + extraAmount;

                return (
                  <div key={job.id} className="bg-white rounded-[24px] border border-slate-100 shadow-lg overflow-hidden transition-all">
                    {/* Job Header */}
                    <div 
                      className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-[#283628] text-white'
                        }`}>
                          {status === 'In Progress' ? <Clock size={20} /> : <Calendar size={20} />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{job.service}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {job.time}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          status === 'Starting soon' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse' :
                          'bg-[#E8EDE8] text-[#283628]'
                        }`}>
                          {status}
                        </span>
                        <span className="text-lg font-bold text-[#283628]">₹{totalAmount.toLocaleString()}</span>
                        <ChevronDown size={18} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 p-6 bg-[#FAFAFC] space-y-6">
                        {/* Customer Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img src={job.customerImg} alt={job.customer} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div>
                              <p className="font-bold text-slate-900">{job.customer}</p>
                              <p className="text-sm text-slate-500">{job.address}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a href={`tel:${job.customerPhone}`} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#283628] hover:text-white hover:border-[#283628] transition-colors">
                              <Phone size={16} />
                            </a>
                            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#283628] hover:text-white hover:border-[#283628] transition-colors">
                              <MessageSquare size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Service Checklist & Extra Charges */}
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Scope of Work</p>
                          <div className="space-y-2">
                            {job.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                <CheckCircle2 size={16} className="text-[#283628]" />
                                {item}
                              </div>
                            ))}
                            {/* Render Extra Charges */}
                            {jobExtraCharges[job.id]?.map((charge, i) => (
                              <div key={`extra-${i}`} className="flex items-center justify-between text-sm font-bold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                                <div className="flex items-center gap-2">
                                  <Plus size={16} className="text-amber-600" />
                                  {charge.reason}
                                </div>
                                <span>+₹{charge.amount}</span>
                              </div>
                            ))}
                          </div>

                          {/* Add Extra Charge Input Flow */}
                          {status !== 'Completed' && (
                            <div className="mt-4">
                              {showExtraChargeForm === job.id ? (
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                                  <input 
                                    type="text" 
                                    placeholder="Reason (e.g. Additional BHK cleaning)" 
                                    value={extraChargeReason}
                                    onChange={e => setExtraChargeReason(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:border-[#283628] focus:ring-0 outline-none"
                                  />
                                  <div className="flex gap-2">
                                    <div className="relative flex-1">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                      <input 
                                        type="number" 
                                        placeholder="Amount" 
                                        value={extraChargeAmount}
                                        onChange={e => setExtraChargeAmount(e.target.value)}
                                        className="w-full pl-8 p-3 rounded-lg border border-slate-200 text-sm focus:border-[#283628] focus:ring-0 outline-none"
                                      />
                                    </div>
                                    <button 
                                      onClick={() => handleAddExtraCharge(job.id)}
                                      className="px-6 bg-[#283628] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors"
                                    >
                                      Apply
                                    </button>
                                    <button 
                                      onClick={() => setShowExtraChargeForm(null)}
                                      className="px-4 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => setShowExtraChargeForm(job.id)}
                                  className="text-sm font-bold text-[#283628] hover:underline flex items-center gap-1"
                                >
                                  <Plus size={16} /> Add Extra Charge
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`}
                            target="_blank" rel="noreferrer"
                            className="flex-1 py-3.5 rounded-xl bg-white border border-slate-200 font-bold text-sm text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                          >
                            <Navigation size={16} /> Navigate
                          </a>
                          
                          {/* OTP Verification & Start Job Flow */}
                          {status === 'Starting soon' || status === 'Scheduled' ? (
                            showOtpInput === job.id ? (
                              <div className="flex-1 flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Enter 4-digit OTP" 
                                  maxLength={4}
                                  value={otpValue}
                                  onChange={e => setOtpValue(e.target.value.replace(/\D/g, ''))}
                                  className="flex-1 p-3.5 rounded-xl border border-slate-200 text-center font-bold tracking-widest focus:border-[#283628] outline-none"
                                />
                                <button 
                                  onClick={() => handleVerifyOtpAndStart(job.id)}
                                  className="px-6 rounded-xl bg-[#283628] font-bold text-sm text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
                                >
                                  Verify
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setShowOtpInput(job.id)}
                                className="flex-1 py-3.5 rounded-xl bg-[#283628] font-bold text-sm text-white flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-md"
                              >
                                <ArrowRight size={16} /> Start Job
                              </button>
                            )
                          ) : status === 'In Progress' ? (
                            <button 
                              onClick={() => handleCompleteJob(job.id)}
                              className="flex-1 py-3.5 rounded-xl bg-green-600 font-bold text-sm text-white flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md"
                            >
                              <CheckCircle2 size={16} /> Mark as Complete
                            </button>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── TAB: Past Bookings ── */}
        {activeTab === 'past' && (
          <div className="space-y-3">
            {pastJobs.map(job => (
              <div key={job.id} className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{job.service}</h3>
                    <p className="text-sm text-slate-500 font-medium">{job.customer} · {job.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(job.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="font-bold text-[#283628] text-lg">{job.amount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB: Earnings ── */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Earnings Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Today', amount: `₹${earningsData.today.toLocaleString()}`, trend: '+18%', bg: 'bg-[#283628]', text: 'text-white' },
                { label: 'This Week', amount: `₹${earningsData.thisWeek.toLocaleString()}`, trend: '+12%', bg: 'bg-white', text: 'text-slate-900' },
                { label: 'This Month', amount: `₹${earningsData.thisMonth.toLocaleString()}`, trend: '+8%', bg: 'bg-white', text: 'text-slate-900' },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-[24px] p-6 ${i === 0 ? 'shadow-xl' : 'border border-slate-100 shadow-lg'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${i === 0 ? 'text-white/60' : 'text-slate-400'}`}>{item.label}</p>
                  <p className={`text-3xl font-bold ${item.text} mb-2`}>{item.amount}</p>
                  <span className={`text-xs font-bold ${i === 0 ? 'text-green-400' : 'text-green-600'} flex items-center gap-1`}>
                    <TrendingUp size={12} /> {item.trend} vs last period
                  </span>
                </div>
              ))}
            </div>

            {/* Weekly Breakdown Chart */}
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-6">This Week's Breakdown</h3>
              <div className="flex items-end justify-between gap-2 h-40">
                {earningsData.weeklyBreakdown.map((day, i) => {
                  const maxAmount = Math.max(...earningsData.weeklyBreakdown.map(d => d.amount));
                  const height = maxAmount > 0 ? (day.amount / maxAmount) * 100 : 0;
                  const isToday = i === 3; // Thursday
                  return (
                    <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                      <span className={`text-[10px] font-bold ${isToday ? 'text-[#283628]' : 'text-slate-400'}`}>
                        {day.amount > 0 ? `₹${(day.amount / 1000).toFixed(1)}k` : '—'}
                      </span>
                      <div 
                        className={`w-full max-w-[40px] rounded-xl transition-all duration-500 ${
                          isToday ? 'bg-[#283628]' : day.amount > 0 ? 'bg-[#E8EDE8]' : 'bg-slate-100'
                        }`}
                        style={{ height: `${Math.max(height, 8)}%` }}
                      />
                      <span className={`text-xs font-bold ${isToday ? 'text-[#283628]' : 'text-slate-400'}`}>{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Wallet size={18} /> Payout History</h3>
              </div>
              <div className="space-y-3">
                {earningsData.payouts.map((payout, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAFC] border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900">{payout.amount}</p>
                      <p className="text-xs text-slate-500 font-medium">{payout.date} · {payout.method}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> {payout.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800">Next payout: May 8, 2026</p>
                  <p className="text-xs text-amber-600">Pending: ₹4,250 will be transferred to HDFC Bank ****1234</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
