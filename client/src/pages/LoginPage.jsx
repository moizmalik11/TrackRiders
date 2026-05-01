import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

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
        headers: {
          'Content-Type': 'application/json'
        },
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
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword, name: 'Admin' })
      });

      const data = await response.json();
      if (response.ok) {
        setError("");
        alert("Registration successful!");
        setIsRegistering(false);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 selection:bg-brand-red/30">
      {/* Back to Home */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-red/10 mb-6">
            <ShieldCheck className="w-8 h-8 text-brand-red" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            {isRegistering ? "Create Admin Account" : "Admin Dashboard"}
          </h1>
          <p className="text-slate-500 font-medium">
            {isRegistering ? "Join TrackRiders to manage your fleet." : "Sign in to manage your riders and deliveries."}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl shadow-slate-200/50">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold mb-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              {error}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@trackriders.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-red text-white py-4 rounded-2xl font-black text-lg hover:bg-red-600 transition-all shadow-lg shadow-brand-red/20 active:scale-95"
            >
              {isRegistering ? "Create Account" : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="col-span-2 text-center text-sm font-bold text-slate-500 hover:text-brand-red transition-colors"
            >
              {isRegistering ? "Already have an account? Login" : "Need an organization account? Register"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/rider-login')}
              className="col-span-2 mt-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Rider Login Portal
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          © 2026 TrackRiders Logistics Platform
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
