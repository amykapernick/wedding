const formatVariables = require('../../../utils/formatVariables.cjs');

const colours = {
	navy: '#161F38',
	green: '#275942',
	green_white: '#ECF4ED',
	red: '#bd1b4e',
	white: '#ffffff',
	black: '#0c0c0c',
	neutral: '@black',
	background: '@green_white',
	blue: '#0067b7',
	purple: '#9440a0',
	blue_light: '#3eccfd',
	green_teal: '#008080',
	green_light: '#64ad66',
	green_lime: '#bac335',
	pink: '#cb5699',
	orange: '#f78d2b',
	yellow: '#ffce03',
}

module.exports = formatVariables(colours)