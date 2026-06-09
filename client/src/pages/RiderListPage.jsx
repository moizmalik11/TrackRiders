import React from "react";
import { useRiders } from "../context/RiderContext";
import AdminLayout from "../components/AdminLayout";
import {
  Trash2, Phone, Fingerprint, Bike, Search, User, AlertCircle, History
} from "lucide-react";

const RiderListPage = () => {
  const { riders, deleteRider, updateRider } = useRiders();

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

  const toggleLeave = (rider) => {
    const updatedStatus = rider.status === "on-leave" ? "free" : "on-leave";
    updateRider(rider.riderId, { ...rider, status: updatedStatus });
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto selection:bg-[#0ea5e9]/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Rider Directory</h1>
            <p className="text-slate-500 font-medium mt-1">Manage and audit your registered delivery personnel.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search riders..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#0ea5e9] transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {riders.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-sm">
                <AlertCircle className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Riders Found</h3>
              <p className="text-slate-500 font-medium">You haven't registered any riders in the system yet.</p>
            </div>
          ) : (
            riders.map((rider, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2.5 text-slate-400 hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/10 rounded-xl transition-all">
                      <History className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(rider)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Rider"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{rider.name}</h3>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${rider.status === 'free' ? 'bg-emerald-500' : rider.status === 'on-delivery' ? 'bg-[#0ea5e9]' : 'bg-slate-300'}`}></span>
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                          {rider.status === 'free' ? 'AVAILABLE' : rider.status === 'on-delivery' ? 'BUSY' : 'ON LEAVE'}
                       </span>
                     </div>
                     <button onClick={() => toggleLeave(rider)} className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${rider.status === 'on-leave' ? 'border-[#0ea5e9] text-[#0ea5e9] bg-[#0ea5e9]/5 hover:bg-[#0ea5e9]/10' : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'}`}>
                        {rider.status === 'on-leave' ? 'END LEAVE' : 'MARK LEAVE'}
                     </button>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-4 text-slate-600">
                    <Phone className="w-4 h-4 text-[#ff4b4b]" />
                    <span className="text-sm font-semibold">{rider.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <Fingerprint className="w-4 h-4 text-[#ff4b4b]" />
                    <span className="text-sm font-semibold">{rider.riderId}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <Bike className="w-4 h-4 text-[#ff4b4b]" />
                    <span className="text-sm font-semibold">{rider.vehicle}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RiderListPage;
