import React, { useState } from "react";
import { useRiders } from "../context/RiderContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  MapPin, 
  Package, 
  CheckCircle, 
  LogOut, 
  History, 
  Bike,
  Activity
} from "lucide-react";

const RiderPanel = () => {
  const [rider, setRider] = useState(() => JSON.parse(localStorage.getItem("rider")));
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const { fetchRiders } = useRiders();
  const navigate = useNavigate();

  if (!rider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-200 text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl text-slate-900 font-black mb-4">Access Denied</h2>
          <p className="text-slate-500 mb-8 font-medium">Please login as a rider to access this panel.</p>
          <button 
            onClick={() => navigate('/rider-login')}
            className="w-full bg-brand-red text-white py-4 rounded-2xl font-black hover:bg-red-600 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("rider");
    navigate("/rider-login");
  };

  const handleOrderDelivered = async () => {
    setError("");
    try {
      const response = await fetch(`http://localhost:5001/api/riders/${rider.riderId}/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setRider(data.rider);
        localStorage.setItem("rider", JSON.stringify(data.rider));
        fetchRiders();
      } else {
        setError(data.message || "Failed to mark order as delivered");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const handleGetLocation = () => {
    setLocationStatus("Detecting location...");
    
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Current Location:", { latitude, longitude });
        setLocationStatus(`Location shared with command center!`);
        setTimeout(() => setLocationStatus(""), 3000);
      },
      (error) => {
        setLocationStatus("Failed to get location. Please check permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-red rounded-lg">
                <Bike className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rider Dashboard</h1>
            </div>
            <p className="text-slate-500 font-medium">Manage your active shift and deliveries.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rider Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <User className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">{rider.name}</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{rider.riderId}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-bold text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-red" /> Status
                  </span>
                  <span className={`text-sm font-black uppercase ${
                    rider.status === 'free' ? 'text-emerald-600' : 'text-brand-red'
                  }`}>{rider.status}</span>
                </div>
                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-bold text-sm flex items-center gap-2">
                    <Bike className="w-4 h-4 text-brand-red" /> Vehicle
                  </span>
                  <span className="text-sm font-black text-slate-900 uppercase">{rider.vehicle}</span>
                </div>
              </div>

              <button
                onClick={handleGetLocation}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <MapPin className="w-5 h-5" /> Update GPS Location
              </button>
              {locationStatus && (
                <p className="mt-3 text-center text-xs font-bold text-brand-red animate-pulse">{locationStatus}</p>
              )}
            </div>
          </div>

          {/* Active Order Card */}
          <div className="lg:col-span-2 space-y-8">
            {rider.status === "on-delivery" && rider.currentOrder ? (
              <div className="bg-white border-2 border-brand-red rounded-[32px] p-8 shadow-xl shadow-brand-red/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase rounded-full tracking-widest">Active Task</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6 text-brand-red" /> Current Assignment
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Receiver Name</p>
                    <p className="text-lg font-black text-slate-900">{rider.currentOrder.Receiver}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Order ID</p>
                    <p className="text-lg font-black text-slate-900">#{rider.currentOrder.orderId}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Delivery Address</p>
                    <p className="text-lg font-black text-slate-900 flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-1" />
                      {rider.currentOrder.address}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleOrderDelivered}
                  className="w-full bg-brand-red text-white py-5 rounded-2xl font-black text-xl hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-red/20 active:scale-95"
                >
                  <CheckCircle className="w-6 h-6" /> Mark as Delivered
                </button>
                {error && <p className="text-red-600 text-sm font-bold mt-4 text-center">{error}</p>}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 border-dashed rounded-[32px] p-16 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Waiting for Orders</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">Your status is currently set to <b>Free</b>. Stay active to receive new delivery assignments.</p>
              </div>
            )}

            {/* History Table */}
            {rider.orderHistory && rider.orderHistory.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <History className="w-5 h-5 text-brand-red" /> Recent Deliveries
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-slate-100">
                        <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Receiver</th>
                        <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Product</th>
                        <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Delivered At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {rider.orderHistory.map((order, idx) => (
                        <tr key={idx} className="group">
                          <td className="py-4 font-bold text-slate-900">{order.Receiver}</td>
                          <td className="py-4 text-slate-600 text-sm">{order.product}</td>
                          <td className="py-4 text-slate-400 text-xs font-bold">
                            {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderPanel;