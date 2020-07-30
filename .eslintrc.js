module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: [],
  rules: {}
};
