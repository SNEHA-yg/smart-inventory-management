import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLayerGroup, FaArrowLeft } from "react-icons/fa";
import API from "../services/api";

function AddBatch() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const submit = async () => {
    await API.post("/batches", data);
    alert("Batch added successfully");
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-100 via-white to-indigo-200">

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
          <FaLayerGroup /> Add Batch
        </h2>

        <select
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          onChange={(e) => setData({ ...data, productId: e.target.value })}
        >
          <option>Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Batch Number"
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          onChange={(e) =>
            setData({ ...data, batchNumber: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-2 mb-4 rounded bg-white/80 border"
          onChange={(e) =>
            setData({ ...data, quantity: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full p-2 mb-6 rounded bg-white/80 border"
          onChange={(e) =>
            setData({ ...data, expiryDate: e.target.value })
          }
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={submit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Add Batch
        </motion.button>
      </motion.div>
    </div>
  );
}

export default AddBatch;
