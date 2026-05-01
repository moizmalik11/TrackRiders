import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Phone, ArrowLeft, Bike, ArrowRight, Eye, EyeOff, LogIn, KeyRound } from "lucide-react";

const RiderLogin = () => {
  const [riderId, setRiderId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!riderId || !password) {
      setError("Please enter your Rider ID and Password.");
      return;
    }

    try {
      // For now, using simulated login logic since we are in dev
      // In a real app, this would be a fetch call to /api/riders/login
      if (riderId && (password === "123" || password.length > 0)) {
        localStorage.setItem("rider", JSON.stringify({ 
          riderId, 
          name: "Rider " + riderId,
          role: 'rider' 
        }));
        navigate("/rider-panel");
      } else {
        setError("Invalid Rider ID or Password.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 lg:p-12 font-sans selection:bg-brand-red/10 relative overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[120px] -z-10"></div>

      {/* Floating Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-slate-400 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all font-medium text-[10px] uppercase tracking-widest shadow-sm border border-slate-100"
      >
        <ArrowLeft className="w-3 h-3" /> Back
      </button>

      <div className="w-full max-w-[1240px] h-[85vh] min-h-[700px] bg-brand-dark rounded-[60px] shadow-2xl flex overflow-hidden relative border border-white/5">
        
        {/* Left Side: Marketing */}
        <div className="hidden lg:flex w-1/2 h-full bg-brand-dark relative flex-col justify-between p-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/rider-login-bg.png" alt="Rider Marketing" className="w-full h-full object-cover opacity-40 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10">
            <p className="text-slate-500 text-xs font-medium mb-16 tracking-wide uppercase tracking-[0.2em]">Fleet Network • Secure Access</p>
            <h2 className="text-6xl font-medium text-white leading-tight mb-8 tracking-tight">
              Securely <br />
              connect to <br />
              your route.
            </h2>
            <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
              Log in with your unique credentials to access real-time orders and navigation tools.
            </p>
          </div>

          <div className="relative z-10 text-slate-500 text-[10px] font-medium uppercase tracking-[0.2em]">
            © 2026 TrackRiders Network
          </div>
        </div>

        {/* Right Side: Form Portal */}
        <div className="w-full lg:w-1/2 h-full bg-white flex flex-col relative z-20 rounded-l-[80px]">
          {/* Internal Navigation */}
          <header className="flex items-center justify-between px-12 lg:px-20 py-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center overflow-hidden">
                 <Bike className="w-5 h-5 text-brand-red" />
              </div>
              <span className="text-xl font-semibold text-slate-900 tracking-tight">Rider Portal</span>
            </div>
            
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-medium text-xs tracking-tight"
            >
              <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-[10px]">
                <LogIn className="w-3 h-3" />
              </div>
              Admin Login
            </button>
          </header>

          {/* Form Content - Centered */}
          <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
            <div className="max-w-[380px] w-full mx-auto lg:mx-0">
              <h1 className="text-5xl font-medium text-slate-900 mb-4 tracking-tight">
                Sign In
              </h1>
              <p className="text-slate-400 text-sm font-medium mb-10">Enter your rider ID and secure password.</p>

              {error && (
                <div className="text-red-500 text-[11px] font-medium mb-6 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-red-500"></div>
                   {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors">
                    <Bike className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-14 pr-8 py-5 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-sm font-medium shadow-sm"
                    value={riderId}
                    onChange={(e) => setRiderId(e.target.value)}
                    placeholder="Rider ID (e.g. RDR-001)"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-14 pr-16 py-5 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-sm font-medium shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="px-6 pt-1 flex justify-between">
                  <button type="button" className="text-xs font-medium text-brand-red hover:underline tracking-tight">Forgot password?</button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-red to-orange-500 text-white py-5 rounded-full font-medium text-sm hover:shadow-xl hover:shadow-brand-red/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-8 shadow-lg shadow-brand-red/10"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Connect Now</span>
                </button>
              </form>
            </div>
          </div>

          {/* Internal Footer */}
          <footer className="flex items-center justify-between px-12 lg:px-20 py-12 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            <span>© 2026 TrackRiders Network</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900">Get Help</a>
              <div className="flex items-center gap-1 hover:text-slate-900 cursor-pointer uppercase">English <ArrowRight className="w-2.5 h-2.5 rotate-90" /></div>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
};

export default RiderLogin;