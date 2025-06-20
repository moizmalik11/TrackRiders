import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-purple-800 to-gray-500 flex items-center justify-center p-4">
      <div className="bg-white/20 rounded-2xl shadow-xl p-8 border border-white/20 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Rider Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300">Rider ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={riderId}
              onChange={(e) => setRiderId(e.target.value)}
              placeholder="Enter your Rider ID"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RiderLogin; 