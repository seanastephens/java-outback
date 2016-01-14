'use strict';

/* 
 * Use a hard coded sequence if you want.
 */
let s = 42;
const deterministic = () => {
	s = Math.sin(s) * 1000;
	return s - Math.floor(s);
};

export default A => A
	.map(x => [x, deterministic()])
	.sort(( [ , a], [ , b]) => a - b)
	.map(([x, ]) => x);
