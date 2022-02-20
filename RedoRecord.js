/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */

//import { compare } from './JSON-Patch-master/dist/fast-json-patch.js';
//import DiffMatchPatch from 'diff-match-patch';
var tape=[]; // the list of updates
var last=0; // the index of the last update
// the dashboard for the documentation facility buttons  doc > start, next, end, snap,  prn
function dashDocCreateBtns(){
	createButton("ZZZDOCBTN","DOC")
	}
// the dashboard for the documentation facility doc > start, next, end, snap,  prn
function dashDocCreate(){
	ggbApplet.registerObjectClickListener(name, "button2handl")
	ggbApplet.setVisible(name, true);
	}

const dmpx = new diff_match_patch();
//debugger;
//const dmp = new diff_match_patch();
//const diff = dmp.diff_main('dogs bark', 'cats bark');

function RT_GGBExitHook(){
	alert("RT_GGBEXIT called!");
	}

function RT_R_init(name,fun){
	//debugger;
	type=ggbApplet.getObjectType(name);	
		switch (type) {
		case "button":
		case "slider":
		case "checkbox":
		case "inputbox":
		case "textfield":
		case "point":
			ggbApplet.registerObjectClickListener(name,fun);
			break;
		case "text":
		case 'boolean':
		case "number":
		case "numeric":
			ggbApplet.registerObjectUpdateListener(name,fun);
			break;
		case "undefined":
		default:
		}
	}

//--------------------------------------------------------------------------
function RT_R_init_tic(name){
	if (RT_globlod("annotated")) return;
	RT_R_init(name,"RT_R_tic");
}
function RT_R_tic(name){
	RT_R_log(name,"IN EXE!");
}
function RT_R_init_iterat(name){
		RT_globsto("step", 0);
		RT_R_init(name,"RT_R_iterat");
		RT_globsto("annotated",false);
}
function RT_R_iterat(name){
	//debugger;
		step=RT_globlod("step");
		err=RT_globlod("err");
		ok=RT_globlod("ok");
		now=step+1;
		RT_globsto("step",now);
		RT_R_log(name,"IN EXE! ok:"+ok.toString()+" err:"+now.toString()+" ex:"+step.toString());
		RT_globsto("annotated",false);
}
//--------------------------------------------------------------------------
function RT_R_init_err(name){
		RT_globsto("err", 0);
		RT_R_init(name,"RT_R_err");
}
function RT_R_err(name){
	debugger;
		if (RT_globlod("annotated")) return;
		iterate=RT_globlod("step");
		err=RT_globlod("err");
		ok=RT_globlod("ok");
		now=err+1;
		RT_globsto("err",now);
		RT_R_log(name,"ERR! ok:"+ok.toString()+" err:"+now.toString()+" ex:"+iterate.toString());
		RT_globsto("annotated",true);
}
//--------------------------------------------------------------------------
function RT_R_init_ok(name){
	
		RT_globsto("ok", 0);
		RT_R_init(name,"RT_R_ok");
}
function RT_R_ok(name){
	debugger;
		if (RT_globlod("annotated")) return;
		ok=RT_globlod("ok");
		now=ok+1;
		RT_globsto("ok",now);
		iterate=RT_globlod("step");
		err=RT_globlod("err");
		RT_R_log(name,"OK! ok:"+now.toString()+" err:"+err.toString()+" ex:"+iterate.toString());
		RT_globsto("annotated",true);
}
/*
//----------------------------------------------------------------------
function GGBXMLcompare(oldxml, newxml){
	    olds = oldxml.childNodes;
	    news = newxml.childNodes;
		debugger;
	    for (let i = 0, l = olds.length; i < l; ++i) {
	    	old=olds[i];
			
	    	//for (let j = 0, m = news.length; j <m; ++j) {
	     // if (false === eachNode(nodes[i], callback)) {
	     //   return
	      //}
	    }
}
//----------------------------------------------------------------------
*/
const PDFDump=[];
function RT_R_logPDF(obj,s){
	debugger; 	
	ggbApplet.exportPDF(1, pdf => PDFDump.push(pdf))
}
const PNGDump=[];
function RT_R_logPNG(obj,s){
	debugger; 	
	PDFDump.push(ggbApplet.getPNGBase64(1, true, undefined));
}
var pic=1;

