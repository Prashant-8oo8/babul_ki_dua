import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ DB connected to achhi_bate collection");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
  }
};

export default connectDB;
