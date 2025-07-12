import { RuleTester } from "eslint";
import { rule } from "../src/rules/fsd-layer-import";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});

ruleTester.run("no-invalid-layer-imports", rule, {
  valid: [
    {
      filename: "/src/features/Button/index.ts",
      code: `import { Button } from "@shared/ui"`,
    },
    {
      filename: "/src/entities/User/model.ts",
      code: `import { getAge } from "@shared/lib"`,
    },
  ],
  invalid: [
    {
      filename: "/src/entities/User/model.ts",
      code: `import { getFeature } from "@features/like"`,
      errors: [{ messageId: "invalidImport" }],
    },
    {
      filename: "/src/features/SomeFeature/ui.ts",
      code: `import { getAppState } from "@app/store"`,
      errors: [{ messageId: "invalidImport" }],
    },
    {
      filename: "/src/widgets/Header/index.ts",
      code: `import { Button } from "../../shared/ui"`,
      errors: [{ messageId: "noRelative" }],
    },
  ],
});
