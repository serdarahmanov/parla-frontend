import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const compat = new FlatCompat({ baseDirectory: currentDirectory });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
    ".next/**",
    ".next-dev/**",
    "out/**",
    "build/**",
    "media/**",
    "payload-types.ts",
    "public/vendor/**",
    "src/app/(payload)/admin/importMap.js",
    "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
