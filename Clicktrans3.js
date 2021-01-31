function hideString(name) {
	ggbApplet.setVisible(name, false);
	ggbApplet.setAuxiliary(name, true );
}
//// sto("a","xxx") create a Geogebra hidden string "a" and store "xxx" 
function sto(name, value) {
	switch (typeof value) {
		case 'string':
			ggbApplet.evalCommand(name + "=" + "\"" + value + "\"");
			hideString(name);
			break;
		case 'boolean':
		case 'number':
			ggbApplet.evalCommand(name + "=" + value.toString());
			hideString(name);
			break;
		case 'undefined':
		default:
	}
}
// returns the GeoGebra value string that must be translated in object name, 
// or a scalar value if any
function lod(name) {
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			return ggbApplet.getValueString(name, false) + "";
		case "button":
		case "slider":
		case "checkbox":
		case "inputbox":
		case "textfield":
		case "point":
			return ggbApplet.getCaption(name, false) + "";
		case 'boolean':
		case "number":
		case "numeric":
			return ggbApplet.getValue(name);
		case "undefined":
		default:
			return "NOTRANS";
	}
}

// Global variables
function globlod(name) {
	return lod("ZZVAR" + name);
}

function globsto(name, value) {
	sto("ZZVAR" + name, value);
}

function globExists(objName) {
	return ggbApplet.exists("ZZVAR" + objName);
}

function isGlob(objName) {
	return objName.startsWith("ZZVAR");
}

// Things to be translated are captions and strings.
// Captions can be strings or latex formulas between dollars.
// Strings can be a plain string or a formula with strings in it
// The form "\text{sometext}" is also found
// "\text{Solution}\\n\text{A}" is also found
// Newlines can occur in strings
// Strings as Latex Formulas must be stored without Text() and injected with FormulaText
// The transIt function define if a Geogebra object O needs some translation. 
// Functions lodtrans and stotrans tell where to put this translation in O. 
// Function tr contains pre and post processing for strings that are going to be translated
//
// \cr in \text fields works  as newline and so it does \\
//
//
//

// XML access to object
function readXML(obj) 
{
var xml = ggbApplet.getXML(obj) + ""; 
return xml; 
}

function writeXML(xml){
	// the xml contains indications about the object it will go to
	ggbApplet.evalXML(xml); 
}

function createButton(name,caption){
	// create button name with caption 
	var storecmd = name + " = Button(\"" + caption + "\")";
	ggbApplet.evalCommand(storecmd);
}
// set the string that must be translated in object name, 
function stotrans(name, transvar) {
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			var stringtr = lod(transvar);
			if (!usingStrings(lod(transvar)) && simpleText(name)) {
				ggbApplet.setTextValue(name, stringtr);
				break;
			}
			//attempted "FormulaText(\""+transvar or without extra quote ",false)" 
			//or false sometimes work but still stores
			//the transvar value at time of storing i.e. variables do not change.
			var storecmd = name + " = " + "FormulaText(" + transvar + ",false)";
			ggbApplet.evalCommand(storecmd);
			break;
		default:
			ggbApplet.setCaption(name, lod(transvar));
	}
}


// returns the string that must be translated in object name, 
function lodtrans(name) {
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			if (!simpleText(name)) {
				return getformula(name);
			} else {
				return ggbApplet.getValueString(name, false) + "";
			}
		default:
			return ggbApplet.getCaption(name, false) + "";
	}
}

// true if that object needs some form of translation
// modify with lodtrans and stotrans
function transIt(name) {
	//debugger;
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			return lodtrans(name) != "";
		case "button":
		case "slider":
		case "checkbox":
		case "inputbox":
		case "textfield":
		case "point":
			return lodtrans(name) != "";
		case "number":
		case "numeric":
			return false;
		case "undefined":
		default:
			return false;
	}
}


// name the object that holds the translation
function translName(objName, lang) {
	return globlod("magic") + lang + objName;
}
// test if the named object is an auxiliary string for translation
function isTranslation(objName) {
	return objName.startsWith(globlod("magic"));
}
// test if a translation exist for this command
function isTranslatedCmd(objName, lang) {
	var objName = translName(objName, lang)
	return ggbApplet.exists(objName) &&
		getStoredFormulaTranslation(objName,lang) != "";
}
// test if a translation exist for this object
function isTranslated(objName, lang) {
	return ggbApplet.exists(translName(objName, lang)) &&
		translation(objName, lang) != "";
}

