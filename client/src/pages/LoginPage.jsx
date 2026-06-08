import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowLeft, Building, User, MapPin, ArrowRight, Eye, EyeOff, Smartphone, LogIn, UserPlus, Loader2 } from "lucide-react";
import { useRiders } from "../context/RiderContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchRiders } = useRiders();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setError("");
        localStorage.setItem('token', data.token);
        await fetchRiders(); // Fetch latest data before navigating
        navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!email || !password || !name || !organizationName || !city) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, organizationName, city })
      });

      const data = await response.json();
      if (response.ok) {
        setError("");
        alert("Registration successful! Please login.");
        setIsRegistering(false);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
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

      {/* Outer Container for Split View */}
      <div className="w-full max-w-[1240px] h-[85vh] min-h-[700px] bg-[#0e1014]/60 backdrop-blur-3xl rounded-[60px] border border-white/10 shadow-2xl flex overflow-hidden relative z-10">
        
        {/* Left Side: Dynamic Marketing */}
        <motion.div 
          className="hidden lg:flex w-1/2 h-full bg-black/40 relative flex-col justify-between p-20 overflow-hidden"
          animate={{ x: isRegistering ? '100%' : '0%' }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
        >
          {/* Background Image / Pattern for Left Side */}
          <div className="absolute inset-0 z-0">
            <img src="/login-bg.png" alt="Marketing" className="w-full h-full object-cover opacity-30 scale-110 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-[#0e1014]/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10">
            <p className="text-[#00d2ff] text-xs font-medium mb-16 tracking-widest uppercase">Global logistics • Local precision</p>
            <h2 className="text-6xl font-medium text-white leading-tight mb-8 tracking-tight">
              Manage <br />
              your fleet
            </h2>
            
            {/* Visual Phone Mockup / Decorative Element */}
            <div className="w-64 aspect-[9/19] bg-white/5 border border-white/10 rounded-[3rem] p-3 shadow-2xl backdrop-blur-sm mt-10">
               <div className="w-full h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden flex flex-col p-4 gap-3 relative border border-white/5">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300d2ff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                  <div className="w-full h-2 bg-white/10 rounded-full mb-4 relative z-10"></div>
                  <div className="w-2/3 h-4 bg-[#00d2ff] rounded-lg relative z-10"></div>
                  <div className="grid grid-cols-4 gap-2 mt-auto relative z-10">
                    <div className="aspect-square rounded-full bg-white/10"></div>
                    <div className="aspect-square rounded-full bg-white/10"></div>
                    <div className="aspect-square rounded-full bg-white/10"></div>
                    <div className="aspect-square rounded-full bg-[#28c840]/60 shadow-[0_0_10px_rgba(40,200,64,0.3)]"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative z-10 text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">
            © 2026 TrackRiders Platform
          </div>
        </motion.div>

        {/* Right Side: Form Portal */}
        <motion.div 
          className="w-full lg:w-1/2 h-full bg-[#0e1014] border-x border-white/5 flex flex-col relative z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          animate={{ 
            x: isRegistering ? '-100%' : '0%',
            borderTopLeftRadius: isRegistering ? 0 : 60,
            borderBottomLeftRadius: isRegistering ? 0 : 60,
            borderTopRightRadius: isRegistering ? 60 : 0,
            borderBottomRightRadius: isRegistering ? 60 : 0
          }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
        >
          {/* Internal Navigation */}
          <header className="flex items-center justify-between px-12 lg:px-20 py-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#00d2ff]">
                   <polygon points="3 11 22 2 13 21 11 13 3 11" />
                 </svg>
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">TrackRiders</span>
            </div>
            
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-all font-medium text-xs tracking-tight"
            >
              <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] bg-white/5">
                {isRegistering ? <LogIn className="w-3 h-3 text-[#00d2ff]" /> : <UserPlus className="w-3 h-3 text-[#00d2ff]" />}
              </div>
              {isRegistering ? "Sign In" : "Sign Up"}
            </button>
          </header>

          {/* Form Content - Centered */}
          <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
            <div className="max-w-[380px] w-full">
              <h1 className="text-5xl font-medium text-white mb-10 tracking-tight">
                {isRegistering ? "Sign Up" : "Sign In"}
              </h1>

              {error && (
                <div className="text-[#ff5f57] text-[11px] font-medium mb-6 flex items-center gap-2 bg-[#ff5f57]/10 p-3 rounded-lg border border-[#ff5f57]/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]"></div>
                   {error}
                </div>
              )}

              <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {isRegistering && (
                    <motion.div key="reg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                         <input
                           type="text"
                           className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-xs font-medium shadow-sm"
                           value={organizationName}
                           onChange={(e) => setOrganizationName(e.target.value)}
                           placeholder="Org Name"
                           required
                         />
                         <input
                           type="text"
                           className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-xs font-medium shadow-sm"
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                           placeholder="City"
                           required
                         />
                      </div>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-xs font-medium shadow-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Admin Full Name"
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  type="email"
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-sm font-medium shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Username"
                  required
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-sm font-medium shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <AnimatePresence>
                  {isRegistering && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative overflow-hidden"
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-[#00d2ff]/50 transition-all text-sm font-medium shadow-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isRegistering && (
                  <div className="px-6 pt-1">
                    <button type="button" className="text-xs font-medium text-white/50 hover:text-[#00d2ff] transition-colors tracking-tight">Forgot password?</button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00d2ff] text-black py-5 rounded-2xl font-bold text-sm hover:bg-[#A4F4FD] transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6 shadow-[0_0_20px_rgba(0,210,255,0.2)] disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>{isRegistering ? "Register Organization" : "Sign In"}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Internal Footer */}
          <footer className="flex items-center justify-between px-12 lg:px-20 py-12 text-[10px] text-white/40 font-medium uppercase tracking-widest">
            <span>© 2005-2026 TrackRiders Inc.</span>
            <div className="flex gap-6">
              <button onClick={() => navigate('/rider-login')} className="hover:text-white transition-colors">Rider Login</button>
              <div className="flex items-center gap-1 hover:text-white cursor-pointer uppercase">English <ArrowRight className="w-2.5 h-2.5 rotate-90" /></div>
            </div>
          </footer>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
