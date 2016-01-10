'use strict';

/* 
 * In place Fisher-Yates shuffle 
 */
export default A => {
	for(let i = A.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i-1));
		const temp = A[i];
		A[i] = A[j];
		A[j] = temp;
	}
	return A;	
}
