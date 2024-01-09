const formatVariables = require('../../../utils/formatVariables.cjs');

const variables = {
	font_main: 'Montserrat, sans-serif',
	font_heading: 'serif',
	font_script: 'Dancing Script, cursive',
	font_headings: '@font_heading',
}

module.exports = formatVariables(variables)