// test if a translation exist for this object
function translation(objName, lang) {
	return lod(translName(objName, lang));
}


function unhashtr(origText, listToken) {
	var hash = globlod("hash");
	for (name of listToken) {
		origText = origText.replaceAll(hash + name, name);
	}
	return origText;
}

function hashtr(origText, listToken) {
	var hash = globlod("hash");
	for (name of listToken) {
		origText = origText.replaceAll(name, hash + name);
	}
	return origText;
}

function deLatex(origText, cmd) {
	var hash = globlod("hash");
	//debugger;
	var cmdlen = cmd.length;
	return origText.replace(
		RegExp('\\\\' + cmd + '\\{[^\\}]*\\}', 'g'),
		function(match) {
			return  hash + cmd + "IN!" + (match.slice(2 + cmdlen, -1))+"¿XYZ"+hash+cmd
		}
	);
}

function inLatex(translated,origText, cmd) {
	var hashcmd = globlod("hash") + cmd;
	translated = translated.replace(RegExp(hashcmd+"IN\\s*!",'g'),"\\"+cmd+"{");
	return translated.replace(RegExp("¿\\s*XYZ"+hashcmd,'g'),"}");
}

function LatexTranslate(origText, origLang, targetLang) {
	// we assume that in Latex code the only thing to translate is within \text
	//debugger;
	return origText.replace(
		RegExp('\\\\text\\{[^\\}]*\\}', 'g'),
		function(match) {
			return "\\text{" + strTrans(match.slice(6, -1), origLang, targetLang) + "}";
		}
	);
}

function cmdTrans(command, origLang, targetLang) {
	// In commands things to translate are sought in "strings". 
	// inlined commands between the + + are left unchanged but still in
	// + somecmd("somestring") * "somestring" is translated.
	// If in a string there is a  "\text{ sone text}" only "some textann" in
	// "\text{ sone text1} \boo \text{ sone text2} \bu \text{ sone text3}" are
	// translated 
	// otherwise "string" is passed for translation
	//debugger;
	return command.replace(
		//return LatexTranslate(command, origLang, targetLang).replace(
		RegExp('"[^"]*"', 'g'),
		function(matchstr) {
			var matchtext = matchstr.match(RegExp('\\\\text\\{[^\\}]*\\}', 'g'));
			if (matchtext) {
				return LatexTranslate(matchstr, origLang, targetLang);
			} else {
				var translin = deLatex(matchstr, "text");
				var translated = strTrans(translin, origLang, targetLang);
				return inLatex(translated,matchstr, "text");
				//return strTrans(matchstr, origLang, targetLang);
			}
		}
	);
}

function getformula(objName) {
	var definition = ggbApplet.getDefinitionString(objName) + "";
	var command = ggbApplet.getCommandString(objName, false) + "";
	if (definition.length != 0) {
		return definition;
	}
	if (command.length != 0) {
		return command;
	}
}

function simpleText(objName) {
	var definition = ggbApplet.getDefinitionString(objName) + "";
	var command = ggbApplet.getCommandString(objName, false) + "";
	return ((command.length == 0) && (definition.length == 0));
}

