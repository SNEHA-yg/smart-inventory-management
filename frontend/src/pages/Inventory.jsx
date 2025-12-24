import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWarehouse,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaClock,
} from "react-icons/fa";
import API from "../services/api";

function Inventory() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [expiryFilter, setExpiryFilter] = useState("ALL");

  useEffect(() => {
    API.get("/batches").then((res) => setItems(res.data));
  }, []);

  const today = new Date();

  // 🔍 Combined filter logic
  const filteredItems = items.filter((item) => {
    const expiryDate = new Date(item.expiryDate);
    const diffDays = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    const matchesSearch =
      item.productId.name.toLowerCase().includes(search.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(search.toLowerCase());

    const matchesProduct =
      selectedProduct === "" ||
      item.productId._id === selectedProduct;

    let matchesExpiry = true;
    if (expiryFilter === "NEAR") {
      matchesExpiry = diffDays > 0 && diffDays <= 30;
    }
    if (expiryFilter === "EXPIRED") {
      matchesExpiry = diffDays <= 0;
    }

    return matchesSearch && matchesProduct && matchesExpiry;
  });

  // Unique products for dropdown
  const uniqueProducts = [
    ...new Map(
      items.map((i) => [i.productId._id, i.productId])
    ).values(),
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-white to-pink-200">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-purple-700 mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Header */}
      <h2 className="text-3xl font-bold flex items-center gap-2
        text-purple-800 mb-6 text-center">
        <FaWarehouse /> Inventory
      </h2>

      {/* 🔍 Search & Filters */}
      <div className="max-w-5xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            placeholder="Search product or batch"
            className="w-full pl-10 p-2 rounded-lg border bg-white/80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Product Filter */}
        <div className="relative">
          <FaFilter className="absolute left-3 top-3 text-gray-500" />
          <select
            className="w-full pl-10 p-2 rounded-lg border bg-white/80"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">All Products</option>
            {uniqueProducts.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Expiry Filter */}
        <div className="relative">
          <FaClock className="absolute left-3 top-3 text-gray-500" />
          <select
            className="w-full pl-10 p-2 rounded-lg border bg-white/80"
            value={expiryFilter}
            onChange={(e) => setExpiryFilter(e.target.value)}
          >
            <option value="ALL">All Stock</option>
            <option value="NEAR">Near Expiry (≤ 30 days)</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>

        {/* Clear */}
        <button
          onClick={() => {
            setSearch("");
            setSelectedProduct("");
            setExpiryFilter("ALL");
          }}
          className="bg-purple-600 text-white rounded-lg px-4 py-2"
        >
          Clear Filters
        </button>
      </div>

      {/* 📦 Inventory List */}
      <div className="max-w-5xl mx-auto grid gap-4">
        {filteredItems.length === 0 && (
          <div className="text-center text-gray-600">
            No matching inventory found
          </div>
        )}

        {filteredItems.map((i) => {
          const expiryDate = new Date(i.expiryDate);
          const diffDays = Math.ceil(
            (expiryDate - today) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={i._id}
              whileHover={{ scale: 1.03 }}
              className={`bg-white/50 backdrop-blur-lg border border-white/30
                rounded-xl p-4 shadow-lg flex justify-between
                ${
                  diffDays <= 0
                    ? "border-l-4 border-red-600"
                    : diffDays <= 30
                    ? "border-l-4 border-yellow-500"
                    : ""
                }`}
            >
              <div>
                <p className="font-semibold text-lg">
                  {i.productId.name}
                </p>
                <p className="text-sm opacity-70">
                  Batch: {i.batchNumber}
                </p>
                <p className="text-sm opacity-70">
                  Expiry: {expiryDate.toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-purple-700">
                  Qty: {i.quantity}
                </p>
                {diffDays <= 0 && (
                  <p className="text-red-600 font-semibold">
                    Expired
                  </p>
                )}
                {diffDays > 0 && diffDays <= 30 && (
                  <p className="text-yellow-600 font-semibold">
                    Near Expiry
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Inventory;
