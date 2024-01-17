module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/no-unresolved": "off",
    "import/named": "off",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "printWidth": 130,
        "semi": true
      }
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "groups": ["builtin", "external", "internal", "type"],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "pathGroups": [
          {
            "pattern": "{@nestjs*/**}",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "@src/libs/**",
            "group": "internal",
            "position": "after"
          },
          {
            "pattern": "@src/apps/**",
            "group": "internal",
            "position": "after"
          },
        ],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
};
