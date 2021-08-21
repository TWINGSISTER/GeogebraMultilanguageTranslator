/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */

//-----------------------------------------------------------------------
// pre/post processing making/unmaking some keyword a mess that cannot be translated 
//-----------------------------------------------------------------------
// encode/decode >< 
//-----------------------------------------------------------------------
function htmlizeltgt(origText) {
	if(origText.match(/<br|<div/g))
		{console.log("cannot fix < or > in "+origText);return origText;}
	origText = origText.replaceAll("<","&lt;");
	origText = origText.replaceAll(">","&gt;");
	return origText;
}
//-----------------------------------------------------------------------
function dehtmlizeltgt(origText) {
	origText = origText.replaceAll("&lt;","<");
	origText = origText.replaceAll("&gt;",">");
	return origText;
}
//-----------------------------------------------------------------------
function hashtr(id,origText,html, listToken) {
	origText=htmlizeltgt(origText);
	//var hash = RT_globlod("hash");
	for (name of listToken) {
		origText = origText.replaceAll(name,"<div class=\"" + name+"\">");
	}
	return divPlainText(id,origText,true,html)
	//return origText;
}

function unhashtr(id,origText,html, listToken) {
	origText= divPlainText(id,origText,false,html)
	//var hash = RT_globlod("hash");
	for (name of listToken) {
		origText = origText.replaceAll("<div class=\"" + name+"\">", name);
	}
	origText=dehtmlizeltgt(origText);
	return origText;
}

function dumpstrTrans(wd,id,text,html){ 
//-----------------------------------------------------------------------
// This procedure dump to the document w what needs translation and returns the translation
// in html if html is not null
// If your goal is to build the translation document in w simply ignore what it 
// returns
//-----------------------------------------------------------------------
	//debugger;
	if (isNotToTranslate(text)||text === "" || text === '"'||
		text==="<div class=\"noop\">\"\"</div>") {
		return  text;
	}
	if (text.match(RegExp('^>..$', 'g'))) {// the two letter string for the language button must not translate 
		return  text;
	}
	if (text.startsWith('"') && text.endsWith('"')) {
		return "\""+dumpstrTrans(w,id,text.slice(1, -1),html)+"\"" ;
	}
	var newDiv; 
	id=id+"Dmp"
	if (html==null)  {
		//text=htmlizeltgt(text);
		text=makeatextdiv(text); // care about newlines and spaces
		//debugger;
		newDiv = wd.createElement("div");
		newDiv.id=id;
		// turn the text to HTML
		//var doc = new DOMParser().parseFromString(text,"text/html"); //ex text/xml
  		/* that other ? 
		var newContent = w.document.createTextNode(text);
  		newDiv.appendChild(newContent);
		*/
		newDiv.innerHTML=text;
  		wd.body.append(newDiv);
		//var newline = document.createElement('BR');
  		//w.document.body.append(newline);
		return null;
		} else { //undo the step above
			//debugger;
			newDiv=html.getElementById(id);
			if (newDiv==null)  {
				return text;
			} else { //undo the step above
			RT_globsto("externalTrans",true);
			var div=newDiv.childNodes[0];//.outerHTML;
			//text=html.getElementById(id).innerHTML;
			//text=html.getElementById(id).innerorigTextText; anche questo ok
			var text=makedivatext(div);
			//return dehtmlizeltgt(text);
			return text;
			}
		}
	}
	



function divPlainText(id,t,fwd,html) {
	console.log("divPlainText "+t);
		var test=t.trim();
		if(isNotToTranslate(test)||fragmentLatex(test)||isInDictionary(test)||pureLatex(test))
			{return  ((fwd)?"":t);}
		else  {
					//debugger;
			  if (fwd)
				return "<div id=\""+id+"\" data-title=\""+makeatextkey(t)+"\" class=\"noop\">"+makeatextdiv(t)+"</div>";
				else {
					//debugger;
					var oldDiv=html.getElementById(id);
					var trans= makedivatext(oldDiv);
					//var key =oldDiv.attributes["data-title"].nodeValue;
					//trans= filterFalsePair(key,trans);
					return trans;
				}
		}
}

function getTextFromDivId(id,html){
	//return oldDiv.innerText;
	//return oldDiv.childNodes[0];
	return ;
}


