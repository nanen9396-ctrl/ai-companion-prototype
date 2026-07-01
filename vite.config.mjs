import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import chatHandler from "./api/chat.js";
import { resolve } from "node:path";

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function localApiPlugin() {
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        req.body = await readBody(req).catch(() => ({}));
        const response = {
          status(code) {
            res.statusCode = code;
            return this;
          },
          json(data) {
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify(data));
          },
        };

        await chatHandler(req, response).catch((error) => {
          console.error(error);
          response.status(500).json({ error: "Local API error" });
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.DEEPSEEK_API_KEY ||= env.DEEPSEEK_API_KEY;
  process.env.DEEPSEEK_MODEL ||= env.DEEPSEEK_MODEL;

  return {
    optimizeDeps: {
      include: ["react", "react-dom/client"],
    },
    server: {
      warmup: {
        clientFiles: ["./src/main.jsx"],
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(process.cwd(), "index.html"),
        },
      },
    },
    plugins: [localApiPlugin(), react()],
  };
});
