'use strict';
const convert = require('convert-units');
const roundTo = require('round-to');

module.exports = (weight, height, opts) => {
	let kg;
	let m = height;
	opts = opts || {};
	opts.round = opts.round || 1;

	const numberPattern = '[-+]?[0-9]*\\.?[0-9]+';
	const valueRegEx = new RegExp(`${numberPattern}`);

	if (typeof weight === 'number') {
		kg = weight;
	} else if (typeof weight === 'string') {
		// \d+\s?(mass units)
		const massGroup = convert().possibilities('mass').join('|');
		const massRegEx = new RegExp(`((${numberPattern})\\s?(${massGroup}))`, 'g');
		const unitRegEx = new RegExp(massGroup);
		const masses = weight.match(massRegEx);

		if (!masses) {
			throw new Error(`Expecting ${convert().possibilities('mass')} units`);
		}

		kg = masses.map(mass => [mass.match(valueRegEx)[0], mass.match(unitRegEx)[0]])
					.map(mass => parseFloat(convert(mass[0]).from(mass[1]).to('kg')))
					.reduce((a, b) => a + b);
	} else {
		throwTypeError('weight');
	}

	// @TODO - Find way to abstract this to abide by DRY
	if (typeof height === 'number') {
		m = convert(height).from('cm').to('m');
	} else if (typeof height === 'string') {
		const lengthGroup = convert().possibilities('length').join('|');
		const lengthsRegEx = new RegExp(`((${numberPattern})\\s?(${lengthGroup}))`, 'g');
		const unitRegEx = new RegExp(lengthGroup);
		const lengths = height.match(lengthsRegEx);

		if (!lengths) {
			throw new Error(`Expecting ${convert().possibilities('mass')} units`);
		}

		m =	lengths.map(length => [length.match(valueRegEx)[0], length.match(unitRegEx)[0]])
					.map(length => parseFloat(convert(length[0]).from(length[1]).to('m')))
					.reduce((a, b) => a + b);
	} else {
		throwTypeError('height');
	}

	const BMI = kg / Math.pow(m, 2);

	return (!BMI || BMI < 0) ? false : roundTo(BMI, opts.round);
};

function throwTypeError(arg) {
	throw new TypeError(`Expecting ${arg} to be type string or number.`);
}
