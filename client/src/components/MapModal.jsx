import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const coordinatesStream = [
  { lat: 25.3960, lng: 68.3578 },
  { lat: 25.4000, lng: 68.3600 },
  { lat: 25.4050, lng: 68.3620 },
  { lat: 25.4100, lng: 68.3650 },
  { lat: 25.4150, lng: 68.3700 },
  { lat: 25.4200, lng: 68.3750 },
  {lat: 25.4400, lng: 68.3850}

];

const MapModal = ({ onClose, rider }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    // Initialize map
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: coordinatesStream[0],
      zoom: 14,
    });

    // Initialize marker
    markerInstance.current = new window.google.maps.Marker({
      position: coordinatesStream[0],
      map: mapInstance.current,
      title: rider.name,
    });
  }, [rider]);

  // Live tracking effect
  useEffect(() => {
    if (!markerInstance.current || !mapInstance.current) return;

    markerInstance.current.setPosition(coordinatesStream[currentIndex]);
    mapInstance.current.setCenter(coordinatesStream[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    // Simulate live tracking
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < coordinatesStream.length - 1 ? prev + 1 : 0
      );
    }, 2000); // Change position every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl border border-purple-500/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Track {rider.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {rider.currentOrder && (
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p>{rider.currentOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Destination</p>
                  <p>{rider.currentOrder.address}</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative w-full" style={{ height: '400px' }}>
            <div ref={mapRef} className="absolute inset-0 rounded-lg overflow-hidden" />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MapModal;
