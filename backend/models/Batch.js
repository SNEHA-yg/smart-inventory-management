import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  batchNumber: String,
  quantity: Number,
  expiryDate: Date,
  status: {
    type: String,
    enum: ["SAFE", "NEAR_EXPIRY", "EXPIRED"],
    default: "SAFE"
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Batch", batchSchema);
