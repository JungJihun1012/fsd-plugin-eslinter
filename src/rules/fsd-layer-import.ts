import { Rule } from "eslint";
import { LayerValidator } from "src/utils/LayerValidator";


const layerAccessRules = {
  app: ["pages", "widgets", "features", "entities", "shared"],
  pages: ["widgets", "features", "entities", "shared"],
  widgets: ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: [],
};

const validator = new LayerValidator(layerAccessRules);

export const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow invalid layer imports",
      recommended: false,
    },
    messages: {
      noRelative: "상대 경로 import는 허용되지 않습니다: '{{ path }}'",
      invalidImport: "레이어 '{{ from }}'는 '{{ to }}'를 import할 수 없습니다.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = (node.source as any).value as string;

        if (validator.isRelative(importPath)) {
          context.report({
            node,
            messageId: "noRelative",
            data: { path: importPath },
          });
          return;
        }

        const currentFilePath = context.getFilename();
        const currentLayer = validator.getLayerFromPath(currentFilePath);
        const importLayer = validator.getImportLayer(importPath);

        if (!currentLayer || !importLayer) return;

        if (!validator.isValidLayerImport(currentLayer, importLayer)) {
          context.report({
            node,
            messageId: "invalidImport",
            data: {
              from: currentLayer,
              to: importLayer,
            },
          });
        }
      },
    };
  },
};

