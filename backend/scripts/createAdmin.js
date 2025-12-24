import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const DEFAULT_ADMIN = {
  NAME: "Admin",
  EMAIL: "snehasagar381@gmail.com",
  PASSWORD: "Sneha",
};

async function main() {
  const { MONGO_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!MONGO_URI) {
    console.error("Missing MONGO_URI in environment");
    process.exit(1);
  }

  // Use defaults if not provided in env
  const usingDefaults = !ADMIN_EMAIL || !ADMIN_PASSWORD;
  const email = (ADMIN_EMAIL || DEFAULT_ADMIN.EMAIL).trim().toLowerCase();
  const name = (ADMIN_NAME || DEFAULT_ADMIN.NAME).trim();
  const rawPassword = ADMIN_PASSWORD || DEFAULT_ADMIN.PASSWORD;

  await mongoose.connect(MONGO_URI);
  const conn = mongoose.connection;
  console.log(
    `✔ Connected to MongoDB (db: ${conn.name}, host: ${conn.host || "unknown"})`
  );

  if (usingDefaults) {
    console.warn(
      `⚠ Using default admin credentials (override via ADMIN_EMAIL/ADMIN_PASSWORD). Email: ${email}`
    );
  }

  try {
    const hashed = await bcrypt.hash(rawPassword, 10);

    let user = await User.findOne({ email });
    if (user) {
      user.name = name;
      user.password = hashed;
      user.role = "ADMIN";
      await user.save();
      console.log(`✔ Updated existing admin: ${email}`);
    } else {
      await User.create({ name, email, password: hashed, role: "ADMIN" });
      console.log(`✔ Created new admin: ${email}`);
    }

    console.log("Done.");
  } catch (err) {
    console.error("✖ Failed to seed admin:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
