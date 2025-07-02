import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRiders } from "../context/RiderContext";

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [newRider, setNewRider] = useState({
    name: "",
    phone: "",
    riderId: "",
    vehicle: "",
    status: "free", // default status
  });

  const navigate = useNavigate();
  const { riders, addRider } = useRiders();

  useEffect(() => {
    // Get admin email from localStorage or context
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Fetch admin info
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          // Extract username from email (everything before @)
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
    
    // Validate required fields
    if (!newRider.name || !newRider.phone || !newRider.riderId || !newRider.vehicle) {
      alert("Please fill all required fields");
      return;
    }

    // Add the rider
    addRider(newRider);
    
    // Reset form
    setNewRider({
      name: "",
      phone: "",
      riderId: "",
      vehicle: "",
      status: "free"
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Track Riders</h1>
            </div>
            
            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {adminName ? adminName[0].toUpperCase() : 'M'}
                </div>
                <span className="text-white font-medium">{adminName}</span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg py-1 z-10 border border-white/20">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Admin Panel</h1>
          <p className="text-gray-300 text-lg">Keep track of your riders efficiently</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* All Riders Info Box */}
          <div className="bg-white/10 rounded-xl shadow-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">All Riders Info</h2>
            <p className="text-gray-300 mb-4">View all registered riders in the system</p>
            <button
              onClick={() => navigate("/riders")}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
            >
              See Details
            </button>
          </div>

          {/* Active Riders Box */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Active Riders</h2>
            <p className="text-gray-300 mb-4">Track riders currently on delivery</p>
            <button
              onClick={() => navigate("/riders/active")}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
            >
              See Details
            </button>
          </div>

          {/* Add New Rider Box */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Add New Rider</h2>
            <p className="text-gray-300 mb-4">Register a new rider into the system</p>
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Add Rider
            </button>
          </div>
        </div>

        {/* Add Rider Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4">
            <form
              onSubmit={handleAddRider}
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl w-full md:w-1/2 p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">New Rider Details</h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white"
                > 
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={newRider.name}
                    onChange={(e) => setNewRider({ ...newRider, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="text"
                    value={newRider.phone}
                    onChange={(e) => setNewRider({ ...newRider, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Rider ID</label>
                  <input
                    type="text"
                    value={newRider.riderId}
                    onChange={(e) => setNewRider({ ...newRider, riderId: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Vehicle</label>
                  <input
                    type="text"
                    value={newRider.vehicle}
                    onChange={(e) => setNewRider({ ...newRider, vehicle: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  Add Rider
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
