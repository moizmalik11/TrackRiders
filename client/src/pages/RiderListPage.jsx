import React from "react";
import { useRiders } from "../context/RiderContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Phone,
  Fingerprint,
  Bike,
  Search,
  User,
  AlertCircle
} from "lucide-react";

const RiderListPage = () => {
  const { riders, deleteRider } = useRiders();
  const navigate = useNavigate();

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
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Rider Directory</h1>
            <p className="text-slate-500 font-medium mt-1">Manage and audit your registered delivery personnel.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search riders..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-red/30 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {riders.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <AlertCircle className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Riders Found</h3>
              <p className="text-slate-500 font-medium">You haven't registered any riders in the system yet.</p>
            </div>
          ) : (
            riders.map((rider, index) => (
              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-brand-red/5 transition-colors"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden">
                      <User className="w-8 h-8 text-slate-400" />
                    </div>
                    <button
                      onClick={() => handleDelete(rider)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Rider"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-black text-slate-900 mb-1">{rider.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${rider.status === 'free' ? 'bg-emerald-500' : 'bg-brand-red'
                        }`}></span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rider.status}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-4 h-4 text-brand-red" />
                      <span className="text-sm font-bold">{rider.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Fingerprint className="w-4 h-4 text-brand-red" />
                      <span className="text-sm font-bold">{rider.riderId}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Bike className="w-4 h-4 text-brand-red" />
                      <span className="text-sm font-bold">{rider.vehicle}</span>
                    </div>
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
