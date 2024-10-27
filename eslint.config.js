import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
    plugins: {
      typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      sourceType: "module",

      parserOptions: {
        tsconfigRootDir: "./",
        project: "./tsconfig.json",
        ecmaVersion: "latest",
      },
    },

    rules: {
      "typescriptEslint/no-explicit-any": "off",
      "typescriptEslint/explicit-module-boundary-types": "off",
      "typescriptEslint/no-inferrable-types": "off",
      "typescriptEslint/no-non-null-assertion": "off",
      "typescriptEslint/no-empty-interface": "off",
      "typescriptEslint/no-namespace": "off",
      "typescriptEslint/no-empty-function": "off",
      "typescriptEslint/no-this-alias": "off",
      "typescriptEslint/ban-types": "off",
      "typescriptEslint/ban-ts-comment": "off",
      "prefer-spread": "off",
      "no-case-declarations": "off",
      "no-console": "off",
      "typescriptEslint/no-unused-vars": ["error"],
      "typescriptEslint/consistent-type-imports": "warn",
      "typescriptEslint/no-unnecessary-condition": "warn",
    },
    ignores: [
      "**/*.log",
      "**/.DS_Store",
      ".vscode/settings.json",
      ".history",
      ".yarn",
      "bazel-*",
      "bazel-bin",
      "bazel-out",
      "bazel-qwik",
      "bazel-testlogs",
      "dist",
      "dist-dev",
      "etc",
      "external",
      "node_modules",
      "temp",
      "tsc-out",
      "tsdoc-metadata.json",
      "target",
      "output",
      "rollup.config.js",
      "build",
      ".cache",
      ".vscode",
      ".rollup.cache",
      "tsconfig.tsbuildinfo",
      "vite.config.ts",
      "*.spec.tsx",
      "*.spec.ts",
      ".netlify",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      "webpack.config.cjs",
      "*.mjs",
    ],
  },
  eslintConfigPrettier,
];
