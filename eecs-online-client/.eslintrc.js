const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    page: true,
  },
  rules: Object.assign(
    strictEslint.rules,
    {
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/anchor-has-content": "off",
      "jsx-no-multiline-js": false
    })
};
