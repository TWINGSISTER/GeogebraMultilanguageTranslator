/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */

	//-----------------------------------------------------------------------
	//postprocessing  Correct known false translations
	//-----------------------------------------------------------------------
	

	function updateFalsePair(LangTo,UpdTriples) {
		debugger;
		var globName = LangTo+"falsepair";
		var addMap= new Map(UpdTriples);
		var map  = new Map();
		if (RT_globExists(globName)) {
			map = RT_globlod(globName);
		}
		RT_globsto(globName,new Map([...map, ...addMap]) );
	}
	function filterdom(dom,LangTo){
		debugger;
		var globName = LangTo+"falsepair";
		var map  = new Map();
		if (RT_globExists(globName)) {
			map = RT_globlod(globName);
		}
		var nodes=dom.querySelectorAll('*[data-title]');
		for (node of nodes) {
			var key =node.attributes["data-title"].nodeValue;
			if(map.has(key))node.innerHTML=makeatextdiv(map.get(key)); 
		}
		return dom;
	}
	function filterFalsePair(key,returnString){
		debugger;
		var tl=RT_glolod("filterlang")
		return returnString;
		var globName = tl+"falsepair"
		var map=RT_globlod(globName);
		return (map.has(key)?map.get(key):returnString);
	}

