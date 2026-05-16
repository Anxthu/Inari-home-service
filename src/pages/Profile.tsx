import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, ShieldCheck, CreditCard, LogOut, Pencil, X, Check, Settings, Bell, HelpCircle, ChevronRight } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startEditing = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setIsEditing(true);
  };

  const saveEdits = () => {
    updateUser({ name: editName, email: editEmail, phone: editPhone });
    setIsEditing(false);
  };

  const isPro = user.role === 'professional';

  return (
    <div className="pt-28 md:pt-36 pb-24 bg-[#FAFAFC] min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6">
        
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#283628] tracking-tight">
            Profile Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - User Card */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm h-fit">
            <div className="w-24 h-24 rounded-full bg-[#F0EDE8] text-[#283628] flex items-center justify-center mb-6 mx-auto">
              <User size={40} />
            </div>

            {isEditing ? (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#283628] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                  <input 
                    type="email" 
                    value={editEmail} 
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#283628] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone</label>
                  <input 
                    type="tel" 
                    value={editPhone} 
                    onChange={(e) => setEditPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={10}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#283628] focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={saveEdits}
                    className="flex-1 py-3 rounded-xl bg-[#283628] text-white font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={16} /> Save
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                  <p className="text-slate-500 font-medium capitalize">{user.role}</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Phone size={18} className="text-slate-400" /> {user.phone || 'Not set'}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Mail size={18} className="text-slate-400" /> {user.email}
                  </div>
                </div>

                <button 
                  onClick={startEditing}
                  className="w-full py-3 rounded-xl border border-[#283628] text-[#283628] font-bold hover:bg-[#283628] hover:text-white transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <Pencil size={16} /> Edit Profile
                </button>
              </>
            )}

            <button 
              onClick={handleLogout}
              className="w-full py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Identity Box */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className={isPro && !user.isNewPro ? "text-green-600" : "text-blue-600"} /> Identity Verification
              </h3>
              
              {isPro ? (
                user.isNewPro ? (
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold">Pending Verification</p>
                      <p className="text-sm opacity-80">Documents are currently under review.</p>
                    </div>
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center animate-pulse">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-800 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="font-bold">Verified Professional</p>
                      <p className="text-sm opacity-80">Identity and background checks cleared.</p>
                    </div>
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      <ShieldCheck size={16} />
                    </div>
                  </div>
                )
              ) : (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="font-bold">Phone Verified</p>
                    <p className="text-sm opacity-80">Mobile number verified via OTP.</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <Check size={16} />
                  </div>
                </div>
              )}
            </div>

            {/* Role Specific Boxes */}
            {isPro ? (
              <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-[#283628]" /> Payout Details
                </h3>
                <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">HDFC Bank **** 1234</p>
                    <p className="text-sm text-slate-500">Primary Payout Method</p>
                  </div>
                  <button className="text-sm font-bold text-[#283628] hover:underline">Edit</button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-[#283628]" /> Saved Addresses
                </h3>
                <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Home</p>
                    <p className="text-sm text-slate-500">123, 4th Cross, Indiranagar, Bangalore</p>
                  </div>
                  <button className="text-sm font-bold text-[#283628] hover:underline">Edit</button>
                </div>
                <button className="w-full mt-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  + Add New Address
                </button>
              </div>
            )}

          </div>

            {/* Support & Settings */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-sm mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Settings size={20} className="text-[#283628]" /> Account Preferences
              </h3>
              
              <div className="space-y-2">
                <button className="w-full p-4 flex items-center justify-between rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <Bell size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Notifications</p>
                      <p className="text-sm text-slate-500">Manage SMS and email alerts</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>

                <button className="w-full p-4 flex items-center justify-between rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <HelpCircle size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Help & Support</p>
                      <p className="text-sm text-slate-500">Contact customer service</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
