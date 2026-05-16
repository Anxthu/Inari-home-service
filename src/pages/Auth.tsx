import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Briefcase, Upload, CheckCircle2, Camera, FileText, Shield, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

type Step = 'phone' | 'otp' | 'name' | 'pro_service' | 'pro_experience' | 'pro_documents' | 'pro_review';

const serviceCategories = [
  { id: 'home-cleaning', label: 'Home Cleaning', icon: '🏠' },
  { id: 'ac-service', label: 'AC Service', icon: '❄️' },
  { id: 'plumbing', label: 'Plumbing', icon: '🔧' },
  { id: 'electrical', label: 'Electrical', icon: '⚡' },
  { id: 'painting', label: 'Painting', icon: '🎨' },
  { id: 'carpentry', label: 'Carpentry', icon: '🪚' },
  { id: 'pest-control', label: 'Pest Control', icon: '🛡️' },
  { id: 'appliance-repair', label: 'Appliance Repair', icon: '🔩' },
];

const experienceLevels = ['0–1 yr', '1–3 yrs', '3–5 yrs', '5–10 yrs', '10+ yrs'];

export default function Auth() {
  const location = useLocation();
  const initialRole = location.state?.role === 'professional' ? 'professional' : 'customer';

  const [role, setRole] = useState<'customer' | 'professional'>(initialRole);
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<Step>('phone');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Professional onboarding state
  const [proServices, setProServices] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [city, setCity] = useState('');
  const [availability, setAvailability] = useState<'full-time' | 'part-time'>('full-time');
  const [bio, setBio] = useState('');
  const [uploads, setUploads] = useState<Record<string, string>>({});

  const { login } = useAuth();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
  }, []);

  // Animate on step change
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  }, [step]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep('otp'); }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep('name'); }, 1000);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    if (role === 'professional') {
      setStep('pro_service');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(phone, name, role);
      navigate(returnTo || '/dashboard');
    }, 1000);
  };

  const handleMockUpload = (docType: string) => {
    const mockNames: Record<string, string> = {
      govtId: 'Aadhar_Card_9876.pdf',
      photo: 'Profile_Photo.jpg',
      license: 'Trade_License_2024.pdf',
      police: 'Police_Verification.pdf',
    };
    setUploads(prev => ({ ...prev, [docType]: mockNames[docType] || 'document.pdf' }));
  };

  const removeUpload = (docType: string) => {
    setUploads(prev => { const n = { ...prev }; delete n[docType]; return n; });
  };

  const handleFinalSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('pro_review');
    }, 1500);
  };

  const handleGoToDashboard = () => {
    login(phone, name, role, true);
    navigate('/pro-dashboard');
  };

  // Progress for pro steps
  const proStepIndex = { pro_service: 1, pro_experience: 2, pro_documents: 3, pro_review: 4 }[step as string] || 0;

  const getHeading = () => {
    switch (step) {
      case 'phone': return 'Get started';
      case 'otp': return 'Verify phone';
      case 'name': return 'Your details';
      case 'pro_service': return 'Your expertise';
      case 'pro_experience': return 'About you';
      case 'pro_documents': return 'Verification';
      case 'pro_review': return 'All done!';
    }
  };

  const getSubheading = () => {
    switch (step) {
      case 'phone': return 'Log in or sign up to continue';
      case 'otp': return `We sent an OTP to +91 ${phone}`;
      case 'name': return 'What should we call you?';
      case 'pro_service': return 'Select all services you can provide';
      case 'pro_experience': return 'Help us know you better';
      case 'pro_documents': return 'Upload documents for verification';
      case 'pro_review': return 'Your application has been submitted';
    }
  };

  const leftImage = role === 'customer'
    ? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#FDFDFD] flex">
      {/* LEFT HALF — Cinematic Image */}
      <div className="hidden lg:block w-1/2 relative bg-black">
        <img src={leftImage} alt="Inari Experience" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#283628] via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-20 left-20">
          <Link to="/" className="text-white text-3xl font-bold tracking-tight inline-block mb-8">inari.</Link>
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            {role === 'customer' ? 'Welcome to the new standard.' : 'Join India\'s elite network.'}
          </h2>
          <p className="text-white/70 text-lg max-w-md font-medium">
            {role === 'customer'
              ? 'Book verified professionals for your home, instantly.'
              : 'Earn more, work on your terms, and build your career.'}
          </p>
        </div>
      </div>

      {/* RIGHT HALF — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <Link to="/" className="absolute top-8 left-8 lg:hidden text-[#283628] text-2xl font-bold tracking-tight">inari.</Link>
        <Link to="/" className="absolute top-8 right-8 text-slate-400 hover:text-[#283628] transition-colors flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
           Back <ArrowLeft size={16} />
        </Link>

        <div ref={containerRef} className="w-full max-w-md">

          {/* Pro Progress Bar */}
          {proStepIndex > 0 && proStepIndex < 5 && (
            <div className="flex items-center gap-2 mb-10">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                    i <= proStepIndex ? 'bg-[#283628]' : 'bg-slate-200'
                  }`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    i <= proStepIndex ? 'text-[#283628]' : 'text-slate-300'
                  }`}>
                    {['Skills', 'Profile', 'Docs', 'Review'][i - 1]}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-[#283628] mb-3 tracking-tight">{getHeading()}</h1>
          <p className="text-slate-500 font-medium text-lg mb-10">{getSubheading()}</p>

          {/* ═══ PHONE STEP ═══ */}
          {step === 'phone' && (
            <>
              {/* Role Toggle */}
              <div className="bg-[#F6F6F6] p-1.5 rounded-full flex mb-10">
                <button type="button" onClick={() => setRole('customer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${
                    role === 'customer' ? 'bg-white text-[#283628] shadow-sm' : 'text-slate-500 hover:text-[#283628]'
                  }`}>
                  <User size={16} /> User
                </button>
                <button type="button" onClick={() => setRole('professional')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${
                    role === 'professional' ? 'bg-[#283628] text-white shadow-sm' : 'text-slate-500 hover:text-[#283628]'
                  }`}>
                  <Briefcase size={16} /> Professional
                </button>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#283628] font-bold text-lg">+91</span>
                    <input type="tel" value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-[24px] pl-16 pr-6 py-5 font-bold text-lg transition-all placeholder:text-slate-300"
                      placeholder="98765 43210" autoFocus />
                  </div>
                </div>
                <button type="submit" disabled={phone.length !== 10 || isLoading}
                  className="w-full bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                  {isLoading ? 'Sending OTP...' : 'Continue'}
                </button>
              </form>
            </>
          )}

          {/* ═══ OTP STEP ═══ */}
          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-2">
                  <label className="text-slate-400 font-bold text-xs uppercase tracking-widest">One Time Password</label>
                  <button type="button" onClick={() => setStep('phone')} className="text-[#283628] text-sm font-bold hover:underline">Edit Number</button>
                </div>
                <input type="text" value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-[24px] px-6 py-5 font-bold text-2xl tracking-[0.5em] text-center transition-all placeholder:text-slate-300"
                  placeholder="••••" autoFocus />
              </div>
              <button type="submit" disabled={otp.length !== 4 || isLoading}
                className="w-full bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* ═══ NAME STEP ═══ */}
          {step === 'name' && (
            <form onSubmit={handleNameSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2">Full Name</label>
                <input type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-[24px] px-6 py-5 font-bold text-lg transition-all placeholder:text-slate-300"
                  placeholder="E.g. John Doe" autoFocus />
              </div>
              <button type="submit" disabled={name.trim().length < 2 || isLoading}
                className="w-full bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                {isLoading ? 'Creating account...' : role === 'professional' ? 'Continue to Onboarding' : 'Complete Profile'}
              </button>
            </form>
          )}

          {/* ═══ PRO: SERVICE SELECTION ═══ */}
          {step === 'pro_service' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {serviceCategories.map(cat => {
                  const selected = proServices.includes(cat.id);
                  return (
                    <button key={cat.id} type="button"
                      onClick={() => setProServices(prev => selected ? prev.filter(s => s !== cat.id) : [...prev, cat.id])}
                      className={`p-5 rounded-[20px] border-2 text-left transition-all ${
                        selected
                          ? 'border-[#283628] bg-[#283628]/5'
                          : 'border-slate-100 hover:border-slate-300'
                      }`}>
                      <span className="text-2xl block mb-2">{cat.icon}</span>
                      <span className={`text-sm font-bold block ${selected ? 'text-[#283628]' : 'text-slate-600'}`}>{cat.label}</span>
                      {selected && <CheckCircle2 size={16} className="text-[#283628] mt-2" />}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setStep('pro_experience')} disabled={proServices.length === 0}
                className="w-full bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Continue
              </button>
            </div>
          )}

          {/* ═══ PRO: EXPERIENCE & LOCATION ═══ */}
          {step === 'pro_experience' && (
            <div className="space-y-8">
              {/* Experience */}
              <div className="space-y-3">
                <label className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2">Years of Experience</label>
                <div className="flex flex-wrap gap-2">
                  {experienceLevels.map(lvl => (
                    <button key={lvl} type="button" onClick={() => setExperience(lvl)}
                      className={`px-5 py-3 rounded-full text-sm font-bold border-2 transition-colors ${
                        experience === lvl ? 'border-[#283628] bg-[#283628]/5 text-[#283628]' : 'border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div className="space-y-3">
                <label className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2">City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-[24px] px-6 py-5 font-bold text-lg placeholder:text-slate-300"
                  placeholder="E.g. Bangalore" />
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <label className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2">Availability</label>
                <div className="bg-[#F6F6F6] p-1.5 rounded-full flex">
                  <button type="button" onClick={() => setAvailability('full-time')}
                    className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${
                      availability === 'full-time' ? 'bg-[#283628] text-white shadow-sm' : 'text-slate-500'
                    }`}>Full-time</button>
                  <button type="button" onClick={() => setAvailability('part-time')}
                    className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${
                      availability === 'part-time' ? 'bg-[#283628] text-white shadow-sm' : 'text-slate-500'
                    }`}>Part-time</button>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <label className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-2">Short Bio <span className="text-slate-300">(optional)</span></label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-[20px] px-6 py-4 font-medium min-h-[100px] resize-none placeholder:text-slate-300"
                  placeholder="Tell us about your skills and work style..." />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('pro_service')}
                  className="px-8 py-5 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-400 transition-colors">
                  Back
                </button>
                <button onClick={() => setStep('pro_documents')} disabled={!experience || !city.trim()}
                  className="flex-1 bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* ═══ PRO: DOCUMENT UPLOAD ═══ */}
          {step === 'pro_documents' && (
            <div className="space-y-5">
              {[
                { key: 'govtId', label: 'Government ID', sub: 'Aadhar Card or PAN Card', icon: <FileText size={22} />, required: true },
                { key: 'photo', label: 'Profile Photo', sub: 'A clear headshot of yourself', icon: <Camera size={22} />, required: true },
                { key: 'license', label: 'Trade License / Certification', sub: 'Relevant to your service area', icon: <Shield size={22} />, required: false },
                { key: 'police', label: 'Police Verification', sub: 'Background check certificate', icon: <Shield size={22} />, required: false },
              ].map(doc => (
                <div key={doc.key} className="relative">
                  {uploads[doc.key] ? (
                    <div className="flex items-center gap-4 p-5 rounded-[20px] border-2 border-green-200 bg-green-50/50">
                      <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                        <CheckCircle2 size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-green-800 text-sm block">{doc.label}</span>
                        <span className="text-green-600 text-xs font-medium truncate block">{uploads[doc.key]}</span>
                      </div>
                      <button onClick={() => removeUpload(doc.key)} className="text-slate-400 hover:text-red-500 transition-colors shrink-0">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleMockUpload(doc.key)}
                      className="w-full flex items-center gap-4 p-5 rounded-[20px] border-2 border-dashed border-slate-200 hover:border-[#283628] hover:bg-[#283628]/[0.02] transition-all text-left group">
                      <div className="w-12 h-12 rounded-2xl bg-[#F6F6F6] flex items-center justify-center text-slate-400 group-hover:text-[#283628] group-hover:bg-[#283628]/10 transition-colors shrink-0">
                        {doc.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-slate-700 text-sm block">
                          {doc.label} {doc.required && <span className="text-red-400">*</span>}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">{doc.sub}</span>
                      </div>
                      <Upload size={18} className="text-slate-300 group-hover:text-[#283628] transition-colors shrink-0" />
                    </button>
                  )}
                </div>
              ))}

              <p className="text-xs text-slate-400 font-medium text-center pt-2">
                Fields marked with <span className="text-red-400">*</span> are mandatory. Other documents boost your trust score.
              </p>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep('pro_experience')}
                  className="px-8 py-5 rounded-full border-2 border-slate-200 text-slate-600 font-bold hover:border-slate-400 transition-colors">
                  Back
                </button>
                <button onClick={handleFinalSubmit} disabled={!uploads.govtId || !uploads.photo || isLoading}
                  className="flex-1 bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}

          {/* ═══ PRO: REVIEW / SUCCESS ═══ */}
          {step === 'pro_review' && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>

              <div className="bg-[#F6F6F6] rounded-[24px] p-6 text-left space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Name</span>
                  <span className="text-[#283628] font-bold">{name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Phone</span>
                  <span className="text-[#283628] font-bold">+91 {phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Services</span>
                  <span className="text-[#283628] font-bold text-right max-w-[60%]">{proServices.map(s => serviceCategories.find(c => c.id === s)?.label).join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Experience</span>
                  <span className="text-[#283628] font-bold">{experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">City</span>
                  <span className="text-[#283628] font-bold">{city}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold">Documents</span>
                  <span className="text-green-600 font-bold">{Object.keys(uploads).length} uploaded</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-5 mb-8 text-left">
                <p className="text-sm font-bold text-amber-900 mb-1">What happens next?</p>
                <p className="text-sm text-amber-700 font-medium leading-relaxed">
                  Our team will verify your documents and conduct a background check within <strong>24–48 hours</strong>. You'll receive an SMS confirmation once approved.
                </p>
              </div>

              <button onClick={handleGoToDashboard}
                className="w-full bg-[#283628] text-white font-bold text-lg rounded-full py-5 hover:bg-black transition-colors shadow-lg">
                Go to Dashboard
              </button>
            </div>
          )}

          {/* Footer */}
          {step !== 'pro_review' && (
            <p className="text-center text-slate-400 text-sm font-medium mt-10">
              By continuing, you agree to Inari's <br /> <a href="#" className="text-[#283628] font-bold underline">Terms of Service</a> & <a href="#" className="text-[#283628] font-bold underline">Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
