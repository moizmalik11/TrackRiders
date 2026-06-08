import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Phone, ArrowLeft, Bike, ArrowRight, Eye, EyeOff, LogIn, KeyRound, Loader2 } from "lucide-react";

const RiderLogin = () => {
  const [riderId, setRiderId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!riderId || !password) {
      setError("Please enter your Rider ID and Password.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/riders/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riderId, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("rider", JSON.stringify({ 
          ...data.rider,
          role: 'rider' 
        }));
        navigate("/rider-panel");
      } else {
        setError(data.message || "Invalid Rider ID or Password.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white flex items-center justify-center p-6 lg:p-12 font-sans selection:bg-[#00d2ff]/20">
      
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video 
          autoPlay loop muted playsInline
          className="w-full h-full object-cover pointer-events-none opacity-40 mix-blend-screen"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" 
        />
      </div>

      {/* Global SVG Filters */}
      <svg width="0" height="0" className="absolute">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Floating Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/40 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all font-medium text-[10px] uppercase tracking-widest border border-white/10 shadow-sm"
      >
        <ArrowLeft className="w-3 h-3" /> Back
      </button>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 backdrop-blur-sm shadow-xl">
             <Bike className="w-6 h-6 text-[#00d2ff]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
            Rider Portal
          </h1>
          <p className="text-white/50 text-sm">
            Connect to your route securely.
          </p>
        </div>

        <motion.div 
          className="liquid-glass rounded-3xl p-8 border border-white/10 bg-[#0e1014]/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          layout
        >
          {error && (
            <div className="text-[#ff5f57] text-xs font-medium mb-6 flex items-center gap-2 bg-[#ff5f57]/10 p-3 rounded-lg border border-[#ff5f57]/20">
               <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]"></div>
               {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00d2ff] transition-colors">
                <Bike className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-sm font-medium"
                value={riderId}
                onChange={(e) => setRiderId(e.target.value)}
                placeholder="Rider ID (e.g. RDR-001)"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00d2ff] transition-colors">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-sm font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex justify-end px-1 pt-1">
              <button type="button" className="text-xs font-medium text-white/50 hover:text-white transition-colors">Forgot password?</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00d2ff] text-black py-4 rounded-xl font-semibold text-sm hover:bg-[#A4F4FD] transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6 disabled:opacity-70 mt-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Connect Now</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="mt-12 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest font-medium">
          <span>© 2026 TrackRiders</span>
          <button onClick={() => navigate('/login')} className="hover:text-white/60 transition-colors flex items-center gap-1">
            Admin Login <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiderLogin;