import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/vitest.setup.ts"],
    env: {
      NODE_ENV: "test",
      SUPABASE_URL: "http://localhost:8080",
      SUPABASE_ANON_KEY: "anon_key",
    },
  },
  plugins: [tsconfigPaths()],
});
