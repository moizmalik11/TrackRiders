import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Navigation, MapPin, Package, Clock } from "lucide-react";

const coordinatesStream = [
  { lat: 25.3960, lng: 68.3578 },
  { lat: 25.4000, lng: 68.3600 },
  { lat: 25.4050, lng: 68.3620 },
  { lat: 25.4100, lng: 68.3650 },
  { lat: 25.4150, lng: 68.3700 },
  { lat: 25.4200, lng: 68.3750 },
  { lat: 25.4400, lng: 68.3850 },
  { lat: 25.4500, lng: 68.3860 }
];

const MapModal = ({ onClose, rider }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!window.L || !mapRef.current) return;

    // Initialize Leaflet map
    mapInstance.current = window.L.map(mapRef.current, {
      center: [coordinatesStream[0].lat, coordinatesStream[0].lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    // Add OpenStreetMap tiles (Clean look)
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(mapInstance.current);

    // Custom Icon for Rider
    const riderIcon = window.L.divIcon({
      className: 'custom-rider-icon',
      html: `<div style="background-color: #ff4b4b; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    markerInstance.current = window.L.marker(
      [coordinatesStream[0].lat, coordinatesStream[0].lng], 
      { icon: riderIcon }
    ).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [rider]);

  useEffect(() => {
    if (!markerInstance.current || !mapInstance.current) return;
    const pos = coordinatesStream[currentIndex];
    markerInstance.current.setLatLng([pos.lat, pos.lng]);
    mapInstance.current.panTo([pos.lat, pos.lng]);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < coordinatesStream.length - 1 ? prev + 1 : 0
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return createPortal(
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[200]">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-5xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center shadow-lg shadow-brand-red/20">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Tracking: {rider.name}</h2>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected to Satellite GPS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[600px]">
          {/* Sidebar */}
          <div className="w-full lg:w-80 p-8 border-r border-slate-100 space-y-8 overflow-y-auto bg-white">
            {rider.currentOrder && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Current Mission</h3>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <Package className="w-4 h-4 text-brand-red" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">{rider.currentOrder.product}</p>
                        <p className="text-[10px] text-slate-500 font-bold">#{rider.currentOrder.orderId}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <MapPin className="w-4 h-4 text-brand-red" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                        {rider.currentOrder.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Rider Telemetry</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><Clock className="w-3 h-3" /> ETA</span>
                      <span className="text-xs font-black text-slate-900">12 Mins</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-2"><Navigation className="w-3 h-3" /> Speed</span>
                      <span className="text-xs font-black text-slate-900">42 km/h</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Area */}
          <div className="flex-1 relative bg-slate-100">
            <div ref={mapRef} className="absolute inset-0" />
            
            {/* Map Overlay Badge */}
            <div className="absolute top-6 left-6 p-4 bg-white/90 backdrop-blur shadow-xl rounded-2xl border border-white flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Feed</p>
                <p className="text-xs font-black text-slate-900">Satellite View Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MapModal;
