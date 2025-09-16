module.exports = {
  $schema: "https://json.schemastore.org/stylelintrc",
  extends: [],
  rules: {
    // Basic CSS validation rules that work with stylelint 16.x
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": [true, { ignore: ["consecutive-duplicates"] }],
    "no-empty-source": null,
    "no-invalid-double-slash-comments": null
  },
  // Ignore files that don't contain styled-components
  ignoreFiles: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "!src/**/*style*.ts",
    "!src/**/*Style*.ts",
    "!src/**/*styles*.ts",
    "!src/**/*Styles*.ts",
    "!src/**/style.ts",
    "!src/**/styles.ts"
  ],
  overrides: [
    {
      customSyntax: "postcss-less",
      files: ["*.less", "*.css"],
      plugins: ["stylelint-less"],
      rules: {
        "at-rule-no-unknown": null,
        "color-no-invalid-hex": true,
        "less/color-no-invalid-hex": true
      }
    },
    {
      customSyntax: "postcss-styled-syntax",
      files: ["**/*style*.ts", "**/*Style*.ts", "**/style.ts", "**/*styles*.ts", "**/*Styles*.ts", "**/styles.ts"],
      rules: {
        "no-empty-source": null,
        "no-invalid-double-slash-comments": null,
        "property-no-vendor-prefix": null,
        "value-no-vendor-prefix": null
      }
    }
  ]
};