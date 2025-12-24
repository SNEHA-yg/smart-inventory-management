import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./utils/expiryCron.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const conn = mongoose.connection;
    console.log(`MongoDB Connected (db: ${conn.name}, host: ${conn.host || "unknown"})`);
  });

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
