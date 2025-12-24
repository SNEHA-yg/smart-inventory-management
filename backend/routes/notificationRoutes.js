import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// Get notifications for logged-in role
router.get("/", authMiddleware, async (req, res) => {
  const notifications = await Notification.find({
    role: req.user.role,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

export default router;
