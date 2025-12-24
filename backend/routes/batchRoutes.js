import express from "express";
import Batch from "../models/Batch.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, async (req, res) => {
  const batch = await Batch.create(req.body);
  res.json(batch);
});

router.get("/", protect, async (req, res) => {
  const batches = await Batch.find().populate("productId");
  res.json(batches);
});

export default router;
