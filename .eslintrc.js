module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: ".",
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["node_modules/"],
  settings: {
    "import/resolver": "webpack",
  },
};
