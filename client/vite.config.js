import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            // ... your other proxies
            "/api": {
                target: "http://localhost:3001/api/posts",
                changeOrigin: true,
                ws: true,
                secure: false,
                rewrite: (path) => path.replace("^/api", "hola"),
            },
        },
    },
    plugins: [react()],
});
