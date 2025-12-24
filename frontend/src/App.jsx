import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AddProduct from "./pages/AddProduct";
import AddBatch from "./pages/AddBatch";
import Inventory from "./pages/Inventory";
import RegisterStaff from "./pages/RegisterStaff";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-batch" element={<AddBatch />} />
        <Route path="/register-staff" element={<RegisterStaff />} />

        {/* Staff Pages */}
        <Route path="/staff" element={<StaffDashboard />} />

        {/* Common */}
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