const XMLDump=[];
function RT_R_log(obj,s){
	debugger;
	newscript=getminGGBXML();
	XMLDump.push(newscript);
	// do the dump
	//pic=RT_globlod("pic");
	ggbApplet.setTextValue("LOG",pic.toString()+":"+s);
	return;
	//	ggbApplet.getBase64((script)=>{
	//encold=RT_globlod("dump"+pic.toString());
	oldscript=RT_globlod("dump"+pic.toString());
	//oldscript=RT_base64DecodeUnicode(encold);
	//parser = new DOMParser();
	//oldxmlDoc = parser.parseFromString(oldscript,"application/xml") // was text/xml;
	//newxmlDoc = parser.parseFromString(newscript,"application/xml") // was text/xml;
	//Docdiff = GGBXMLcompare(oldxmlDoc, newxmlDoc);
		// obvious improvement compute a patch and store it if not null. 
		//oldscript=JSON.parse(RT_base64DecodeUnicode(RT_globlod("dump"+pic.toString())));
		//diff = jsonpatch.compare(oldscript, script,false);
		//if(!script===oldscript){
	pic=pic+1;
	//encnew=RT_base64EncodeUnicode(newscript);
	//RT_globsto("dump"+pic.toString(),encnew);
	RT_globsto("dump"+pic.toString(),newscript);
	diff = dmpx.diff_main(oldscript,newscript);
	dmpx.diff_cleanupEfficiency(diff);
	patches=dmpx.patch_make(diff);
	text=dmpx.patch_toText(patches);
	patch2=dmpx.patch_fromText(text);
	res=dmpx.patch_apply(patch2, oldscript); 
	encdiff = dmpx.diff_main(encold,encnew);
	//RT_globsto("pic",newpic);
	//getPDF();
	//getPNG();
	//getSVG();
	//getWNG();
		//	RT_globsto("pic",newpic)
		//}
//	});
	
//    if (!RT_globExists("magic"))RT_inittrans();
//    if (!RT_globExists("displayLang"))RT_globsto("displayLang",false);
//	var displayLang=!RT_globlod("displayLang");
//		if (displayLang) RT_displayLanguageButtons()
//		else RT_hideLanguageButtons()
//	RT_globsto("displayLang",displayLang);
}
function getminGGBXML(){
	//debugger;
	//sav=packGlobs();wipeGlobs();
	JSONPayload=ggbApplet.getFileJSON();
	//unpackGlobs(sav);
	var mount;
		for ( let j in JSONPayload.archive ) {
			if(JSONPayload.archive[j].fileName==="geogebra.xml")
			{mount=j;break;}
	}
	payload=JSONPayload.archive[mount].fileContent;
	size=payload.length;
	return payload; 
}
//-----------------------------------------------------------------------------
function getPDF(){
 	ggbApplet.exportPDF(1, pdf => 
		{
		size=pdf.length;
		//pic=RT_globlod("PDFpic");
		pic=pic+1;
		//RT_globsto("PDFpic",newpic);
		RT_globsto("PDFdump"+pic.toString(),pdf)//RT_base64EncodeUnicode(pdf));
		}
	);
}
function initgetPDF(){ //RT_globsto("PDFpic",0);
getPDF(); }
//-----------------------------------------------------------------------------
function getPNG(){
	//pic=RT_globlod("PNGpic");
	pic=pic+1;
 	str = ggbApplet.getPNGBase64(1, true, undefined);
	//RT_globsto("PDFpic",newpic);
	RT_globsto("PNGdump"+pic.toString(),str);
	return str.length; 
}
function initgetPNG(){//RT_globsto("PNGpic",0);
getPNG(); }
//-----------------------------------------------------------------------------
function getSVG(){
 	ggbApplet.exportSVG(svg => 
		{
		size=svg.length;
		//pic=RT_globlod("SVGpic");
		pic=pic+1;
		//RT_globsto("SVGpic",newpic);
		RT_globsto("SVGdump"+pic.toString(),svg)//RT_base64EncodeUnicode(svg));
		}
	);
}
function initgetSVG(){ //RT_globsto("SVGpic",0);
getSVG(); }
//-----------------------------------------------------------------------------
function getWNG(){
 	ggbApplet.getScreenshotBase64(1, wng => 
		{
		size=wng.length;
		//pic=RT_globlod("WNGpic");
		pic=pic+1;
		//RT_globsto("WNGpic",pic);
		return RT_globsto("WNGdump"+pic.toString(),wng)//,RT_base64EncodeUnicode(wng));
		}
	);
}
function initgetWNG(){ //RT_globsto("WNGpic",0);
getWNG(); }
//-----------------------------------------------------------------------------
function getGGBXML(){
	//debugger;
	//base=RT_globlod("dump1");
	//RT_globdel("dump1");
	JSONPayload=ggbApplet.getFileJSON();
	//RT_globsto("dump1",base);
	var mount;
		for ( let j in JSONPayload.archive ) {
			if(JSONPayload.archive[j].fileName==="geogebra.xml")
			{mount=j;break;}
	}
	payload=JSONPayload.archive[mount].fileContent;
	//payload=payload.replace(/&quot;/g, "'");
	//payload=payload.replace(/&#xd;&#xa;/g, " ");
	//payload=payload.replace(/&#xa;/g, " ");
	//parser = new DOMParser();
	//xmlDoc = parser.parseFromString(payload,"application/xml") // was text/xml;
	//return xml2json(xmlDoc," "); 
	return payload; 
}

