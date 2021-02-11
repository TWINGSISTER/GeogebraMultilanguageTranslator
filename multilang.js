//-----------------------------------------------------------------------
// serialize Geogebra objects 
//-----------------------------------------------------------------------

function serialize(obj) {
	//debugger;
	var content = ggbApplet.getXML(obj);
	return sto(obj,base64EncodeUnicode(content)); 
	}

function deserialize(obj) {
	var content=base64DecodeUnicode(lod(obj));
	ggbApplet.evalXML(content );
	}
//-----------------------------------------------------------------------
//a layer for global persistent  variables in a ggb document
// they all use a Text Geogebra object whose name starts with ZZVAR
// if you introduce variable Foo you will creaate an hiddend auxiliary 
// text object named ZZVARFoo or ZZVARFooJSON
//If the stored object is non trivial JSON encoding is used 
// in this case the used Text object ends with JSON
//-----------------------------------------------------------------------
function hideObject(name) {
    ggbApplet.setVisible(name, false);
    ggbApplet.setAuxiliary(name, true);
}

function base64EncodeUnicode(str) {
    // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters, 
    // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
    var utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    });

    return btoa(utf8Bytes);
}

function base64DecodeUnicode(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
    var percentEncodedStr = atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    return decodeURIComponent(percentEncodedStr);
}

function noCommandStringify(value) {
    return base64EncodeUnicode(JSON.stringify(value));
}

