import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../logger/logger"; // ✅ Correct import

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

/**
 * Connects to MongoDB with retry logic and logging.
 */
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    
    logger.info("✅ MongoDB connected successfully.");
  } catch (error) {
    logger.error("🚨 MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

// ✅ Export the function to be used in `server.ts`
export default connectDB;
