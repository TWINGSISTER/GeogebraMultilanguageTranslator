/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
// this function returns false if the string s does not contain a balanced sequence 
// of lp rp (left parenthesis right parenthesis). E.g. s="foo(doo(foo)) ((("
// Otherwise, if s is like that the function returns the index of the last character in
// the sequance i.e. for s="foo(doo(foo)) (((" returns 12
// The strings lp and rp are passed to RegExp and therefore rather complex schemes can be 
// analyzed e.g. lp="<div class=\\\"[^\\\"]*\\\">", rp="<\\\\div>",
function matchpar(s,rp,lp){// return the end position of the matching pair or false 
 var start=s.match(RegExp(rp));
 var firstlp=s.match(RegExp(lp));
if(start&&firstlp&&start.index<firstlp.index){
var re=s.slice(start.index+start[0].length);
var sofar=start.index+start[0].length;
	while(start&&firstlp&&start.index<firstlp.index){
	 startidx=matchpar(re,rp,lp)
	 if(startidx){
		//console.log("%s balanced arg of  %s ", re.slice(re.match(RegExp(rp)).index,startidx),s.match(RegExp(rp))[0]);
	 	re=re.slice(startidx);
	 	sofar=sofar+startidx;//+start.index+start[0].length;// lp rp can be <div ...> not only []
     	start=re.match(RegExp(rp)); 
		firstlp=re.match(RegExp(lp));
	 }else { start= false;}
	}
	result=re.match(RegExp(lp));
	if(result) {
		var resultindex= result.index+sofar+result[0].length;
		//console.log(" balanced  %s at %s", s.slice(s.match(RegExp(rp)).index,resultindex));
		return resultindex;
    }else { return false;}
 }else { return false;}
}

//-----------------------------------------------------------------------
function matchnargs(s,rp,lp,n){
	if(n==0){
		var cnt=new Map();
		cnt.set("args",new Array());
		cnt.set("end",0);
		return cnt;
	   }
	else {
		var one,rest;
 		var start=s.match(RegExp(rp));
	 	var end=matchpar(s,rp,lp)
		if(start && end){
		 one=s.slice(start.index,end);
		 rest=matchnargs(s.slice(end),rp,lp,n-1);
		 if(rest){
			 var tail=rest.get("args");
				tail.unshift(one);
				rest.set("args",tail);
				rest.set("end",rest.get("end")+end);
					return rest;}
		 else { return false;}
        }else { return false;}
	}
	}

//-----------------------------------------------------------------------
//pre/post processing making/unmaking some Latex keyword a mess that cannot be translated 
//-----------------------------------------------------------------------
function LatexHandle(dict) {
	initLatexIdPrefix();
	//debugger;
	 RT_globsto("Latexmerge",dict);
}
function encode(string) {
    var number = "0x";
    var length = string.length;
    for (var i = 0; i < length; i++)
        number += string.charCodeAt(i).toString(16);
    return number;
}
function decode(number) {
    var string = "";
    number = number.slice(2);
    var length = number.length;
    for (var i = 0; i < length;) {
        var code = number.slice(i, i += 2);
        string += String.fromCharCode(parseInt(code, 16));
    }
    return string;
}
//-----------------------------------------------------------------------
// find an Id for latex operators here for HTML5 is ok or
// put/^[A-Za-z][-A-Za-z0-9_:.]*$/.test(cmd) 
//-----------------------------------------------------------------------
function initLatexIdPrefix(){RT_globsto("latexidmagic","ALTX");}
//-----------------------------------------------------------------------
function latexId(cmd) {if(/^[^\s]+$/.test(cmd))
  {return cmd;}else {return RT_globlod("latexidmagic")+encode(cmd).toString(); }}