// returns translated string 
function tr(objName, objType, origLang, targetLang) {
	//debugger;
	//var firstTime = globlod("firstTime");
	var origText;
	var command;
 
	if (!isTranslated(objName, origLang)) {//firstTime
		origText = lodtrans(objName);
	} else {
		origText = translation(objName, origLang);
	}
	origText = origText.replace(/(\n)/gm, "\\\\n"); // prev \\\\n
	origText = origText.replace(/\s+/g, ' '); // sometimes .trim(); // one space is enough in any occasion
	switch (objType) {
		case "text":
			{
				if (simpleText(objName)) { //(definition=="" && command=="")
					var translin = deLatex(origText, "text");
					var translated = strTrans(translin, origLang, targetLang);
					return inLatex(translated,origText, "text");
					// a bare string no command no latex definition. Actually one can see \text in it, too.
				} else {
					if (!isTranslatedCmd(objName, lang)) {
						command = getformula(objName);
					} else {
						command = getStoredFormulaTranslation(translName(objName, origLang));
					}
					command = command.replace(/(\n)/gm, "\\\\n");
					command = command.replace(/\s+/g, ' '); // sometimes not .trim(); // one space is enough in any occasion
					// the string is a  command just translate the strings in it 
					command = cmdTrans(command, origLang, targetLang);
					return command;
				}
			}
		default:
			{
				//debugger;
				if (origLang == targetLang) {
					return origText;
				}
				// for all the others the problem is to translate a caption
				// captions can only be a string with some Latex code between $$ and 
				// we assume that in Latex code the only thing to translate is within \text
				if (origText.startsWith("$$")) {
					return "$$" + LatexTranslate(origText.slice(2, -2), origLang, targetLang) + "$$";
				}
				if (origText.startsWith("$")) {
					return "$" + LatexTranslate(origText.slice(1, -1), origLang, targetLang) + "$";
				}
				// some special placeholders %c %v %n %d %f %x %y %z	
				//debugger;
				origText = hashtr(origText, ["%d", "%c", "%v", "%n", "%f", "%x", "%y", "%z"]);
				origText = strTrans(origText, origLang, targetLang);
				// Google translate turns %d into % d inserting a space
				origText = origText.replace(
					RegExp(globlod("hash") + '% [dcvnfxyz]', 'g'),
					function(match) {
						return match.replace(" ", "");
					}
				);
				origText = unhashtr(origText, ["%d", "%c", "%v", "%n", "%f", "%x", "%y", "%z"]);
				return origText;
			}
	}
}


function filterBlanks(inStrbb, outStr) {
	//debugger;
	// leading and trailing blanks must be handled
	leadingblank = "";
	trailingblank = "";
	var inStr = inStrbb;
	if (inStr.startsWith(' ')) {
		leadingblank = " ";
		inStr = inStr.slice(1);
	}
	if (inStr.endsWith(' ')) {
		trailingblank = " ";
		inStr = inStr.slice(0, -1);
	}
	var result = filterAddedBlanks(inStr, outStr);
	// delete known added blanks patterns
	for (let pattern of blankPattern()) {
		var patternSubst = pattern.replace(' ', '');
		pattern = pattern.replaceAll("\\", "\\\\");
		result = result.replace(RegExp(pattern, 'g'), patternSubst);
	}
	if (inStr.length >= 2) {
		var startadd = "";
		var endadd = "";
		var starts = inStr.slice(0, 1);
		var ends = inStr.slice(-1);
		if (starts in TrimmedSch() && result.slice(0, 1) != starts) {
			startadd = starts;
		}
		if (ends in TrimmedSch() && result.slice(0, 1) != ends) {
			endadd = ends;
		}
		result = startadd + result + endadd;
	}
	return leadingblank + result + trailingblank;
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


function filterAddedBlanks(inStr, outStr) {
	//debugger;
	// in the translation outStr some blanks are stuffed in by the translator
	// Let's find and delete them
	var matchin = inStr.match(/([\s]+)/g);
	var instrblk = 0;
	if (matchin) {
		instrblk = matchin.length;
	}
	var matchout = outStr.match(/([\s]+)/g);
	var outstrblk = 0;
	if (matchout) {
		outstrblk = matchout.length;
	}
	if (instrblk >= outstrblk) {
		return outStr;
	}
	// usually in the output there are more blanks
	// find the first blank in the out sequence
	var outfblk = outStr.indexOf(' ');
	var outArr = [...outStr];
	var pattern = escapeRegExp(outArr[outfblk - 1] + outArr[outfblk + 1]); // what was before stuffing
	var infblk = inStr.indexOf(' ');
	if (infblk == -1) {
		infblk = inStr.length;
	}
	// if it was a stuffed blank, stuffed  in the input at pos index
	var match = RegExp(pattern).exec(inStr);
	if (match && match.index < infblk) {
		return outStr.slice(0, outfblk) + filterAddedBlanks(inStr.slice(match.index + 1), outStr.slice(outfblk + 1));
	} else { // blank was already in the original string
		return outStr.slice(0, outfblk) + ' ' + filterAddedBlanks(inStr.slice(infblk + 1), outStr.slice(outfblk + 1));
	}
}






function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyTimeout() {
	await sleep(globlod("httpTimeout"));
}

// bare access to Google Translate Service takes a string returns a string
function strTrans(text, sl, tl) {
	//debugger;
	if (sl == tl) {
		return text;
	}
	if (text == "" || text == '"') {
		return text;
	}
	if (dictionary().has(text)) {
		return text;
	}
	if (text.startsWith('"') && text.endsWith('"')) {
		return '"' + strTrans(text.slice(1, -1), sl, tl) + '"';
	}
	var returnString = "";
	var skip = false;
	var xhr = new XMLHttpRequest();
	// Setup our listener to process completed requests
	xhr.ontimeout = function() {
		alert("Increase ZZVARhttpTimeout Timeout status:" + xhr.status.toString() + " ready state:" + xhr.readyState.toString() + " response text:" + xhr.responseText + " response:" + xhr.response);
		skip = true;
	};
	xhr.onload = function() {
		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			if (xhr.readyState == 4) {
				// Runs when the request is successful
				//alert("Response OK:"+xhr.status.toString()+":"+xhr.readyState.toString()+":"+xhr.responseText+":"+xhr.response);
				//return xhr.responseText[0][0][0];
				var returnArray = JSON.parse(xhr.responseText)[0];
				returnString =""
				for (Item of returnArray) {
					returnString=returnString+Item[0];
				}
				skip = true;
			} else {
				alert("Response KO, Ready State:" + xhr.readyState.toString()); //xhr.responseText);
				skip = true;
			}
		} else {
			// Runs when it's not
			alert("Response KO Status:" + xhr.status.toString()); //xhr.responseText);
			skip = true;
		}
	};
	// Create and send a GET request
	// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
	// The second argument is the endpoint URL
	var url =
		'https://translate.googleapis.com/translate_a/single?client=gtx' + '&sl=' + sl + '&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text) + '&ie=UTF-8&oe=UTF-8';
	xhr.open('GET', url, false);
	//xhr.timeout=globlod("httpTimeout")-10; no for async
	//xhr.responseType=""; // "json" no for async
	xhr.send(null); // we ask for a translation and wait for it for httpTimeout-10 ms. If Google translate fail to reply some alert is given
	// if timeout occurs the translation is empty and it will be attempted next time you press this language button.
	while (!skip) {
		applyTimeout();
	}
	var returnArray = JSON.parse(xhr.responseText)[0];
	returnString =""
	for (Item of returnArray) {
		returnString=returnString+Item[0];
	}
	console.log(">"+text+"->"+returnString);
	returnString = filterBlanks(text, returnString);
	returnString = filterFalsePair(sl,tl,text,returnString);
	return returnString; 
	// now compensate added blank spaces
}

