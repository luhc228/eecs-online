const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  globals: {
    page: true,
  },
  rules: Object.assign(
    ...fabric.default.rules,
    {
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/anchor-has-content": "off",
      "jsx-no-multiline-js": false,
      // "prettier/prettier": "error"
    }),
  plugins: ["prettier"],
  // extends: ["prettier"],
};
// {
//   "extends": "eslint-config-umi"
// }