function replaceDomElementWithString(el,s){;
 var newEl = document.createTextNode(s);
 //newEl.innerHTML = s ;
 el.parentNode.replaceChild(newEl, el);
}

function replaceDomClassWithString(div,c,s){;
	var list=div.getElementsByClassName(c);
	while (list.length>0){
		replaceDomElementWithString(list[0],s);
		list=div.getElementsByClassName(c); // getElementsByClassName
		// returns an HTMLcollection that is a live object i.e. a pointer to
		// what is actually in the DOM. It changes during the loop
	} 
}
function mapDomClassWithCall(div,c,call){;
	var list=div.getElementsByClassName(c);
	while (list.length>0){
		call(list[0]);
		list=div.getElementsByClassName(c); // getElementsByClassName
		// returns an HTMLcollection that is a live object i.e. a pointer to
		// what is actually in the DOM. It changes during the loop
	} 
}
//-----------------------------------------------------------------------
// a key to locate bad translations
//-----------------------------------------------------------------------
function makeatextkey(text){
	//debugger;
	text = text.replace(/</gm, "");
	text = text.replace(/>/gm, "");
	text = text.replace(/(\n)/gm, "");
	text = text.replace(/(\s)/gm, "");
	return text;
}
//-----------------------------------------------------------------------
function makeatextdiv(text){
	text=htmlizeltgt(text);
	text = text.replace(/(\n)/gm, "<br class=\"newliner\">"); // prev "\\\\n" prev /(\n)/gm
	// lines below crashes div already in
	//text = text.replace(/</gm, "<div class=\"lessthan\">"); // prev "\\\\n" prev /(\n)/gm
	//text = text.replace(/>/gm, "<div class=\"greaterthan\">"); // prev "\\\\n" prev /(\n)/gm
	text = text.replace(/^\s+|\s+$|\s\s+/g, 
			function(match){
				//debugger;
				 return "<div class=\"spacer\" id=\"spacer"+match.length.toString()+"\">"
				+match.length.toString()+"</div>";}
	);
return text;
}
//-----------------------------------------------------------------------
function makedivatext(div){
	//debugger;
	// undo the above
	// newDiv=html.getElementById(id);
	//indiv=div.childNodes[0];
	if(div.nodeType==3){return div.textContent;}
	//if(div.className==="noop"){return div;}
	mapDomClassWithCall(div,"spacer",
		(dv)=>{replaceDomElementWithString(dv," ".repeat(parseInt(dv.innerText,10)));})
		//dv.replaceWith(" ".repeat(parseInt(dv.innerText,10)));})
	//replaceDomClassWithString("spacer","\n");
	//for (var division of div.getElementsByClassName("spacer")){
	//	//text=target.outerHTML;
	//	//text=target.innerHTML;
	//	division.replaceWith(" ".repeat(parseint(division.innerText,10)));
	//}
	//text = text.replace(/^\s+|\s+$|\s\s+/g, 
	//		function(match){
	//			debugger;
	//			 return "<div class=\"spacer\" id=\"spacer"+match.length.toString()+"\">"
	//			+match.length.toString()+"</div>";}
	//);
	replaceDomClassWithString(div,"newliner","\n");
	// lines below crashes div already in
	//replaceDomClassWithString(div,"lessthan","<");
	//replaceDomClassWithString(div,"greaterthan",">");
	//var list=div.getElementsByClassName("newliner");
	//while (list.length>0){
	//	replaceDomElementWithString(list[0],"\n");
	//	list=div.getElementsByClassName("newliner");
	//} 
	//var list=div.getElementsByClassName("newliner");
	//Array.prototype.forEach.call(list, function(el) {
	//	replaceDomElementWithString(el,"\n");
	//	});
	//for (i = 0; i < list.length; i++){
	//	//list[i].replaceWith("\n");
	//	replaceDomElementWithString(list[i],"\n");
	//}
	// div.childNodes[0] per un nodo di tipo text .data .textContent per la stringa
	//text = div.innerHTML;
	//text = text.replaceAll("<br>","\n"); // prev "\\\\n" prev /(\n)/gm
	return dehtmlizeltgt(div.textContent);
}
function parseXML(xmlStr) {
   return new window.DOMParser().parseFromString(xmlStr, "text/xml");
}