

// Things to be translated are captions and strings.
// Captions can be strings or latex formulas between dollars.
// Strings can be a plain string or a formula with strings in it
// The form "\text{sometext}" is also found
// "\text{Solution}\\n\text{A}" is also found
// Newlines can occur in strings
// Strings as Latex Formulas must be stored without Text() and injected with FormulaText
// The transIt function define if a Geogebra object O needs some translation. 
// Functions RT_lodtrans and stotrans tell where to put this translation in O. 
// Function tr contains pre and post processing for strings that are going to be translated
//
// \cr in \text fields works  as newline and so it does \\
//
//
//

//-----------------------------------------------------------------------
// A remainder ... complete editing of Geogebra object properties can be achieved
// using these two.
//-----------------------------------------------------------------------
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

function deleteButton(name){
            ggbApplet.deleteObject(name);
}

function createButton(name,caption){
	// create button name with caption 
	var storecmd = name + " = Button(\"" + caption + "\")";
	ggbApplet.evalCommand(storecmd);
}
//-----------------------------------------------------------------------
// various machinery for reading/writing the ggb document textual features  
//-----------------------------------------------------------------------
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
			// various conditions 
			// commands do not translate
			return (objType==="text"&&(!simpleText(name)))||
			// meaningless do not translate
			(lodtrans(name) != "");
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

//-----------------------------------------------------------------------
// data structure to hold the translation
//-----------------------------------------------------------------------

function getLangFromName(objName) {
    if (!isTranslation(objName)) { return ""; }
		var start=RT_globlod("magic").length ;
	return objName.slice(start,start+2);
}
	// name the object that holds the translation
	function translName(objName, lang) {
	return RT_globlod("magic") + lang + objName;
}
// test if the named object is an auxiliary string for translation
function isTranslation(objName) {
	return objName.startsWith(RT_globlod("magic"));
}
// test if a translation exist for this command
// if so the program links this with FormulaText(somestring... i.e.<translName(objName, lang)>)
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

// get  a translation for this object
function translation(objName, lang) {
	return lod(translName(objName, lang));
}

//-----------------------------------------------------------------------
// pre/post processing making/unmaking some keyword a mess that cannot be translated 
//-----------------------------------------------------------------------

function unhashtr(origText, listToken) {
	//var hash = RT_globlod("hash");
	for (name of listToken) {
		origText = origText.replaceAll("<div class=\"" + name+"\">", name);
	}
	return origText;
}

function hashtr(origText, listToken) {
	//var hash = RT_globlod("hash");
	for (name of listToken) {
		origText = origText.replaceAll(name, "<div class=\"" + name+"\">");
	}
	return origText;
}

//-----------------------------------------------------------------------
// returns the postion of the lp parenthesis matching the first rp
// test
/*--------------- test for matching parenthesis
function test(){
	debugger;
 matchpar(
	"<div class=\"text\">Read1<div class=\"tax\">Read2<div class=\"textdeep\">deep<\\div><\\div><div class=\"tox\">Read3<\\div><\\div>",
	"<div class=\\\"[^\\\"]*\\\">",
	"<\\\\div>"
	);
 matchpar(
	"<div class=\"text\"> Read1  <div class=\"tax\"> Read2 <div class=\"textdeep\"> deep   <\\div>  <\\div> <div class=\"tox\"> Read3  <\\div> <\\div> ",
	"<div class=\\\"[^\\\"]*\\\">",
	"<\\\\div>"
	);
	matchpar("<<<>><>>","<",">");
console.log(matchnargs(
	"<div class=\"tax\">Read2<div class=\"textdeep\">deep<\\div><\\div><div class=\"tox\">Read3<\\div>",
	"<div class=\\\"[^\\\"]*\\\">",
	"<\\\\div>",2
	));
console.log(matchnargs(
	"<div class=\"tax\"> Read2 <div class=\"textdeep\"> deep   <\\div>  <\\div> <div class=\"tox\"> Read3  <\\div>  ",
	"<div class=\\\"[^\\\"]*\\\">",
	"<\\\\div>",2
	));
console.log(matchnargs("<<>><>","<",">",2));
}
*/
// this function returns false if the string s does not contain a balanced sequence 
// of lp rp (left parenthesis right parenthesis). E.g. s="foo(doo(foo)) ((("
// Otherwise, if s is like that the function returns the index of the last character in
// the sequance i.e. for s="foo(doo(foo)) (((" returns 12
// The strings lp and rp are passed to RegExp and therefore rather complex schemes can be 
// analyzed e.g. lp="<div class=\\\"[^\\\"]*\\\">", rp="<\\\\div>",
function matchpar(s,rp,lp){// return the end position of the matching pair or false 
 var start=s.match(RegExp(rp));
 var firstlp=s.match(RegExp(lp));
if(start&&firstlp&&start.index<firstlp.index){
var re=s.slice(start.index+start[0].length);
var sofar=start.index+start[0].length;
	while(start&&firstlp&&start.index<firstlp.index){
	 startidx=matchpar(re,rp,lp)
	 if(startidx){
		//console.log("%s balanced arg of  %s ", re.slice(re.match(RegExp(rp)).index,startidx),s.match(RegExp(rp))[0]);
	 	re=re.slice(startidx);
	 	sofar=sofar+startidx;//+start.index+start[0].length;// lp rp can be <div ...> not only []
     	start=re.match(RegExp(rp)); 
		firstlp=re.match(RegExp(lp));
	 }else { start= false;}
	}
	result=re.match(RegExp(lp));
	if(result) {
		var resultindex= result.index+sofar+result[0].length;
		//console.log(" balanced  %s at %s", s.slice(s.match(RegExp(rp)).index,resultindex));
		return resultindex;
    }else { return false;}
 }else { return false;}
}

