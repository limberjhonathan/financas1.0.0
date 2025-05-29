import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Importa as regras padrão do Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Adiciona suas regras personalizadas aqui
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Desativa a regra de 'any' para permitir uso explícito
    },
  },
];

export default eslintConfig;
