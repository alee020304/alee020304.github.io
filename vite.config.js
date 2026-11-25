import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";
import posts from "./web/markdown.js";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "web"),
  plugins: [
    react(),
    posts(),
    // status.txt lives at the repo root, where GitHub Pages serves it as is, so
    // it can be edited on GitHub without a rebuild. Serve it in dev too.
    {
      name: "status-file",
      configureServer(server) {
        server.middlewares.use("/status.txt", (req, res) => {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(fs.readFileSync(path.resolve(__dirname, "status.txt"), "utf8"));
        });
      }
    }
  ],
  build: {
    outDir: path.resolve(__dirname),
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});