//-----------------------------------------------------------------------
function matchnargs(s,rp,lp,n){
	if(n==0){
		var cnt=new Map();
		cnt.set("args",new Array());
		cnt.set("end",0);
		return cnt;
	   }
	else {
		var one,rest;
 		var start=s.match(RegExp(rp));
	 	var end=matchpar(s,rp,lp)
		if(start && end){
		 one=s.slice(start.index,end);
		 rest=matchnargs(s.slice(end),rp,lp,n-1);
		 if(rest){
			 var tail=rest.get("args");
				tail.unshift(one);
				rest.set("args",tail);
				rest.set("end",rest.get("end")+end);
					return rest;}
		 else { return false;}
        }else { return false;}
	}
	}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
// pre/post processing making/unmaking some Latex keyword a mess that cannot be translated 
//-----------------------------------------------------------------------
function LatexHandle(dict) {
	//debugger;
	 globsto("Latexmerge",dict);
}
/*function test(){
	debugger;
	var dict = {
			// this disctionary can contain as keys the Latex commands with the number of parametenumber of parameters 
			  "text":1,"frac":2,"dfrac":2
			};
	LatexHandle(dict);
console.log(
	deLatex("\\text{Hello world},\\text{\\frac{Number}{Divide}\\dfrac{\\text{Natural}}{Number}Hello world}"));
}
*/

//-----------------------------------------------------------------------
// true if no translation is needed for origText because is a Latex fragment
//  i.e. Latex commands (\something) plus non alphabetic characters 
//-----------------------------------------------------------------------
function fragmentLatex(origText){ 
	if(origText.startsWith("\"")&&origText.endsWith("\"")){return fragmentLatex(origText.slice(1,-1));};
	var dict = RT_globlod("Latexmerge");
	var noLatexcmds =origText.replace(RegExp('\\\\[^\\{|^\\s]*','g'),
		function(match){
			if(dict.has(match.slice(1))) {return "";} else{return match;}}
	);//  delete \something for a known command
	// when all the known Latex command are gone the rest must be non alphabetic
	if(noLatexcmds.match(RegExp('^[^a-zA-Z]*$'))){return true;}else{return false;}
}
//-----------------------------------------------------------------------
// true if no translation is needed for origText because is a valid Latex without
// alphabetic characters 
//-----------------------------------------------------------------------
function pureLatex(origText){ 
	//debugger
	if(origText.startsWith("\"")&&origText.endsWith("\"")){return pureLatex(origText.slice(1,-1));};
	if(origText.match(RegExp('^[^a-zA-Z]*$'))){return true;} // not a single letter must not translate
	var matchCmd =origText.match(RegExp('\\\\[^\\{|^\\s]*'));// \something
	if(!matchCmd) {return false;}
	var at=matchCmd.index;
  	var cmd = matchCmd[0].slice(1);
	var dict = RT_globlod("Latexmerge");
	if(!dict.has(cmd)) 
	 {return false; // in the prefix not a Latex command
	}else{
		var args=dict.get(cmd);
		var argsString=origText.slice(at+cmd.length+1);
		var param =matchnargs(argsString,"\\{","\\}",args)
		if(!param){
			debugger;
			alert("Cannot find "+args+" parameters for "+cmd+" in >"+origText+"<");
			return false;
		}
		var i;
		for (i = 0; i < args; i++){
			if(!pureLatex(param.get("args")[i].slice(1,-1))){return false;}
		}
		 return pureLatex(origText.slice(at+1+cmd.length+param.get("end")));
	}
}


