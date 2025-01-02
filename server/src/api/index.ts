import express from "express";
import cors from "cors";
import connectDB from "../db-connection";
import adminRouter from "../routes/admin.route";
import operatorRouter from "../routes/operator.route";
import authRouter from "../routes/authRoute";
import borrowRouter from "../routes/sum.route";
import { authenticateToken } from "../middleware/authMiddleware";

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "https://frontend-web-peminjaman-alat.vercel.app", // URL frontend Anda
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Mengizinkan penggunaan cookie/credentials
  })
);

// Middleware untuk parsing JSON
app.use(express.json());

// Koneksi database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server berjalan di Vercel!");
});

// Route API
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
