import pluginFsd from "./dist/index.js";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["test/**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      fsd: pluginFsd
    },
    rules: {
      "fsd/fsd-layer-import": ["error", {
        cocnfigPath: "./fsd-config.json"
      }]
    }
  }
];
