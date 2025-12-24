import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import API from "../services/api";

function RegisterStaff() {
  const navigate = useNavigate();

  if (localStorage.getItem("role") !== "ADMIN") {
    return <h3 className="text-center mt-20 text-red-600">Access Denied</h3>;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await API.post("/auth/create-staff", { name, email, password });
    alert("Staff created successfully");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-100 via-white to-cyan-200">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/50 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-700 mb-4"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2
          text-blue-800 mb-6">
          <FaUserPlus /> Create Staff
        </h2>

        <input
          placeholder="Full Name"
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded bg-white/80 border"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={register}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Create Staff
        </motion.button>
      </motion.div>
    </div>
  );
}

export default RegisterStaff;
