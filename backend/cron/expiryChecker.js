import cron from "node-cron";
import Batch from "../models/Batch.js";

cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  const batches = await Batch.find();

  for (let batch of batches) {
    const diff = (batch.expiryDate - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) batch.status = "EXPIRED";
    else if (diff <= 30) batch.status = "NEAR_EXPIRY";
    else batch.status = "SAFE";

    await batch.save();
  }

  console.log("Expiry status updated");
});
