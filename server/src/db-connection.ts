import mongoose from "mongoose";

let isConnected = false; // Global flag untuk mengecek status koneksi

const connectDB = async () => {
  if (isConnected) {
    console.log("Menggunakan koneksi database yang sudah ada");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.DATABASE_URI || "");
    isConnected = !!connection.connections[0].readyState;
    console.log("Terkoneksi ke database");
  } catch (error) {
    console.error("Gagal terkoneksi ke database:", error);
    throw error;
  }
};

export default connectDB;
