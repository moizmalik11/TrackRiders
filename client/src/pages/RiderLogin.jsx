import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Lock, ArrowLeft, Bike } from "lucide-react";

const RiderLogin = () => {
  const [riderId, setRiderId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/riders/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riderId, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('rider', JSON.stringify(data.rider));
        navigate('/rider-panel');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
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
            <Bike className="w-8 h-8 text-brand-red" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Rider Portal
          </h1>
          <p className="text-slate-500 font-medium">
            Enter your credentials to start your shift.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-10 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Rider ID</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                  value={riderId}
                  onChange={(e) => setRiderId(e.target.value)}
                  placeholder="e.g. RID-204"
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
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              Access Panel
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-center text-sm font-bold text-slate-500 hover:text-brand-red transition-colors"
            >
              Organization Admin? Sign in here
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Safe Riding with TrackRiders
        </p>
      </div>
    </div>
  );
};

export default RiderLogin;