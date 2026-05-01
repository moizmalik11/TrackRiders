import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Phone, ArrowLeft, Bike, ArrowRight } from "lucide-react";

const RiderLogin = () => {
  const [riderId, setRiderId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (riderId && phone) {
      localStorage.setItem("rider", JSON.stringify({ riderId, phone, name: "Rider " + riderId }));
      navigate("/rider-panel");
    } else {
      setError("Please enter your Rider ID and registered Phone number.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-brand-red/10 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-red/5 blur-[120px] rounded-full -z-10"></div>

      <button 
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-slate-500 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all font-medium text-[10px] uppercase tracking-widest shadow-sm border border-slate-100"
      >
        <ArrowLeft className="w-3 h-3" /> Back
      </button>

      <div className="w-full max-w-6xl h-[80vh] min-h-[600px] bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 flex overflow-hidden border border-slate-100 relative">
        
        {/* Marketing Side */}
        <div className="hidden lg:flex w-[45%] h-full bg-slate-900 relative flex-col justify-between p-16 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('/rider-login-bg.png')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <Bike className="w-8 h-8 text-white" />
              <span className="text-xl font-medium text-white tracking-tight">Rider Portal</span>
            </div>
            <h2 className="text-4xl font-medium text-white leading-tight mb-6">
              Deliver <br />
              with precision.
            </h2>
            <p className="text-slate-400 text-sm font-medium max-w-xs leading-relaxed">
              Join the fleet and manage your deliveries in real-time.
            </p>
          </div>

          <div className="relative z-10 text-slate-500 text-[10px] font-medium uppercase tracking-widest">
            © 2026 TrackRiders Network
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-[55%] h-full bg-white flex flex-col justify-center p-8 lg:p-20">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-12 text-center lg:text-left">
              <h1 className="text-3xl font-medium text-slate-900 mb-2 tracking-tight">Rider Sign In</h1>
              <p className="text-slate-400 text-sm font-medium">Enter your credentials to start your shift.</p>
            </header>

            {error && (
              <div className="text-red-500 text-[11px] font-medium mb-8 text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Bike className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-sm font-medium"
                  value={riderId}
                  onChange={(e) => setRiderId(e.target.value)}
                  placeholder="Rider ID (e.g. RDR-001)"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type="tel"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-sm font-medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-medium text-sm hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6 shadow-sm"
              >
                <span>Start Your Shift</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RiderLogin;