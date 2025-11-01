module.exports = {
  extends: ['stylelint-config-htmlacademy'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/at-import-partial-extension': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'no-descending-specificity': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    '@stylistic/string-quotes': 'single'
  }
};