function escapeUnicode(s, u) {
	if (s == "" || s == '""') {
		return s;
	} // here drop things like ""foo"", too.
	var chunks = s.split(String.fromCharCode(u));
	if (chunks.length == 0) {
		return s;
	} //if the char u is not in get an empty array?
	return chunks.join('_UnicodeToLetterIn_' + u.toString() + '_UnicodeToLetterOut_');
}

function escapeUnicodes(s, unicodes) {
	if (s.startsWith('"') && s.endsWith('"'))
	//here drop things like ""foo"", too.
	{
		return '"' + escapeUnicodes(s.slice(1, -1), unicodes) + '"';
	}
	var sout = s;
	for (u of unicodes) {
		sout = escapeUnicode(sout, u);
	}
	sout = sout.replace(RegExp('_UnicodeToLetterIn_', 'g'), '"+UnicodeToLetter(');
	sout = sout.replace(RegExp('_UnicodeToLetterOut_', 'g'), ')+"');
	return sout;
}

function protectedSpacesInString(str) {
	// \text{something}
	return str.match(/^\s*\\text{[^}]*}\s*$/);
}

function protect(str) {
	//debugger;
	str = str.replaceAll("\\\\n","\\\\");
	if (!protectedSpacesInString(str)) {
		return "\\text{" + str + "}";
	} else {
		return str;
	}
}

function usingStrings(translation) {
	return translation.match(RegExp('"[^"]*"', 'g'));
}

function isLatex(translation) {
	//globsto("latexcmds","frac|dfrac|right|left|phantom|ovalbox");
	//globsto("simplelatexcmds","br|cr|times"); they do not need curly
	return translation.match(RegExp("\\\\["+globlod("latexcmds")+"]\\s*{"))||
		translation.match(RegExp("\\\\["+globlod("simplelatexcmds")+"]"));;
}

