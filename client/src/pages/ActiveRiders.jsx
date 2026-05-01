import React, { useState, useEffect } from "react";
import { useRiders } from "../context/RiderContext";
import { useNavigate } from "react-router-dom";
import MapModal from "../components/MapModal";
import { 
  ArrowLeft, 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle, 
  Info, 
  Search,
  Navigation,
  Calendar,
  X
} from "lucide-react";

const ActiveRiders = () => {
  const { riders, updateRider, fetchRiders } = useRiders();
  const navigate = useNavigate();

  const [free, setFree] = useState([]);
  const [trackRider, setTrackRider] = useState(null);
  const [onDelivery, setOnDelivery] = useState([]);
  const [onLeave, setOnLeave] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [orderInfo, setOrderInfo] = useState({
    orderId: "",
    product: "",
    address: "",
    Receiver: "",
  });

  useEffect(() => {
    const active = riders.filter(r => r.status);
    setFree(active.filter(r => r.status === "free"));
    setOnDelivery(active.filter(r => r.status === "on-delivery"));
    setOnLeave(active.filter((r) => r.status === "on-leave"));
  }, [riders]);

  const handleGiveOrder = (rider) => {
    setSelectedRider(rider);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (rider) => {
    const updatedRider = {
      ...rider,
      status: "on-delivery",
      currentOrder: { ...orderInfo },
    };
    updateRider(rider.riderId, updatedRider);
    setShowOrderModal(false);
    setSelectedRider(null);
    setOrderInfo({ orderId: "", product: "", address: "", Receiver: "" });
  };

  const handleGiveLeave = (rider) => {
    const updatedRider = {
      ...rider,
      status: "on-leave",
      currentOrder: null,
    };
    updateRider(rider.riderId, updatedRider);
  };

  useEffect(() => {
    const handler = () => fetchRiders();
    window.addEventListener('riders-updated', handler);
    return () => window.removeEventListener('riders-updated', handler);
  }, [fetchRiders]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 selection:bg-brand-red/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Active Operations</h1>
            <p className="text-slate-500 font-medium mt-1">Live tracking and order management for your active fleet.</p>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Available Riders</h3>
                <p className="text-4xl font-black text-slate-900">{free.length}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-brand-red rounded-[32px] p-8 shadow-xl shadow-brand-red/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Active Deliveries</h3>
                <p className="text-4xl font-black text-slate-900">{onDelivery.length}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-brand-red flex items-center justify-center">
                <Navigation className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">On Leave</h3>
                <p className="text-4xl font-black text-slate-900">{onLeave.length}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Riders Section */}
        <div className="space-y-12">
          {/* Active Deliveries List */}
          {onDelivery.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse"></div>
                Live Deliveries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {onDelivery.map((rider, idx) => (
                  <div key={`del-${idx}`} className="bg-brand-dark rounded-[32px] p-8 shadow-xl shadow-slate-900/10 relative group overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-black text-white">{rider.name}</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{rider.riderId}</p>
                      </div>
                      <div className="px-3 py-1 bg-brand-red text-white text-[10px] font-black uppercase rounded-full">Tracking</div>
                    </div>
                    
                    {rider.currentOrder && (
                      <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8 space-y-3">
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-brand-red" />
                          <p className="text-sm text-slate-200 font-bold">{rider.currentOrder.product}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-brand-red" />
                          <p className="text-xs text-slate-400 leading-relaxed font-medium">{rider.currentOrder.address}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setTrackRider(rider)}
                      className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                      View Live Map
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Riders List */}
          {free.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                Available Fleet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {free.map((rider, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{rider.name}</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{rider.riderId}</p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full tracking-widest">Free</span>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-bold">Vehicle</span>
                        <span className="text-slate-900 font-black uppercase">{rider.vehicle}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        className="bg-brand-red text-white px-4 py-4 rounded-2xl font-black text-xs hover:bg-red-600 transition-all shadow-lg shadow-brand-red/10 active:scale-95"
                        onClick={() => handleGiveOrder(rider)}
                      >
                        Assign Order
                      </button>
                      <button
                        className="bg-slate-100 text-slate-600 px-4 py-4 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all active:scale-95"
                        onClick={() => handleGiveLeave(rider)}
                      >
                        Give Leave
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {trackRider && (
        <MapModal rider={trackRider} onClose={() => setTrackRider(null)} />
      )}

      {/* Order Assignment Modal */}
      {showOrderModal && selectedRider && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
          <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 border border-slate-200 relative">
            <button
              onClick={() => {
                setShowOrderModal(false);
                setSelectedRider(null);
                setOrderInfo({ orderId: "", product: "", address: "", Receiver: "" });
              }}
              className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            > 
              <X className="w-6 h-6" />
            </button>

            <header className="mb-10">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Assign Delivery</h3>
              <p className="text-slate-500 font-medium text-sm">Target Rider: <b>{selectedRider.name}</b></p>
            </header>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Order ID</label>
                  <input
                    type="text"
                    placeholder="ORD-XXXX"
                    value={orderInfo.orderId}
                    onChange={(e) => setOrderInfo({ ...orderInfo, orderId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:border-brand-red/30 focus:outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Receiver Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={orderInfo.Receiver}
                    onChange={(e) => setOrderInfo({ ...orderInfo, Receiver: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:border-brand-red/30 focus:outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Product Details</label>
                  <input
                    type="text"
                    placeholder="e.g. 2x Medium Pizza"
                    value={orderInfo.product}
                    onChange={(e) => setOrderInfo({ ...orderInfo, product: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:border-brand-red/30 focus:outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Delivery Address</label>
                  <input
                    type="text"
                    placeholder="Exact street address"
                    value={orderInfo.address}
                    onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:border-brand-red/30 focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <button
                onClick={() => handleOrderSubmit(selectedRider)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-lg active:scale-95"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;