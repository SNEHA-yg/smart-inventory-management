import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

async function main() {
  const { MONGO_URI, CHECK_EMAIL, CHECK_PASSWORD } = process.env;
  if (!MONGO_URI) {
    console.error("Missing MONGO_URI in environment");
    process.exit(1);
  }

  const email = (CHECK_EMAIL || "snehasagar381@gmail.com").trim().toLowerCase();
  const password = CHECK_PASSWORD || "Sneha";

  await mongoose.connect(MONGO_URI);
  console.log("✔ Connected to MongoDB");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return;
    }

    console.log(`Found user: { id: ${user._id}, email: ${user.email}, role: ${user.role} }`);
    const hasPassword = typeof user.password === "string" && user.password.length > 0;
    console.log(`Password hash present: ${hasPassword}`);

    if (!hasPassword) return;

    const match = await bcrypt.compare(password, user.password);
    console.log(`Password match with provided CHECK_PASSWORD: ${match}`);
  } catch (err) {
    console.error("Diagnostic error:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
