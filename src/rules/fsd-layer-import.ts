import { Rule } from "eslint";
import * as path from "path";

const layerAccessRules = {
  app: ["pages", "widgets", "features", "entities", "shared"],
  pages: ["widgets", "features", "entities", "shared"],
  widgets: ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: [],
} as const;

const layers = Object.keys(layerAccessRules);

function isRelative(value: string) {
  return value.startsWith("./") || value.startsWith("../");
}

function getLayerFromPath(filepath: string): string | null {
  const normalizedPath = filepath.split(path.sep);
  const srcIndex = normalizedPath.indexOf("src");
  return srcIndex !== -1 ? normalizedPath[srcIndex + 1] : null;
}

function getImportLayer(importPath: string): string | null {
  const parts = importPath.replace(/^@/, "").split("/");
  return parts.length > 0 ? parts[0] : null;
}

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

        if (isRelative(importPath)) {
          context.report({
            node,
            messageId: "noRelative",
            data: { path: importPath },
          });
          return;
        }

        const currentFilePath = context.getFilename();
        const currentLayer = getLayerFromPath(currentFilePath);
        const importLayer = getImportLayer(importPath);

        if (!currentLayer || !importLayer) return;
        if (!layers.includes(currentLayer) || !layers.includes(importLayer)) return;

        const allowed = layerAccessRules[currentLayer as keyof typeof layerAccessRules];
        if (!allowed.includes(importLayer)) {
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

