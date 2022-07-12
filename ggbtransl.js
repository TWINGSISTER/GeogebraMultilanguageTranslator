/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */

function RT_usingStrings(translation) {
	return translation.match(RegExp('"[^"]*"', 'g'));
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
	if (RT_usingStrings(translation)) {
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
	RT_EvalCmd(storecmd);
	ggbApplet.setLayer(tostringName,ggbApplet.getLayer(objName));
}

function stostring(objName, tostringName, translation,protectspaces) {
	//debugger;
	translation = translation.replace(/(\n)/gm, "\\\\n");
	var storecmdprefix = "\"";
	var storecmdsuffix = "\"";
	if (RT_usingStrings(translation)) {
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
	}//else translation=escapeUnicodes(translation,[60,62]);
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
			if (!RT_simpleText(objName)) {
				storecmdprefix = "";
				storecmdsuffix = "";
				//translation = "Text(" + translation + ")";
				var storestring = storecmdprefix + translation + storecmdsuffix+"+\"\"";
				ggbApplet.setTextValue(tostringName, storestring);
			}/*else if (RT_usingStrings(translation)) {
				storecmdprefix = "";
				storecmdsuffix = "";
				//translation = "Text(" + translation + ")";
			}*/
			break;
		default:
	}
	storecmd = tostringName + " = " + storecmdprefix + translation + storecmdsuffix;
	// set the parenthesis to UnicodeToLetter(40)
	RT_EvalCmd(storecmd);
	if(!(tostringName===objName)){
		RT_hideObject(tostringName);
		ggbApplet.setLayer(tostringName, 0);
		ggbApplet.setFixed(tostringName, true, false);
	}
	// auxiliary not to clutter the Algebra view ggbApplet.setAuxiliary(tostringName, true)
}

function RT_getformula(objName) {
	var definition = ggbApplet.getDefinitionString(objName) + "";
	var command = ggbApplet.getCommandString(objName, false) + "";
	if (definition.length != 0) {
		return definition;
	}
	if (command.length != 0) {
		return command;
	}
}


function dumptrans(title,html) {
	//if (html!=null) { alert("applying "+title); return ; }
	//debugger;
	var lang =title.slice(-2); // _EN.hmtl is what transaltor returns
	if (html!=null) { 
		//html=atob(html.replace("data:text/html;base64,",""));
		var parser = new DOMParser();
		var dom = parser.parseFromString(html, "text/html");
		dom=filterdom(dom,lang)
	}
	var alltr = ggbApplet.getAllObjectNames();
	var wd =startTransDoc(title)
	//RT_globsto("filterlang",lang);
	var origlang=(title.slice(-3,-2)==="-"); // the original file is -FR.html
	for (name of alltr) {
		dumpObject(wd,name,dom,lang,origlang);
	}
	return wd;
}

function startTransDoc(title) {
	//var style = "top=10, left=10, width=400, height=250, status=no, menubar=yes, toolbar=yes scrollbars=yes";
	//var w = window.open("", "",style);
	var parser = new DOMParser();
  	var document = parser.parseFromString("<html></html>\n", "text/html");
	//w.document.write("<html>\n");
	document.write(" <head>\n");
	document.write(" <title>"+title + "</title>\n");
	document.write("<meta charset=\"UTF-8\"/>");
	document.write(" </head>\n");
	document.write("<body>\n")
	document.write("</body>\n");
	//w.document.write("</html>\n");
	//return w;
	return document;
}
function isTranslatedCmd(objName, lang) {
	var objName = RT_translName(objName, lang)
	return ggbApplet.exists(objName) &&
		getStoredFormulaTranslation(objName,lang) != "";
}
function RT_isTranslated(objName, lang) {
	return ggbApplet.exists(RT_translName(objName, lang)) &&
		RT_translation(objName, lang) != "";
}
// get  a translation for this object
function RT_translation(objName, lang) {
	return RT_lod(RT_translName(objName, lang));
}

	// name the object that holds the translation
function RT_translName(objName, lang) {
	return RT_globlod("magic") + lang + objName;
}
function dumpObject(wd,objName,html,lang,origlang) {
	//debugger;
   if (RT_transIt(objName)) {
	var objType = ggbApplet.getObjectType(objName) + "";
	if (RT_isTranslation(objName)) {
			return;
	} // leave aux objects
	if (RT_isGlob(objName)) {
			return;
	} // leave aux objects
	if (html!=null && !RT_isTranslated(objName, lang)) { // if the translation is already in does nothing
		RT_globsto("externalTrans",false);
		// watch if the html is accessed or not to translate this...
		var payload=dumptr(wd,objName, objType, false, html)
		var origText= RT_lodtrans(objName);
		// nothing has changed and no access to the external translation
		// when applying the originaal language
		if ((!(payload===origText)||origlang) && RT_globlod("externalTrans")) { // if the translation is already in does nothing
			stostring(objName,RT_translName(objName, lang) ,payload );
  		}
  	} else { dumptr(wd,objName, objType,true,null);}// dry=false
  }
}

