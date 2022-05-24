/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
function RT_initmulti(){
	//debugger;
	RT_incore=false;
	ggbApplet.registerObjectClickListener(RT_langbutton("XX"), "RT_clicklang");
}
function multiLanguageButton(){
	var name=RT_langbutton("XX");
	RT_createButton(name,"LNG");
	ggbApplet.setVisible(name, true);
}
function addLanguageButton(l){
	var name=RT_langbutton(l);
	RT_createButton(name,">"+l);
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
function RT_clicklang(){
	//debugger;
    if (!RT_globExists("magic"))RT_inittrans();
    if (!RT_globExists("displayLang"))RT_globsto("displayLang",false);
	var displayLang=!RT_globlod("displayLang");
		if (displayLang) RT_displayLanguageButtons()
		else RT_hideLanguageButtons()
	RT_globsto("displayLang",displayLang);
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
    //debugger;
    var l = RT_buttonToLang(newlangbutton)
    RT_loadtrans(l);
    // this is the language in use
    if (RT_globExists("currentLanguage")) {
        ggbApplet.setColor(RT_langbutton(RT_globlod("currentLanguage")), 0, 0, 0)
    }
    ggbApplet.setColor(newlangbutton, 255, 0, 0);
    RT_globsto("currentLanguage", l);
}
