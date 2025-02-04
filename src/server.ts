import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./infrastructure/database/db"; // ✅ Corrected import
import subscriptionRoutes from "./api/routes/subscription.routes";
import webhookRoutes from "./api/routes/webhook.routes";

dotenv.config();

const app = express();

// Middleware for security, parsing, and logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Routes
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/webhooks", webhookRoutes);

const PORT = process.env.PORT || 4000;

// Initialize DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error("Database connection failed", err);
  process.exit(1);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down...");
  process.exit(0);
});
