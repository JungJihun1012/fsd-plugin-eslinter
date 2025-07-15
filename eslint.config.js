import tsParser from "@typescript-eslint/parser";
import pluginFeatureSliced from '@conarti/eslint-plugin-feature-sliced';

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
      'layers-slices': pluginFeatureSliced,
    },
    rules: {
      "rules/layers-slices": ["error", {
        alias: '@',
        configPath: "./fsd-config.json",
        testPatterns: [
          '**/*.test.*',
          '**/*.story.*',
          '**/*.stories.*',
          '**/*.spec.*'
        ]
      }],
    },
    settings: {
      featureSliced: {
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
