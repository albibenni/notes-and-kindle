import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts"],
  verbose: true,
  transform: {
    "^.+\\.tsx?": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  setupFiles: ["<rootDir>/src/__test__/setEnvVars.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testPathIgnorePatterns: ["./dist"],
};

export default config;