function deLatex(origText){ 
	var matchCmd =origText.match(RegExp('\\\\[^\\{|^\\s]*'));// \something
	if(!matchCmd) {return divPlainText(origText);}
	var at=matchCmd.index;
  	var cmd = matchCmd[0].slice(1);
	var dict = RT_globlod("Latexmerge");
	if(!dict.has(cmd)) 
	 {return origText.slice(0,at+1+matchCmd[0].length)+deLatex(origText.slice(at+1+matchCmd[0].length+1)); // in the prefix not a Latex command
	}else{
		var args=dict.get(cmd);
		var argsString=origText.slice(at+cmd.length+1);
		var param =matchnargs(argsString,"\\{","\\}",args)
		if(!param){
			debugger;
			alert("Cannot find "+args+" parameters for "+cmd+" in >"+origText+"<");
			return origText;
		}
		var returnVal="<div class=\""+cmd+"\">"
		var i;
		for (i = 0; i < args; i++){
		 returnVal=returnVal+
		  "<div class=\""+cmd+"Arg"+(i+1).toString()+"\">"+
		    deLatex(param.get("args")[i].slice(1,-1))+ // tear off curly
		  "</div>";
		}
		returnVal=returnVal+"</div>"+deLatex(origText.slice(at+1+cmd.length+param.get("end")));
		if(at>0){
		  returnVal=divPlainText(origText.slice(0,at))+returnVal;
		}
		return returnVal;
	}
}

function divPlainText(t) {
		  return "<div class=\"noop\">"+t+"</div>";
}
//function deLatex(origText, cmd) {
//	var dict = RT_globlod("Latexmerge");
	//debugger;
//	var cmdlen = cmd.length;
//	if(!dict[cmd]) {return origText;}
//	var tuple=dict[cmd];
//	
//	return origText.replace(
//		RegExp('\\\\' + cmd + '\\{[^\\}]*\\}', 'g'),
//		function(match) {
			//debugger;
//			return  tuple[0] + (match.slice(2 + cmdlen, -1))+ tuple[2];
//		}
//	);
//}

function divDecodeArg(cmd,Dom) {
	//debugger;
	return divDecode(Dom.childNodes[0]);
}
function LeafDecode(Leaf) {
	return Leaf.textContent;
}
function docDecode(Doc) {
var i;
var args=Doc.childNodes;
var result ="";
	for (i = 0; i < args.length; i++){
		result=result+divDecode(args[i]);
	}
return result;
}
function divDecode(Dom) {
	var result="";
	var cmd=Dom.className;
	var args=Dom.childNodes;
		if(cmd==="latex"){return divDecode(args[0]);
		} else { 
		if(cmd==="noop"){return LeafDecode(args[0]);
		} else { 
			var dict = RT_globlod("Latexmerge");
			if(!dict[cmd]) {return Dom.outerHTML;}
			var argsno=dict[cmd];
			if(argsno==0){return "\\"+cmd;}
			result="\\"+cmd+"{";
			var i;
			for (i = 0; i < argsno; i++){
				result=result+divDecodeArg(cmd,args[i]);
			}
			result=result+"}";
			return result; }
		}		
}

function inLatex(translated) {
	//var hashcmd = RT_globlod("hash") + cmd;
		// for debugging
	//debugger;
		var doc = new DOMParser().parseFromString(
		 "<div class=\"latex\">"+translated+"</div>", "text/xml");
		var latexcode=docDecode(doc);
		return latexcode;//.slice(7,-1);//\latex{ } cut
//	var dict = RT_globlod("Latexmerge");
//	if(!dict[cmd]) {return translated;}
//	var tuple=dict[cmd];
//	translated = translated.replace(
//			RegExp(tuple[1]+".*?"+tuple[3],'g'),
//				function(match) {
//					var res;
//					//debugger;
//					res=match.replace(RegExp("^"+tuple[1]),"\\"+cmd+"{");
//					return  res.replace(RegExp(tuple[3]+"$"),"}");
//				}
//			);
//	return translated;
}

//-----------------------------------------------------------------------
//  translation access for Latex code
//-----------------------------------------------------------------------
function LatexTranslate(w,id,origText, origLang, targetLang) {
	// we assume that in Latex code the only thing to translate is within \text
	//debugger;
	// -------------------------------- old version
	//return origText.replace(
	//	RegExp('\\\\text\\{[^\\}]*\\}', 'g'),
	//	function(match) {
	//		return "\\text{" + strTrans(w,id,match.slice(6, -1), origLang, targetLang) + "}";
	//	}
	//);
	// -------------------------------- new version
				var translin = deLatex(origText);
				var translated = strTrans(w,id,translin, origLang, targetLang);
				return inLatex(translated);
}

//-----------------------------------------------------------------------
//  translation access for Geogebra textual commands
//-----------------------------------------------------------------------
//function cmdTrans(w,id,command, origLang, targetLang) {
	// In commands things to translate are sought in "strings". 
	// inlined commands between the + + are left unchanged but still in
	// + somecmd("somestring") * "somestring" is translated.
	// If in a string there is a  "\text{ sone text}" only "some textann" in
	// "\text{ sone text1} \boo \text{ sone text2} \bu \text{ sone text3}" are
	// translated 
	// otherwise "string" is passed for translation
	//debugger;
//	var i=0;
//	return command.replace(
		//return LatexTranslate(command, origLang, targetLang).replace(
//		RegExp('"[^"]*"', 'g'),
//		function(matchstr) {
//			i++;
//			if (isInDictionary(matchstr)){ return matchstr; }
			//--- old version
			//var matchtext = matchstr.match(RegExp('\\\\text\\{[^\\}]*\\}', 'g'));
			//if (matchtext) {
			//	return LatexTranslate(w,id+"REV"+i.toString(),matchstr, origLang, targetLang);
			//} else {
