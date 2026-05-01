// src/pages/ActiveRiders.jsx
import React, { useState, useEffect } from "react";
import { useRiders } from "../context/RiderContext";
import MapModal from "../components/MapModal";

const ActiveRiders = () => {
  const { riders, updateRider, fetchRiders } = useRiders();

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

  const changeCordinates =()=>{
    const rider = riders.find(r => r.riderId === selectedRider.riderId);
    if (rider) {
      const updatedRider = {
        ...rider,
        currentOrder: { ...orderInfo },
      };
      updateRider(rider.riderId, updatedRider);
    }

  }

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

  // Listen for 'riders-updated' event to refresh riders
  useEffect(() => {
    const handler = () => fetchRiders();
    window.addEventListener('riders-updated', handler);
    return () => window.removeEventListener('riders-updated', handler);
  }, [fetchRiders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Active Riders</h2>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-lg">Free Riders</h3>
                <p className="text-3xl font-bold text-white mt-2">{free.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-lg">On Delivery</h3>
                <p className="text-3xl font-bold text-white mt-2">{onDelivery.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-300 text-lg">On Leave</h3>
                <p className="text-3xl font-bold text-white mt-2">{onLeave.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Riders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Free Riders */}
          {free.map((rider, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{rider.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300">Free</span>
              </div>
              
              <div className="space-y-2 text-gray-300">
                <p>Rider ID: {rider.riderId}</p>
                <p>Phone: {rider.phone}</p>
                <p>Vehicle: {rider.vehicle}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                  onClick={() => handleGiveOrder(rider)}
                >
                  Give Order
                </button>
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                  onClick={() => handleGiveLeave(rider)}
                >
                  Give Leave
                </button>
              </div>
            </div>
          ))}

          {/* On-delivery Riders */}
          {onDelivery.map((rider, idx) => (
            <div key={`del-${idx}`} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{rider.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-300">On Delivery</span>
              </div>
              
              <div className="space-y-2 text-gray-300">
                <p>Rider ID: {rider.riderId}</p>
                <p>Phone: {rider.phone}</p>
                <p>Vehicle: {rider.vehicle}</p>
              </div>

              {rider.currentOrder && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Current Order</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>Order ID: {rider.currentOrder.orderId}</p>
                    <p>Product: {rider.currentOrder.product}</p>
                    <p>👤 Receiver: {rider.currentOrder.Receiver}</p>
                    <p>📍 Address: {rider.currentOrder.address}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setTrackRider(rider)}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
              >
                Track Rider
              </button>
            </div>
          ))}

          {/* On Leave Riders */}
          {onLeave.map((rider, idx) => (
            <div key={`leave-${idx}`} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{rider.name}</h3>
                <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300">On Leave</span>
              </div>
              
              <div className="space-y-2 text-gray-300">
                <p>Rider ID: {rider.riderId}</p>
                <p>Phone: {rider.phone}</p>
                <p>Vehicle: {rider.vehicle}</p>
              </div>

              <button
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
                onClick={() => updateRider(rider.riderId, { status: "free" })}
              >
                End Leave
              </button>
            </div>
          ))}
        </div>
      </div>

      {trackRider && (
        <MapModal rider={trackRider} onClose={() => setTrackRider(null)} />
      )}

      {/* Order Modal */}
      {showOrderModal && selectedRider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">Give Order to {selectedRider.name}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Order ID"
                value={orderInfo.orderId}
                onChange={(e) => setOrderInfo({ ...orderInfo, orderId: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Product Name"
                value={orderInfo.product}
                onChange={(e) => setOrderInfo({ ...orderInfo, product: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Receiver Name"
                value={orderInfo.Receiver}
                onChange={(e) => setOrderInfo({ ...orderInfo, Receiver: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={orderInfo.address}
                onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowOrderModal(false);
                    setSelectedRider(null);
                    setOrderInfo({ orderId: "", product: "", address: "", Receiver: "" });
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOrderSubmit(selectedRider)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all"
                >
                  Assign Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;