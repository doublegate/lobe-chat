const config = require('@lobehub/lint').stylelint;

module.exports = {
  ...config,
  rules: {
    'selector-id-pattern': null,
    // Fix deprecated stylelint rules
    'function-whitespace-after': null, // Deprecated - handled by Prettier
    'media-feature-range-operator-space-after': null, // Deprecated - use media-feature-range-notation
    'media-feature-range-operator-space-before': null, // Deprecated - use media-feature-range-notation
    // Use the modern replacement rule
    'media-feature-range-notation': 'context',
    ...config.rules,
  },
};
