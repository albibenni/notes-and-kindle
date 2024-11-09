/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // globalSetup: "./src/__tests__/global.setup.ts",
    setupFiles: ["dotenv/config"], //this line,
    fileParallelism: false,
    poolOptions: {
      maxWorkers: 1,
    },
    root: "./src",
    onConsoleLog(log: string, type: "stdout" | "stderr"): false | void {
      console.log("log in test: ", log);
      if (log === "message from third party library" && type === "stdout") {
        return false;
      }
    },
  },
});
