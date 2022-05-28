/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//-----------------------------------------------------------------------
// All strings that needs translation are moved into ggb TEXT objects
// the created TEXT object is named after the name of the object in which is 
// refeenced adding the suffix REF<n> So if a object FOO needs to
// strings to be translated FOOREF1 and FOOREF2  are created
// Uses isInDictionary so a call to updateDictionary(["\\text{", "}....] is needed before using this.
// It parses Latex code so a call to LatexHandle(new Map([["text",1],["frac",2]...]));
// The map contains Latex commands as keys and the number of parameters as values 
//-----------------------------------------------------------------------
function breakifyoucan(objName) {
	// break and take care of newline hardwired chars
	var tobreak= RT_lodtrans(objName);
	var tobreaknonl;
	if(isLatexOn(objName)){ // the string is a Latex string
	 tobreaknonl = tobreak.replace(/(\n)/gm, "");
		} else {
	 tobreaknonl = tobreak.replace(/(\n)/gm, "\\\\n");
	}
	//var tobreaknonl = tobreak.replace(/(\n)/gm, "\\\\n");
	//tobreaknonl=escapeUnicodes(tobreaknonl,[60,62])
	//var tobreaknonl = tobreak.replace(/</gm, " UnicodeToLetter(60)");
	//var tobreaknonl = tobreak.replace(/>/gm, " UnicodeToLetter(62)");
	var broken;
	if (!RT_simpleText(objName)||RT_usingStrings(tobreaknonl))   {
		 broken=splitcmd(tobreaknonl); 
		} else {
		 broken=splitstr(tobreaknonl); 
	}
	if (broken.endsWith("+\"\"")) {broken=broken.slice(0,-3);}
	if (!(broken===tobreak)) { stostring(objName, objName, broken,false); } 
}

function flatten() {
	var alltr = ggbApplet.getAllObjectNames();
	for (objName of alltr) {
		var objType = ggbApplet.getObjectType(objName) + "";
		if (RT_isTranslation(objName)) { continue; } // leave aux objects
		if (RT_isGlob(objName)) { continue; } // leave aux objects
		switch (objType) {
			case "text":
				breakifyoucan(objName);
  		}
  	}
	var alltr = ggbApplet.getAllObjectNames();
	var toflat=false;
	var refs = new Map();
	for (objName of alltr) {
	var objType = ggbApplet.getObjectType(objName) + "";
	if (RT_isTranslation(objName)) { continue; } // leave aux objects
	if (RT_isGlob(objName)) { continue; } // leave aux objects
	switch (objType) {
		case "text" :
			//breakifyoucan(objName);
			{
				if (!RT_simpleText(objName))   {
					var	command = RT_getformula(objName);
					//debugger;
					command = command.replace(/(\n)/gm, "\\\\n");
					//command = command.replace(/\s+/g, ' '); // sometimes not .trim(); // one space is enough in any occasion
					var i=0;
					var flattened= command.replace(
						RegExp('"[^"]*"', 'g'),
						function(matchstr) {
							//debugger;
							if(fragmentLatex(matchstr)||isInDictionary(matchstr)||pureLatex(matchstr))
								{return matchstr;}
							toflat=true;
							i++;
							var tostore =matchstr.slice(1,-1);
							if(refs.has(tostore)){reference =refs.get(tostore);}// fetch and store
							else {reference =objName+"REF"+i.toString();RT_sto(reference,tostore);refs.set(tostore,reference)}
							return "FormulaText(" + reference + ",false)";
						}
					);
					stostring(objName, objName, flattened,false); 
				}
			}
		default:
	}
  }
if(!toflat) {/*alert("This document do not use strings in text commands");*/ }
}
//-----------------------------------------------------------------------
// a code for a Flatten button. The action open a file dialog to select several GGBs
// that need flattening. The procedure creates for each XXX.ggb a XXX-FL.ggb
//-----------------------------------------------------------------------
	function flattenFile(fileList){
		//debugger;
		if(fileList.length==0){ return;}
		var file=fileList[0];
		var OtherFiles=fileList.slice(1);
		var origlang=RT_lod("VARORIGLANGUAGE");
		//var doTrack=RT_lod("VARTRACK")
		//var ctrlRandom=RT_lod("VARCTRLRANDOM")
		ggbApplet.getBase64((oldscript)=>{
			var globstatesave = RT_packGlobs() ;
			//ggbApplet.openFile(file.name);
			readGGBBase64(file,(ggbtoprocess)=>{
				ggbApplet.setBase64(ggbtoprocess,()=>{
				 	innerglobstatesave = RT_packGlobs() ;//untested
					RT_unpackGlobs(globstatesave);
					//debugger;
					flatten();
					//debugger;
					//ggbApplet.getBase64((storeOrig)=>{
			  			//if(doTrack){addTrack();}
						//ctrlRandomize(ctrlRandom,ggbtoprocess);//()=>
						var wd=dumptrans(file.name.slice(0,-4),null); // .ggb off
						// delete all globs, stay as close as possible to original document.
						RT_wipeGlobs();
						RT_unpackGlobs(innerglobstatesave);// untested
						// construction ready to be saved to file.name.slice(0,-4)+"-FL.ggb"
						ggbApplet.getBase64((__payload)=>{
						ggbApplet.getBase64((payload)=>
			  				{saveGGB(file.name.slice(0,-4)+"-FL.ggb",payload,
								()=>{
			  						RT_saveFileHtml(
										file.name.slice(0,-4)+"-FL-"+origlang+".html",
										[wd.documentElement.outerHTML],()=>{
										ggbApplet.setBase64(oldscript,()=>{
											RT_unpackGlobs(globstatesave);
											RT_sto("VARORIGLANGUAGE",origlang);
											flattenFile(OtherFiles);
										});
									});
								});
								// restore globals for further processing
							});
						});
						});
		// save to it
					//});
			});
		});
	}
function clickToFlatten(){
	// init globals for flattening
	// do the job
	//debugger;
	if(ggbApplet.exists("VARORIGLANGUAGE")){language=RT_lod("VARORIGLANGUAGE").replaceAll(" ","");
		if (language.length==2){
	  		if(confirm("Do you want to work with files in "+language)){
	 			selectFiles(true,".ggb",flattenFile);
 	  		}
		}
 	} else {altert("Please set the two letter code for the origianal language");}
 }