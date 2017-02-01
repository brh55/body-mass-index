'use strict';
const convert = require('convert-units');

module.exports = (weight, height) => {
	let kg = weight;
	let m = height;

	if (typeof weight === 'string') {
		// \d+\s?(mass units)
		const pattern = new RegExp(`\d+\s?(${convert().possibilities('mass').join('|')})`, g);
		const unit = weight.match(pattern)[0];
		kg = parseInt(weight.match(/\d+/)[0], 10);

		if (unit !== 'kg') {
			kg = convert(kg).from(unit).to('kg');
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
