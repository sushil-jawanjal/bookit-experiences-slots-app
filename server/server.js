import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoDB from "./config/db.js";
import experienceRoutes from "./routes/experiences.js";
import bookingRoutes from "./routes/bookings.js";
import promoRoutes from "./routes/promo.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect MongoDB
mongoDB();

// ✅ Routes
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
