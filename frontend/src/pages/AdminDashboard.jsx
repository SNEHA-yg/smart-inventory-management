import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

function AdminDashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch(() => console.log("Failed to load notifications"));
  }, []);

  return (
    <motion.div
      className="min-h-screen p-10 bg-gradient-to-br from-indigo-100 via-white to-purple-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">
        Admin Dashboard
      </h1>

      {/* 🔔 Expiry Alerts */}
      {notifications.length > 0 && (
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <FaExclamationTriangle className="text-red-600" />
            Near Expiry Alerts
          </h2>

          {notifications.map((n) => (
            <div
              key={n._id}
              className="bg-red-100 border-l-4 border-red-600 p-4 mb-3 rounded"
            >
              🚨 {n.message}
            </div>
          ))}
        </div>
      )}

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/add-product"
          className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow"
        >
          Add Product
        </Link>

        <Link
          to="/register-staff"
          className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow"
        >
          Add Staff
        </Link>

        <Link
          to="/inventory"
          className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow"
        >
          View Inventory
        </Link>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;
