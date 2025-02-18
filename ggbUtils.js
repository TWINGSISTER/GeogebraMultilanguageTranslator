/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//---takes the name of a text object and returns an array of 
// parameters a,b,c|1,d returns an array of length 4 where
// the third element is of length 2
//-----------------------------------------------------------------------
function	secureSection(action){
	var globstatesave = RT_packGlobs();
	ggbApplet.getBase64((oldscript)=>{
	//debugger;
		action(globstatesave,()=>{
			//debugger;
			RT_wipeGlobs();
			ggbApplet.setBase64(oldscript,
				()=>{RT_unpackGlobs(globstatesave);});
		});
	});
}
//a returns the number of elements in a list 
// uses  a throwaway variable
function listlen(ls){ 
	ggbApplet.evalCommand("n235711=Length["+ls+"]");
	var ret=ggbApplet.getValue("n235711");
	//ggbApplet.deleteObject("n235711"); ///interact with delete object
	return ret;
}
// returns the i-th element (first at 1) of a list
function listget(ls,i){ 
	var ret=ls+"_"+i.toString();
	ggbApplet.evalCommand(ret+"=Element["+ls+","+i.toString()+"]");
	//var ret=ggbApplet.getValue("n235711");
	//ggbApplet.deleteObject("n235711");
	return ret;
}

// set the i-th element (first at 1) of a list
function listset(ls,i,objName){ 
	ggbApplet.evalCommand("setValue("+ls+","+i.toString()+","+objName+")");
}

function strlist(ls){ 
var ret= "";
	    for (let i = 0, l = ls.length; i < l; ++i) 
	    	ret= ret+',"'+ls[i]+'"';
return ret.slice(1);
}
function intgetparlist(s,sep){ 
	if(sep.length===0)  return s.trim();
	var pars=s.split(sep[0]);
	if(pars.length===1 && pars[0]==="")  return [];
	var retpars=[];
	    for (let i = 0, l = pars.length; i < l; ++i) 
		 retpars.push(intgetparlist(pars[i].trim(),sep.slice(1)));
	return retpars;
}
/*
function getparmap(s,sep1,sep2){
	if (ggbApplet.exists(s)) var candretval=RT_lod(s); else return [];
	return intgetparlist(candretval,[sep1,sep2]);
}
*/
function getparlist(s){
	if (ggbApplet.exists(s)) var candretval=RT_lod(s); else return [];
	return intgetparlist(candretval,['#','%']);
}
//----------------------------------------------------------------------
function RT_deleteButton(name){
            ggbApplet.deleteObject(name);
}

//----------------------------------------------------------------------
// returns a graphics view without objects if any, if not returns 2
//----------------------------------------------------------------------
function RT_freeView(){
	//debugger;
	var alltr = ggbApplet.getAllObjectNames();
	var notTwo=false;
	for (name of alltr) {if(ggbApplet.getVisible(name, 2)){notTwo=true;break;} }
	if(notTwo){
		var notOne=false;
		for (name of alltr) {if(ggbApplet.getVisible(name, 1)){notOne=true;break;} }
		if(notOne){return 2;}else {return 1;}
	}else {return 2;}
}

function RT_createAux(name,storecmd,space){
	//debugger;
	if (!RT_globExists("buttonpos")) {
        RT_globsto("buttonpos",[10,10])
    }
    if (!RT_globExists("freeview")) {
        RT_globsto("freeview",RT_freeView())
    }
	var pos = RT_globlod("buttonpos");
	// create button name with caption 
	var vw=RT_globlod("freeview"); // graphics view to use 1 or 2
	var viewcmd = "SetVisibleInView(\"" + name + "\","+vw.toString()+",true)";
	var noviewcmd = "SetVisibleInView(\"" + name + "\","+(vw==1?"2":"1")+",false)";
	var actvcmd = "SetActiveView(" + vw.toString() + ")"; // View "D" or
//	var storecmd = name + " = Button(\"" + caption + "\")";
	RT_EvalCmd(actvcmd);
	RT_EvalCmd(storecmd);
	RT_EvalCmd(viewcmd);
	RT_EvalCmd(noviewcmd);
	var setcoordstr = "SetCoords(\""+name+"\","+
		pos[0].toString()+","+pos[1].toString()+")"
	RT_EvalCmd(setcoordstr);
	ggbApplet.setCoords(name,pos[0],pos[1] );
    RT_globsto("buttonpos",[pos[0]+space,pos[1]]);
	//script ggbApplet.SetPerspective("+D")
}
function RT_createButton(name,caption){
	var storecmd = name + " = Button(\"" + caption + "\")";
	RT_createAux(name,storecmd,45);
}
// progress bar with slider
function RT_setProgressBar(name,value){
            ggbApplet.setValue(name,value);ggbApplet.refreshViews()
}
function RT_createProgressBar(name,range){
	var storecmd = name + " = Slider(1,"+range.toString()+",1,1,200)";
	RT_createAux(name,storecmd,200);
}
function RT_removeProgressBar(name){
            ggbApplet.deleteObject(name);
}
function RT_graphicButton(name,unicode){
	var storecmd = name + " = Button(UnicodeToText({"+unicode.toString()+"}))";
	RT_EvalCmd(storecmd);
}
//----------------------------------------------------------------------
/*beware this set the construction but the initialization 
code is unchanged and you cannot control the time the changed ggb il actually 
loaded 
function setXMLasy(XMLStr){
	debugger;
	JSONPayload=ggbApplet.getFileJSON();
	if(!RT_globExists("mountXML")){
		for ( let j in JSONPayload.archive ) {
			if(JSONPayload.archive[j].fileName==="geogebra.xml")
			{mount=j;break;}
		}
		RT_globsto("mountXML",mount);
	}
	JSONPayload.archive[RT_globlod("mountXML")].fileContent=XMLStr;
	ggbApplet.setFileJSON(JSONPayload);
}
*/
//----------------------------------------------------------------------
// These two functions provide support for the updated distribution of ggbs
// timestampGGB sets a timestamp for the creation of the GGB and records 
// NOT USEFUL
// the URL where to find updated versions. 
function timestampGGB(URL){
		RT_globsto("timestampGGB",Date.now());
		RT_globsto("timestampURL",URL);
}

function RT_updateGGB(cont){
		var ggbtimestamp=RT_globlod("timestampGGB");
		var URL=RT_globlod("timestampURL",URL);
		var xhr = new XMLHttpRequest();
		xhr.open("GET", URL, true);
		xhr.onreadystatechange = function() {
 	   			// readystate 2, headers recieved
 	   			var nettimestamp=0;
 	   			if (this.readyState == 2){
             		nettimestamp=this.getResponseHeader("Last-Modified");
        			if (netttimestamp){
					if(ggbtimestamp<nettimestamp){
		 				RT_globsto("timestampGGB",nettimestamp);
						RT_readGGBBase64(URL, (ggbtoprocess)=>{ggbApplet.setBase64(ggbtoprocess,cont)})
					}
        			} else { }
    			}
			}
		/* 
		xhr.onload = (e) => {
  			if (xhr.readyState === 4) {
    			if (xhr.status === 200) {
      			console.log(xhr.responseText);
    			} else {
      			console.error(xhr.statusText);
    			}
  			}
		};
		*/
		xhr.onerror = (e) => {
		};
	xhr.send(null);
}