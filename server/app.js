import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import { v4 as uuidv4 } from "uuid";

import corsMiddleware from "./src/config/cors.js";
import routeMap from "./src/routeMap.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { morganMiddleware } from "./src/middlewares/logger.middleware.js";
import { apiLimiter } from "./src/middlewares/rateLimiter.middleware.js";

const app = express();

// ===============================
// Security & Utility Middlewares
// ===============================
app.use(helmet());
app.use(compression());
app.use(corsMiddleware);

// Add Request ID
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader("X-Request-ID", req.id);
  next();
});

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(apiLimiter);

// ===============================
// Health Check
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully 🚀",
  });
});

// ===============================
// API Routes
// ===============================
app.use("/api", routeMap);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===============================
// Global Error Handler
// ===============================
app.use(errorHandler);

export default app;