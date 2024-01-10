const formatVariables = require('../../../utils/formatVariables.cjs');

const variables = {
	font_main: 'Montserrat, sans-serif',
	font_heading: 'Baskervville, "Abhaya Libre", serif',
	font_script: '"Golden Hopes", cursive',
	font_headings: '@font_heading',
	font_subheading: '"Abhaya Libre", Baskervville, serif',
}

module.exports = formatVariables(variables)