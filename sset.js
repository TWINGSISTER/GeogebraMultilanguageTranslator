/**
 * 
 */
//-----------------------------------------------------------------------
// set as strings
//-----------------------------------------------------------------------

function sSet(str) {
	// turn string str into a set
	if (str == "") {
		return new Set([]);
	}
	return new Set(str.split(','));
}

function gSet(s) {
	// turn set s into a string
	return [...s].join(',');
}

function union(setA, setB) {
	let _union = new Set(setA);
	for (let elem of setB) {
		_union.add(elem);
	}
	return _union;
}

