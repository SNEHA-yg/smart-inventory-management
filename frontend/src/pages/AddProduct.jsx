import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBoxOpen, FaArrowLeft } from "react-icons/fa";
import API from "../services/api";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const submit = async () => {
    await API.post("/products", { name, category });
    alert("Product added successfully");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-green-100 via-white to-emerald-200">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/50 backdrop-blur-xl border border-white/30
          rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 mb-4"
        >
          <FaArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold flex items-center gap-2
          text-green-800 mb-6">
          <FaBoxOpen /> Add Product
        </h2>

        <input
          placeholder="Product Name"
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Category"
          className="w-full p-2 mb-6 rounded bg-white/80 border"
          onChange={(e) => setCategory(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={submit}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Add Product
        </motion.button>
      </motion.div>
    </div>
  );
}

export default AddProduct;
