import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Map, Server, Package } from "lucide-react";
import { useRiders } from "../context/RiderContext";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setAdminName] = useState("");
  const { riders, loading } = useRiders();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }
    
    const cachedEmail = localStorage.getItem('adminEmail');
    if (cachedEmail) {
      setAdminName(cachedEmail.split('@')[0]);
      return;
    }

    const fetchAdminInfo = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
           setAdminName(data.email.split('@')[0]);
           localStorage.setItem('adminEmail', data.email);
        }
      } catch (error) { console.error(error); }
    };
    fetchAdminInfo();
  }, [navigate]);

  const activeCount = riders.filter(r => r.status && r.status !== 'offline').length;
  const allCount = riders.length;

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "All Riders", path: "/riders", icon: Users, count: allCount },
    { name: "Live Track", path: "/active-riders", icon: Map, count: activeCount },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans text-slate-900 selection:bg-[#0ea5e9]/20">
      
      {/* Global Loading Bar */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-slate-100 overflow-hidden">
           <style>{`
             @keyframes global-progress {
               0% { transform: translateX(-100%); width: 50%; }
               100% { transform: translateX(200%); width: 50%; }
             }
           `}</style>
           <div className="h-full bg-[#0ea5e9]" style={{ animation: 'global-progress 1.5s infinite linear' }} />
        </div>
      )}

      {/* Top Navbar mimicking the macOS window header but spanning full width */}
      <nav className="fixed top-0 left-0 right-0 h-12 border-b border-slate-200 bg-white/90 backdrop-blur flex items-center justify-between px-4 z-30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-medium pointer-events-none">
          Command Center &bull; {adminName || 'Admin'}
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 cursor-pointer hover:text-[#ff4b4b] transition-colors" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>
           Sign Out
        </div>
      </nav>

      {/* Sidebar mimicking the exact Premium Landing Page Mockup */}
      <aside className="w-64 border-r border-slate-200 bg-slate-50 p-4 pt-16 fixed inset-y-0 z-20 flex flex-col">
        <button 
          onClick={() => navigate('/active-riders')}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0ea5e9] text-white text-xs font-semibold px-3 py-2.5 mb-6 hover:bg-[#0284c7] transition-colors shadow-sm"
        >
          <Package size={14} /> Dispatch Order
        </button>
        
        <div className="space-y-1 mb-8">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <div 
                key={item.path} 
                onClick={() => navigate(item.path)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors cursor-pointer font-medium ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}
              >
                <span className="flex items-center gap-2"><Icon size={14} /> {item.name}</span>
                {item.count !== undefined && <span className="text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded-md">{item.count}</span>}
              </div>
            );
          })}
          <div className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-slate-400 cursor-not-allowed font-medium">
             <span className="flex items-center gap-2"><Server size={14} /> Logs</span>
          </div>
        </div>

        <div>
          <h4 className="px-3 text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-3">Zones</h4>
          {[
            {label: 'Downtown', color: '#0ea5e9'},
            {label: 'North Sector', color: '#38bdf8'},
            {label: 'East Side', color: '#f59e0b'},
            {label: 'West End', color: '#10b981'}
          ].map(label => (
            <div key={label.label} className="flex items-center gap-3 px-3 py-1.5 text-slate-500 text-sm hover:text-slate-900 cursor-pointer font-medium">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} /> {label.label}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 pt-12 relative min-h-screen">
         <div className="p-8 max-w-6xl mx-auto">
           {children}
         </div>
      </main>
    </div>
  );
};

export default AdminLayout;
