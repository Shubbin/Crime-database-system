import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import policeRoutes from "./routes/police.routes.js";
import criminalRoutes from "./routes/criminal.routes.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

//dotenv is used to call on the file ".env" and everything in it
dotenv.config();
const app = express();

// ======================
// 🛡️ CORS Configuration
// ======================
const corsOptions = {
  origin: [
    "http://localhost:5173", // Your frontend URL
    "https://your-production-domain.com", // Add production URL when ready
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true, // Allow cookies/sessions
  optionsSuccessStatus: 200, // Legacy browsers
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(cookieParser());

// ======================
// 🚀 Server Setup
// ======================
app.use(express.json({ limit: "10mb" })); // Body parser
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// ======================
// 🛡️ Security Middleware
// ======================
app.use((req, res, next) => {
  // Security headers
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// ======================
// 🚪 Routes
// ======================
// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/admin", authenticateUser, adminRoutes);
app.use("/api/police", authenticateUser, policeRoutes);
app.use("/api/criminals", authenticateUser, criminalRoutes);

// ======================
// 🚨 Error Handling
// ======================
// 404 Handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ======================
// 🔥 Start Server
// ======================
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${PORT}
  🌍 Access it via: http://localhost:${PORT}
  `);
});