//				var translin = deLatex(matchstr);
//				var reference =id+"REF"+i.toString
//				var translated = strTrans(w,reference,translin, origLang, targetLang);
//				var returnString= inLatex(translated);
				//return strTrans(matchstr, origLang, targetLang);
			//}
//			return dereferenceStr(reference,returnString,targetLang);
//		}
//	);
//}

//-----------------------------------------------------------------------
//HTTP  translation wrapper  i.e. preprocessing +  HTTP call + postprocessing
//-----------------------------------------------------------------------
// returns translated string 
function tr(w,objName, objType, origLang, targetLang) {
	//debugger;
	//var firstTime = RT_globlod("firstTime");
	var id=translName(objName, targetLang);
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
					if (isInDictionary(origText)){ return origText; }
					var translin = deLatex(origText);
					var translated = strTrans(w,id,translin, origLang, targetLang);
					return inLatex(translated,origText);
					// a bare string no command no latex definition. Actually one can see \text in it, too.
				} else {
					//old version ------------------- now commands are flat no string in it
					//if (!isTranslatedCmd(objName, origLang)) {
					//objType==="text"&&(!simpleText(objName))
					command = getformula(objName);
					//} else {
					//	command = getStoredFormulaTranslation(translName(objName, origLang));
					//}
					//command = command.replace(/(\n)/gm, "\\\\n");
					//command = command.replace(/\s+/g, ' '); // sometimes not .trim(); // one space is enough in any occasion
					//if (isInDictionary(command)){ return command; }
					// the string is a  command just translate the strings in it 
					//command = cmdTrans(w,id,command, origLang, targetLang);
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
					return "$$" + LatexTranslate(w,id,origText.slice(2, -2), origLang, targetLang) + "$$";
				}
				if (origText.startsWith("$")) {
					return "$" + LatexTranslate(w,id,origText.slice(1, -1), origLang, targetLang) + "$";
				}
				// some special placeholders %c %v %n %d %f %x %y %z	
				//debugger;
				origText = hashtr(origText, ["%d", "%c", "%v", "%n", "%f", "%x", "%y", "%z"]);
				origText = strTrans(w,id,origText, origLang, targetLang);
				// Google translate turns %d into % d inserting a space
				//origText = origText.replace(
				//	RegExp(RT_globlod("hash") + '% [dcvnfxyz]', 'g'),
				//	function(match) {
				//		return match.replace(" ", "");
				//	}
				//);
				origText = unhashtr(origText, ["%d", "%c", "%v", "%n", "%f", "%x", "%y", "%z"]);
				return origText;
			}
	}
}

//-----------------------------------------------------------------------
// postprocessing blanks
//-----------------------------------------------------------------------

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




//-----------------------------------------------------------------------
// HTTP  access to Google Translate Service takes a string returns a string
//-----------------------------------------------------------------------


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyTimeout() {
	await sleep(RT_globlod("httpTimeout"));
}
//-----------------------------------------------------------------------
// HTTP  access to IBM Watson takes a string returns a string
//-----------------------------------------------------------------------
function getAPIKeyV2(apikey){
  if(globExists("Watsonkey")){ return RT_globlod("Watsonkey");}
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open("POST", "https://iam.bluemix.net/identity/token",false)
  xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlRequest.setRequestHeader("Accept", "application/json");
  xmlRequest.onreadystatechange = function(){
         if(!(xmlRequest.readyState ==4 && xmlRequest.status==200)) {
             alert("Failed to get Watson APIKeyV2: "+xmlRequest.responseText);
         }
     }
  xmlRequest.send(encodeURI("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey="+apikey));
  var parsedData = JSON.parse(xmlRequest.responseText)
  var key = (parsedData.access_token);
  globsto("Watsonkey",key);
  return key;
}

function escapeJSON(text){ 	
return text.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
}
//-----------------------------------------------------------------------
function translateWithWatson(w,text,sl,tl){ 	
	//debugger;
	var xhr = new XMLHttpRequest();
	var returnString="";
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				//debugger;
				returnString= JSON.parse(this.responseText)["translations"][0]["translation"];
				console.log(returnString);
			}
		}
	);
	var url = "https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/d4a372ed-576e-4519-9edc-a90c71e09ef9";
	url=url+"/v3/translate?version=2018-05-01";
	parseoutput=
		function parseout(xhrresponseText){
			return JSON.parse(xhrresponseText)["translations"][0]["translation"];
		};
		var dataText= new Map();
		dataText["source"]=sl;
		dataText["target"]=tl;
		dataText["text"]=[text];
		var data = JSON.stringify(dataText);
		var accesstoken = getAPIKeyV2("R6AKlUIsnvSoOrp6XU9V0EwnTy750QmxWBR8ZiFk3ckB");
		xhr.open('POST', url, false);
		xhr.setRequestHeader("Authorization", "Bearer "+ accesstoken);
		xhr.setRequestHeader("Content-Type","application/json");
        xhr.setRequestHeader("Accept", "application/json");
		var returnString=translateWithHttp(xhr,data,parseoutput);
	logmessage(">"+text+">-->"+returnString+"<");
	return returnString ;
	}
