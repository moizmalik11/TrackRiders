import React from "react";
import { useRiders } from "../context/RiderContext";

const RiderListPage = () => {
  const { riders, deleteRider } = useRiders();

  const handleDelete = async (rider) => {
    if (rider.status === "on-delivery") {
      alert("Rider is on delivery, you cannot delete it now.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete rider ${rider.name}?`)) {
      try {
        await deleteRider(rider.riderId);
      } catch (err) {
        alert("Failed to delete rider: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">All Registered Riders</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {riders.length === 0 ? (
            <div className="col-span-full text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">No riders registered yet</p>
              </div>
            </div>
          ) : (
            riders.map((rider, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 transition-all duration-300"
              >
                {/* Delete button, positioned at top right corner */}
                <button
                  onClick={() => handleDelete(rider)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded shadow transition-opacity duration-300 z-10 text-sm"
                  title="Delete Rider"
                >
                  Delete
                </button>

                <div className="relative">
                  <img
                    src={`https://img.freepik.com/premium-vector/delivery-man-with-package-hat-guy-wearing-uniform-fast-service-illustration_619097-100.jpg`}
                    alt="rider"
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white/20"
                  />
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white text-center mb-2">{rider.name}</h3>

                {/* Hidden details that appear on hover */}
                <div className="absolute inset-0  rounded-xl p-6 border border-white/20 opacity-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                  <div className="relative h-full">
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{rider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span>ID: {rider.riderId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                        <span>{rider.vehicle}</span>
                      </div>
                    </div>

                    <button
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                    >
                      {rider.name}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderListPage;
