import React, { createContext, useContext, useState, useEffect } from 'react';
import { riderAPI } from '../services/api';

const RiderContext = createContext();

export const useRiders = () => useContext(RiderContext);

export const RiderProvider = ({ children }) => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all riders
  const fetchRiders = async () => {
    try {
      setLoading(true);
      const data = await riderAPI.getAllRiders();
      setRiders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new rider
  const addRider = async (riderData) => {
    try {
      // Validate required fields
      if (!riderData.name || !riderData.riderId || !riderData.phone || !riderData.vehicle) {
        throw new Error('All fields are required');
      }

      const newRider = await riderAPI.addRider({
        name: riderData.name,
        riderId: riderData.riderId,
        phone: riderData.phone,
        vehicle: riderData.vehicle,
        status: 'free'
      });
      setRiders(prevRiders => [...prevRiders, newRider]);
      return newRider;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update rider
  const updateRider = async (riderId, updateData) => {
    try {
      const updatedRider = await riderAPI.updateRider(riderId, updateData);
      setRiders(prevRiders =>
        prevRiders.map(rider =>
          rider.riderId === riderId ? updatedRider : rider
        )
      );
      return updatedRider;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update rider location
  const updateLocation = async (riderId, coordinates) => {
    try {
      const updatedRider = await riderAPI.updateLocation(riderId, coordinates);
      setRiders(prevRiders =>
        prevRiders.map(rider =>
          rider.riderId === riderId ? updatedRider : rider
        )
      );
      return updatedRider;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fetch riders on mount
  useEffect(() => {
    fetchRiders();
  }, []);

  const value = {
    riders,
    loading,
    error,
    addRider,
    updateRider,
    updateLocation,
    fetchRiders
  };

  return (
    <RiderContext.Provider value={value}>
      {children}
    </RiderContext.Provider>
  );
};