function dumptr(wd,objName, objType,dry,html) {
	var origText;
	origText = RT_lodtrans(objName);
	//debugger;
	//origText = origText.replace(/(\n)/gm, "<br>"); // prev "\\\\n"
	//origText = origText.replace(/(\\\\n)/gm, "<br>"); // prev "\\\\n" prev /(\n)/gm
	//origText = origText.replace(/\s+/g, ' '); // sometimes .trim(); // one space is enough in any occasion
	switch (objType) {
		case "text":
			{
				//debugger;
				if (RT_simpleText(objName)) { //(definition=="" && command=="")
					if (isNotToTranslate(origText)||fragmentLatex(origText)||
						isInDictionary(origText)||pureLatex(origText)){ return origText ; }
						var translin = deLatex(objName,origText,null,true,html);
						var translated = dumpstrTrans(wd,objName,translin,html);
						if (html==null) { return; } else  {
							 return deLatex(objName,origText,translated,false,html);}
				 } else  { return origText;}
			}
		default:
			{
				//debugger;
				// for all the others the problem is to translate a caption
				// captions can only be a string with some Latex code between $$ and 
				// we assume that in Latex code the only thing to translate is within \text
				if (origText.startsWith("$$")) {
					return "$$"+dumpLatexTranslate(wd,objName,origText.slice(2, -2),dry,html)+"$$";
				}
				if (origText.startsWith("$")) {
					return "$"+dumpLatexTranslate(wd,objName,origText.slice(1, -1),dry,html)+"$";
				}
				// some special placeholders %c %v %n %d %f %x %y %z	
				//debugger;
				//OrigText=htmlizeltgt(OrigText);
				var hashed = hashtr(objName,origText,html, ["%d", "%c", "%v", "%n", "%f", "%x", "%y", "%z"]);
				transl = dumpstrTrans(wd,objName,hashed,html);
				if (html==null) { return; } 
				else  { transl= unhashtr(objName,transl,html,
							["%d", "%c", "%v", "%n", "%f", "%x", "%y", "%z"]);
							//transl=dehtmlizeltgt(transl);
							return transl;
				}
			}
	}
}


//true if that object needs some form of translation
//modify with RT_lodtrans and stotrans
function RT_transIt(name) {
	//debugger;
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			// various conditions 
			// commands do not translate
			return (objType==="text"&&(!RT_simpleText(name)))||
			// meaningless do not translate
			(RT_lodtrans(name) != "");
		case "button":
		case "slider":
		case "checkbox":
		case "inputbox":
		case "textfield":
		case "point":
		case "complexnumber":
			return RT_lodtrans(name) != "";
		case "number":
		case "numeric":
			return false;
		case "undefined":
		default:
			return false;
	}
}
//test if the named object is an auxiliary string for translation
function RT_isTranslation(objName) {
	return objName.startsWith(RT_globlod("magic"));
}
//set the string that must be translated in object name, 
function RT_stotrans(name, transvar) {
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			var stringtr = RT_lod(transvar);
			if (!RT_usingStrings(RT_lod(transvar)) && RT_simpleText(name)) {
				ggbApplet.setTextValue(name, stringtr);
				break;
			}
			//attempted "FormulaText(\""+transvar or without extra quote ",false)" 
			//or false sometimes work but still stores
			//the transvar value at time of storing i.e. variables do not change.
			var storecmd = name + " = " + "FormulaText(" + transvar + ",false)";
			RT_EvalCmd(storecmd);
			break;
		default:
			ggbApplet.setCaption(name, RT_lod(transvar));
	}
}


// returns the string that must be translated in object name, 
function RT_lodtrans(name) {
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			if (!RT_simpleText(name)) {
				return RT_getformula(name);
			} else {
				return ggbApplet.getValueString(name, false) + "";
			}
		default:
			return ggbApplet.getCaption(name, false) + "";
	}
}

function RT_simpleText(objName) {
	var definition = ggbApplet.getDefinitionString(objName) + "";
	var command = ggbApplet.getCommandString(objName, false) + "";
	return ((command.length == 0) && (definition.length == 0));
}

	

