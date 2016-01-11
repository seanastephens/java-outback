'use strict'

/* Modified from AbdelHady, at 
 * stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery 
 * 
 * Compatible with IE7+, Firefox, Chrome, Opera, Safari. Or so the internet says...
 */
export default (url, callback) => {
	const req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == XMLHttpRequest.DONE && req.status == 200){
			callback(req.responseText);
		}
	};
	req.open("GET", url, true);
	req.send();
};
