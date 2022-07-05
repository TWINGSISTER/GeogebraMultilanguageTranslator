/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER 
 */
//-----------------------------------------------------------------------
// A dictionary  of known terms that need not translation
// They are contained in two global variables
// If you put "pizza" in this global variable using updateDictionary
// "pizza" will not be translated and you will find "pizza" in your GGB 
// activity. 
// In the GGB code you must have EXACTLY the string "pizza" or ""pizza""
// or "  pizza    " with some leading/trailing blanks.
// This dictionary also contains all the Latex commands that do not need 
// translation. We do not want \times to be translated into \tempi (IT) 
// so we put "times" into dictionary in the global variable "Latexmerge" 
// and recognize as Latex command strings like "\times  " or ""\times  "
// or "\times  {" or ""\times {"" with some trailing blanks
// Note that  we can put either "\times"  in updateDictionary 
// or "times" in Latexmerge to have "\times" untranslated
//-----------------------------------------------------------------------
function updateLatexCmdPatterns(UpdArr) {	
	RT_globsto("patterns",UpdArr.join('|'))
}

function updateLatexComplexPatterns(UpdArr) {	
	RT_globsto("cmppatterns",UpdArr.join('|'));
}
// regexp for something known not to be translated.
//function updateNotToTranslatePattern(UpdArr){
//	RT_globsto("patternsKnown",UpdArr.join('|'));
//}
function updateDictionary(UpdArr) {
	//debugger;
	var dictStr = "";
	if (RT_globExists("dictionary")) {
		dictStr = RT_globlod("dictionary");
	}
	var addSet = new Set(UpdArr);
	RT_globsto("dictionary", gSet(union(sSet(dictStr), addSet)));
}

function isInDictionary(t) {
	t=drys(t);
	//debugger;
	var dic=sSet(RT_globlod("dictionary"));
	// a string in a string that is in dictionary is ok
	if(t.startsWith("\"")&&t.endsWith("\"")&&isInDictionary(t.slice(1,-1)) ){return true;}
	// ignore leading and trailing blanks 
	if(dic.has(t.trim())){return true;}
	// test if we have here a latex fragment e.g. "\bar{"
	var matchCmd =t.match(RegExp('\\\\[^\\{|^\\s]*'));// \something could be if we find "something" in dictionary Latexmerge 
	if(matchCmd){
		try {
		 var match2=t.match(RegExp("^\\s*\\"+matchCmd[0]+"\\s*\\{*\\s*$"));
			} catch (e) {
				return false;
			}
		if(match2){
			var dict = RT_globlod("Latexmerge");
  			var cmd = matchCmd[0].slice(1);
			return dict.has(cmd)
			}
	} else {return false;}
	return false;
}
function drys(s) { return s.trim().replace(/\s+/g, ' ') }
//function purgeKnown(s) { return s.replace(RegExp(RT_globlod("patternsKnown"),'g'),"");}
function isNotToTranslate(t) {
		t=drys(t);
		//t=purgeKnown(t);
		var returnVal= (t.match(RegExp('^[^a-zA-Z]*[A-Za-z][^a-zA-Z]*$','g'))) || //a single letter
		(t.match(RegExp('^[^a-zA-Z]*$','g')));//non alphabetic sequence
//		var temp=t;
//		temp=temp.replace(
//			RegExp(
//				'[^a-zA-Z]+[A-Za-z][^a-zA-Z]+|^[A-Za-z][^a-zA-Z]+|[^a-zA-Z]+[A-Za-z]$','g'
//			),
//			function(match){
//				 return match.replace(/[A-Za-z]/g, '')
//			 }
//		);
		returnVal=returnVal||!(t.match(/[A-Za-z]{2,}/));
		//console.log(t);
		//console.log(returnVal);
		return returnVal;
}
//------------------

function KnowSubsInit(dict) {	
	 RT_globsto("KnownSubs",dict);
	 console.log("Subs init");
}
function KnowSubs(item) {
	 var dict = RT_globlod("KnownSubs");
	if(dict.has(item)){return dict.get(item);}
	else {return null;}
}