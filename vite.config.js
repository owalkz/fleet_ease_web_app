import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target:
          process.env.VITE_APP_ENVIRONMENT == "development"
            ? process.env.VITE_APP_LOCAL_BACKEND_URL
            : process.env.VITE_APP_BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
});