//-----------------------------------------------------------------------
// HTTP  access to Google Translate with registered key from RapidAPI takes a string returns a string
//-----------------------------------------------------------------------
function translateWithGoogleKey(text,sl,tl){ 	
	//debugger;
	var xhr = new XMLHttpRequest();
	var returnString="";
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				//debugger;
				returnString= JSON.parse(this.responseText)["data"]["translations"][0]["translatedText"];
				//returnString= JSON.parse(this.responseText)[0]["translations"][0]["text"];
				console.log(returnString);
			}
		}
	);
	var url ="https://google-translate1.p.rapidapi.com/language/translate/v2";
	parseoutput=
		function parseout(xhrresponseText){
			return JSON.parse(xhrresponseText)["data"]["translations"][0]["translatedText"];
		};
		data = "q="+encodeURIComponent(text)+"&source="+sl+"&target="+tl;
		xhr.open('POST', url, false);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("accept-encoding", "application/gzip");
		xhr.setRequestHeader("x-rapidapi-key", "ac7ee526a1msh4c43d1c6aa2d3efp1588d7jsn69f94d0b76a2");
		xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
		var returnString=translateWithHttp(xhr,data,parseoutput);
		//xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to=en&api-version=3.0&profanityAction=NoAction&textType=plain");
		//xhr.send(data);
	logmessage(">"+text+">-->"+returnString+"<");
	return returnString ;
	}

//-----------------------------------------------------------------------
// HTTP  access to Microsoft Translate with registered key from RapidApi takes a string returns a string
//-----------------------------------------------------------------------
function translateWithMicrosoft(text,sl,tl){ 	
	//debugger;
	var xhr = new XMLHttpRequest();
	var returnString="";
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
			if (this.readyState === this.DONE) {
				//debugger;
				returnString= JSON.parse(this.responseText)[0]["translations"][0]["text"];
				console.log(returnString);
			}
		}
	);
	var url =
		"https://microsoft-translator-text.p.rapidapi.com/translate?to="+tl+"&api-version=3.0&from="+sl+"&profanityAction=NoAction&textType=plain"
	parseoutput=
		function parseout(xhrresponseText){
			return JSON.parse(xhrresponseText)[0]["translations"][0]["text"];
		};
		var data = JSON.stringify([
			{
				"Text":text 
			}
			])
		xhr.open('POST', url, false);
		xhr.setRequestHeader("content-type", "application/json");
		xhr.setRequestHeader("x-rapidapi-key", "ac7ee526a1msh4c43d1c6aa2d3efp1588d7jsn69f94d0b76a2");
		xhr.setRequestHeader("x-rapidapi-host", "microsoft-translator-text.p.rapidapi.com");
		var returnString=translateWithHttp(xhr,data,parseoutput);
		//xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to=en&api-version=3.0&profanityAction=NoAction&textType=plain");
		//xhr.send(data);
	logmessage(">"+text+">-->"+returnString+"<");
	return returnString ;
	}
//-----------------------------------------------------------------------
// HTTP  access to Google Translate no key, takes a string returns a string
//-----------------------------------------------------------------------
function translateWithGoogle(text,sl,tl){ 	
	//debugger;
	var xhr = new XMLHttpRequest();
	var url =
		'https://translate.googleapis.com/translate_a/single?client=gtx' + '&sl=' + sl + '&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text) + '&ie=UTF-8&oe=UTF-8';
	parseoutput=
		function parseout(xhrresponseText){
			var returnArray = JSON.parse(xhrresponseText)[0];
			var returnString ="";
			for (Item of returnArray) {
					returnString=returnString+Item[0];
				}
			return returnString;
		};
		xhr.open('GET', url, false);
		var returnString=translateWithHttp(xhr,null,parseoutput);
	logmessage(">"+text+">-->"+returnString+"<");
	return returnString ;
	}
