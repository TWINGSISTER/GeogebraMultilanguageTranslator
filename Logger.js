/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//----------------------------------------------------------------------
// logging facility in a separate window at the end the log is written to a html file
//-----------------------------------------------------------------------

function startLogging() {
	var style = "top=10, left=10, width=400, height=250, status=no, menubar=yes, toolbar=yes scrollbars=yes";
	var testo = window.open("", "",style);
	testo.document.write("<html>\n");
	testo.document.write(" <head>\n");
	testo.document.write(" <title>Translation log" + "</title>\n");
	testo.document.write(" <basefont size=2 face=Tahoma>\n");
	//testo.document.write(" <style> #myProgress { width: 100%; background-color: #ddd; }\n");
	//testo.document.write(" #myBar { width: 1%; height: 30px; background-color: #4CAF50; } </style>\n");
	testo.document.write(" </head>\n");
	testo.document.write("<body>\n")
	//testo.document.write("<body topmargin=50>\n")
	//testo.document.write("<div id='myProgress'> <div id='myBar'></div> </div>\n");
	//testo.document.write("</div> </div>\n");
	testo.document.write("<div id='myLog'> </div>\n");
	testo.document.write("</body>\n");
	testo.document.write("</html>\n");
	RT_globsto("loglineno",1)
	return testo;
}
function freeLogging(win,message) {
	var doc = win.document;
	var theDiv = doc.getElementById("myLog")
	theDiv.appendChild(doc.createTextNode(message));
	theDiv.appendChild(doc.createElement('BR'));
}

function endLogging(win) {
	//debugger;
	var doc = win.document;
	var theDiv = doc.getElementById("myLog")
	var fin=RT_globlod("loglineno");
	for (let i = 1; i < fin; i++){
		var linetext ="logline"+i.toString();
		if (RT_globExists(linetext)){
			var message=RT_base64DecodeUnicode(RT_globlod(linetext))
			theDiv.appendChild(doc.createTextNode(message));
			theDiv.appendChild(doc.createElement('BR'));
			RT_globdel(linetext);
		}
	}
	RT_globdel("loglineno");
	var toblob=doc.getElementsByTagName('html')[0].innerHTML;
	debugger;
	//wholefile=ggbApplet.getFileJSON()
	RT_saveFileHtml(RT_globlod("logname")+(new Date().toISOString())+".html",[toblob]); 
}

function logmessage(message) {
	var i=RT_globlod("loglineno");
	RT_globsto("logline"+i.toString(),RT_base64EncodeUnicode(message));
	RT_globsto("loglineno",i+1);
}