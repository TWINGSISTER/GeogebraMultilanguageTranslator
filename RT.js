/**
 * http://usejsdoc.org/
 */
function RT_loadtrans(l) {
    //debugger;
    var alltr = ggbApplet.getAllObjectNames();
    //RT_globsto("targetLang", lang);
    //startAdv("Translated",1,alltr.length)
    var name;
    for (i = 0; i < alltr.length; i++) {
        name = alltr[i];
        RT_TransObject(l,name);
        //updAdv("Translated");
    }
}

function RT_TransObject(lang,objName) {
    //debugger;
    if (RT_transIt(objName)) {
        if (RT_isTranslation(objName)) {
            return;
        } // leave aux objects
        if (RT_isGlob(objName)) {
            return;
        } // leave aux objects
        if (RT_isTranslated(objName, lang)) {
            RT_stotrans(objName, (RT_translName(objName, lang)));
        }
    }
}
