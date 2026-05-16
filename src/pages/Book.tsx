import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ArrowLeft, Plus, Minus, Info, ShieldCheck } from 'lucide-react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Book() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const storageKey = `booking_${serviceId}`;

  const loadState = () => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  };

  const savedState = loadState();

  const [step, setStep] = useState(savedState?.step || 1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  
  // Selections
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>(savedState?.selectedSubServices || []);
  const [customRequirement, setCustomRequirement] = useState(savedState?.customRequirement || '');
  const [units, setUnits] = useState(savedState?.units || 1);
  const [addons, setAddons] = useState<string[]>(savedState?.addons || []);
  const [selectedPro, setSelectedPro] = useState(savedState?.selectedPro || '');
  const [selectedDate, setSelectedDate] = useState(savedState?.selectedDate || 'Tomorrow');
  const [selectedTime, setSelectedTime] = useState(savedState?.selectedTime || '09:00 AM');
  const [selectedAddress, setSelectedAddress] = useState(savedState?.selectedAddress || '');

  useEffect(() => {
    const state = { step, selectedSubServices, customRequirement, units, addons, selectedPro, selectedDate, selectedTime, selectedAddress };
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [step, selectedSubServices, customRequirement, units, addons, selectedPro, selectedDate, selectedTime, selectedAddress, storageKey]);

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.removeItem(storageKey);
    }
  }, [isSuccess, storageKey]);

  const getSubServices = (id: string | undefined) => {
    switch (id) {
      case 'home-cleaning': return ['Deep Home Cleaning', 'Sofa Cleaning', 'Bathroom Disinfection', 'Kitchen Scrub'];
      case 'ac-service': return ['AC Deep Clean', 'Gas Refill', 'AC Installation', 'Compressor Repair'];
      case 'plumbing': return ['Tap Repair', 'Pipe Fitting', 'Bathroom Installation', 'Water Heater Setup'];
      case 'electrical': return ['Switchboard Repair', 'Fan Installation', 'House Wiring', 'MCB Replacement'];
      case 'painting': return ['Interior Painting', 'Exterior Painting', 'Texture Finish', 'Waterproofing'];
      case 'carpentry': return ['Furniture Assembly', 'Door Fitting', 'Custom Shelves', 'Wardrobe Repair'];
      case 'pest-control': return ['Cockroach Treatment', 'Termite Control', 'Bed Bug Treatment', 'Mosquito Control'];
      case 'appliance-repair': return ['Washing Machine Repair', 'Refrigerator Repair', 'Geyser Repair', 'Microwave Repair'];
      default: return [];
    }
  };

  const getCustomizationInfo = (id: string | undefined) => {
    if (id === 'ac-service') return { title: 'Number of AC units', desc: 'How many ACs need servicing?' };
    if (id === 'plumbing' || id === 'electrical' || id === 'carpentry' || id === 'appliance-repair') return { title: 'Estimated Hours', desc: 'How many hours do you think the job will take?' };
    return { title: 'Property Size (BHK)', desc: 'Select the size of your property to scale the job.' };
  };

  const availableAddons = [
    { name: 'Balcony Wash', price: 299 },
    { name: 'Eco-Friendly Chemicals', price: 199 },
    { name: 'Weekend Priority', price: 499 }
  ];

  const subServices = getSubServices(serviceId);

  // Dynamic pricing per service type
  const getBasePrice = (id: string | undefined) => {
    switch (id) {
      case 'home-cleaning': return 1499;
      case 'ac-service': return 599;
      case 'plumbing': return 349;
      case 'electrical': return 299;
      case 'painting': return 2499;
      case 'carpentry': return 499;
      case 'pest-control': return 799;
      case 'appliance-repair': return 399;
      default: return 999;
    }
  };

  // Sub-service price multipliers (some cost more than the base)
  const getSubServicePrice = (sub: string) => {
    const premiumServices: Record<string, number> = {
      'Deep Home Cleaning': 1499, 'Sofa Cleaning': 899, 'Bathroom Disinfection': 699, 'Kitchen Scrub': 799,
      'AC Deep Clean': 599, 'Gas Refill': 1299, 'AC Installation': 1999, 'Compressor Repair': 2499,
      'Tap Repair': 349, 'Pipe Fitting': 599, 'Bathroom Installation': 2999, 'Water Heater Setup': 1499,
      'Switchboard Repair': 299, 'Fan Installation': 399, 'House Wiring': 1999, 'MCB Replacement': 499,
      'Interior Painting': 2499, 'Exterior Painting': 3499, 'Texture Finish': 1999, 'Waterproofing': 2999,
      'Furniture Assembly': 499, 'Door Fitting': 699, 'Custom Shelves': 1499, 'Wardrobe Repair': 899,
      'Cockroach Treatment': 799, 'Termite Control': 1499, 'Bed Bug Treatment': 1299, 'Mosquito Control': 599,
      'Washing Machine Repair': 499, 'Refrigerator Repair': 599, 'Geyser Repair': 399, 'Microwave Repair': 349,
    };
    return premiumServices[sub] || getBasePrice(serviceId);
  };

  const basePrice = selectedSubServices.length > 0
    ? selectedSubServices.reduce((sum, sub) => sum + getSubServicePrice(sub), 0)
    : 0;

  const addonsTotal = addons.reduce((sum, addonName) => {
    const addon = availableAddons.find(a => a.name === addonName);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const subTotal = (basePrice * units) + addonsTotal;
  const comboDiscount = (subTotal > 1500 || addons.length > 0) ? Math.round(subTotal * 0.1) : 0;
  const totalPrice = subTotal - comboDiscount;

  const toggleSubService = (sub: string) => {
    setSelectedSubServices(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const toggleAddon = (name: string) => {
    setAddons(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  const mainCategories = [
    { id: 'home-cleaning', title: 'Home Cleaning' },
    { id: 'ac-service', title: 'AC & Appliance Repair' },
    { id: 'plumbing', title: 'Plumbing' },
    { id: 'electrical', title: 'Electrical' },
    { id: 'painting', title: 'Painting & Waterproofing' },
    { id: 'carpentry', title: 'Carpentry' },
    { id: 'pest-control', title: 'Pest Control' }
  ];

  // Success Screen
  if (isSuccess) {
    return (
      <main className="pt-32 pb-32 min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="bg-white p-12 rounded-[40px] text-center border border-slate-200/50 shadow-sm max-w-md w-full mx-4 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-[#E8EDE8] rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="text-[#283628]" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-[#283628] mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 font-bold mb-8">Booking ID: #INR-2847</p>
          
          <div className="bg-[#FDFDFD] p-6 rounded-2xl text-left mb-8 text-sm border border-slate-100">
            <p className="text-slate-900 font-bold mb-1">{selectedPro || 'Professional'} will arrive on</p>
            <p className="text-[#3D5A3D] font-bold mb-4">{selectedDate} between {selectedTime}</p>
            <p className="text-slate-500 font-medium">Booking confirmation sent to <span className="font-bold text-slate-700">{user?.phone || '+91 98765 43210'}</span>. You will receive a live tracking link on WhatsApp shortly.</p>
          </div>
          
          <Link to="/dashboard" className="block w-full py-4 bg-[#283628] text-white rounded-2xl font-bold text-center hover:bg-black transition-colors shadow-lg">
            View My Bookings
          </Link>
        </div>
      </main>
    );
  }

  const customizationInfo = getCustomizationInfo(serviceId);

  return (
    <main className="pt-28 md:pt-36 pb-32 min-h-screen bg-[#FDFDFD]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Navigation & Progress Bar (Placed above flex layout to align sidebar with form) */}
        <div className="w-full md:pr-[352px] lg:pr-[390px]">
          <div className="mb-8 md:mb-12">
            <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/services')} 
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#283628] transition-colors mb-8"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <div className="flex items-center justify-between relative mb-8 overflow-hidden md:overflow-visible">
            <div className="absolute left-0 top-4 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-4 -translate-y-1/2 h-1 bg-[#283628] -z-10 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 6) * 100}%` }}
            ></div>
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Customize' },
              { num: 3, label: 'Pro' },
              { num: 4, label: 'Schedule' },
              { num: 5, label: 'Location' },
              { num: 6, label: 'Summary' },
              { num: 7, label: 'Pay' }
            ].map(s => (
              <div key={s.num} className={`flex flex-col items-center gap-2 ${s.num > 5 && 'hidden md:flex'}`}>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                    step >= s.num ? 'bg-[#283628] text-white shadow-md' : 'bg-[#FDFDFD] border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:block ${step >= s.num ? 'text-[#283628]' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="flex-1 min-w-0 w-full">
            {/* Form Container */}
        <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-slate-200/50 shadow-sm relative overflow-hidden">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">
                {subServices.length > 0 ? 'Select your service' : 'What do you need help with?'}
              </h2>
              <p className="text-slate-500 text-lg mb-10">
                {subServices.length > 0 ? 'Select one or more options below.' : 'Select a main category to view available services.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {subServices.length > 0 ? (
                  subServices.map((sub, i) => {
                    const isSelected = selectedSubServices.includes(sub);
                    return (
                      <button 
                        key={i} 
                        onClick={() => toggleSubService(sub)}
                        className={`p-6 rounded-[24px] border-2 text-left transition-all ${
                          isSelected 
                          ? 'border-[#283628] bg-[#FDFDFD] shadow-sm' 
                          : 'border-slate-100 hover:border-slate-300 hover:bg-[#FDFDFD]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 mb-4 flex items-center justify-center ${isSelected ? 'border-[#283628] bg-[#283628]' : 'border-slate-300'}`}>
                          {isSelected && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <span className={`font-bold block text-lg ${isSelected ? 'text-[#283628]' : 'text-slate-700'}`}>
                          {sub}
                        </span>
                        <span className="text-sm font-bold text-slate-400 mt-1 block">₹{getSubServicePrice(sub)}</span>
                      </button>
                    );
                  })
                ) : (
                  <>
                    {mainCategories.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => navigate(`/book/${cat.id}`)}
                        className="p-6 rounded-[24px] border-2 border-slate-100 hover:border-[#283628] hover:bg-[#FDFDFD] text-left transition-all group"
                      >
                        <span className="font-bold block text-lg text-slate-700 group-hover:text-[#283628]">
                          {cat.title}
                        </span>
                      </button>
                    ))}
                  </>
                )}
              </div>

              {subServices.length > 0 && (
                <div className="mb-10">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Don't see what you need? Describe it here:</label>
                  <textarea 
                    value={customRequirement}
                    onChange={(e) => setCustomRequirement(e.target.value)}
                    placeholder="E.g., I need my refrigerator compressor checked and gas refilled..."
                    className="w-full p-5 rounded-[24px] border-2 border-slate-200 focus:border-[#283628] focus:ring-0 outline-none transition-colors resize-none h-32 text-slate-700"
                  />
                </div>
              )}

              {subServices.length > 0 && (
                <button 
                  onClick={() => setStep(2)} 
                  disabled={selectedSubServices.length === 0 && customRequirement.trim() === ''}
                  className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
                >
                  Continue <ChevronRight size={20} />
                </button>
              )}
            </div>
          )}

          {/* STEP 2: CUSTOMIZATION */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">Customize service</h2>
              <p className="text-slate-500 text-lg mb-10">Tailor the service to your exact requirements.</p>
              
              <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#FDFDFD] border border-slate-200 rounded-[24px] gap-4">
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 mb-1">{customizationInfo.title}</h4>
                    <p className="text-sm font-medium text-slate-500">{customizationInfo.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-2 rounded-full border border-slate-200 shadow-sm w-fit">
                    <button 
                      onClick={() => setUnits(Math.max(1, units - 1))}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-xl text-[#283628] w-6 text-center">{units}</span>
                    <button 
                      onClick={() => setUnits(units + 1)}
                      className="w-10 h-10 rounded-full bg-[#283628] flex items-center justify-center text-white hover:bg-black transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Offer Nudge */}
              {addons.length === 0 && subTotal <= 1500 ? (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-[20px] p-5 mb-6 flex items-start gap-4">
                  <span className="text-2xl shrink-0">🎁</span>
                  <div>
                    <p className="font-bold text-emerald-800 text-sm">Unlock 10% Combo Savings</p>
                    <p className="text-emerald-600 text-xs font-medium mt-0.5">Add any add-on below or increase units to get an instant 10% off your total bill.</p>
                  </div>
                </div>
              ) : comboDiscount > 0 ? (
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-[20px] p-5 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-bold text-emerald-800 text-sm">Combo Savings Unlocked!</p>
                      <p className="text-emerald-600 text-xs font-medium mt-0.5">10% off applied to your order.</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-emerald-700">-₹{comboDiscount}</span>
                </div>
              ) : null}

              <h3 className="text-xl font-bold text-[#283628] mb-4">Recommended Add-ons</h3>
              <div className="space-y-3 mb-10">
                {availableAddons.map((addon, i) => (
                  <label key={i} className={`flex items-center justify-between p-5 rounded-[20px] border-2 cursor-pointer transition-colors ${addons.includes(addon.name) ? 'border-[#283628] bg-[#FDFDFD]' : 'border-slate-100 hover:border-slate-300'}`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        checked={addons.includes(addon.name)}
                        onChange={() => toggleAddon(addon.name)}
                        className="w-5 h-5 accent-[#283628] rounded"
                      />
                      <span className="font-bold text-slate-700">{addon.name}</span>
                    </div>
                    <span className="font-bold text-[#283628]">+₹{addon.price}</span>
                  </label>
                ))}
              </div>

              <button onClick={() => setStep(3)} className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg text-lg">
                Continue <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 3: PROFESSIONAL SELECTION */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">Available Professionals</h2>
              <p className="text-slate-500 text-lg mb-10">Select a verified expert for your job.</p>
              
              <div className="space-y-4 mb-10">
                {[
                  { name: 'Rajesh Kumar', rating: '4.9', jobs: '342', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
                  { name: 'Amit Singh', rating: '4.8', jobs: '128', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
                ].map((pro, i) => (
                  <label key={i} className={`flex items-center justify-between p-6 rounded-[24px] border-2 cursor-pointer transition-colors ${selectedPro === pro.name ? 'border-[#283628] bg-[#FDFDFD]' : 'border-slate-100 hover:border-slate-300'}`}>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img src={pro.img} alt={pro.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 text-[10px] font-bold border border-slate-200 shadow-sm flex items-center gap-1">
                          ★ {pro.rating}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#283628] mb-1">{pro.name}</h4>
                        <div className="text-sm font-medium text-slate-500">
                          {pro.jobs} successful jobs completed
                        </div>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="pro" 
                      checked={selectedPro === pro.name}
                      onChange={() => setSelectedPro(pro.name)}
                      className="w-6 h-6 accent-[#283628]" 
                    />
                  </label>
                ))}
              </div>

              <button 
                onClick={() => setStep(4)} 
                disabled={!selectedPro}
                className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg text-lg disabled:opacity-50"
              >
                Continue <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 4: TIME SELECTION */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">Choose a time</h2>
              <p className="text-slate-500 text-lg mb-10">When should the professional arrive?</p>
              
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-4">Select Date</label>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {['Today', 'Tomorrow', '14 Jun', '15 Jun'].map((day, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedDate(day)}
                      className={`flex-shrink-0 px-6 py-4 rounded-2xl font-bold border-2 transition-colors ${selectedDate === day ? 'border-[#283628] bg-[#FDFDFD] text-[#283628]' : 'border-slate-100 text-slate-500 hover:border-slate-300'}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

                <div className="mb-10">
                  <label className="block text-sm font-bold text-slate-700 mb-4">Select Time Slot</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map((time, i) => {
                      const isHighDemand = time === '11:00 AM' || time === '02:00 PM';
                      return (
                        <button 
                          key={i} 
                          disabled={isHighDemand}
                          onClick={() => setSelectedTime(time)}
                          className={`py-4 rounded-2xl font-bold border-2 transition-colors relative overflow-hidden ${
                            isHighDemand ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed opacity-70' 
                            : selectedTime === time ? 'border-[#283628] bg-[#FDFDFD] text-[#283628]' 
                            : 'border-slate-100 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {time}
                          {isHighDemand && (
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] text-[10px] font-black uppercase tracking-widest text-slate-400 rotate-[-15deg] whitespace-nowrap bg-white/90 py-1">
                              Fully Booked
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              <button onClick={() => setStep(5)} className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg text-lg">
                Continue <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 5: LOCATION / ADDRESS */}
          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">Service Location</h2>
              <p className="text-slate-500 text-lg mb-10">Where should the professional arrive?</p>
              
              {user ? (
                <>
                  <div className="space-y-4 mb-10">
                    {[
                      { id: 'home', type: 'Home', address: '123, Palm Grove Apartments, Sector 4, HSR Layout' },
                      { id: 'office', type: 'Office', address: 'Prestige Tech Park, Block C, Outer Ring Road' }
                    ].map((loc) => (
                      <label key={loc.id} className={`flex items-start gap-4 p-5 rounded-[24px] border-2 cursor-pointer transition-colors ${selectedAddress === loc.address ? 'border-[#283628] bg-[#FDFDFD]' : 'border-slate-100 hover:border-slate-300'}`}>
                        <input type="radio" name="address" checked={selectedAddress === loc.address} onChange={() => setSelectedAddress(loc.address)} className="w-5 h-5 mt-1 accent-[#283628]" />
                        <div>
                          <span className={`font-bold block mb-1 text-lg ${selectedAddress === loc.address ? 'text-[#283628]' : 'text-slate-700'}`}>{loc.type}</span>
                          <p className="text-sm text-slate-500 font-medium leading-relaxed">{loc.address}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {!showNewAddressForm ? (
                    <button onClick={() => setShowNewAddressForm(true)} className="w-full py-5 mb-10 border-2 border-dashed border-slate-300 rounded-[24px] text-slate-500 font-bold hover:border-[#283628] hover:text-[#283628] hover:bg-[#FDFDFD] transition-colors flex justify-center items-center gap-2">
                      <Plus size={20} /> Add New Address
                    </button>
                  ) : (
                    <div className="bg-[#FDFDFD] p-6 rounded-[24px] border border-slate-200/50 shadow-sm mb-10">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-slate-500 font-bold text-xs uppercase tracking-widest pl-1">New Service Address</label>
                        <button onClick={() => setShowNewAddressForm(false)} className="text-xs text-red-500 font-bold hover:underline">Cancel</button>
                      </div>
                      <textarea 
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-2xl px-5 py-4 font-medium min-h-[140px] resize-none placeholder:text-slate-400"
                        placeholder="Enter house number, building name, street, and area..."
                      ></textarea>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4 mb-10">
                  <div className="bg-[#FDFDFD] p-6 rounded-[24px] border border-slate-200/50 shadow-sm">
                    <label className="text-slate-500 font-bold text-xs uppercase tracking-widest pl-1 mb-3 block">Service Address</label>
                    <textarea 
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="w-full bg-[#F6F6F6] border-none focus:ring-2 focus:ring-[#283628]/10 text-[#283628] rounded-2xl px-5 py-4 font-medium min-h-[140px] resize-none placeholder:text-slate-400"
                      placeholder="Enter house number, building name, street, and area..."
                    ></textarea>
                    <p className="text-xs font-bold text-slate-400 mt-3 text-center">Your address will be securely saved when you create your account.</p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setStep(6)} 
                disabled={!selectedAddress}
                className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg text-lg disabled:opacity-50"
              >
                View Summary <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 6: SUMMARY */}
          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">Booking Summary</h2>
              <p className="text-slate-500 text-lg mb-8">Please review your selections before proceeding.</p>
              
              <div className="bg-amber-50 p-4 md:p-5 rounded-2xl md:rounded-[24px] border border-amber-200/50 flex gap-3 mb-8">
                <Info className="text-amber-500 shrink-0 mt-0.5" size={24} />
                <p className="text-sm font-medium text-amber-800 leading-relaxed">
                  <strong className="block mb-1 text-amber-900">Important Note</strong>
                  The final price is subject to on-site inspection. Extra work outside the selected scope may incur additional charges. Cancellations within 2 hours of the schedule incur a fee.
                </p>
              </div>

              <div className="bg-[#FDFDFD] p-8 rounded-[32px] mb-10 border border-slate-200/50 relative">
                
                {/* Details Breakdown */}
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Service</span>
                      <span className="text-lg font-bold text-[#283628]">
                        {selectedSubServices.length > 0 ? selectedSubServices.join(', ') : 'Custom Service'} (x{units})
                      </span>
                      {customRequirement && (
                        <p className="text-sm font-medium text-slate-500 mt-2 p-3 bg-white rounded-xl border border-slate-100 italic">
                          "{customRequirement}"
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Schedule</span>
                      <span className="font-bold text-slate-700">{selectedDate} • {selectedTime}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Location</span>
                      <span className="font-bold text-slate-700">{selectedAddress}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Professional</span>
                      <span className="font-bold text-slate-700">{selectedPro}</span>
                    </div>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="font-bold text-slate-900 mb-4">Price Breakdown</h4>
                  <div className="space-y-3 text-sm font-medium text-slate-600 mb-4">
                    {selectedSubServices.length > 0 ? (
                      selectedSubServices.map((sub, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{sub} (x{units})</span>
                          <span>₹{getSubServicePrice(sub) * units}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between">
                        <span>Base Service (x{units})</span>
                        <span>₹{basePrice * units}</span>
                      </div>
                    )}
                    {addons.map((addon, i) => {
                      const addonObj = availableAddons.find(a => a.name === addon);
                      return (
                        <div key={i} className="flex justify-between">
                          <span>{addon}</span>
                          <span>+₹{addonObj?.price}</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between text-green-600">
                      <span>Taxes & Fees</span>
                      <span>Included</span>
                    </div>
                    {comboDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold mt-2 pt-2 border-t border-slate-100">
                        <span>Combo Savings (10% Off)</span>
                        <span>-₹{comboDiscount}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-dashed border-slate-300">
                    <span className="font-bold text-slate-900">Estimated Total</span>
                    <span className="text-2xl font-bold text-[#283628]">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep(7)} className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-xl text-lg">
                Proceed to Checkout <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 7: CHECKOUT & AUTH */}
          {step === 7 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-[#283628] mb-3">Checkout</h2>
              
              {!user ? (
                <>
                  <p className="text-slate-500 text-lg mb-8">You need an account to complete this booking.</p>
                  <div className="bg-[#FDFDFD] p-8 rounded-[32px] border border-slate-200/50 mb-8 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Info className="text-blue-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Guest Checkout</h3>
                    <p className="text-slate-500 font-medium mb-8">Please login or sign up to save your booking history and manage your appointments.</p>
                    <Link to="/auth" state={{ returnTo: location.pathname }} className="block w-full py-4 bg-[#283628] text-white rounded-2xl font-bold hover:bg-black transition-colors shadow-lg">
                      Login / Sign Up
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-slate-500 text-lg mb-10">Choose a payment method to complete booking.</p>
                  
                  <h3 className="text-xl font-bold text-[#283628] mb-4">Payment Method</h3>
                  <div className="space-y-4 mb-10">
                    {['UPI Auto-Pay', 'Credit / Debit Card', 'Pay later (Cash/UPI)'].map((method, i) => (
                      <label key={i} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${i === 2 ? 'border-[#283628] bg-[#FDFDFD]' : 'border-slate-100 hover:border-slate-300'}`}>
                        <input type="radio" name="payment" className="w-5 h-5 accent-[#283628]" defaultChecked={i === 2} />
                        <span className={`font-bold ${i === 2 ? 'text-[#283628]' : 'text-slate-600'}`}>{method}</span>
                      </label>
                    ))}
                  </div>

                  <button onClick={() => setIsSuccess(true)} className="w-full py-4 md:py-5 bg-[#283628] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-xl text-lg">
                    Pay ₹{totalPrice} & Book <ChevronRight size={20} />
                  </button>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <ShieldCheck size={18} className="text-green-500" />
                      100% Secure Payment
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                      <ShieldCheck size={18} className="text-blue-500" />
                      Money-back Guarantee
                    </div>
                  </div>
                  <p className="text-center text-xs font-bold text-slate-400 mt-6">
                    By confirming, you agree to our terms of service.
                  </p>
                </>
              )}
            </div>
          )}

          </div>
        </div>
          
          {/* RIGHT COLUMN: STICKY LIVE SUMMARY */}
          {step < 6 && serviceId && (
            <div className="hidden md:block w-[320px] lg:w-[350px] shrink-0">
              <div className="sticky top-36 bg-white p-6 lg:p-8 rounded-[32px] border border-slate-200/50 shadow-sm">
                <h3 className="text-lg lg:text-xl font-bold text-[#283628] mb-6">Live Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm gap-4">
                    <span className="font-medium text-slate-500 shrink-0">Service</span>
                    <span className="font-bold text-slate-800 text-right">
                      {selectedSubServices.length > 0 ? selectedSubServices.join(', ') : 'Select services'} {selectedSubServices.length > 0 && `(x${units})`}
                    </span>
                  </div>
                  {addons.length > 0 && (
                    <div className="flex justify-between text-sm gap-4">
                      <span className="font-medium text-slate-500 shrink-0">Add-ons</span>
                      <span className="font-bold text-slate-800 text-right">{addons.join(', ')}</span>
                    </div>
                  )}
                  {selectedPro && (
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-500">Professional</span>
                      <span className="font-bold text-slate-800">{selectedPro}</span>
                    </div>
                  )}
                  {step >= 4 && (
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-500">Schedule</span>
                      <span className="font-bold text-slate-800 text-right">{selectedDate}<br/>{selectedTime}</span>
                    </div>
                  )}
                </div>

                {comboDiscount > 0 && (
                  <div className="flex justify-between text-sm mb-4 bg-emerald-50 p-3 rounded-xl">
                    <span className="font-bold text-emerald-600">Savings</span>
                    <span className="font-bold text-emerald-600">-₹{comboDiscount}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-bold text-[#283628]">₹{totalPrice}</span>
                </div>
                
                <p className="text-[10px] font-bold text-slate-400 mt-4 text-center">
                  Final price may vary after on-site inspection.
                </p>
              </div>
            </div>
          )}

      </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      {step < 7 && !isSuccess && serviceId && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-40 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Total</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#283628]">₹{totalPrice}</span>
                {comboDiscount > 0 && (
                  <span className="text-xs font-bold text-emerald-600">-₹{comboDiscount} off</span>
                )}
              </div>
            </div>
            {step < 6 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#283628] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black transition-colors flex items-center gap-2"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => setStep(7)}
                className="bg-[#283628] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-black transition-colors flex items-center gap-2"
              >
                Checkout <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
