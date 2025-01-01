/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string; // Tambahkan variabel lingkungan Anda di sini
  // Tambahkan variabel lingkungan lainnya jika diperlukan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
