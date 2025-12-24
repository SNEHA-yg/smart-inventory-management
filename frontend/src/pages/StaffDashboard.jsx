import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBell, FaPlus, FaClipboardList } from "react-icons/fa";
import API from "../services/api";

function StaffDashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/notifications").then((res) => setNotifications(res.data));
  }, []);

  return (
    <div className="min-h-screen p-10
      bg-gradient-to-br from-teal-100 via-white to-blue-200">

      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Staff Dashboard
      </h1>

      {notifications.length > 0 && (
        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <FaBell /> Expiry Alerts
          </h2>

          {notifications.map((n) => (
            <div key={n._id}
              className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-2">
              {n.message}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/add-batch"
          className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow">
          <FaPlus /> Add Batch
        </Link>

        <Link to="/inventory"
          className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow">
          <FaClipboardList /> View Inventory
        </Link>
      </div>
    </div>
  );
}

export default StaffDashboard;