function protectSpacesInCommands(objName, translation) { // another Geogebra good idea
	if (usingStrings(translation)) {
		return translation.replace(
			RegExp('"[^"]*"', 'g'),
			function(match) {
				// sometimes the string contains Latex commands  e.g.  "\frac{"
				if( isLatex(translation)) { return match; }
				else	{return "\"" + protect(match.slice(1, -1)) + "\"";}
			}
		);
	} else {
		// is just one string
		return translation;
	}
}

function copyFreeObject(objName, tostringName) {
	var storecmd = tostringName + " = CopyFreeObject(" + objName + ")";
	ggbApplet.evalCommand(storecmd);
}

function stostring(objName, lang, translation) {
	//debugger;
	translation = translation.replace(/(\n)/gm, "\\\\n");
	var tostringName = translName(objName, lang);
	var storecmdprefix = "\"";
	var storecmdsuffix = "\"";
	if (usingStrings(translation)) {
		translation = translation.replace(
			// bring parenthesis out of strings 
			RegExp('"[^"]*"', 'g'),
			function(match) {
				return escapeUnicodes(match, [40, 41, 91, 93]);
			} //()[],123,125 omit {}
		);
		if (translation.startsWith('+')) {
			translation = translation.slice(1);
		}
		if (translation.endsWith('+')) {
			translation = translation.slice(0, -1);
		}
	}
	var objType = ggbApplet.getObjectType(objName) + "";
	switch (objType) {
		case "text":
			if (!ggbApplet.exists(tostringName)) {
				copyFreeObject(objName, tostringName);
			}
			//CopyFreeObject copia il setting LatexFormula ma non le condizioni di visibilita'
			translation = protectSpacesInCommands(objName, translation);
			// another Geogebra good idea
			if (!simpleText(objName)) {
				storecmdprefix = "";
				storecmdsuffix = "";
				translation = "Text(" + translation + ")";
			}
			break;
		default:
	}
	storecmd = tostringName + " = " + storecmdprefix + translation + storecmdsuffix;
	// set the parenthesis to UnicodeToLetter(40)
	ggbApplet.evalCommand(storecmd);
	hideString(tostringName);
	ggbApplet.setLayer(tostringName, 0);
	ggbApplet.setFixed(tostringName, true, false);
	// auxiliary not to clutter the Algebra view ggbApplet.setAuxiliary(tostringName, true)
}

function getStoredFormulaTranslation(translName) {
	return ggbApplet.getDefinitionString(translName).slice(5, -1); // "Text("+ translation +")";
}

//function FirstScanObject(objName, index) {
	//debugger;
//	if (transIt(objName)) {
//		var objType = ggbApplet.getObjectType(objName) + "";
//		if (isTranslation(objName)) {
			return;
//		} // leave aux objects
//		if (isGlob(objName)) {
//			return;
//		} // leave aux objects
//		stostring(objName, globlod("origLang"), tr(objName, objType, globlod("origLang"), globlod("origLang")));
//		stotrans(objName, (translName(objName, globlod("origLang"))));
//		return;
//	}
//}


function TransObject(objName) {
	//debugger;
   if (transIt(objName)) {
	var lang = globlod("targetLang");
	var origLang = globlod("origLang");
	var objType = ggbApplet.getObjectType(objName) + "";
	if (isTranslation(objName)) {
			return;
	} // leave aux objects
	if (isGlob(objName)) {
			return;
	} // leave aux objects
	if (isTranslated(objName, lang))
	{
		stotrans(objName, (translName(objName, lang)));
	} else if (isTranslated(objName, origLang)) {
		// we need to translate this object into lang
		// fetch the original string
		//origText = translation(objName, origLang);
		// translate and store it 
		stostring(objName, lang, tr(objName, objType, origLang, lang));
		// set the current value to that language
		stotrans(objName, (translName(objName, lang)));
	} else {
		return true;
	}
  }
}

//function loadOrigLang() {
//	var all = ggbApplet.getAllObjectNames();
	//firstTime = globlod("firstTime");
	//if (firstTime) {
//		all.forEach(FirstScanObject);
	//}
	//firstTime = false; // for debugging must be false
	//globsto("firstTime", firstTime);
//}

function loadtrans(lang) {
	//debugger;
	var alltr = ggbApplet.getAllObjectNames();
	globsto("targetLang", lang);
	for (name of alltr) {
		TransObject(name);
	}
}