//-----------------------------------------------------------------------
//true if no translation is needed for origText because is a Latex fragment
//i.e. Latex commands (\something) plus non alphabetic characters 
//-----------------------------------------------------------------------
function fragmentLatex(origText) {
	origText=drys(origText);
	debugger;
	if(origText.startsWith("\"")&&origText.endsWith("\"")){return fragmentLatex(origText.slice(1,-1));};
	var dict = RT_globlod("Latexmerge");
	var noLatexcmds =purgeLatex(origText);
	//origText.replace(RegExp('\\\\[^\\{|^\\s]*','g'),
	//	function(match){
	//		if(dict.has(match.slice(1))) {return "";} else{return match;}}
	//);//  delete \something for a known command
	// when all the known Latex command are gone the rest must be non alphabetic
	if(noLatexcmds.match(RegExp('^[^a-zA-Z]*$'))){return true;}else{return false;}
}
//-----------------------------------------------------------------------
function purgeLatex(origText) {
	//var patterns=;
	var dict = RT_globlod("Latexmerge");
	//	for (i = 0; i < patterns.length; i++){
			origText =origText.replace(RegExp(RT_globlod("patterns"),'g'),
				function(match){
					debugger;
					if(
						(match.startsWith("\\")&& dict.has(match.slice(1)))||
						(match.startsWith("\{")&& dict.has(match))

					) {return "";} else{return match;}}
				);//  delete \something for a known command
	//	}
	//debugger;
	return origText;
}
//-----------------------------------------------------------------------
function matchLatex(origText) {
	//debugger;
	//var patterns=;
	//var matchCmd =null;
		//for (i = 0; i < patterns.length; i++){
			return origText.match(RegExp(RT_globlod("patterns")));
		//	if(matchCmd){return matchCmd;}
		//}
	//debugger;alert(origText);
	//return matchCmd;
}
//-----------------------------------------------------------------------
// try to transform the string into a collection of strings extracting 
// what do not need translation 
//-----------------------------------------------------------------------
function splitcmd(origText){ 
	var splitted= origText.replace( RegExp('"[^"]*"', 'g'),
	function (match) {return "\""+ splitstr(match.slice(1,-1))+"\"";}); 
	return splitted;
}
function splitstr(origText) {
	// all newlines are split and isolated
	if(origText==="") {return "";}
	/* var matching=false;
	origText  = origText.replace(/<|>/gm,
			function (match) {
				debugger;
				matching=true;
		 		return "\"+UnicodeToLetter("+(match==="<"?"60":"62")+")+\""
			}
	 	);
	if(matching)return splitcmd("\""+origText+"\"");
	*/
	//var tobreaknonl = tobreak.replace(/>/gm, " UnicodeToLetter(62)");
	//var newlinematch=origText.match("^\s*\\\\\\\\");
	//var newlinematch=origText.match(/^\s*\\\\n/,function(match){});
	//if(newlinematch) {return newlinematch[0]+"\"+\""+splitstr(origText.slice(newlinematch[0].length));}
	//var brmatch=origText.match("^\s*<br>");
	//if(brmatch) {return brmatch[0]+"\"+\""+sliptstr(origText.slice(brmatch[0].length));}
	if(origText.match(RegExp('^[^a-zA-Z]*$'))){return origText;} // not a single letter must not translate
	//var matchCmd =origText.match(RegExp('\\\\left\\(|\\\\right\\)'));
	//if(!matchCmd) {matchCmd =origText.match(RegExp('\\\\[^\\{|^\\s]*'));}// \something
	var matchCmd =matchLatex(origText);// \something
	if(!matchCmd) {return origText;}
	var at=matchCmd.index;
	var cmd = matchCmd[0].slice(1);
	var dict = RT_globlod("Latexmerge");
	if(!dict.has(cmd)) 
	 {return origText; // in the prefix not a Latex command
	}else{
		var args=dict.get(cmd);
		var argsString=origText.slice(at+cmd.length+1);
		var param =matchnargs(argsString,"\\{","\\}",Math.abs(args))
		if(!param){
			//debugger;
			console.log("Cannot find "+args+" parameters for "+cmd+" in >"+origText+"<");
			return origText;
		}
		var i;
		for (i = 0; i < Math.abs(args); i++){
			if(!pureLatex(param.get("args")[i].slice(1,-1))){return origText;}
		}
		 return origText.slice(0,at+cmd.length+param.get("end")+1)+"\"+\""+
			splitstr(origText.slice(at+1+cmd.length+param.get("end")));
	}
}


//-----------------------------------------------------------------------
//true if no translation is needed for origText because is a valid Latex without
//alphabetic characters 
//-----------------------------------------------------------------------
function pureLatex(origText){ 
	origText=drys(origText);
	//debugger
	if(origText.startsWith("\"")&&origText.endsWith("\"")){return pureLatex(origText.slice(1,-1));};
	if(origText.match(RegExp('^[^a-zA-Z]*$'))){return true;} // not a single letter must not translate
	var matchCmd =matchLatex(origText);// \something
	//var matchCmd =origText.match(RegExp('\\\\[^\\{|^\\s]*'));// \something
	if(!matchCmd) {return false;}
	var at=matchCmd.index;
	var cmd = matchCmd[0].slice(1);
	var dict = RT_globlod("Latexmerge");
	if(!dict.has(cmd)) 
	 {return false; // in the prefix not a Latex command
	}else{
		var args=dict.get(cmd);
		var argsString=origText.slice(at+cmd.length+1);
		var param =matchnargs(argsString,"\\{","\\}",Math.abs(args))
		if(!param){
			debugger;
			console.log("Cannot find "+args+" parameters for "+cmd+" in >"+origText+"<");
			return false;
		}
		var i;
		for (i = 0; i < args; i++){
			if(!pureLatex(param.get("args")[i].slice(1,-1))){return false;}
		}
		 return pureLatex(origText.slice(at+1+cmd.length+param.get("end")));
	}
}


