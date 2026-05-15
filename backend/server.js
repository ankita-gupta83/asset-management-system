import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import assetRoutes from "./routes/assetRoutes.js";
import authRoutes from "./routes/authRoutes.js";




dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/assets", assetRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Asset Assessment Management API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
