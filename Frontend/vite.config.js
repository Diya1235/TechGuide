import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',  // Allow external access to the dev server
    port: 5173, // Default port (or you can customize it)
  },
  assetsInclude: ['**/*.glb', '**/*.gltf']
});