function sSet(str) {
	if (str == "") {
		return new Set([]);
	}
	return new Set(str.split(','));
}

function gSet(s) {
	return [...s].join(',');
}

function union(setA, setB) {
	let _union = new Set(setA);
	for (let elem of setB) {
		_union.add(elem);
	}
	return _union;
}

function updateTrimmedSch(UpdArr) {
	//debugger;
	var dictStr = "";
	if (globExists("TrimmedSch")) {
		dictStr = globlod("TrimmedSch");
	}
	var addSet = new Set(UpdArr);
	globsto("TrimmedSch", gSet(union(sSet(dictStr), addSet)));
}

function TrimmedSch() {
	return sSet(globlod("TrimmedSch"));
}

function updateBlankPattern(UpdArr) {
	//debugger;
	var dictStr = "";
	if (globExists("BlankPattern")) {
		dictStr = globlod("BlankPattern");
	}
	var addSet = new Set(UpdArr);
	globsto("BlankPattern", gSet(union(sSet(dictStr), addSet)));
}

function blankPattern() {
	return sSet(globlod("BlankPattern"));
}

function unstringfyTripleSet(S) {
	// turns a set of strings into an array  of triples 
	var stringifiedTriples = [];
	for (let Triple of S) {
		stringifiedTriples.push(Triple.split("£"));
	}
	return stringifiedTriples;
}

function stringfyTripleSet(S) {
	// turns an array  of triples into a set of strings
	var stringifiedTriples = [];
	for (let Triple of S) {
		stringifiedTriples.push(Triple.join("£"));
	}
	return new Set(stringifiedTriples);
}

function updateFalsePair(LangFrom,LangTo,UpdTriples) {
	//debugger;
	var addSet = stringfyTripleSet(UpdTriples);
	var Triples = "";
	var globName = LangFrom+LangTo+"falsepair";
	if (globExists(globName)) {
		Triples = globlod(globName);
	}
	globsto(globName, gSet(union(sSet(Triples), addSet)));
}

function falsePairList(langIn,langOut){ 
	var globName = langIn+langOut+"falsepair"
	return unstringfyTripleSet(sSet(globlod(globName)));
}
function filterFalsePair(sl,tl,text,returnString){
	//debugger;
	var res=returnString;
	for (let Triple of falsePairList(sl,tl)) {
		var start = Triple[0];
		var wrong = Triple[1];
		var right = Triple[2];
		if(text.match(start) && returnString.match(wrong) && text.match(start).length==returnString.match(wrong).length){
			res = res.replaceAll(wrong,right); 
		}
	}
	return res;
}
//  Add clicktrigger("xx") to the onclick code for button to translate to "xx"


function updateDictionary(UpdArr) {
	//debugger;
	var dictStr = "";
	if (globExists("dictionary")) {
		dictStr = globlod("dictionary");
	}
	var addSet = new Set(UpdArr);
	globsto("dictionary", gSet(union(sSet(dictStr), addSet)));
}

function dictionary() {
	return sSet(globlod("dictionary"));
}