//-----------------------------------------------------------------------
// HTTP  access to translation 
//-----------------------------------------------------------------------
function translateWithHttp(xhr,data,parseoutput){ 	
	var returnString = "";
	var skip = false;
	//var xhr = new XMLHttpRequest();
	// Setup our listener to process completed requests
	xhr.ontimeout = function() {
		alert("Increase ZZVARhttpTimeout Timeout status:" + xhr.status.toString() + " ready state:" + xhr.readyState.toString() + " response text:" + xhr.responseText + " response:" + xhr.response);
		skip = true;
	};
	xhr.onload = function() {
		//debugger;
		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			if (xhr.readyState == 4) {
				// Runs when the request is successful
				//alert("Response OK:"+xhr.status.toString()+":"+xhr.readyState.toString()+":"+xhr.responseText+":"+xhr.response);
				//return xhr.responseText[0][0][0];
				returnString=parseoutput(xhr.response);
				//var returnArray = JSON.parse(xhr.responseText)[0];
				//returnString =""
				//for (Item of returnArray) {
				//	returnString=returnString+Item[0];
				//}
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
	//var url =
	//	'https://translate.googleapis.com/translate_a/single?client=gtx' + '&sl=' + sl + '&tl=' + tl + '&dt=t&q=' + encodeURIComponent(text) + '&ie=UTF-8&oe=UTF-8';
	//xhr.open(method, url, false);
	//xhr.timeout=RT_globlod("httpTimeout")-10; no for async
	//xhr.responseType=""; // "json" no for async
	xhr.send(data); // we ask for a translation and wait for it for httpTimeout-10 ms. If Google translate fail to reply some alert is given
	// if timeout occurs the translation is empty and it will be attempted next time you press this language button.
	while (!skip) {
		applyTimeout();
	}
	returnString=parseoutput(xhr.responseText);
	//var returnArray = JSON.parse(xhr.responseText)[0];
	//returnString =""
	//for (Item of returnArray) {
		//returnString=returnString+Item[0];
	//}
	//logmessage(">"+text+">-->"+returnString+"<");
	return returnString;
}
function strTrans(w,id,text, sl, tl){ 
	//debugger;

	if (text === "" || text === '"'||text==="<div class=\"noop\">\"\"</div>") {
		return text;
	}
	if (text.match(RegExp('^>..$', 'g'))) {// the two letter string for the language button must not translate 
		return text;
	}
	if (text.startsWith('"') && text.endsWith('"')) {
		return '"' + strTrans(w,id,text.slice(1, -1), sl, tl) + '"';
	}
	//var returnString= translateWithGoogleKey(text,sl,tl);
	//var returnString= translateWithGoogle(text,sl,tl);
	//var returnString= translateWithMicrosoft(text,sl,tl);
	var returnText="";
	if (sl == tl){ 
				returnText=text;
	} else {
		if (isInDictionary(text)){ return text; }
		var returnString= translateWithWatson(w,text,sl,tl);
		returnString = filterBlanks(text, returnString);
		returnString = filterFalsePair(sl,tl,text,returnString);
		returnText= returnString;
	}
	if(RT_globlod("htmlwrite")){
		debugger;
		var newDiv = w.document.createElement("div");
		newDiv.id=id;
		// turn the text to HTML
		//var doc = new DOMParser().parseFromString(text,"text/html"); //ex text/xml
  		/* that other ? 
		var newContent = w.document.createTextNode(text);
  		newDiv.appendChild(newContent);
		*/
		newDiv.innerHTML=text;
  		w.document.body.append(newDiv);
		var newline = document.createElement('BR');
  		w.document.body.append(newline);
		logmessage(">"+newDiv.outerHTML+">-->"+returnText+"<");
	}
	if(RT_globlod("htmlread")){ }
		debugger;
		return returnText; 
	}
//-----------------------------------------------------------------------
// HTTP  access to Google Translate Service takes a string returns a string
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// some spaces are lost when storing commands adding \text
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
function usingStrings(translation) {
	return translation.match(RegExp('"[^"]*"', 'g'));
}

function isLatex(translation) {
	//globsto("latexcmds","frac|dfrac|right|left|phantom|ovalbox");
	//globsto("simplelatexcmds","br|cr|times"); they do not need curly
	return translation.match(RegExp("\\\\["+RT_globlod("latexcmds")+"]\\s*{"))||
		translation.match(RegExp("\\\\["+RT_globlod("simplelatexcmds")+"]"));;
}

//-----------------------------------------------------------------------
// Geogebra preprocessing. Parenthesis cause error in string entering
// TODO try to use JSON encoding in more contexts
//-----------------------------------------------------------------------
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
//-----------------------------------------------------------------------
// Geogebra do not visualize strings correctly, adding \text is sometimes necessary
//-----------------------------------------------------------------------

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
//-----------------------------------------------------------------------
//store/ load an existing  translation for this object
//-----------------------------------------------------------------------
function copyFreeObject(objName, tostringName) {
	var storecmd = tostringName + " = CopyFreeObject(" + objName + ")";
	ggbApplet.evalCommand(storecmd);
}

function stostring(objName, tostringName, translation,protectspaces) {
	//debugger;
	translation = translation.replace(/(\n)/gm, "\\\\n");
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
			if(protectspaces){
				translation = 
					protectSpacesInCommands(objName, translation);
			}
			// another Geogebra good idea
			if (!simpleText(objName)) {
				storecmdprefix = "";
				storecmdsuffix = "";
				//translation = "Text(" + translation + ")";
				var storestring = storecmdprefix + translation + storecmdsuffix+"+\"\"";
				ggbApplet.setTextValue(tostringName, storestring);
			}
			break;
		default:
	}
	storecmd = tostringName + " = " + storecmdprefix + translation + storecmdsuffix;
	// set the parenthesis to UnicodeToLetter(40)
	ggbApplet.evalCommand(storecmd);
	hideObject(tostringName);
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
//			return;
//		} // leave aux objects
//		if (isGlob(objName)) {
//			return;
//		} // leave aux objects
//		stostring(objName, RT_globlod("origLang"), tr(objName, objType, RT_globlod("origLang"), RT_globlod("origLang")));
//		stotrans(objName, (translName(objName, RT_globlod("origLang"))));
//		return;
//	}
//}

//-----------------------------------------------------------------------
// load a translation if not existing create one or update part of  it
//-----------------------------------------------------------------------



function TransObject(w,objName) {
	//debugger;
   if (transIt(objName)) {
	var lang = RT_globlod("targetLang");
	var origLang = RT_globlod("origLang");
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
	} else if (isTranslated(objName, origLang)||origLang==lang) {
		// we need to translate this object into lang
		// or we do not have a translation neither in lang nor in 
		// origLang and therefore we assume that what is in is 
		// to be taken as best original and be translated. 
		// In tr(..) below we  fetch the original stringa in origLang
		//origText = translation(objName, origLang);
		// translate it and store it for lang 
		stostring(objName,translName(objName, lang) , tr(w,objName, objType, origLang, lang));
		// set the current value to that language
		stotrans(objName, (translName(objName, lang)));
	} else {
		return true;
	}
  }
}

//function loadOrigLang() {
//	var all = ggbApplet.getAllObjectNames();
	//firstTime = RT_globlod("firstTime");
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
	//startAdv("Translated",1,alltr.length)
	var w =startTransDoc()
	for (name of alltr) {
		TransObject(w,name);
		//updAdv("Translated");
	}
}
//-----------------------------------------------------------------------
// postprocessing Correct known trimmed characters
//-----------------------------------------------------------------------
function updateTrimmedSch(UpdArr) {
	//debugger;
	var dictStr = "";
	if (globExists("TrimmedSch")) {
		dictStr = RT_globlod("TrimmedSch");
	}
	var addSet = new Set(UpdArr);
	globsto("TrimmedSch", gSet(union(sSet(dictStr), addSet)));
}

