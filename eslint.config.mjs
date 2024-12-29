import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import neostandard from "neostandard";
import tailwind from "eslint-plugin-tailwindcss";
import vitest from "@vitest/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tailwind.configs["flat/recommended"],
  ...neostandard({ noStyle: true, noJsx: true }),
  {
    files: ["**/*.test.ts"], // or any other pattern
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/no-alias-methods": ["error"],
    },
  },
];

export default eslintConfig;
