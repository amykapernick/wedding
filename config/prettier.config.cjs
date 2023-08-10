module.exports = {
	plugins: [
		"prettier-plugin-svelte"
	],
	overrides: [
		{
			"files": "*.svelte",
			"options": {
				"parser": "svelte"
			}
		}
	],
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: `consistent`,
	jsxSingleQuote: true,
	trailingComma: `all`,
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: `always`,
	endOfLine: `lf`,
	singleAttributePerLine: true,
	astroAllowShorthand: true,
};