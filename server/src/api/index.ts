import express from "express";
import cors from "cors";
import connectDB from "../db-connection";
import adminRouter from "../routes/admin.route";
import operatorRouter from "../routes/operator.route";
import authRouter from "../routes/authRoute";
import borrowRouter from "../routes/sum.route";
import { authenticateToken } from "../middleware/authMiddleware";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Koneksi database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server berjalan di Vercel!");
});

app.use("/admin", authenticateToken, adminRouter);
app.use("/operator", authenticateToken, operatorRouter);
app.use("/auth", authRouter);
app.use("/borrow", borrowRouter);

// Jalankan server secara lokal (hanya untuk pengembangan)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export handler untuk Vercel
export default app;
