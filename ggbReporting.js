/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

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

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
	function reporterFile(fileList,errConds,okConds,iterationConds,libs,globs,cont){
		//debugger;
		if(fileList.length==0){cont(); return;}
		var file=fileList[0];
		var OtherFiles=fileList.slice(1);
		//var werr=RT_lod("VARWATCHERR")
		//var wok=RT_lod("VARWATCHOK")
		//var iter=RT_lod("VARWATCHITERATION")
		//ggbApplet.getBase64((oldscript)=>{
		//debugger;
			//var globstatesave = RT_packGlobs() ;
			readGGBBase64(file,(ggbtoprocess)=>{
			//debugger;
				ggbApplet.setBase64(ggbtoprocess,()=>{
				//debugger;
					//RT_unpackGlobs(globstatesave);
				//debugger;
					RT_unpackGlobs(globs);//add global variables
					dashDocCreateBtns();	
					ggbApplet.getBase64((payload)=>{
						//Object.getOwnPropertyNames(diff_match_patch.prototype)
						// var diff_match_patch = diff_match_patch.toString()
						// Object.getOwnPropertyNames(diff_match_patch.prototype)
						// Object.getOwnPropertyNames(diff_match_patch)
						// JSON.stringify(diff)
						var libslist =(libs.length!=0?strlist(libs[0]):"");
						var rootfname=file.name.slice(0,-4);
						var fname=rootfname+"-RP.ggb";
						var handle="innerGgbOnInit";
						//alert("writing");debugger;
						var i=0;
						while(eval("typeof " + handle+i.toString())=== 'function')i++;
						var ggbiniton=
							"function ggbOnInit(){"+handle+i.toString()+"();"+
							"RT_loader(["+libslist+"],()=>{"+  
							"RT_incore=false;RT_R_start();"+
							init_report_code(errConds,"RT_R_init_err")+
							init_report_code(okConds,"RT_R_init_ok")+
							init_report_code(iterationConds,"RT_R_init_iterat")+
							'RT_globsto("THISFILENAME","'+rootfname+'");'+
							'try   {RT_initHook(); }catch(e){};'+
							//'if(arguments.length>0){RT_bootdo(arguments[0])}'+
							//'RT_globsto("FILEMANE",'+fname+'
							"})}";
						
						injectNeededCode(handle+i.toString()+"()",
						ggbiniton,
				//	[]
							["RT_R_","RT_"],
							//"RT_saveFileHtml","RT_GGBExitHook","RT_outcoreGlob",
							//	"RT_globsto","RT_globlod","RT_globExists","RT_incoreGlob",
							//	"RT_packGlobs","RT_wipeGlobs","RT_isGlob","RT_lod",
							//"RT_initGGBMoodle","RT_incore","RT_loader","RT_unCommandStringify",RT_base64DecodeUnicode	
							//	],
							fname,payload,
							()=>{
								reporterFile(OtherFiles,errConds,okConds,iterationConds,libs,globs,cont);
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
function clickToReporter(){
	debugger;
	var iterationConds=[];
	var errConds=[];
	var okConds=[];
	var libs="";
	if(ggbApplet.exists("VARWATCHITERATION")){iterationConds=getparlist("VARWATCHITERATION");}
	if(ggbApplet.exists("VARWATCHOK")){okConds=getparlist("VARWATCHOK");}
	if(ggbApplet.exists("VARWATCHERR")){errConds=getparlist("VARWATCHERR");}
	if(ggbApplet.exists("VARLIBS")){libs=getparlist("VARLIBS");}
	if(ggbApplet.exists("VARDELTA"))
		if(ggbApplet.getValue("VARDELTA"))RT_globsto("DELTA",true)
		else RT_globdel("DELTA")
	else RT_globdel("DELTA");
	foundConditions=(errConds.length+okConds.length+iterationConds.length);
		//if (foundConditions>0){
	  		if(confirm("Do you want to add reporting with the given "+foundConditions.toString()+" conditions")){
	 			selectFiles(true,".ggb",(list)=>{
					secureSection((globs,cont)=>{reporterFile(list,errConds,okConds,iterationConds,libs,globs,cont)})
				});
 	  		}
		//}
 	 //else {alert("Please set some condition to trigger reporting");}
 }