'use strict';
const convert = require('convert-units');

module.exports = (weight, height) => {
	let kg = weight;
	let m = height;

	if (typeof weight === 'string') {
		// \d+\s?(mass units)
		const units_pattern = new RegExp(`\d+\s?(${convert().possibilities('mass').join('|')})`, g);
		const unit_pattern = new RegExp(convert().possibilities('mass').join('|'));
		const weights = weight.match(units_pattern);
		units = units.map(u => weight.match(unit_pattern));
		const values = weight.match(/\d+/).filter(x => parseInt(x, 10));

		if (units.length > 1) {
			kg = units.map((unit, index) => convert(values[index]).from(unit).to('kg'))
					  .reduce((a, b) => a + b);

		} else if (units[0] !== 'kg') {
			kg = convert(values[0]).from(units[0]).to('kg');

		} else {
			kg = units[0];
		}
	}

	if (typeof height === 'string') {
		// \d+\s?(length units)
		const pattern = new RegExp(`\d+\s?(${convert().possibilities('length').join('|')})`, g);
		const unit = height.match(pattern)[0];
		m = parseInt(height.match(/\d+/)[0], 10);
		// Rely on convert to throw error if n is undefined
		if (unit !== 'm') {
			m = convert(m).from(unit).to('m');
		}
	}

	return kg / Math.pow(m, 2);
};