function unCommandStringify(str) {
    return JSON.parse(base64DecodeUnicode(str));
}
//// sto("a","xxx") create a Geogebra hidden object "a" and store "xxx" 
function sto(name, value) {
    switch (typeof value) {
        case 'string':
            ggbApplet.evalCommand(name + "=" + "\"" + value + "\"");
            hideObject(name);
            break;
        case 'boolean':
        case 'number':
            ggbApplet.evalCommand(name + "=" + value.toString());
            hideObject(name);
            break;
        case 'undefined':
        default:
            ggbApplet.evalCommand(name + "JSON" + "=" + "\"" + noCommandStringify(value) + "\"");
            hideObject(name + "JSON");

    }
}
// returns the GeoGebra value string that must be translated in object name, 
// or a scalar value if any
function lod(name) {
    if (ggbApplet.exists(name + "JSON")) {
        var ret = ggbApplet.getValueString(name + "JSON", false) + "";
        return unCommandStringify(ret);
    }
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

function clearGlobs() {
 var alltr = ggbApplet.getAllObjectNames();
 var obj;
 for (i = 0; i < alltr.length; i++) {
     obj = alltr[i];
     if (isGlob(obj)) {
         ggbApplet.deleteObject(obj);
     }
 }
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

//-----------------------------------------------------------------------
// data structure to hold the translation
//-----------------------------------------------------------------------

function getLangFromName(objName) {
    if (!isTranslation(objName)) { return ""; }
	var start = globlod("magic").length;
    return objName.slice(start, start + 2);
}
// name the object that holds the translation
function translName(objName, lang) {
    return globlod("magic") + lang + objName;
}
// test if the named object is an auxiliary string for translation
function isTranslation(objName) {
    return objName.startsWith(globlod("magic"));
}

function isTranslated(objName, lang) {
    return ggbApplet.exists(translName(objName, lang)) &&
        translation(objName, lang) != "";
}

// get  a translation for this object
function translation(objName, lang) {
    return lod(translName(objName, lang));
}


function usingStrings(translation) {
    return translation.match(RegExp('"[^"]*"', 'g'));
}


//-----------------------------------------------------------------------
// load a translation if not existing create one or update part of  it
//-----------------------------------------------------------------------

function TransObject(objName) {
    //debugger;
    if (transIt(objName)) {
        var lang = globlod("targetLang");
        if (isTranslation(objName)) {
            return;
        } // leave aux objects
        if (isGlob(objName)) {
            return;
        } // leave aux objects
        if (isTranslated(objName, lang)) {
            stotrans(objName, (translName(objName, lang)));
        }
    }
}

function loadtrans(lang) {
    //debugger;
    var alltr = ggbApplet.getAllObjectNames();
    globsto("targetLang", lang);
    //startAdv("Translated",1,alltr.length)
    var name;
    for (i = 0; i < alltr.length; i++) {
        name = alltr[i];
        TransObject(name);
        //updAdv("Translated");
    }
}



//-----------------------------------------------------------------------
// minimal core for multilanguage version must contain this
//-----------------------------------------------------------------------
// buttons to switch languages
//-----------------------------------------------------------------------

function langbutton(l) {
    return translName("ButtonSelection", l);
}

function buttonToLang(b) {
    return getLangFromName(b);
}

function button2handl(newlangbutton) {
    //debugger;
    var l = buttonToLang(newlangbutton)
    loadtrans(l);
    // this is the language in use
    if (globExists("currentLanguage")) {
        ggbApplet.setColor(langbutton(globlod("currentLanguage")), 0, 0, 0)
    }
    ggbApplet.setColor(newlangbutton, 255, 0, 0);
    globsto("currentLanguage", l);
}

//----------------------------------------------------------------------
function deleteButton(name){
            ggbApplet.deleteObject(name);
}

function createButton(name,caption){
	// create button name with caption 
	var storecmd = name + " = Button(\"" + caption + "\")";
	ggbApplet.evalCommand(storecmd);
}
//----------------------------------------------------------------------
function deRegButtonHandl(lang) {
	deleteButton(langbutton(lang));
	ggbApplet.unregisterObjectClickListener(langbutton(lang), "button2handl");
}
function RegButtonHandl(lang) {
	createButton(langbutton(lang),">"+lang);
	ggbApplet.registerObjectClickListener(langbutton(lang), "button2handl");
}
//----------------------------------------------------------------------
// Deleting a variable foo  Geogebra deletes all objects that depends on foo 
// and clears all conditions involving foo.  This must be taken into account 
// when generating  a seed
//----------------------------------------------------------------------
function        encodeFormula(obj){ 
         var formula=getformula(obj);
         sto(obj,obj+globlod("magic")+base64EncodeUnicode(formula)); 
 }
function  decodeFormula(obj){ 
     var formula=lod(obj);
     var prefix =(obj+globlod("magic"));
     if (formula.startsWith(prefix)) {
         formula=base64DecodeUnicode(formula.slice(prefix.length)); 
         var storecmd = obj + " = " + "FormulaText(" + formula + ",false)";
         ggbApplet.evalCommand(storecmd);
     }
 }
function seedCurrentLang(){ 
	// turns your construction into a see, then you can save your document and read it back 
	// by inserting the construction
	debugger;
 var alltr = ggbApplet.getAllObjectNames();
 var currentLang = globlod("currentLanguage")
 if (!confirm("Extracting translation for <"+currentLang+">. All other data will be lost. Are you sure?" )) {
     return;
 }
 var obj;
 for (i = 0; i < alltr.length; i++) {
     obj = alltr[i];
     if (getLangFromName(obj)== currentLang) {
         if (!simpleText(obj)) { encodeFormula(obj); }
     }
 }
 for (i = 0; i < alltr.length; i++) {
     obj = alltr[i];
     if (getLangFromName(obj) != currentLang && !isGlob(obj)) {
         ggbApplet.deleteObject(obj);
     }
 }
 clearGlobs();
 alert("Before saving this seed please delete all  script code in Scripting>Global tab ")
}


//----------------------------------------------------------------------
function plantCurrentSeed() {
	//debugger;
	// plant a seed you red in by inserting a ggb seed.
	// If more then one seed awaiting for seeding it
	// randomly picks one
	//var allofitXML=ggbApplet.getXML();
	//var allofitJSON=ggbApplet.getFileJSON();
	//var macros = allofitJSON[2]["fileContent"]
	//( new window.DOMParser() ).parseFromString(allofitXML, "text/xml");
	//allofit=JSON.parse(macros);
 var alltr = ggbApplet.getAllObjectNames();
     var prefix=globlod("magic");
     var prefixlen=prefix.length;
     var obj;
     var objmatch;
    var    languagefound=false;
    var currentLang;
    var serial;
    var i;
 for (i = 0; i < alltr.length && !languagefound; i++) {
     obj = alltr[i];
     objmatch=obj.match(RegExp("^"+prefix+".*_\{[1-9]\}$"));
     if (objmatch&& !languagefound) {
    	 languagefound=true;
    	 currentLang=obj.slice(prefixlen,prefixlen+2);
    	 serial=objmatch[0].slice(-2,-1); 
    	 break;
      }
    }
 for (; i < alltr.length ; i++) {
     obj = alltr[i];
     var objrematch =obj.match(RegExp("^"+prefix+currentLang+".*_\{["+serial+"]\}$"));
     if (objrematch){ 
    	var zzobjtext=objrematch[0].slice(0,-4);
        ggbApplet.renameObject(obj,zzobjtext);
        decodeFormula(zzobjtext); 
  }
 }
ggbApplet.registerObjectClickListener(langbutton(currentLang), "button2handl");
// alert("Press multilangual button  to link the introduced language, then press a language button (>xy) before starting")
}


//----------------------------------------------------------------------
// Delete all elements for the current language
//-----------------------------------------------------------------------
function delCurrentLang() {
    var alltr = ggbApplet.getAllObjectNames();
    var currentLang = globlod("currentLanguage")
    if (!confirm("Are you sure you want to delete support for language <" + currentLang + ">")) {
        return;
    }
    var obj;
    for (i = 0; i < alltr.length; i++) {
        obj = alltr[i];
        if (getLangFromName(obj) == currentLang) {
            ggbApplet.deleteObject(obj);
        }
    }
}

function RegButtons() {
    var alltr = ggbApplet.getAllObjectNames();
    for (i = 0; i < alltr.length; i++) {
        obj = alltr[i];
        if (isLangButton(obj)) {
            ggbApplet.registerObjectClickListener(obj, "button2handl");
        }
    }
}

function isLangButton(objName) {
    return isTranslation(objName) &&
        objName == translName("ButtonSelection", getLangFromName(objName));
}


//-----------------------------------------------------------------------
function copyFreeObject(objName, tostringName) {
	var storecmd = tostringName + " = CopyFreeObject(" + objName + ")";
	ggbApplet.evalCommand(storecmd);
}
function copyDetailedObject(objName, tostringName) {
	var storeXML = 
		ggbApplet.getXML(objName).replaceAll(objName,tostringName);
	ggbApplet.evalXML(storeXML);
}
//-----------------------------------------------------------------------
function renameCurrent(copy) {
	// copy="copy" or "rename"
    var from=globlod("currentLanguage");
	var languages;
	 if(globExists("LANGUAGES_{1}"))  {languages=globlod("LANGUAGES_{1}").replaceAll(" ","").split(',');}
	 if(globExists("LANGUAGES"))  {languages=globlod("LANGUAGES").replaceAll(" ","").split(',');}
	 var to=languages[0]
     var prefix=globlod("magic");
    if (!confirm("Are you sure you want to "+copy+" language <" + from  + "> to <"+to+ ">")) {
        return;
    }
	 var alltr = ggbApplet.getAllObjectNames();
	 for (i = 0; i < alltr.length ; i++) {
		 obj = alltr[i];
		 var objmatch =obj.match(RegExp("^"+prefix+from+".*$"));
		 if (objmatch){ 
					 var zzobjtext=objmatch[0].replace(from,to);
			 	if (copy=="copy"){ copyDetailedObject(obj,zzobjtext); }
			 	else{ ggbApplet.renameObject(obj,zzobjtext); }
		}
	}
deRegButtonHandl(from) ;
RegButtonHandl(to) ;
}


//----------------------------------------------------------------------
