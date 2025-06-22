import { FlatCompat } from "@eslint/eslintrc";
import vitest from "@vitest/eslint-plugin";
import playwright from "eslint-plugin-playwright";
import simpleImportSort from "eslint-plugin-simple-import-sort";
// import tailwind from "eslint-plugin-tailwindcss"; // TODO: Tailwind CSS v4との互換性問題により一時的に無効化
import neostandard from "neostandard";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    settings: {
      next: {
        rootDir: "apps/web",
      },
    },
  }),
  // ...tailwind.configs["flat/recommended"], // TODO: Tailwind CSS v4との互換性問題により一時的に無効化
  ...neostandard({ noStyle: true, noJsx: true }),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{browser,server}.test.{ts,tsx}"], // or any other pattern
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/no-alias-methods": ["error"],
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["e2e/**/*.e2e.test.ts"],
  },
  {
    ignores: ["src/generated/prisma/**/*"],
  },
];

export default eslintConfig;