function TrimmedSch() {
	return sSet(RT_globlod("TrimmedSch"));
}
//-----------------------------------------------------------------------
// postprocessing Correct known introduce blanks 
//-----------------------------------------------------------------------

function updateBlankPattern(UpdArr) {
	//debugger;
	var dictStr = "";
	if (globExists("BlankPattern")) {
		dictStr = RT_globlod("BlankPattern");
	}
	var addSet = new Set(UpdArr);
	globsto("BlankPattern", gSet(union(sSet(dictStr), addSet)));
}

function blankPattern() {
	return sSet(RT_globlod("BlankPattern"));
}

//-----------------------------------------------------------------------
//postprocessing  Correct known false translations
//-----------------------------------------------------------------------
function unstringfyTripleSet(S) {
	// turns a set of strings into an array  of triples 
	var stringifiedTriples = [];
	for (let Triple of S) {
		stringifiedTriples.push(Triple.split("�"));
	}
	return stringifiedTriples;
}

function stringfyTripleSet(S) {
	// turns an array  of triples into a set of strings
	var stringifiedTriples = [];
	for (let Triple of S) {
		stringifiedTriples.push(Triple.join("�"));
	}
	return new Set(stringifiedTriples);
}

function updateFalsePair(LangFrom,LangTo,UpdTriples) {
	//debugger;
	var addSet = stringfyTripleSet(UpdTriples);
	var Triples = "";
	var globName = LangFrom+LangTo+"falsepair";
	if (globExists(globName)) {
		Triples = RT_globlod(globName);
	}
	globsto(globName, gSet(union(sSet(Triples), addSet)));
}

