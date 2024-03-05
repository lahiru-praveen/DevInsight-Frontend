module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } }, // Use 'detect' to automatically detect React version
  plugins: ['react-hooks'], // Remove 'react-refresh' plugin as it's not needed for ESLint
  rules: {
    'react/jsx-no-target-blank': 'off',
  },
};
