import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowLeft, ShieldCheck, User, Smartphone, Bike, ArrowRight, Eye, EyeOff, Building, MapPin } from "lucide-react";

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
        body: JSON.stringify({ 
          email, 
          password, 
          name, 
          organizationName, 
          city 
        })
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
      
      {/* Dynamic Blurred Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Back to Home Fixed */}
      <button 
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-slate-400 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all font-medium text-[10px] uppercase tracking-widest shadow-sm border border-slate-100"
      >
        <ArrowLeft className="w-3 h-3" /> Back
      </button>

      <div className="w-full max-w-[1200px] h-[80vh] min-h-[750px] bg-brand-dark rounded-[60px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] flex overflow-hidden relative">
        
        {/* Marketing Side (Dark) */}
        <motion.div 
          className="hidden lg:flex w-1/2 h-full bg-brand-dark relative flex-col justify-between p-20 overflow-hidden"
          animate={{ x: isRegistering ? '100%' : '0%' }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/login-bg.png" 
              alt="Marketing Background" 
              className="w-full h-full object-cover opacity-30 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10">
            <p className="text-slate-500 text-xs font-medium mb-12 tracking-wide">Premium Logistics Solutions</p>
            <h2 className="text-6xl font-medium text-white leading-tight mb-8 tracking-tight">
              Manage <br />
              your fleet
            </h2>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-slate-600 text-[10px] font-medium uppercase tracking-[0.2em]">
            <span>© 2026 TrackRiders</span>
          </div>
        </motion.div>

        {/* Form Side (White) */}
        <motion.div 
          className="w-full lg:w-1/2 h-full bg-white flex flex-col justify-center p-8 lg:p-20 relative z-20"
          animate={{ 
            x: isRegistering ? '-100%' : '0%',
            borderTopLeftRadius: isRegistering ? 0 : 60,
            borderBottomLeftRadius: isRegistering ? 0 : 60,
            borderTopRightRadius: isRegistering ? 60 : 0,
            borderBottomRightRadius: isRegistering ? 60 : 0
          }}
          transition={{ type: "spring", stiffness: 45, damping: 15 }}
        >
          {/* Top Bar Logo */}
          <div className="absolute top-12 left-0 right-0 flex justify-center items-center gap-3">
            <div className="w-8 h-8 bg-brand-red/5 rounded-lg flex items-center justify-center">
              <img src="/vite2.png" alt="Logo" className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold text-slate-900 tracking-tight">TrackRiders</span>
          </div>

          {/* Toggle Sign Up */}
          <div className="absolute top-12 right-12 lg:right-20">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="flex items-center gap-2 text-slate-400 font-medium text-xs hover:text-slate-900 transition-all uppercase tracking-widest"
            >
              <User className="w-3 h-3" /> {isRegistering ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="max-w-[400px] mx-auto w-full text-center">
            <div className="mb-10">
              <h1 className="text-5xl lg:text-6xl font-medium text-slate-900 mb-2 tracking-tight">
                {isRegistering ? "Sign Up" : "Sign In"}
              </h1>
              {isRegistering && <p className="text-slate-400 text-xs font-medium">Join our network of elite logistics.</p>}
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-[11px] font-medium mb-6 flex items-center justify-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                {error}
              </motion.div>
            )}

            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
              <AnimatePresence mode="popLayout">
                {isRegistering ? (
                  <motion.div
                    key="register-fields"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="text"
                          className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-xs font-medium shadow-sm"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="Org Name"
                          required
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          type="text"
                          className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-xs font-medium shadow-sm"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input
                        type="text"
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-xs font-medium shadow-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Admin Full Name"
                        required
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type="email"
                  className="w-full pl-12 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-sm font-medium shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Username"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4.5 bg-slate-50 border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-sm font-medium shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isRegistering && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative"
                >
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input
                    type="password"
                    className="w-full pl-12 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-all text-sm font-medium shadow-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </motion.div>
              )}

              {!isRegistering && (
                <div className="flex justify-center">
                  <button type="button" className="text-xs font-medium text-brand-red hover:underline tracking-wide">Forgot password?</button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-red to-orange-500 text-white py-5 rounded-full font-medium text-base hover:shadow-xl hover:shadow-brand-red/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <span>{isRegistering ? "Create Organization" : "Sign In"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="mt-auto flex items-center justify-between text-slate-400 text-[9px] font-medium uppercase tracking-[0.2em] pt-12">
            <span>© 2026 TrackRiders</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Contact Us</a>
              <div className="flex items-center gap-1 hover:text-slate-900 cursor-pointer">
                English <ArrowRight className="w-2 h-2 rotate-90" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
