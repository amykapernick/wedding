const formatVariables = require('../../../utils/formatVariables.cjs');

const colours = {
	navy: '#161F38',
	green: '#285943',
	green_light: '#edf4ed',
	red: '#ed4c30',
	white: '#ffffff',
	black: '#0c0c0c',
	neutral: '@black',
	background: '@green_light',
}

module.exports = formatVariables(colours)