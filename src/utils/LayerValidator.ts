import path from "path";
import { LayerAccessRules } from "types/types";

export class LayerValidator {
    private layerAccessRules: LayerAccessRules;
    private layers: string[];

    constructor(rules: LayerAccessRules) {
        this.layerAccessRules = rules;
        this.layers = Object.keys(rules);
    }
    isRelative(value: string): boolean {
        return value.startsWith("./") || value.startsWith("../");
    }
    getLayerFromPath(filePath: string): string | null {
        const normalizedPath = filePath.split(path.sep);
        const srcIndex = normalizedPath.indexOf("src");
        return srcIndex !== -1 ? normalizedPath[srcIndex + 1] : null;
    }
    getImportLayer(importPath: string): string | null {
        const parts = importPath.replace(/^@/, "").split("/");
        return parts.length > 0 ? parts[0] : null;
    }
    isValidLayerImport(currentLayer: string, importLayer: string): boolean {
        if(!this.layers.includes(currentLayer) || !this.layers.includes(importLayer)) {
            return true;
        }
    const allowed = this.layerAccessRules[currentLayer];
    return allowed.includes(importLayer);
    }
}