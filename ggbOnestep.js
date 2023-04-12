/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
// write an initailization code for a list of object in the applet non existing 
// objects are ignored.
/*
	function init_report_code(Conds,fun){
		var cmd="";
		//debugger;
	    for (let i = 0, l = Conds.length; i < l; ++i) {
			var varval=Conds[i]; // iterat|20,somelese
			//if (typeof varval === 'string' || varval instanceof String)
			//  var variab=varval;
			//else{
			var  variab=varval[0];
			//  val=varval[1];
			 //}
			if(ggbApplet.exists(variab))
				cmd=cmd+
				" "+fun+'("'+
						variab+'"'+
						(varval.length>1?','+varval[1] :'')+
					'); '
		}
		return cmd;
	}
*/
	function substCode(objName,appcode){
		var xmlold=ggbApplet.getXML(objName);
		parser = new DOMParser();
		var xmlDoc = parser.parseFromString(xmlold,"text/xml");
		//var code= xmlDoc.getElementsByTagName("ggbscript")[0];
		//var oldscript = code.attributes['val'].nodeValue;
		//var newscript = oldscript+"\r\n"+appcode;//'\r\nDelete['+objName+']';
		xmlDoc.getElementsByTagName("ggbscript")[0].attributes['val'].nodeValue=appcode;
		var  serializer = new XMLSerializer();
		var  xmlStr = serializer.serializeToString(xmlDoc);
		ggbApplet.evalXML(xmlStr);
	}
	function appendCode(objName,appcode){
		var xmlold=ggbApplet.getXML(objName);
		parser = new DOMParser();
		var xmlDoc = parser.parseFromString(xmlold,"text/xml");
		var code= xmlDoc.getElementsByTagName("ggbscript")[0];
		var oldscript = code.attributes['val'].nodeValue;
		var newscript = oldscript+"\r\n"+appcode;//'\r\nDelete['+objName+']';
		xmlDoc.getElementsByTagName("ggbscript")[0].attributes['val'].nodeValue=newscript;
		var  serializer = new XMLSerializer();
		var  xmlStr = serializer.serializeToString(xmlDoc);
		ggbApplet.evalXML(xmlStr);
	}
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
	function oneReporterFile(fileList,suffix,initcode,inifun,delObjs,appendObjs,substituteObjs,buttons,libs,filter,outcore,filenameon,globs,cont){
		debugger;
		if(fileList.length==0){cont(); return;}
		var file=fileList[0];
		var OtherFiles=fileList.slice(1);
		//var werr=RT_lod("VARWATCHERR")
		//var wok=RT_lod("VARWATCHOK")
		//var iter=RT_lod("VARWATCHITERATION")
		//ggbApplet.getBase64((oldscript)=>{
		//debugger;
			//var globstatesave = RT_packGlobs() ;
			RT_readGGBBase64(file,(ggbtoprocess)=>{
			//debugger;
				ggbApplet.setBase64(ggbtoprocess,()=>{
				//debugger;
					//RT_unpackGlobs(globstatesave);
				//debugger;
					RT_unpackGlobs(globs);//add global variables
					//dashDocCreateBtns();	
					debugger;
	    			for (let i = 0, l = delObjs.length; i < l; ++i) {
						var  variab=delObjs[i];
						if(ggbApplet.exists(variab)){ggbApplet.deleteObject(variab);}
					}
					for (let j = 0, l = appendObjs.length; j < l; ++j) {
						var  variab=appendObjs[j][0];
						var  code=appendObjs[j][1];
						if(ggbApplet.exists(variab)){appendCode(variab,code);}
					}
					for (let k = 0, l = substituteObjs.length; k < l; ++k) {
						var  variab=substituteObjs[k][0];
						var  code=substituteObjs[k][1];
						if(ggbApplet.exists(variab)){substCode(variab,code);}
					}
					var buttonRegCode="";
					var buttonCLBFiles=[];
					for (let n = 0, l = buttons.length; n < l; ++n) {
						var  name=buttons[n][0];
						var  caption=buttons[n][1];
						var  code=buttons[n][2];
						if(!ggbApplet.exists(name)){
							RT_createButton(name,caption);
							buttonRegCode=
							 buttonRegCode+
							'ggbApplet.registerObjectClickListener("'+name+'", "'+code+'");'+
							'ggbApplet.setVisible("'+name+'", true);';
							buttonCLBFiles=
							 buttonCLBFiles.concat(getAllNeededFunctions(filter,code));
						}
					}
 					buttonCLBFiles=[...new Set(buttonCLBFiles)];
					var inifunclosure=[];
					for (let m = 0, l = inifun.length; m < l; ++m) {
						var  code=inifun[m];
						inifunclosure=inifunclosure.concat(getAllNeededFunctions(filter,code));
					}
 					inifunclosure=[...new Set(inifunclosure)];
/*	
					var alltr = ggbApplet.getAllObjectNames();
					for (objName of alltr) {
						var capt=ggbApplet.getCaption(objName, true)+ "";
						if(appendObjs.includes(capt))
						 {
							var xmlold=ggbApplet.getXML(objName);
							parser = new DOMParser();
							var xmlDoc = parser.parseFromString(xmlold,"text/xml");
							var code= xmlDoc.getElementsByTagName("ggbscript")[0];
							var script = code.attributes[0].nodeValue;
							script=script+'\r\nDelete['+objName+']';
							xmlDoc.getElementsByTagName("ggbscript")[0].val(script);
							var  serializer = new XMLSerializer();
							var  xmlStr = serializer.serializeToString(xmlDoc);
							gbApplet.evalXML(xmlStr);
							//var xmlalgold= ggbApplet.getAlgorithmXML(objName);
						 }
						if(delObjs.includes(capt))
						 {ggbApplet.deleteObject(objName);}
						}
						*/
					//---
					ggbApplet.getBase64((payload)=>{
						//Object.getOwnPropertyNames(diff_match_patch.prototype)
						// var diff_match_patch = diff_match_patch.toString()
						// Object.getOwnPropertyNames(diff_match_patch.prototype)
						// Object.getOwnPropertyNames(diff_match_patch)
						// JSON.stringify(diff)
						var libslist =(libs.length!=0?strlist(libs[0]):"");
						var rootfname=file.name.slice(0,-4);
						var fname=rootfname+suffix+".ggb";
						var handle="innerGgbOnInit";
						//alert("writing");debugger;
						var i=0;
						while(eval("typeof " + handle+i.toString())=== 'function')i++;
						var ggbiniton=
							"function ggbOnInit(){"+
							(outcore?"RT_incore=false;":"RT_incore=true;")+ //if true we are using JS global variables.
							// this is supposed to be faster but it is not persistent. If false we store in text variables in GGB
							handle+i.toString()+"();"+
							"RT_loader(["+libslist+"],()=>{"+  
							//"RT_incoreGlob();"+ // this turns on incore
							//"RT_R_XMLDump=[]; RT_R_initHistory(()=>{ });"+
							initcode+
							//Automated reporting to be added "RT_R_start();"+
							buttonRegCode+
							//Automated reporting to be added init_report_code(delButtons,"RT_R_init_err")+
							//Automated reporting to be added init_report_code(snapButtons,"RT_R_init_ok")+
							//Automated reporting to be added init_report_code(substituteObjs,"RT_R_init_iterat")+
							(filenameon?'RT_globsto("THISFILENAME","'+rootfname+'");':'')+
							// Moodle Geogebra STAC TO BE ADDED 'try   {RT_initHook(); }catch(e){};'+
							//'if(arguments.length>0){RT_bootdo(arguments[0])}'+
							//'RT_globsto("FILEMANE",'+fname+'
							// STAC NEEDS FUNCTIONS RT_GGBExitHook""RT_initGGBMoodle" 
							"})}";
							//var funclist=["RT_loader","RT_incoreGlob"].concat(buttonCLBFiles.concat(inifunclosure));//,filter,//["RT_R_","RT_"],
							var funclist=(outcore?["RT_incore","RT_loader"]:["RT_incore","RT_loader","RT_incoreGlob"]);
							var funclist=funclist.concat(buttonCLBFiles.concat(inifunclosure));//,filter,//["RT_R_","RT_"],
							funclist=[...new Set(funclist)];
						
						injectNeededCode(handle+i.toString()+"()",
						ggbiniton,
						funclist,
							//"RT_saveFileHtml",""RT_outcoreGlob",
							//	"RT_globsto","RT_globlod","RT_globExists","RT_incoreGlob",
							//	"RT_packGlobs","RT_wipeGlobs","RT_isGlob","RT_lod",
							//,"RT_incore","RT_loader","RT_unCommandStringify",RT_base64DecodeUnicode	
							//	],
							fname,payload,
							()=>{
								oneReporterFile(OtherFiles,suffix,initcode,inifun,delObjs,appendObjs,substituteObjs,buttons,libs,filter,outcore,filenameon,globs,cont);
							});
					});
				//wipeGlobs();
						// construction ready to be saved to file.name.slice(0,-4)+"-FL.ggb"
						// ggbApplet.getBase64((__payload)=>{
			  		//		{
					//			debugger;
					//			saveGGB(file.name.slice(0,-4)+"-RP.ggb",payload,
					//					debugger;
					//					ggbApplet.setBase64(oldscript,()=>{
					//						//RT_unpackGlobs(globstatesave);
					//						debugger;
				});
			});
								// restore globals for further processing
							//});
			//			});
			//			});
		// save to it
	//				});
	}
