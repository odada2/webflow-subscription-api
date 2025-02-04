import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // Set log level
  format: format.combine(
    format.timestamp(), // Adds timestamp to logs
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to file
    new transports.File({ filename: "logs/combined.log" }) // Log all messages
  ],
});

// ✅ Export the logger for use in other files
export default logger;