function ClickggbOnInit() {
	// this is the code specific to the application
	ggbApplet.enableShiftDragZoom(false);
	ggbApplet.setValue('gain', 0);
	// this is the code for the translation 
	// when this  app is loaded with firstTime set to true  for the  the first time  
	// it creates all the translations
	// when this  app is loaded with firstTime set to true it updates all the translations
	// In both cases first time is turned off and you have to edit here to restart the process.
	// If  not no translation overhead occurs and the app need not browser support
	// comment out this line after translation and save your .ggb  
	//globsto("firstTime", true);
	var languages=globlod("LANGUAGES").replaceAll(" ","").split(',');
	// put the list of languages, the first is the original.
	TranslationSetUp(languages) //(["fr","it"])
}
function TranslationSetUp(Languages) {
	//var firstTime = true;
	//if (globExists("firstTime")) {
	//	firstTime = globlod("firstTime");
	//}	
	//globsto("firstTime", firstTime);
	//if(!firstTime) {
	//		linkLangButtons(Languages);
	//			return;
	//}

	//debugger;
	globsto("magic", "ZZ000");
	globsto("hash", "ZWXY");
	//list here strings for whick a faulty translation is known. Be specific.
	//no £ or , in these strings
	updateFalsePair("fr","it",[["Donner","Fornisce","Dare"],
		["Nouvel énoncé","Nuova dichiarazione","Nuova operazione"],
		["Score","Punto","Punteggio"],
		["Le plan","L'aereo","Il piano"]]);
	//list here strings that need no translation
	//They will remain as they are if they are EXACLTY occurring as strings
	//if you put "XYZ" here also \text{XYZ} will pass untranslated.
	updateDictionary(["\\text{", "}", ">it",">en", ">fr", "", " ", " ; ", " / ",
		"\\times","\\times ",
		"\\right" ]);
	// if one of  these command is detected  in a string a surrounding  \texts is  not placed 
	// to protect spaces within
	globsto("latexcmds","frac|dfrac|phantom|ovalbox");
	globsto("simplelatexcmds","br|cr|times|right|left");// they do not need curly
	// put here strings with just one blank.
	// These spaces will be deleted if coming out of translation
	//updateBlankPattern(["ZWXYtext {", "\\ ZWXYtext", "\\ \\", "\\ text", "text {"]);
	updateBlankPattern(["\\ n", 
		//"ZWXYtext {", "\\ ZWXYtext",
		"\\ \\n",
		"\\ text","text {",
		"\\ dfrac","dfrac {" ]);
	// put here special characters that could be deleted by translator when trailing or leading
	//in the first or last position and need to be restored.
	// don't try to put here quote " is going to be a mess
	updateTrimmedSch(["(", ")", "\\", "{", "}", "[", "]", "<", ">", "+", "-",
		"!", "@", "#", ",", ".", "/", , "'", "$", "%", "^", "&", "*", "|", "`", "~"
	]);
	globsto("httpTimeout", 1000); // milliseconds must be greather than 20.
	// say which is the languge of the application
	globsto("origLang", Languages[0]);
	//loadOrigLang();RegButtonHandl(Languages[0]);
	for (l of Languages) {
		loadtrans(l);RegButtonHandl(l);
	}
}
//Add clicktrigger("xx") to the onclick code for button to translate to "xx"
function OrigButtonHandl() {
	var origlang =globlod("origLang")
	loadtrans(origlang);
}

function updAdv(name){ 
	var advcbutton ="ZZVAR"+name;
	 if(cur+1>=len){ 
		if(ggbApplet.exists(advcbutton)){ggbApplet.deleteObject(advcbutton);}	
		return;
	}
	var len=globlod(advbutton+"len");
	var cur=globlod(advbutton+"cur");
	globsto(advbutton+"cur",cur+1);
	ggbApplet.setCaption(advcbutton,((cur+1)*100/len).toFixed(2) + '%');
}

function startAdv(name,start,end) {
	var advcbutton ="ZZVAR"+name;
	globsto(advbutton+"len",end-start+1);
	globsto(advbutton+"cur",start);
	createButton(advcbutton,"0%");
}

function RegButtonHandl(lang) {
	var langbutton ="ZZVAR"+lang;
	createButton(langbutton,">"+lang);
	ggbApplet.registerObjectClickListener(langbutton, "button2handl");
}
// minimal core for multilanguage version must contain this
function linkLangButtons(Languages) {
	for (l of Languages ){
	var langbutton ="ZZVAR"+l;
	ggbApplet.registerObjectClickListener(langbutton, "button2handl");
	}
}
function button2handl(langbutton) {
	debugger;
	loadtrans(langbutton.slice(-9));
}
//function autoPopup() {
//var style = "top=10, left=10, width=400, height=250, status=no, menubar=no, toolbar=no scrollbars=no";
//var testo = window.open("", "",style);
//testo.document.write("<html>n");
//testo.document.write(" <head>n");
//testo.document.write(" <title>Wait</title>n");
//testo.document.write(" <basefont size=2 face=Tahoma>n");
//testo.document.write(" <style> #myProgress { width: 100%; background-color: #ddd; }");
//testo.document.write(" #myBar { width: 1%; height: 30px; background-color: #4CAF50; } </style>");
//testo.document.write(" </head>n");
//testo.document.write("<body topmargin=50>n")
//testo.document.write("<div id="myProgress"> <div id="myBar"></div> </div>n");
//testo.document.write("</body>n");
//testo.document.write("</html>");
//}
ClickggbOnInit();
