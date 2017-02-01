import test from 'ava';
import fn from '.';

test('title', t => {
	t.is(fn("200 lb", "6ft"), '27.1');
	// t.is(fn('unicorns'), 'unicorns & rainbows');
});
