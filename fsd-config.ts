const layerAccessRules = {
  app: ["pages", "widgets", "features", "entities", "shared"],
  pages: ["widgets", "features", "entities", "shared"],
  widgets: ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: [],
};

function isAllowedImport(from: string, to: string): boolean {
  return layerAccessRules[from]?.includes(to);
}
