import React, { useState, useEffect } from "react";
import { useRiders } from "../context/RiderContext";
import MapModal from "../components/MapModal";
import AdminLayout from "../components/AdminLayout";
import { 
  MapPin, Package, Navigation, X
} from "lucide-react";

const ActiveRiders = () => {
  const { riders, updateRider, fetchRiders } = useRiders();

  const [free, setFree] = useState([]);
  const [trackRider, setTrackRider] = useState(null);
  const [onDelivery, setOnDelivery] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [orderInfo, setOrderInfo] = useState({ orderId: "", product: "", address: "", Receiver: "" });

  useEffect(() => {
    const active = riders.filter(r => r.status && r.status !== 'offline');
    setFree(active.filter(r => r.status === "free"));
    setOnDelivery(active.filter(r => r.status === "on-delivery"));
  }, [riders]);

  const handleGiveOrder = (rider) => {
    setSelectedRider(rider);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const updatedRider = { ...selectedRider, status: "on-delivery", currentOrder: { ...orderInfo } };
    updateRider(selectedRider.riderId, updatedRider);
    setShowOrderModal(false);
    setSelectedRider(null);
    setOrderInfo({ orderId: "", product: "", address: "", Receiver: "" });
  };

  const handleGiveLeave = (rider) => {
    updateRider(rider.riderId, { ...rider, status: "on-leave", currentOrder: null });
  };

  useEffect(() => {
    const handler = () => fetchRiders();
    window.addEventListener('riders-updated', handler);
    return () => window.removeEventListener('riders-updated', handler);
  }, [fetchRiders]);

  return (
    <AdminLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto selection:bg-[#ff4b4b]/30">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Active Operations</h1>
          <p className="text-slate-500 font-medium mt-1">Live tracking and order management for your active riders.</p>
        </div>

        <div className="space-y-12">
          {/* Active Deliveries */}
          {onDelivery.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#ff4b4b] animate-pulse"></div>
                Live Deliveries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onDelivery.map((rider, idx) => (
                  <div key={idx} className="bg-[#0f172a] rounded-[32px] p-8 shadow-2xl relative">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-black text-white">{rider.name}</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{rider.riderId}</p>
                      </div>
                      <div className="px-4 py-1.5 bg-[#ff4b4b] text-white text-[10px] font-black uppercase rounded-full tracking-widest">Tracking</div>
                    </div>
                    
                    {rider.currentOrder && (
                      <div className="bg-white/5 rounded-[24px] p-6 border border-white/10 mb-8 space-y-4">
                        <div className="flex items-center gap-4">
                          <Package className="w-5 h-5 text-[#ff4b4b]" />
                          <p className="text-sm text-slate-200 font-bold">{rider.currentOrder.product} <span className="text-slate-500">({rider.currentOrder.orderId})</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                          <MapPin className="w-5 h-5 text-[#ff4b4b]" />
                          <p className="text-xs text-slate-400 leading-relaxed font-medium">{rider.currentOrder.address}</p>
                        </div>
                      </div>
                    )}

                    <button onClick={() => setTrackRider(rider)} className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2 active:scale-95">
                      View Live Map <Navigation className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Riders */}
          {free.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6">Available Riders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {free.map((rider, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">{rider.name}</h3>
                        <p className="text-slate-400 text-xs font-bold">{rider.riderId}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full tracking-widest">Free</span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-bold">Vehicle</span>
                        <span className="text-slate-900 font-black uppercase">{rider.vehicle}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => handleGiveOrder(rider)} className="bg-[#ff4b4b] text-white py-4 rounded-2xl font-black text-xs hover:bg-red-600 transition-all shadow-lg shadow-[#ff4b4b]/20 active:scale-95">Assign Order</button>
                      <button onClick={() => handleGiveLeave(rider)} className="bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all active:scale-95">Give Leave</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {trackRider && <MapModal rider={trackRider} onClose={() => setTrackRider(null)} />}

      {/* Order Assignment Modal */}
      {showOrderModal && selectedRider && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-10 border border-slate-200 relative">
            <button onClick={() => { setShowOrderModal(false); setSelectedRider(null); setOrderInfo({ orderId: "", product: "", address: "", Receiver: "" }); }} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Assign Delivery</h3>
            <p className="text-slate-500 font-medium text-sm mb-8">Target Rider: <b>{selectedRider.name}</b></p>
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Order ID</label>
                  <input type="text" placeholder="ORD-XXXX" value={orderInfo.orderId} onChange={(e) => setOrderInfo({ ...orderInfo, orderId: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold outline-none focus:border-[#ff4b4b] focus:bg-white transition-all" required />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Receiver Name</label>
                  <input type="text" placeholder="Full Name" value={orderInfo.Receiver} onChange={(e) => setOrderInfo({ ...orderInfo, Receiver: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold outline-none focus:border-[#ff4b4b] focus:bg-white transition-all" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Product Details</label>
                  <input type="text" placeholder="e.g. 2x Medium Pizza" value={orderInfo.product} onChange={(e) => setOrderInfo({ ...orderInfo, product: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold outline-none focus:border-[#ff4b4b] focus:bg-white transition-all" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Delivery Address</label>
                  <input type="text" placeholder="Exact street address" value={orderInfo.address} onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold outline-none focus:border-[#ff4b4b] focus:bg-white transition-all" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-5 mt-2 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-lg active:scale-95">Confirm Assignment</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ActiveRiders;