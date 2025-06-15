import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import RiderListPage from "./pages/RiderListPage";
import ActiveRiders from "./pages/ActiveRiders";
const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/riders" element={<RiderListPage />} />
        <Route path="/riders/active" element={<ActiveRiders />} />

      </Routes>
    </div>
  );
};

export default App;