function clickToOnestep(){
	debugger;
	var delObjs=[];
	var appendObjs=[];
	var substituteObjs=[];
	var libs="";
	var suffix="";
	var initcode="";
	var inifun="";
	var buttons="";
	var filter="";
	var outcore=false;
	var filenameon=false;
	if(ggbApplet.exists("VARDEL")){delObjs=getparlist("VARDEL").flat();}
	if(ggbApplet.exists("VARAPPEND")){appendObjs=getparlist("VARAPPEND");}
	if(ggbApplet.exists("VARSUBSTITUTE")){substituteObjs=getparlist("VARSUBSTITUTE");}
	if(ggbApplet.exists("VARSUFFIX")){suffix=RT_lod("VARSUFFIX");}
	if(ggbApplet.exists("VARINITCODE")){initcode=RT_lod("VARINITCODE");}
	if(ggbApplet.exists("VARINIFUN")){inifun=getparlist("VARINIFUN").flat();}
	if(ggbApplet.exists("VARLIBS")){libs=getparlist("VARLIBS").flat();}
	if(ggbApplet.exists("VARBUTTONS")){buttons=getparlist("VARBUTTONS");
	if(ggbApplet.exists("VARFILTER")){filter=getparlist("VARFILTER").flat();}	
	if(ggbApplet.exists("VAROUTCORE")){outcore=RT_lod("VAROUTCORE");}
	if(ggbApplet.exists("VARFILENAME")){filenameon=RT_lod("VARFILENAME");}
	}
	foundConditions=(delObjs.length+appendObjs.length+substituteObjs.length);
		//if (foundConditions>0){
	  		if(confirm("Do you want to add reporting with the given "+foundConditions.toString()+" buttons")){
	 			selectFiles(true,".ggb",(list)=>{
					secureSection((globs,cont)=>{oneReporterFile(list,suffix,initcode,inifun,delObjs,appendObjs,substituteObjs,buttons,libs,filter,outcore,filenameon,globs,cont)})
				});
 	  		}
		//}
 	 //else {alert("Please set some condition to trigger reporting");}
 }