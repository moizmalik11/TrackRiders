import React, { useState } from "react";
import { useRiders } from "../context/RiderContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { 
  Plus, Users, MapPin, CheckCircle, Navigation, X
} from "lucide-react";

const AdminDashboard = () => {
  const { riders, addRider } = useRiders();
  const navigate = useNavigate();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRider, setNewRider] = useState({
    name: "",
    phone: "",
    riderId: "",
    vehicle: "",
    status: "free",
  });

  const onDutyRiders = riders.filter(r => r.status === "on-delivery" || r.status === "free");
  const recentRiders = [...riders].reverse().slice(0, 4);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newRider.name || !newRider.phone || !newRider.riderId || !newRider.vehicle) {
      alert("Please fill all fields");
      return;
    }
    addRider(newRider);
    setShowAddForm(false);
    setNewRider({ name: "", phone: "", riderId: "", vehicle: "", status: "free" });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Overview of your delivery operations.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-[#0ea5e9] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#0284c7] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Rider
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between group hover:border-slate-300 transition-colors">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 mb-1">Total Riders</h3>
              <p className="text-3xl font-bold text-slate-900">{riders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-400" />
            </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between group hover:border-slate-300 transition-colors">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 mb-1">On Duty</h3>
              <p className="text-3xl font-bold text-slate-900">{onDutyRiders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-slate-400" />
            </div>
        </div>
      </div>

      {/* Content Row: Recent Additions & Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Additions Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Additions</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">Newest riders.</p>
              </div>
              <button onClick={() => navigate('/riders')} className="text-xs font-semibold text-[#ff4b4b] hover:text-red-600">View All &rarr;</button>
            </div>

            <div className="space-y-3">
              {recentRiders.map((rider, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs uppercase">
                          {rider.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{rider.name}</p>
                          <p className="text-[11px] font-medium text-slate-500">{rider.riderId} &bull; {rider.vehicle}</p>
                        </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        rider.status === 'free' ? 'bg-emerald-50 text-emerald-600' :
                        rider.status === 'on-delivery' ? 'bg-[#0ea5e9]/10 text-[#0ea5e9]' :
                        'bg-slate-200 text-slate-500'
                    }`}>
                        {rider.status === 'free' ? 'Available' : rider.status === 'on-delivery' ? 'Busy' : 'Offline'}
                    </span>
                  </div>
              ))}
              {recentRiders.length === 0 && (
                  <p className="text-slate-400 font-medium text-sm text-center py-4">No riders found.</p>
              )}
            </div>
        </div>

        {/* Real-time Operations Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                  <MapPin className="w-5 h-5 text-[#ff4b4b]" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Real-time Operations</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Monitor your active riders as they complete deliveries. Our live map view provides precise coordinates and status updates directly from the rider's device.
              </p>
            </div>
            
            <button 
              onClick={() => navigate('/active-riders')}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white py-3 rounded-lg font-bold text-sm hover:bg-black transition-colors"
            >
              Open Live Map <Navigation className="w-4 h-4 ml-1" />
            </button>
        </div>

      </div>

      {/* Add Rider Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-200 relative">
            <button 
              onClick={() => setShowAddForm(false)} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-1">New Rider Profile</h3>
            <p className="text-slate-500 text-xs font-medium mb-6">Register a new delivery professional into the system.</p>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input type="text" value={newRider.name} onChange={(e) => setNewRider({ ...newRider, name: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0ea5e9] transition-colors" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input type="text" value={newRider.phone} onChange={(e) => setNewRider({ ...newRider, phone: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0ea5e9] transition-colors" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rider ID</label>
                    <input type="text" placeholder="e.g. 123" value={newRider.riderId} onChange={(e) => setNewRider({ ...newRider, riderId: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0ea5e9] transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle</label>
                    <input type="text" placeholder="e.g. bike" value={newRider.vehicle} onChange={(e) => setNewRider({ ...newRider, vehicle: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0ea5e9] transition-colors" required />
                  </div>
              </div>
              <button type="submit" className="w-full bg-[#0ea5e9] text-white py-2.5 mt-2 rounded-lg font-bold text-sm hover:bg-[#0284c7] transition-colors">
                  Create Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
