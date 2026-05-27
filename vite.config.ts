import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import path from "path";

// https://vite.dev
export default defineConfig({
  // Removed react() because reactRouter() compiles React natively
  plugins: [reactRouter()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, "./src")],
      },
    },
  },
});
