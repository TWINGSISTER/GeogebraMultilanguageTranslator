/**
 * http://usejsdoc.org/
 */
function getAllFunctions(prefix){ 
        var allfunctions=[];
          for ( var i in window) {
        if((typeof window[i]).toString()=="function"){
		if(prefix.some(pattern => window[i].name.startsWith(pattern))){
         //if(window[i].name.startsWith(prefix)){
            allfunctions.push(window[i].name);
           }
         }
       }
       return allfunctions;
    }
var filelister;

function getIfCalled(funs,code){ 
filelister=[];recgetIfCalled(funs,code);
return[].concat(filelister);
}
function recgetIfCalled(funs,code){ 
 let onefun= funs.find(element =>  {return code.includes(element);});
 if(onefun!==undefined) {
  	funs.splice(funs.indexOf(onefun), 1);
  	filelister.push(onefun);
  	recgetIfCalled(funs,code+' '+window[onefun].toString());
   }
// 	else return new Array();
}
function getAllNeededFunctions(prefix,code){ 
    return getIfCalled(getAllFunctions(prefix),code);
}
function getAllNeededCode(prefix,incode){ 
	var code="";
	var funs=getAllNeededFunctions(prefix,incode); 
	for ( let i in funs ) {
		code=code+" "+window[funs[i]].toString();
	}
	return code;
}
//-----------------------------------------------------------------------
function injectNeededCode(handle,ggboninit,prefixPatterns,fname,payload,cont){//(payload,cont)
//handle could be "innerGgbOnInit()"
	// what is presently ggbOnInit will be turned to innerGgbOnInit
//ggboninit could be "function ggbOnInit(){innerGgbOnInit();RT_initmulti();RT_initrst();}"
// prefixPatterns could be ["RT_"]
	//loadtostring([
	//"./sset.js",
	//"./Init.js",
	//"./dictionaryKnownTrans.js",
	//"./ggbTransFlatting.js",
	//"./ggbGlob.js",
	//"./ggbtransl.js",
	//"./FileIO.js",
	////"./Logger.js",
	//"./ggbLatex.js",
	//"./translhtml.js",
	//"./ggbtransl.js",
	//"./LanguageDisplay.js",
	//"./ggbUtils.js",
	//"./RT.js"
	//],
	//(JScode)=>{
		//debugger;
	var code = "";
	// CODE FOR GLOBAL VARIABLES
	var varlist=Object.getOwnPropertyNames(window).filter(item =>
	 (typeof window[item] != 'function' && 
		prefixPatterns.some(pattern => item.startsWith(pattern))	
	//item.startsWith(prefix)
		));
	for ( let i in varlist ) {
		code=code+"var "+varlist[i]+";"; //NO INIZIALIZATION IS POSSIBLE
	}
	
	var funclist=Object.getOwnPropertyNames(window).filter(item =>
	 (typeof window[item] === 'function' && 
		prefixPatterns.some(pattern => item.startsWith(pattern))	
	//item.startsWith(prefix)
		));

	for ( let i in funclist ) {
		code=code+window[funclist[i]].toString();
	}
	//debugger;
	//var XMLPayload = ggbApplet.getXML();
	/*
	// this code fail to set the JSON with  ggbApplet.setFileJSON(JSONPayload);
	var JSONPayload = ggbApplet.getFileJSON();
	var mount;
	for ( let j in JSONPayload.archive ) {
		if(JSONPayload.archive[j].fileName==="geogebra_javascript.js")
		{mount=j;break;}
	}
	var oldcode=JSONPayload.archive[mount].fileContent;
	oldcode=oldcode.replace("ggbOnInit()", handle);
	JSONPayload.archive[mount].fileContent=oldcode+code+ggboninit;
	ggbApplet.setFileJSON(JSONPayload);
	var UpdatedGGB =ggbApplet.getBase64();
	*/
	// THIS CODE RELIES ON INTERNALS I.E: FFLAT
	
	var toBytetoUpdate = base64Util.base64ToBytes(payload);
	var arraytoUpdate =window.fflate.unzipSync(toBytetoUpdate);
	var oldcode =window.fflate.strFromU8(arraytoUpdate["geogebra_javascript.js"]); 
	oldcode=oldcode.replace("ggbOnInit()", handle);
    //var ggbzip =getZippedBase64Sync(JSONPayload);
 	//var ggb64=JSON.parse(atob(JSONPayload));
	//var j1=JSON.parse(pako.inflate(payload, { to: 'string' }))
	//var j2=JSON.parse(pako.inflate(atob(payload), { to: 'string' }))
	//var j3=JSON.parse(pako.inflate(payload, { to: 'string' }))
	//var j4 =pako.deflate(JSON.stringify(JSONPayload));
	// GGB seems to use fflate window.fflate
	arraytoUpdate["geogebra_javascript.js"] =window.fflate.strToU8(oldcode+code+ggboninit);
	var arrayUpdated =window.fflate.zipSync(arraytoUpdate );
	var UpdatedGGB =base64Util.bytesToBase64(arrayUpdated); //ready to pass to HTTP
	// end of patch
	
	// in getbase64
	//    return $wnd.base64Util.bytesToBase64($wnd.window.fflate.zipSync(b))
	// on files is applied strFromU8
	// zip the array and of files with U8FromStr
// where b is a four position array
	// base64Util.base64ToBytes(ggbApplet.getBase64()) gives an array
	//window.fflate.unzipSync(base64Util.base64ToBytes(ggbApplet.getBase64()))
	//decodes the array into an object with all what is needed 
// we are interested in ["geogebra_javascript.js"] so 
	//window.fflate.unzipSync(base64Util.base64ToBytes(ggbApplet.getBase64()))["geogebra_javascript.js"] 
	//window.fflate.unzipSync(window.fflate.unzipSync(base64Util.base64ToBytes(ggbApplet.getBase64()))["geogebra_javascript.js"])
	// and $wnd.window.fflate.strFromU8($wnd.window.fflate.strToU8("hello")): "hello"
	//var foo=base64Util.bytesToBase64(window.fflate.zipSync(JSONPayload.archive))
	//var fex = ggbApplet.setFileJSON(JSON.stringify(JSONPayload));
	//var fea =ggbApplet.getBase64();
	//var foo=RT_base64EncodeUnicode(JSON.stringify(JSONPayload));
	saveGGB(fname,UpdatedGGB,cont);
	//cont(fea);
	//cont(payload);
	//var newpayload=payload;
	//cont(newpayload);
	//cont(newpayload);
	//};
}
//this function takes the arguments of ggbOnInit and do some actions.
// this is usefuk for starting the GGB applet 
//several prototocol are possible 'js:"some code in a string"
// runs the code via eval. Could be interesting also pass GGB cmds

/* function RT_bootdo(a){
		debugger;
		 switch (a.slice(0, 3))
        {
            case "js:":
            debugger;
                eval(a.slice(4));
                break;
            default:
                break;
        }
	}
*/