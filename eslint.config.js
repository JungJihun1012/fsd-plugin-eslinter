import tsParser from "@typescript-eslint/parser";
import pluginFeatureSliced from '@conarti/eslint- plugin-feature-sliced';

export default [
  {
    files: [
      "test/**/*.{ts,js,tsx,jsx}",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        jsx: true
      }
    },
    plugins: {
      "feature-sliced": pluginFeatureSliced,
    },
    rules: {
      "fsd/fsd-layer-import": ["error", {
        alias: '@',
        cocnfigPath: "./fsd-config.json"
      }],
      "testPatterns": [
        '**/*.test.*',
        '**/*.story.*',
        '**/*.stories.*',
        '**/*.spec.*'
      ]
    },
    settings: {
      'feature-sliced': {
        'fsdLayers': [
          'app',
          'pages',
          'entities',
          'features',
          'widgets',
          'shared'
        ]
      }
    }
  }
];
