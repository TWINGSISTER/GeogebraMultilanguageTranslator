/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//-----------------------------------------------------------------------
//a layer for global persistent  variables in a ggb document
// they all use a Text Geogebra object whose name starts with ZZVAR
// if you introduce variable Foo you will creaate an hiddend auxiliary 
// text object named ZZVARFoo or ZZVARFooJSON
//If the stored object is non trivial JSON encoding is used 
// in this case the used Text object ends with JSON
// If you want to control more closely the name of the TEXT ggb object used 
//  i.e. do not have the ZZVAR prefix use the functions lod and sto. 
// Thes two will introduce the "JSON" suffix for JSONed values.  
//-----------------------------------------------------------------------
function RT_hideObject(name) {
	ggbApplet.setVisible(name, false);
	ggbApplet.setAuxiliary(name, true );
}

function base64EncodeUnicode(str) {
    // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters, 
    // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
    utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
    });

    return btoa(utf8Bytes);
}

function RT_base64DecodeUnicode(str) {
    // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
    percentEncodedStr = atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
return decodeURIComponent(percentEncodedStr);
}

function noCommandStringify(value) {
	if(value instanceof Set){
			return  "ZZSET"+base64EncodeUnicode(JSON.stringify(Array.from(value.keys())));
	}
	if(value instanceof Map){
			return  "ZZMAP"+base64EncodeUnicode(JSON.stringify(Array.from(value.entries())));
	}
	return base64EncodeUnicode(JSON.stringify(value));
}
function RT_unCommandStringify(str) {
	if(str.startsWith("ZZMAP")){
			return new Map(JSON.parse(RT_base64DecodeUnicode(str.slice(5))));
	}
	if(str.startsWith("ZZSET")){
			return new Set(JSON.parse(RT_base64DecodeUnicode(str.slice(5))));
	}
			return JSON.parse(RT_base64DecodeUnicode(str));
}
//// sto("a","xxx") create a Geogebra hidden object "a" and store "xxx" 
function RT_sto(name, value) {
	switch (typeof value) {
		case 'string':
			ggbApplet.evalCommand(name + "=" + "\"" + value + "\"");
			RT_hideObject(name);
			break;
		case 'boolean':
		case 'number':
			ggbApplet.evalCommand(name + "=" + value.toString());
			RT_hideObject(name);
			break;
		case 'undefined':
		default:
			//if(value instanceof Set){
			// ggbApplet.evalCommand(name+"SJSON" + "=" + "\"" +setStringify(value) + "\"");
		    //RT_hideObject(name+"SJSON");
			//}else{
			 ggbApplet.evalCommand(name+"JSON" + "=" + "\"" +noCommandStringify(value) + "\"");
		    RT_hideObject(name+"JSON");
			//}
	}
}
// returns the GeoGebra value string that must be translated in object name, 
// or a scalar value if any
function RT_lod(name) {
	//if (ggbApplet.exists(name+"SJSON"))
	//  {var ret=ggbApplet.getValueString(name+"JSON" , false) + "";
	//	return RT_unCommandStringify(ret) ;}
	if (ggbApplet.exists(name+"JSON"))
	  {var ret=ggbApplet.getValueString(name+"JSON" , false) + "";
		return RT_unCommandStringify(ret) ;}
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

function loddel(name) {
	if (ggbApplet.exists(name+"JSON")) {ggbApplet.deleteObject(name+"JSON");return }
	if (ggbApplet.exists(name)) {ggbApplet.deleteObject(name);return }
}
// Global variables
function globdel(name) {
	loddel("ZZVAR" + name);
}

function RT_globlod(name) {
	return RT_lod("ZZVAR" + name);
}

function RT_globsto(name, value) {
	RT_sto("ZZVAR" + name, value);
}

function RT_globExists(objName) {
	return ggbApplet.exists("ZZVAR" + objName)||ggbApplet.exists("ZZVAR" + objName + "JSON");
}

function RT_isGlob(objName) {
	return objName.startsWith("ZZVAR");
}
function wipeGlobs() {
//-----------------------------------------------------------------------
// delete all text objects for global variables
//-----------------------------------------------------------------------
	var all = ggbApplet.getAllObjectNames();
	for (zzvarname of all) { if (RT_isGlob(zzvarname)) {loddel(zzvarname);} }
}
function packGlobs() {
//-----------------------------------------------------------------------
// returns a map with all global variables. 
//-----------------------------------------------------------------------
	var all = ggbApplet.getAllObjectNames();
	var pack = new Map();
	for (zzvarname of all) { if (RT_isGlob(zzvarname)) {pack.set(zzvarname,RT_lod(zzvarname));} }
	return pack;
}
function unpackGlobs(pack) {
//-----------------------------------------------------------------------
// add all the TEXT objects for the map in pack
//-----------------------------------------------------------------------
	for (const [zzvarname, value] of pack.entries()) {
		RT_sto(zzvarname, value) ;
	}
}
//-----------------------------------------------------------------------
// END of a layer for global persistent  variables in a ggb document
//-----------------------------------------------------------------------