import cron from "node-cron";
import Batch from "../models/Batch.js";
import Notification from "../models/Notification.js";

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running expiry check (dashboard only)...");

  const batches = await Batch.find().populate("productId");
  const today = new Date();

  for (const batch of batches) {
    const expiryDate = new Date(batch.expiryDate);
    const diffDays = Math.ceil(
      (expiryDate - today) / (1000 * 60 * 60 * 24)
    );

    // 🔔 Notify ADMIN 30 days before expiry
    if (diffDays === 30) {
      await Notification.create({
        message: `Near expiry stock: ${batch.productId.name} (Batch ${batch.batchNumber}) will expire in 30 days`,
        role: "ADMIN",
      });

      console.log(
        `🔔 Admin notified for ${batch.productId.name} - ${batch.batchNumber}`
      );
    }
  }
});
