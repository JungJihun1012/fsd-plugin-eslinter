import path from "path";
import { Rule } from "eslint";

const layers = ["shared", "entities", "features", "widgets", "pages", "app"];

function getLayer(filepath: string): string | null {
  const parts = filepath.split(path.sep);
  const srcIndex = parts.indexOf("src");
  return srcIndex >= 0 && parts.length > srcIndex + 1 ? parts[srcIndex + 1] : null;
}

function isRelative(pathValue: string): boolean {
  return pathValue.startsWith(".");
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "FSD 계층 위반 import 방지",
      recommended: false
    },
    messages: {
      noRelative: "절대 경로(@alias 사용)로 import하세요. 현재 경로: '{{path}}'",
      wrongLayer: "'{{importedLayer}}' 레이어는 현재 레이어 '{{currentLayer}}'에서 import할 수 없습니다.",
    },
    schema: []
  },

  create(context) {
  const filename = context.getFilename();
  const currentLayer = getLayer(filename);

  // currentLayer가 null이면 검사 안 함
  if (!currentLayer) {
    return {};
  }

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
  
      const [importedLayerRaw] = importPath.split("/");
      const importedLayer = importedLayerRaw.replace(/^@/, "");
  
      const isSameDomainImport = [currentLayer, importedLayer].every(layer => layers.includes(layer));
  
      const isWrongDirection = layers.indexOf(currentLayer) > layers.indexOf(importedLayer);
  
      if (isSameDomainImport && isWrongDirection) {
        context.report({
          node,
          messageId: "wrongLayer",
          data: { currentLayer, importedLayer },
        });
      }
    },
  };
  
}

};

export default rule;
