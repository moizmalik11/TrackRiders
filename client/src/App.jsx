import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RiderLogin from './pages/RiderLogin';
import AdminDashboard from './pages/AdminDashboard';
import RiderPanel from './pages/RiderPanel';
import RiderListPage from './pages/RiderListPage';
import ActiveRiders from './pages/ActiveRiders';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/rider-login" element={<RiderLogin />} />
      
      {/* Protected Routes (Optional: Add Auth Wrapper here later) */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/riders" element={<RiderListPage />} />
      <Route path="/active-riders" element={<ActiveRiders />} />
      <Route path="/rider-panel" element={<RiderPanel />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
