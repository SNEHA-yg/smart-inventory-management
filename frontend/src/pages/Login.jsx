import { useState } from "react";
import { motion } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");

  const login = async () => {
    const res = await API.post("/auth/login", {
      email: email.trim(),
      password: password.trim(),
      role,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    window.location.href =
      role === "ADMIN" ? "/admin" : "/staff";
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-indigo-100 via-white to-purple-200">

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/50 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2
          text-indigo-800 mb-6 justify-center">
          <FaSignInAlt /> Login
        </h2>

        <select
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ADMIN">Admin</option>
          <option value="STAFF">Staff</option>
        </select>

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
          onClick={login}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Login;