function falsePairList(langIn,langOut){ 
	var globName = langIn+langOut+"falsepair"
	return unstringfyTripleSet(sSet(RT_globlod(globName)));
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



//-----------------------------------------------------------------------
// set up the machinery for translation and translate
//-----------------------------------------------------------------------
function ClickggbOnInit() {
    if(globExists("Watsonkey")){ globdel("Watsonkey");}
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
	var languages;
	 if(globExists("LANGUAGES_{1}"))  {languages=RT_globlod("LANGUAGES_{1}").replaceAll(" ","").split(',');}
	 if(globExists("LANGUAGES"))  {languages=RT_globlod("LANGUAGES").replaceAll(" ","").split(',');}
	// put the list of languages, the first is the original.
	globsto("htmlwrite",true);
	globsto("htmlread",false);
	TranslationSetUp(languages) //(["fr","it"])
}
function TranslationSetUp(Languages) {
	//var firstTime = true;
	//if (globExists("firstTime")) {
	//	firstTime = RT_globlod("firstTime");
	//}	
	//globsto("firstTime", firstTime);
	//if(!firstTime) {
	//		linkLangButtons(Languages);
	//			return;
	//}
	init();
	//debugger;
	//globsto("logname", "Log");
	// prefix for added translation related Text items
	globsto("magic", "ZZ000");
	//globsto("hash", "ZWXY");
	//list here strings for whick a faulty translation is known. Be specific.
	//no � or , in these strings
	updateFalsePair("fr","en",[["Juste","Fair","Correct"],
		["Dernier exercice","Last year","Last Exercise"],
		["forme ®\\)","® form\\)","form ®\\)"]
		]);
	updateFalsePair("fr","it",[["Donner","Fornisce","Dare"],
		["Nouvel �nonc�","Nuova dichiarazione","Nuova operazione"],
		["Score","Punto","Punteggio"],
		["Dernier exercice","L'anno scorso","Ultimo esercizio"],
		["Le plan","L'aereo","Il piano"]]);
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
	//flatten();
	var logwin=startLogging();
	for (l of Languages) {
		logmessage("Translating into "+l+". Dialog with online translator follows.");
		logmessage("Tags > , >--> and  < are delimiters for exchanged strings  ...");
		loadtrans(l);RegButtonHandl(l);
		logmessage("Translation into "+l+ " completed.") 
	}
	endLogging(logwin);
}
//Add clicktrigger("xx") to the onclick code for button to translate to "xx"
//function OrigButtonHandl() {
//	var origlang =RT_globlod("origLang")
//	loadtrans(origlang);
//}

//-----------------------------------------------------------------------
//  Advancemet as a caption in a button
//-----------------------------------------------------------------------
function updAdv(name){ 
	var advbutton ="ZZVAR"+name;
	var len=RT_globlod(advbutton+"len");
	var cur=RT_globlod(advbutton+"cur");
	 if(cur+1>=len){ 
		if(ggbApplet.exists(advbutton)){ggbApplet.deleteObject(advbutton);}	
		return;
	}
	
	
	globsto(advbutton+"cur",cur+1);
	ggbApplet.setCaption(advbutton,((cur+1)*100/len).toFixed(0) + '%');
}

function startAdv(name,start,end) {
	var advbutton ="ZZVAR"+name;
	globsto(advbutton+"len",end-start+1);
	globsto(advbutton+"cur",start);
	createButton(advbutton,"0%");
}
//-----------------------------------------------------------------------
// minimal core for multilanguage version must contain this
//-----------------------------------------------------------------------
// buttons to switch languages
//-----------------------------------------------------------------------
function RegButtons(){
	var alltr = ggbApplet.getAllObjectNames();
	for (obj of alltr) {
		if( isLangButton(obj))  { ggbApplet.registerObjectClickListener(obj, "button2handl");}
	}
}
function deRegButtonHandl(lang) {
	deleteButton(langbutton(lang));
	ggbApplet.unregisterObjectClickListener(langbutton(lang), "button2handl");
}
function RegButtonHandl(lang) {
	createButton(langbutton(lang),">"+lang);
	ggbApplet.registerObjectClickListener(langbutton(lang), "button2handl");
}
function langbutton(l) {
	return translName("ButtonSelection", l);
}
function isLangButton(objName) {
	return isTranslation(objName) &&
	 objName==translName("ButtonSelection",getLangFromName(objName));
}
function buttonToLang(b) {
	return getLangFromName(b);
}
function linkLangButtons(Languages) {
	for (l of Languages ){
		ggbApplet.registerObjectClickListener(langbutton(l), "button2handl");
	}
}
function button2handl(newlangbutton){
	//debugger;
	var l =buttonToLang(newlangbutton)
	loadtrans(l);
	// this is the language in use
	if(globExists("currentLanguage")){
		ggbApplet.setColor(langbutton(RT_globlod("currentLanguage")),0, 0, 0)
		}
			ggbApplet.setColor(newlangbutton,255, 0, 0);
		globsto("currentLanguage",l);
}
//----------------------------------------------------------------------
// Delete all elements for the current language
//-----------------------------------------------------------------------
function delCurrentLang(){
	var alltr = ggbApplet.getAllObjectNames();
	var currentLang =	RT_globlod("currentLanguage")
	if (!confirm("Are you sure you want to delete support for language <"+l+">")) {return ; };
	for (obj of alltr) {
		if(getLangFromName(obj) ==currentLang)  { ggbApplet.deleteObject(obj);}
	}
}
//----------------------------------------------------------------------

function startTransDoc() {
	var style = "top=10, left=10, width=400, height=250, status=no, menubar=yes, toolbar=yes scrollbars=yes";
	var w = window.open("", "",style);
	w.document.write("<html>\n");
	w.document.write(" <head>\n");
	w.document.write(" <title>Translation" + "</title>\n");
	w.document.write(" </head>\n");
	w.document.write("<body>\n")
	w.document.write("</body>\n");
	w.document.write("</html>\n");
	return w;
}

//-----------------------------------------------------------------------
// known languages set
//-----------------------------------------------------------------------


//----------------------------------------------------------------------

