module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react-native/all",
    "plugin:@typescript-eslint/recommended", // If you're using TypeScript
    "plugin:jsx-a11y/recommended", // For accessibility
    "plugin:prettier/recommended", // Prettier integration
    "expo", // Expo-specific rules
  ],
  parser: "@typescript-eslint/parser", // Use TypeScript parser if applicable

  plugins: [
    "react",
    "react-native",
    "react-hooks",
    "jsx-a11y", // Accessibility checks
    "@typescript-eslint", // TypeScript rules
    "prettier",
  ],
  rules: {
    // Prettier Rules
    "prettier/prettier": "error",

    // React Rules

    "react/prop-types": "off", // Disable PropTypes if using TypeScript
    "react/jsx-boolean-value": ["error", "always"], // Enforce explicit boolean props
    "react/no-array-index-key": "off", // Avoid using array indices as keys
    "react-hooks/rules-of-hooks": "off", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "off", // Checks dependencies for Hooks

    // React Native Rules
    "react-native/sort-styles": "off", // Disable sorting styles, as it can be subjective
    "react-native/no-unused-styles": "error", // Unused styles detection
    "react-native/split-platform-components": "warn", // Separate platform-specific components
    "react-native/no-color-literals": "off", // Encourage using variables for colors
    "react-native/no-inline-styles": "off",
    // Accessibility Rules
    "jsx-a11y/accessible-emoji": "warn",
    "jsx-a11y/alt-text": "error", // Enforce alt text on images
    "jsx-a11y/anchor-has-content": "warn",
    "jsx-a11y/media-has-caption": "warn",
    "react-native/no-raw-text": "off",

    // TypeScript Rules

    camelcase: "off", // Enforce camelCase naming convention
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off", // Don't require explicit return types
    "@typescript-eslint/no-explicit-any": "warn", // Discourage use of `any`
    "@typescript-eslint/no-require-imports": "off",
    // General Rules
    "no-console": ["error", { allow: ["error", "info"] }], // Warn about console usage
    "no-debugger": "error", // Disallow debugger
    "no-sparse-arrays": "off", // Disallow sparse arrays
    quotes: ["error", "double", { avoidEscape: true }], // Enforce double quotes
    semi: ["error", "always"], // Enforce semicolons
    eqeqeq: ["error", "always"], // Enforce strict equality
    "no-var": "error", // Disallow var
    "prefer-const": "error", // Suggest const for variables
  },
  ignorePatterns: ["/dist/*", "/build/*", "node_modules/*"], // Ignore unnecessary directories
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
