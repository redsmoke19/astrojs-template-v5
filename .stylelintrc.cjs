module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['utility', 'theme']
      }
    ],
    'no-descending-specificity': null,
    'no-empty-source': null,
    'color-function-notation': 'legacy',
    'declaration-empty-line-before': null,
    'selector-class-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
    'media-query-no-invalid': null,
    'no-invalid-position-declaration': null,
    'scss/dollar-variable-pattern': null,
    'custom-property-pattern': null
  }
}