function deLatex(id,origText,tr,dry,html,tl){ 
	// if dry  minimize the output.
	// consider \\ and <br> and \; \( etc...
	var newlinematch=origText.match("^\s*\\\\\\\\");
	if(newlinematch) {return ((dry)?"":newlinematch[0])+deLatex(id,origText.slice(newlinematch[0].length),tr,dry,html);}
	var brmatch=origText.match("^\s*<br>");
	if(brmatch) {
		var returnVal= ((dry)?"":brmatch[0].slice(0,-4)+"\n")+deLatex(id,origText.slice(brmatch[0].length),tr,dry,html);
		//alert(brmatch+returnVal);
		return returnVal;
	}
	var matchCmd =matchLatex(origText);// \something
	//var matchCmd =origText.match(RegExp('\\\\[^\\\\|^\\{|^\\s]*'));// \something
	if(!matchCmd) {return divPlainText(id,origText,dry,html);}
	var at=matchCmd.index;
	var cmd = matchCmd[0].slice(1);
	var dict = RT_globlod("Latexmerge");
	if(!dict.has(cmd)) 
	 {
		console.log("Cannot find Latex command:"+cmd);
		return divPlainText(id,origText.slice(0,at+1+matchCmd[0].length),dry,html)+
			deLatex(id,origText.slice(at+1+matchCmd[0].length+1),tr,dry,html); // in the prefix not a Latex command
	}else{
		var args=dict.get(cmd);
		var argsString=origText.slice(at+cmd.length+1);
		var param =matchnargs(argsString,"\\{","\\}",Math.abs(args))
		if(!param){
			//debugger;
			console.log("Cannot find "+args+" parameters for "+cmd+" in >"+origText+"<");
			return divPlainText(id,origText,dry,html);
		}
		var cid=id+latexId(cmd);
		//var returnVal=(dry)?"":"<div class=\""+latexId(cmd)+"\">";
		var returnVal=(dry)?"":"\\"+cmd;
		var i; // for negative args |args| parameters are skipped 
		if(!dry){args=Math.abs(args);}
		for (i = 0; i < args; i++){
			var idarg=cid+"Arg"+(i+1).toString();
		 returnVal=returnVal+
		//  ((dry)?"":"<div class=\""+cmd+"Arg"+(i+1).toString()+"\">")+
		  ((dry)?"":"{")+
		    deLatex(idarg,param.get("args")[i].slice(1,-1),tr,dry,html)+ // tear off curly
		  //((dry)?"":"</div>");
		  ((dry)?"":"}");
		}
		returnVal=returnVal+
			((dry)?"":"")+
				deLatex(id+"_",origText.slice(at+1+cmd.length+param.get("end")),tr,dry,html);
		if(at>0){
		  returnVal=divPlainText(id,origText.slice(0,at),dry,html)+returnVal;
		}
		return returnVal;
	}
}


/*function inLatex(id,origText,translated,html) {
	if (translated==="") {return origText;}
	if (html!=null) { alert("this must be implemented"); return"";}
	//var hashcmd = RT_globlod("hash") + cmd;
		// for debugging
	//debugger;
		var doc = new DOMParser().parseFromString(
		 "<div class=\"latex\">"+translated+"</div>", "text/xml");
		var latexcode=docDecode(doc);
		return latexcode;//.slice(7,-1);//\latex{ } cut
//	var dict = RT_globlod("Latexmerge");
//	if(!dict[cmd]) {return translated;}
//	var tuple=dict[cmd];
//	translated = translated.replace(
//			RegExp(tuple[1]+".*?"+tuple[3],'g'),
//				function(match) {
//					var res;
//					//debugger;
//					res=match.replace(RegExp("^"+tuple[1]),"\\"+cmd+"{");
//					return  res.replace(RegExp(tuple[3]+"$"),"}");
//				}
//			);
//	return translated;
}
*/
//-----------------------------------------------------------------------
//  translation access for Latex code
//-----------------------------------------------------------------------
function dumpLatexTranslate(wd,id,origText,dry,html) {
	// we assume that in Latex code the only thing to translate is within \text
	//debugger;
				var translin = deLatex(id,origText,tr,true,html);
				var translated =dumpstrTrans(wd,id,translin,html);
				if (html==null) { return ""; } else  { return deLatex(objName,origText,translated,false,html);}
}
//-----------------------------------------------------------------------
//  find if the Object uses the latex formula setting 
//-----------------------------------------------------------------------
function isLatexOn(Object)  {
	//debugger;
	XMLObj=ggbApplet.getXML(Object);
	// lines here went into a parser error
	//parser = new DOMParser();
	//obj = parser.parseFromString('<?xml version="1.0" ?>'+XMLObj,"application/xml") // was text/xml;
	// hunting <isLaTeX val="true"/>
	const regex = new RegExp('<isLaTeX *val *= *"true" *\/>');
	return regex.test(XMLObj);
	}