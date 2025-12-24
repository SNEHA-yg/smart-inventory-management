import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-teal-100 via-white to-sky-200">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/50 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-10 text-center max-w-xl"
      >
        <h1 className="text-4xl font-bold flex justify-center items-center gap-3
          text-teal-800 mb-6">
          <FaBoxes /> Smart Inventory
        </h1>

        <p className="text-gray-700 mb-8">
          Manage products, batches, expiry alerts, and inventory efficiently.
        </p>

        <Link
          to="/login"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
