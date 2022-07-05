/**
 * http://usejsdoc.org/
 */
function FK_TK_sto(name, value) {
	switch (typeof value) {
		case 'string':
			RT_EvalCmd(name + "=" + "\"" + value + "\"");
			RT_hideObject(name);
			break;
		case 'boolean':
		case 'number':
			RT_EvalCmd(name + "=" + value.toString());
			RT_hideObject(name);
			break;
		case 'undefined':
		default:
			//if(value instanceof Set){
			// RT_EvalCmd(name+"SJSON" + "=" + "\"" +setStringify(value) + "\"");
		    //RT_hideObject(name+"SJSON");
			//}else{
			 RT_EvalCmd(name+"JSON" + "=" + "\"" +RT_noCommandStringify(value) + "\"");
		    RT_hideObject(name+"JSON");
			//}
	}
}
// returns the GeoGebra value string that must be translated in object name, 
// or a scalar value if any
function FK_TK_lod(name) {
	if (ggbApplet.exists(name+"JSON"))
	  {var ret=ggbApplet.getValueString(name+"JSON" , false) + "";
		return RT_unCommandStringify(ret) ;}
	var objType = ggbApplet.getObjectType(name) + "";
	switch (objType) {
		case "text":
			return ggbApplet.getValueString(name, false) + "";
		case "button":
		case "slider":
		case "checkbox":
		case "inputbox":
		case "textfield":
		case "point":
			//return ggbApplet.getCaption(name, false) + "";
		case 'boolean':
		case "number":
		case "numeric":
			return ggbApplet.getValue(name);
		case "undefined":
		default:
			return "NOTRANS";
	}
}


function TK_TrackOneUpdate(ObjName)
{debugger;
	// track only native objects not those added as global objects
	// could be language selection is a problem
	if(!RT_isGlob(ObjName)) 
	{
 		var updwatch=(ggbApplet.getXML(ObjName));	
 		var upd=RT_noCommandStringify(ggbApplet.getXML(ObjName));	
		
		//	return RT_unCommandStringify(ret) ;}
		//RT_globsto("TRACK",
		//	RT_globlod("TRACK").append([ObjName,TK_lod(ObjName)])
		//);
	}
}
function TK_InitTrackingActions()
{
	debugger;
	// add a copy of the original ggb if not already there
	//	if (!RT_globExiststs("START")){ggbApplet.getBase64((startscript)=>{RT_globsto("START", startscript)}};
	// add an history of the modifications if not already there
	//	if (!RT_globExiststs("TRACK")){RT_globsto("TRACK",[])};
	// start the listener
	 ggbApplet.registerUpdateListener("TK_TrackOneUpdate");
	//  if enabled create the rewind and next  buttons if not already there
}
function addTrack()
{
	//debugger;
	var ggboninit = "function ggbOnInit(){trackInit();TK_InitTrackingActions();}";
	var hndl = "trackInit()";
	var prefixes=  ["TK_",
		"RT_isGlob",
		"RT_unCommandStringify",
		"RT_noCommandStringify",
		"RT_base64DecodeUnicode",
		"RT_base64EncodeUnicode"];//,"RT_globExists","RT_globsto","RT_globlod"];
	injectNeededCode(hndl,ggboninit,prefixes)//(payload,cont)
}