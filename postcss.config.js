const colours = require('./src/styles/config/colours.cjs')
const variables = require('./src/styles/config/variables.cjs');

module.exports = {
	plugins: [
		[
			'postcss-advanced-variables',
			{
				variables: {
					...colours,
					...variables
				},
			}
		],
		'postcss-hexrgba',
		[
			'postcss-nesting',
			{
				noIsPseudoSelector: true
			}
		],
		[
			'stylelint',
			{
				configFile: `./config/stylelint.config.cjs`,
				fix: true
			}
		]
	],
}; 