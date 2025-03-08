import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    plugins: [react()],
    server: isDevelopment
      ? {
          https: {
            key: fs.readFileSync("./certs/localhost+2-key.pem"),
            cert: fs.readFileSync("./certs/localhost+2.pem"),
          },
        }
      : {},
  };
});
