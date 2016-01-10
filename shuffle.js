'use strict';

/* 
 * Use a hard coded sequence if you want.
 */
let s = 42;
const deterministic = () => {
	s = Math.sin(s) * 1000;
	return s - Math.floor(s);
}

/*
 * In place Fisher-Yates shuffle
 */
export default A => {
	for(let i = A.length - 1; i > 0; i--) {
		const j = Math.floor(deterministic() * (i-1));
		const temp = A[i];
		A[i] = A[j];
		A[j] = temp;
	}
	return A;	
}
