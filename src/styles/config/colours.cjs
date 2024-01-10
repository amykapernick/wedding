const formatVariables = require('../../../utils/formatVariables.cjs');

const colours = {
	navy: '#161F38',
	green: '#275942',
	green_light: '#ECF4ED',
	red: '#ed4c30',
	white: '#ffffff',
	black: '#0c0c0c',
	neutral: '@black',
	background: '@green_light',
}

module.exports = formatVariables(colours)