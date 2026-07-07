require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const corsMiddleware = require("./src/config/cors");

const app = express();

// ===============================
// Middlewares
// ===============================
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
// const notesRoutes = require("./routes/notes.routes");
// const noticesRoutes = require("./routes/notices.routes");
// const attendanceRoutes = require("./routes/attendance.routes");
// const receiptRoutes = require("./routes/receipt.routes");
// const resultRoutes = require("./routes/result.routes");

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/notes", notesRoutes);
// app.use("/api/notices", noticesRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/receipts", receiptRoutes);
// app.use("/api/results", resultRoutes);

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
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;