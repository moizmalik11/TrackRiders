import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowLeft, Building, User, MapPin, ArrowRight, Eye, EyeOff, Smartphone, LogIn, UserPlus } from "lucide-react";

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
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setError("");
        localStorage.setItem('token', data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
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

      <div className="w-full max-w-[1240px] h-[85vh] min-h-[700px] bg-brand-dark rounded-[60px] shadow-2xl flex overflow-hidden relative">
        
        {/* Left Side: Dynamic Marketing */}
        <motion.div 
          className="hidden lg:flex w-1/2 h-full bg-brand-dark relative flex-col justify-between p-20 overflow-hidden"
          animate={{ x: isRegistering ? '100%' : '0%' }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
        >
          <div className="absolute inset-0 z-0">
            <img src="/login-bg.png" alt="Marketing" className="w-full h-full object-cover opacity-30 scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10">
            <p className="text-slate-500 text-xs font-medium mb-16 tracking-wide">Global payments made simple — online payment solutions for you.</p>
            <h2 className="text-6xl font-medium text-white leading-tight mb-8 tracking-tight">
              Manage <br />
              your fleet
            </h2>
            
            {/* Visual Phone Mockup */}
            <div className="w-64 aspect-[9/19] bg-white/5 border border-white/10 rounded-[3rem] p-3 shadow-2xl backdrop-blur-sm mt-10">
               <div className="w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col p-4 gap-3">
                  <div className="w-full h-2 bg-white/10 rounded-full mb-4"></div>
                  <div className="w-2/3 h-4 bg-brand-red rounded-lg"></div>
                  <div className="grid grid-cols-4 gap-2 mt-auto">
                    <div className="aspect-square rounded-full bg-white/5"></div>
                    <div className="aspect-square rounded-full bg-white/5"></div>
                    <div className="aspect-square rounded-full bg-white/5"></div>
                    <div className="aspect-square rounded-full bg-brand-red/40"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative z-10 text-slate-500 text-[10px] font-medium uppercase tracking-[0.2em]">
            © 2026 TrackRiders Platform
          </div>
        </motion.div>

        {/* Right Side: Form Portal (The "Payoneer" White Card) */}
        <motion.div 
          className="w-full lg:w-1/2 h-full bg-white flex flex-col relative z-20"
          animate={{ 
            x: isRegistering ? '-100%' : '0%',
            borderTopLeftRadius: isRegistering ? 0 : 80,
            borderBottomLeftRadius: isRegistering ? 0 : 80,
            borderTopRightRadius: isRegistering ? 80 : 0,
            borderBottomRightRadius: isRegistering ? 80 : 0
          }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
        >
          {/* Internal Navigation (Payoneer Style) */}
          <header className="flex items-center justify-between px-12 lg:px-20 py-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center overflow-hidden">
                 <img src="/vite2.png" alt="Logo" className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold text-slate-900 tracking-tight">TrackRiders</span>
            </div>
            
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-medium text-xs tracking-tight"
            >
              <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-[10px]">
                {isRegistering ? <LogIn className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
              </div>
              {isRegistering ? "Sign In" : "Sign Up"}
            </button>
          </header>

          {/* Form Content - Centered */}
          <div className="flex-1 flex flex-col justify-center px-12 lg:px-24">
            <div className="max-w-[380px] w-full">
              <h1 className="text-5xl font-medium text-slate-900 mb-10 tracking-tight">
                {isRegistering ? "Sign Up" : "Sign In"}
              </h1>

              {error && (
                <div className="text-red-500 text-[11px] font-medium mb-6 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-red-500"></div>
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
                           className="w-full px-6 py-4 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-xs font-medium shadow-sm"
                           value={organizationName}
                           onChange={(e) => setOrganizationName(e.target.value)}
                           placeholder="Org Name"
                           required
                         />
                         <input
                           type="text"
                           className="w-full px-6 py-4 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-xs font-medium shadow-sm"
                           value={city}
                           onChange={(e) => setCity(e.target.value)}
                           placeholder="City"
                           required
                         />
                      </div>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-xs font-medium shadow-sm"
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
                  className="w-full px-8 py-5 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-sm font-medium shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Username"
                  required
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-8 py-5 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-sm font-medium shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
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
                        className="w-full px-8 py-5 bg-white border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/20 transition-all text-sm font-medium shadow-sm"
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
                    <button type="button" className="text-xs font-medium text-brand-red hover:underline tracking-tight">Forgot password?</button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-red to-orange-500 text-white py-5 rounded-full font-medium text-sm hover:shadow-xl hover:shadow-brand-red/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-6 shadow-lg shadow-brand-red/10"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isRegistering ? "Register Organization" : "Sign In"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Internal Footer */}
          <footer className="flex items-center justify-between px-12 lg:px-20 py-12 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            <span>© 2005-2026 TrackRiders Inc.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900">Contact Us</a>
              <div className="flex items-center gap-1 hover:text-slate-900 cursor-pointer uppercase">English <ArrowRight className="w-2.5 h-2.5 rotate-90" /></div>
            </div>
          </footer>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
