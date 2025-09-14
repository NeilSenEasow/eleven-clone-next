import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import audioRoutes from "./routes/audio";
import onboardingRoutes from "./routes/onboarding";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 8000;

// ----------------- CORS -----------------
const corsOrigins = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://eleven-clone-next.vercel.app" // fixed: no trailing slash
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ----------------- SECURITY -----------------
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// ----------------- BODY PARSING -----------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ----------------- LOGGING -----------------
app.use(morgan("dev"));

// ----------------- DB CONNECTION -----------------
connectDB();

// ----------------- ROUTES -----------------
app.get("/", (req, res) => {
  res.json({ message: "Eleven Clone API is running!" });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api/audio", audioRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/auth", authRoutes);

// ----------------- ERROR HANDLING -----------------
app.use(errorHandler);

// ----------------- 404 HANDLER -----------------
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ----------------- START SERVER -----------------
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;
