const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/interface-name-prefix': [0],
    'jsx-a11y/alt-text': [0],
    'global-require': [0],
    'arrow-parens': [0],
    'react/button-has-type': [0],
    'lines-between-class-members': [0],
    'no-param-reassign': [0],
    'class-methods-use-this': [0],
    'no-underscore-dangle': [0],
    'import/no-extraneous-dependencies': [0],
    'constructor-super': [0],
    'no-confusing-arrow': [0],
    '@typescript-eslint/no-object-literal-type-assertion': [0],
    'eslint-comments/no-unlimited-disable': [0],
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-no-multiline-js": "off",
  },
};
