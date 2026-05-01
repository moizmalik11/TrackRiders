import React, { useState } from "react";
import { useRiders } from "../context/RiderContext";

const RiderPanel = () => {
  const [rider, setRider] = useState(() => JSON.parse(localStorage.getItem("rider")));
  const [error, setError] = useState("");
  const { fetchRiders } = useRiders();

  if (!rider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="bg-white/10 p-8 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-2xl text-white font-bold mb-4">No Rider Data</h2>
          <p className="text-gray-300">Please login as a rider first.</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="bg-white/10 p-8 rounded-xl shadow-lg border border-white/20 w-full max-w-md mb-8">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Rider Panel</h2>
        <div className="space-y-4">
          <div className="flex justify-between text-lg text-white">
            <span className="font-semibold">Name:</span>
            <span>{rider.name}</span>
          </div>
          <div className="flex justify-between text-lg text-white">
            <span className="font-semibold">Status:</span>
            <span>{rider.status}</span>
          </div>
          <div className="flex justify-between text-lg text-white">
            <span className="font-semibold">Vehicle:</span>
            <span>{rider.vehicle}</span>
          </div>
        </div>
        {rider.status === "on-delivery" && rider.currentOrder && (
          <div className="mt-8 bg-white/10 p-4 rounded-lg border border-white/20">
            <h3 className="text-lg text-white font-semibold mb-2">Current Order</h3>
            <div className="space-y-1 text-gray-300">
              <div>Order ID: {rider.currentOrder.orderId}</div>
              <div>Product: {rider.currentOrder.product}</div>
              <div>Receiver: {rider.currentOrder.Receiver}</div>
              <div>Address: {rider.currentOrder.address}</div>
            </div>
            <button
              onClick={handleOrderDelivered}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200"
            >
              Order Delivered
            </button>
            {error && <div className="text-red-400 mt-2">{error}</div>}
          </div>
        )}
      </div>
      {/* Order History Table */}
      {rider.orderHistory && rider.orderHistory.length > 0 && (
        <div className="bg-white/10 p-6 rounded-xl shadow-lg border border-white/20 w-full max-w-2xl">
          <h3 className="text-xl text-white font-bold mb-4">Order History</h3>
          <table className="min-w-full text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Receiver</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Delivered At</th>
              </tr>
            </thead>
            <tbody>
              {rider.orderHistory.map((order, idx) => (
                <tr key={idx} className="bg-white/5">
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.product}</td>
                  <td className="px-4 py-2">{order.Receiver}</td>
                  <td className="px-4 py-2">{order.address}</td>
                  <td className="px-4 py-2">{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RiderPanel; 