function	applyTranslationToGGB(GGbs,Html){
	secureSection((globstatesave,cont)=>{
		translateAllGGB(globstatesave,GGbs,Html,cont);
		});
}
function	translateAllGGB(globstatesave,GGbs,Html,cont){
	//debugger;
	if (GGbs.length==0) {
		if (Html.length>0) {
		 	alert("Some translations not applied "+
	      	Html[0].name+
			"and "+Html.length.toString()+" others not used.")
		}
		cont();return;
	};
	var ggb=GGbs[0];
	var OtherGGbs=GGbs.slice(1);
	var rnd = RT_lod("VARCTRLRANDOM")
	var htmls=Html.filter(x => x.name.startsWith(ggb.name.slice(0,-4)));
	//alert("hello");debugger;
	htmls=htmls.sort(
		function(a,b)  {
			debugger;
			//alert(a.name.slice(-7, -5));
			//alert(b.name.slice(-7, -5));
			return (a.name.slice(-7, -5) > b.name.slice(-7, -5));} );
	var OtherHtmls=Html.filter(x => !(x.name.startsWith(ggb.name.slice(0,-4))));
	var langs=htmls.map(v => v.name.slice(-7, -5)).sort();//assume _EN.html
	langs=langs.join("-");
	//unpackGlobs(globstatesave);
	translateAGGB(globstatesave,ggb,htmls,langs,rnd,
		()=>translateAllGGB(globstatesave,OtherGGbs,OtherHtmls,cont));
}
function	translateAGGB(globstatesave,ggb,htmls,langs,rnd,cont){
	//alert("hello");
	//debugger;
	//debugger;
	//langs=langs.sort();
 readGGBBase64(ggb,(ggbtoprocess)=>{
	//debugger;
	ggbApplet.setBase64(ggbtoprocess,()=>{
		//debugger;
		RT_unpackGlobs(globstatesave);
		RT_globsto("freeview",RT_freeView());
		multiLanguageButton();
		applyTransl(htmls, ()=>{
			// delete all globs, stay as close as possible to original document.
			// translation ready to be saved to file.name.slice(0,-4)+"-FL.ggb"
			//injectTranslationCode();
			//injectTranslationCode(payload,(newpayload)=>{
			//debugger;
			var handle="innerGgbOnInit";
			var i=0;
			while(eval("typeof " + handle+i.toString())=== 'function'){i++;}
			ggbApplet.getBase64((payload)=>{
				//debugger;
			injectNeededCode(handle+i.toString()+"()",
				"function ggbOnInit(){RT_incore=false;"+handle+i.toString()+"();RT_initmulti();}",//RT_initrst(); lost
				["RT_"],ggb.name.slice(0,-4)+langs+".ggb",payload,cont)// (payload)=>{
			// Went in the Moodle plugin ctrlRandomize(rnd,(___payload)=>{
				//ggbApplet.getBase64((__payload)=>{
					//ggbApplet.getBase64((payload)=>{
				//debugger
					//ctrlRandomize(rnd,payload);
					//saveGGB(ggb.name.slice(0,-4)+langs+".ggb",payload,cont);
					});
				//});
			});
			//});
		});
	});
}//);
//}
function applyTransl(htmlTransl,cont){
	if (htmlTransl.length==0) {cont();return;}
	var html=htmlTransl[0];
	var Otherhtml=htmlTransl.slice(1);
	readFileHtml(html,"utf-8",(result)=>{
		var title =html.name.slice(0,-5);
		dumptrans(title,result);
		var lang =title.slice(-2);
		//alert(lang);
		addLanguageButton(lang);applyTransl(Otherhtml,cont);})
 }
function pairTranslationFiles(Selected){
	//debugger;
	var SelectedGGbs=Selected.filter(x => x.name.endsWith(".ggb"));
	var SelectedHtml=Selected.filter(x => x.name.endsWith(".html"));
		//selectFiles(true,".js,.xml",(Selected2)=>{
		//var SelectedJS=Selected2.filter(x => x.name.endsWith(".js"));
		//var SelectedXML=Selected2.filter(x => x.name.endsWith(".xml"));
		applyTranslationToGGB(SelectedGGbs,SelectedHtml);
	//});
 }
function clickToInstallTranslation(){
	 selectFiles(true,".ggb,.html",
		//(Selected)=>{selectFiles(true,".js,.xml",(S2)=>{pairTranslationFiles(Selected,S2)})}
		(Selected)=>{pairTranslationFiles(Selected)}
		)};