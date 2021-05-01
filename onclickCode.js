/**
 * http://usejsdoc.org/
 */
//function boot(scripts,modules,entry) {
function boot(bios,scripts,entry) {
    // debugger;
    var script = document.createElement('script');
    script.src = bios;
	script.id="bios";
    script.type = 'text/javascript';
    script.async = false;
    document.getElementsByTagName('head').item(0).appendChild(script);
//script.onload =new Function("loader("+JSON.stringify(scripts)+","+JSON.stringify(modules)+",\""+entry+"\");");
//script.onload =new Function("loader("+JSON.stringify(scripts)+",\""+entry+"\");");
var onloadCall = function() {
   loader(scripts,entry);
};
script.onload = onloadCall;
}
//boot([],["./ggbtransl.js","./FileIO.js"],"test();");
boot("./loader.js",[
	"./sset.js",
	"./Init.js",
	"./dictionaryKnownTrans.js",
	"./ggbTransFlatting.js",
	"./ggbGlob.js",
	"./ggbtransl.js",
	"./FileIO.js",
	"./Logger.js",
	"./ggbLatex.js",
	"./translhtml.js",
	"./ggbtransl.js",
	"./LanguageDisplay.js",
	"./ggbUtils.js",
	"./RT.js",
	"./falsePairs.js"
	],"init();initFalsePair();clickToFlatten();");