module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react-refresh'],
  extends: ['eslint:recommended'],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // Bạn có thể thêm các quy tắc khác ở đây nếu cần
  },
  ignorePatterns: ['dist'],
};
