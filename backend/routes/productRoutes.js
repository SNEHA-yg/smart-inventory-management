import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

router.get("/", protect, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;
