import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRiders } from "../context/RiderContext";
import { 
  Users, 
  UserPlus, 
  Activity, 
  LogOut, 
  Plus, 
  X, 
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  Search,
  Settings
} from "lucide-react";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [newRider, setNewRider] = useState({
    name: "",
    phone: "",
    riderId: "",
    vehicle: "",
    status: "free",
  });

  const navigate = useNavigate();
  const { addRider } = useRiders();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchAdminInfo = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          const username = data.email.split('@')[0];
          setAdminName(username);
        }
      } catch (error) {
        console.error('Error fetching admin info:', error);
      }
    };

    fetchAdminInfo();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddRider = (e) => {
    e.preventDefault();
    if (!newRider.name || !newRider.phone || !newRider.riderId || !newRider.vehicle) {
      alert("Please fill all required fields");
      return;
    }
    addRider(newRider);
    setNewRider({ name: "", phone: "", riderId: "", vehicle: "", status: "free" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-brand-red/30">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-brand-red rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">TrackRiders Admin</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-900 transition-colors p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-900 transition-colors p-2">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-slate-100 hover:bg-slate-200 transition-all focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-black text-xs">
                  {adminName ? adminName[0].toUpperCase() : 'A'}
                </div>
                <span className="text-slate-900 font-bold text-sm hidden md:block">{adminName}</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-10 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Account</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{adminName}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-bold"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-8 lg:p-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Fleet Command</h1>
          <p className="text-slate-500 font-medium">Manage, monitor, and scale your delivery operations.</p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* All Riders Box */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-red/5 transition-colors">
              <Users className="w-7 h-7 text-slate-900 group-hover:text-brand-red transition-colors" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Rider Directory</h2>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Access full details and profiles of every registered rider in your fleet.</p>
            <button
              onClick={() => navigate("/riders")}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95"
            >
              Manage Fleet <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Riders Box */}
          <div className="bg-white border-2 border-brand-red rounded-[32px] p-8 shadow-xl shadow-brand-red/5 group">
            <div className="w-14 h-14 bg-brand-red rounded-2xl flex items-center justify-center mb-8">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Live Tracking</h2>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Real-time status monitoring of riders currently executing deliveries.</p>
            <button
              onClick={() => navigate("/active-riders")}
              className="w-full flex items-center justify-center gap-2 bg-brand-red text-white px-6 py-4 rounded-2xl font-black hover:bg-red-600 transition-all shadow-lg active:scale-95"
            >
              Monitor Live <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Add New Rider Box */}
          <div className="bg-slate-900 rounded-[32px] p-8 shadow-xl group">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-black text-white mb-2 tracking-tight">Expand Fleet</h2>
            <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">Register and onboard a new delivery professional into your organization.</p>
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add Rider
            </button>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="p-8 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Powered by TrackRiders Enterprise v2.0
        </p>
      </footer>

      {/* Add Rider Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <div 
            className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 border border-slate-200 relative"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            > 
              <X className="w-6 h-6" />
            </button>

            <header className="mb-10">
              <h3 className="text-2xl font-black text-slate-900 mb-2">New Rider Profile</h3>
              <p className="text-slate-500 font-medium text-sm">Fill in the details to register a new member.</p>
            </header>

            <form onSubmit={handleAddRider} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    value={newRider.name}
                    onChange={(e) => setNewRider({ ...newRider, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                  <input
                    type="text"
                    value={newRider.phone}
                    onChange={(e) => setNewRider({ ...newRider, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                    placeholder="+92 3XX XXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">System Rider ID</label>
                  <input
                    type="text"
                    value={newRider.riderId}
                    onChange={(e) => setNewRider({ ...newRider, riderId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                    placeholder="RID-XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Vehicle Type</label>
                  <input
                    type="text"
                    value={newRider.vehicle}
                    onChange={(e) => setNewRider({ ...newRider, vehicle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-red/50 transition-all font-medium"
                    placeholder="e.g. Honda CD-70"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-8 py-4 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-brand-red text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-red-600 transition-all shadow-lg shadow-brand-red/20 active:scale-95"
                >
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
