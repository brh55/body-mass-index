import test from 'ava';
import fn from '.';

test('Test standard input', t => {
	t.is(fn('200 lb', '6ft 9in'), 21.4);
});

test('Test metric input', t => {
	t.is(fn('90.72 kg', '205.74 cm'), 21.4);
});

test('Test mixed inputs', t => {
	// = ~90.72kg / ~205.75cm
	t.is(fn('90.17 kg 1 lb 100 g', '145.27 cm 1ft 0.30m '), 21.4);
});

test('Test string input', t => {
	t.is(fn(90.72, 205.74), 21.4);
});

test('Test error for incorrect units', t => {
	// = ~90.72kg / ~205.75cm
	const error = t.throws(() => {
		fn('145.27 cm', '90.17 lb');
	}, Error);

	t.is(error.message, 'Expecting mcg,mg,g,kg,oz,lb units');
});

test('Test error for types', t => {
	let error = t.throws(() => {
		fn({}, {});
	}, TypeError);
	t.is(error.message, 'Expecting weight to be type string or number.');

	error = t.throws(() => {
		fn('1lb', {});
	}, TypeError);
	t.is(error.message, 'Expecting height to be type string or number.');
});

test('Test plural inputs', t => {
	t.is(fn('200 lbs', '6fts 9ins'), 21.4);
});

test('Test 0', t => {
	t.is(fn('0 lbs', '0 ft'), false);
});

test('Test negative inputs', t => {
	t.is(fn('-10 lbs', '-2 ft'), false);
});