function RT_R_start(){
		debugger;
		RT_incoreGlob();
//	if (!RT_globExists("step")){ 
//	}
//	if (!RT_globExists("dump0")){
		//ggbApplet.getBase64((script)=>{RT_globsto("dump0", script)});
		//RT_globsto("pic", 1);
			var storecmd = "LOG = Text(\"" + "LOG" + "\")";
			ggbApplet.evalCommand(storecmd);
		//script=getminGGBXML();
		//RT_globsto("dump1",script);//RT_base64EncodeUnicode(script));
//		 }
	//initgetPDF();
	//initgetPNG();
	//initgetSVG();
	//initgetWNG();
}
/*function multiLanguageButton(){
	var name=RT_langbutton("XX");
	createButton(name,"LNG");
	ggbApplet.setVisible(name, true);
}
function addLanguageButton(l){
	var name=RT_langbutton(l);
	createButton(name,">"+l);
	ggbApplet.setVisible(name, false);
	ggbApplet.setLayer(name,9);
	ggbApplet.setVisible(name, false);
	ggbApplet.setLayerVisible(9,false);
	var supportedLanguages= new Set();
    if (RT_globExists("supportedlanguages")) {
	 supportedLanguages=RT_globlod("supportedlanguages");
    }
    ggbApplet.setColor(name, 0, 0, 0);
    RT_globsto("supportedlanguages",supportedLanguages.add(l));
}
//----------------------------------------------------------------------
function RT_displayLanguageButtons(){
	ggbApplet.setLayerVisible(9,true);
    if (RT_globExists("supportedlanguages")) {
	 	var supportedLanguages=RT_globlod("supportedlanguages");
		for (let l of supportedLanguages){
			 ggbApplet.setVisible(RT_langbutton(l), true);
			 RT_RegButtonHandl(l);
    	}
    }
}
//----------------------------------------------------------------------
function RT_hideLanguageButtons(){
	ggbApplet.setLayerVisible(9,false);
    if (RT_globExists("supportedlanguages")) {
	 	var supportedLanguages=RT_globlod("supportedlanguages");
		for (let l of supportedLanguages){
			 ggbApplet.setVisible(RT_langbutton(l), false);
			 RT_deRegButtonHandl(l);
    	}
    }
}

//----------------------------------------------------------------------

function RT_langbutton(l) {
	// the ggb object name for the language button e.g. >EN
    return RT_translName("ButtonSelection", l);
}

function RT_buttonToLang(b) {
    return RT_getLangFromName(b);
}

function RT_getLangFromName(objName) {
    if (!RT_isTranslation(objName)) { return ""; }
	var start = RT_globlod("magic").length;
    return objName.slice(start, start + 2);
}
function RT_deRegButtonHandl(lang) {
	//deleteButton(RT_langbutton(lang));
	ggbApplet.unregisterObjectClickListener(RT_langbutton(lang), "RT_button2handl");
}
function RT_RegButtonHandl(lang) {
	//createButton(RT_langbutton(lang),">"+lang);
	ggbApplet.registerObjectClickListener(RT_langbutton(lang), "RT_button2handl");
}
function RT_button2handl(newlangbutton) {
    debugger;
    var l = RT_buttonToLang(newlangbutton)
    RT_loadtrans(l);
    // this is the language in use
    if (RT_globExists("currentLanguage")) {
        ggbApplet.setColor(RT_langbutton(RT_globlod("currentLanguage")), 0, 0, 0)
    }
    ggbApplet.setColor(newlangbutton, 255, 0, 0);
    RT_globsto("currentLanguage", l);
}
*/