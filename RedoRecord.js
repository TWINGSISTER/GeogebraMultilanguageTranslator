/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */

// the dashboard for the documentation facility buttons  doc  snap,  store
function dashDocCreateBtns(){
	RT_createButton("ZZ000STORE","SAVE");
	//RT_graphicButton("ZZ000STORE",9993);
	RT_createButton("ZZ000DOCUMENT","REPORT");//"🗎");
	//RT_graphicButton("ZZ000DOCUMENT",9113);
	RT_createButton("ZZ000DOCSNAP","SNAP");//"🖎");
	//RT_graphicButton("ZZ000DOCSNAP",9998);
	}
function RT_R_LinkBtn(){
	ggbApplet.registerObjectClickListener("ZZ000STORE", "RT_R_StoreHndl")
	ggbApplet.setVisible("ZZ000STORE", true);
	ggbApplet.registerObjectClickListener("ZZ000DOCUMENT", "RT_R_DocHndl")
	ggbApplet.setVisible("ZZ000DOCUMENT", true);
	ggbApplet.registerObjectClickListener("ZZ000DOCSNAP", "RT_R_SnpHndl")
	ggbApplet.setVisible("ZZ000DOCSNAP", true);
	}
function RT_R_exportsnap (cont) {ggbApplet.exportPDF(1,cont);}

function RT_R_oneHndl(){
	ggbApplet.evalCommand('Text("Risposta Registrata")');
	RT_R_log();
	alert("Snapshot taken");
	RT_R_saveHistory(()=>{RT_outcoreGlob();});
}
function RT_R_oneHndl2(){
	ggbApplet.evalCommand('Text("Risposta Registrata")');
	ggbApplet.evalCommand('SetActiveView("G")');
	RT_R_log();
	ggbApplet.evalCommand('SetActiveView("D")');
	RT_R_log();
	alert("Snapshot taken");
	RT_R_saveHistory(()=>{RT_outcoreGlob();});
}
function RT_unlockPoint(P){
	var Px=ggbApplet.getXcoord(P);
	var Py=ggbApplet.getYcoord(P);
	ggbApplet.evalCommand(P+'=('+Px.toString()+','+Py.toString()+')');
}
function RT_R_Visible(Str){
	var alltr = ggbApplet.getAllObjectNames();
	for (objName of alltr) {
		console.log(objName);
		var objType = ggbApplet.getObjectType(objName) + "";
		if (RT_isTranslation(objName)) { continue; } // leave aux objects
		if (RT_isGlob(objName)) { continue; } // leave aux objects
		switch (objType) {
			case "text":
			default: continue;
  		}
  	}
  	return false;
}

function RT_R_SuccessValidate(BtnStr){
// the boolean variable MoodleSuccess is fed to grade  
if(ggbApplet.exists('MoodleSuccess')){
 var grade=ggbApplet.getValue('MoodleSuccess');
 var message='grade='+grade.toString();
 ggbApplet.evalCommand(message);
 //ggbApplet.evalCommand('grade',ggbApplet.getValue('MoodleSuccess'));
}
//ggbApplet.evalCommand('grade=1');
ggbApplet.evalCommand('MoodleValidated=true');
RT_R_Snapshot2Add();
ggbApplet.evalCommand('Delete('+BtnStr+')');
}


// REDO
/* RT_unlock not used anymore
function RT_unlockPoint(P){
	var Px=ggbApplet.getXcoord(P);
	var Py=ggbApplet.getYcoord(P);
	ggbApplet.evalCommand(P+'=('+Px.toString()+','+Py.toString()+')');
}
*/
var RT_R_snapper; // holds the string for the object name whose deletiion will trigger snapping.
function RT_R_Snapshot2Add(button){
	debugger;
	if(!(button===RT_R_snapper))return;
	ggbApplet.unregisterRemoveListener();
	ggbApplet.setRepaintingActive(false);
    var mark=ggbApplet.getValue('grade');
    var markColor;
    if(mark>=0.9){ markColor="Light green";}
    else if(mark<=0.1){ markColor="Light Purple";}
    else{ markColor="Light Yellow";}
	ggbApplet.evalCommand('Text("MARK RECORDED:'+mark.toString()+'/1")\nSetActiveView("G")\nC_1=Corner(1,1)\nC_2=Corner(1,2)\nC_1wh=Corner(1,5)');
	var w1=ggbApplet.getXcoord('C_1wh');
	if (!isNaN(w1)) {
		var h1=ggbApplet.getYcoord('C_1wh');
		//ggbApplet.deleteObject('C_1wh');
		var C1x=ggbApplet.getXcoord('C_1');
		var C1y=ggbApplet.getYcoord('C_1');
		//ggbApplet.deleteObject('C_1');
		var C2x=ggbApplet.getXcoord('C_2');
		var C2y=ggbApplet.getYcoord('C_2');
		//ggbApplet.deleteObject('C_2');
		var c12imgx=C1x+1.0;
		var c12imgy=C1y+1.0;
		//var c12imgx=(C1x+C2x)/2.0+2.0;
		//var c12imgy=(C1y+C2y)/2.0+2.0;
		var c12img='('+c12imgx.toString()+','+c12imgy.toString()+')';
		var c2bx=C2x-1.0;
		var c2by=C2y+1.0;
		//var c2bx=C2x-2.0;
		//var c2by=C2y+2.0;
		var c2b='('+c2bx.toString()+','+c2by.toString()+')';
		ggbApplet.evalCommand('C_12='+c12img+'\nC_2b='+c2b+
		'\nSetVisibleInView(C_12,1,false)'+
		'\nSetVisibleInView(C_2b,1,false)'+
		'\nSetBackgroundColor("'+markColor+'")'+
		'\nsnap1 = ExportImage("view", 1, "corner",C_12,"corner2",C_2b,"height",'+
		h1.toString()+',"width",'+w1.toString()+',"transparent",false)'+
		'\nSetVisibleInView(C_12,1,true)'+
		'\nSetVisibleInView(C_2b,1,true)'+
		'\nSetBackgroundColor("White")');
	}
	ggbApplet.evalCommand('SetActiveView("D")\nC_3=Corner(2,1)\nC_4=Corner(2,2)\nC_2wh=Corner(2,5)');
	var w2=ggbApplet.getXcoord('C_2wh');
	var h2=ggbApplet.getYcoord('C_2wh');
	if (!isNaN(w2)) {
		//ggbApplet.deleteObject('C_2wh');
		var C3x=ggbApplet.getXcoord('C_3');
		var C3y=ggbApplet.getYcoord('C_3');
		//ggbApplet.deleteObject('C_3');
		var C4x=ggbApplet.getXcoord('C_4');
		var C4y=ggbApplet.getYcoord('C_4');
		//ggbApplet.deleteObject('C_4');
		var c34imgx=(C3x+C4x)/2.0+2.0;
		var c34imgy=(C3y+C4y)/2.0+2.0;
		var c34img='('+c34imgx.toString()+','+c34imgy.toString()+')';
		var c4bx=C4x-2.0;
		var c4by=C4y+2.0;
		var c4b='('+c4bx.toString()+','+c4by.toString()+')';
		ggbApplet.evalCommand('C_34='+c34img+'\nC_4b='+c4b+
		'\nSetVisibleInView(C_34,2,false)'+
		'\nSetVisibleInView(C_4b,2,false)'+
		'\nSetBackgroundColor("'+markColor+'")'+
		'\nsnap2 = ExportImage("view", 2, "corner",C_34,"corner2",C_4b,"height",'+
		h2.toString()+',"width",'+w2.toString()+
		',"transparent",false)'+
		'\nSetBackgroundColor("White")');
	}
ggbApplet.setRepaintingActive(true);
RT_R_snapper="";// if not multiple events are created. 
alert("Snapshot taken");
}
	/* old code 
//ggbApplet.deleteObject(button);
	ggbApplet.evalCommand('SetActiveView("D")');
	ggbApplet.evalCommand('C_3=Corner(2,1)');
	ggbApplet.evalCommand('C_4=Corner(2,2)');
	ggbApplet.evalCommand('C_34=(C_3+C_4)/2+(2,2)');RT_unlockPoint('C_34');
	ggbApplet.evalCommand('C_4b=C_4+(-2,2)');RT_unlockPoint('C_4b');
	ggbApplet.evalCommand('C_2wh=Corner(2,5)');
	ggbApplet.evalCommand('w_2=x(C_2wh)');
	ggbApplet.evalCommand('h_2=y(C_2wh)');
	ggbApplet.evalCommand('SetBackgroundColor("Light green")');
	ggbApplet.evalCommand('snap2 = ExportImage("view", 2, "corner",C_34,"corner2",C_4b,"height",h_2,"width",w_2)');
	ggbApplet.evalCommand('SetBackgroundColor("White")');
	ggbApplet.deleteObject("Valider");
	*/


/* RT_R_sample not used
function RT_R_sample(button){
	debugger;
	ggbApplet.evalCommand('SetActiveView("G")');
	ggbApplet.setRepaintingActive(false);
	ggbApplet.evalCommand('C_1=Corner(1,1)\nC_2=Corner(1,2)\nC_1wh=Corner(1,5)');
	RT_unlockPoint('C1');RT_unlockPoint('C2');
	var w1=ggbApplet.getXcoord('C_1wh');
	var h1=ggbApplet.getYcoord('C_1wh');
	ggbApplet.deleteObject('C_1wh');
	var C1x=ggbApplet.getXcoord('C_1');
	var C1y=ggbApplet.getYcoord('C_1');
	//ggbApplet.deleteObject('C_1');
	var C2x=ggbApplet.getXcoord('C_2');
	var C2y=ggbApplet.getYcoord('C_2');
	//ggbApplet.deleteObject('C_2');
	//var imgx=C1x+1.0;
	//var imgy=C1y+1.0;
	//var img='('+imgx.toString()+','+imgy.toString()+')';
	//var c2bx=C2x-1.0;
	//var c2by=C2y+1.0;
	//var c2b='('+c2bx.toString()+','+c2by.toString()+')';
	var c12imgx=(C1x+C2x)/2.0+2.0;
	var c12imgy=(C1y+C2y)/2.0+2.0;
	var c12img='('+c12imgx.toString()+','+c12imgy.toString()+')';
	var c2bx=C2x-2.0;
	var c2by=C2y+2.0;
	var c2b='('+c2bx.toString()+','+c2by.toString()+')';
	ggbApplet.evalCommand('IMG='+c12img+'\nIMGEND='+c2b+'\nSetBackgroundColor("Light green")\nsnap1 = ExportImage("view", 1, "corner",IMG,"corner2",IMGEND,"height",'+h1.toString()+',"width",'+w1.toString()+')\nSetBackgroundColor("White")');
	//ggbApplet.evalCommand('SetBackgroundColor("Light green")\nsnap1 = ExportImage("view", 1, "corner",C_1,"corner2",C_2,"height",'+h1.toString()+',"width",'+w1.toString()+')\nSetBackgroundColor("White")');
	//ggbApplet.evalCommand('IMG='+img+'\nIMGEND='+c2b+'\nSetBackgroundColor("Light green")\nsnap1 = ExportImage("view", 1, "corner",IMG,"corner2",IMGEND,"height",'+h1.toString()+',"width",'+w1.toString()+')\nSetBackgroundColor("White")');
	ggbApplet.setRepaintingActive(true);
	ggbApplet.evalCommand('SetActiveView("D")');
	ggbApplet.setRepaintingActive(false);
	ggbApplet.evalCommand('C_3=Corner(2,1)\nC_4=Corner(2,2)\nC_2wh=Corner(2,5)');
	var w2=ggbApplet.getXcoord('C_2wh');
	var h2=ggbApplet.getYcoord('C_2wh');
	if (!isNaN(w2)) {
		ggbApplet.deleteObject('C_2wh');
		var C3x=ggbApplet.getXcoord('C_3');
		var C3y=ggbApplet.getYcoord('C_3');
		//ggbApplet.deleteObject('C_3');
		var C4x=ggbApplet.getXcoord('C_4');
		var C4y=ggbApplet.getYcoord('C_4');
		//ggbApplet.deleteObject('C_4');
		var c34imgx=(C3x+C4x)/2.0+2.0;
		var c34imgy=(C3y+C4y)/2.0+2.0;
		var c34img='('+c34imgx.toString()+','+c34imgy.toString()+')';
		var c4bx=C4x-2.0;
		var c4by=C4y+2.0;
		var c4b='('+c4bx.toString()+','+c4by.toString()+')';
		ggbApplet.evalCommand('SetBackgroundColor("Light green")\nsnap2 = ExportImage("view", 2, "corner",'+c34img+',"corner2",'+c4b+',"height",'+h2.toString()+',"width",'+w2.toString()+')\nSetBackgroundColor("White")');
		ggbApplet.setRepaintingActive(true);
	}
	//ggbApplet.undo();
	//ggbApplet.redo();
	alert("Snapshot taken");
	ggbApplet.deleteObject(button);
}
*/
function RT_R_snapInit(ObjName){
RT_R_snapper=ObjName;
//ggbApplet.evalCommand("PRN=Button()");
//ggbApplet.setVisible("PRN",false);
//ggbApplet.registerObjectClickListener("PRN",'RT_R_Snapshot2Add');
ggbApplet.registerRemoveListener('RT_R_Snapshot2Add');
}

//REDO END
/*
 RT_R_sample old version can delete 
function RT_R_sample(button){
	debugger;
	ggbApplet.evalCommand('SetActiveView("G")');
	ggbApplet.setRepaintingActive(false);
	ggbApplet.evalCommand('C_1=Corner(1,1)\nC_2=Corner(1,2)\nC_1wh=Corner(1,5)');
	RT_unlockPoint('C1');RT_unlockPoint('C2');
	var w1=ggbApplet.getXcoord('C_1wh');
	var h1=ggbApplet.getYcoord('C_1wh');
	ggbApplet.deleteObject('C_1wh');
	var C1x=ggbApplet.getXcoord('C_1');
	var C1y=ggbApplet.getYcoord('C_1');
	//ggbApplet.deleteObject('C_1');
	var C2x=ggbApplet.getXcoord('C_2');
	var C2y=ggbApplet.getYcoord('C_2');
	//ggbApplet.deleteObject('C_2');
	//var imgx=C1x+1.0;
	//var imgy=C1y+1.0;
	//var img='('+imgx.toString()+','+imgy.toString()+')';
	//var c2bx=C2x-1.0;
	//var c2by=C2y+1.0;
	//var c2b='('+c2bx.toString()+','+c2by.toString()+')';
	var c12imgx=(C1x+C2x)/2.0+2.0;
	var c12imgy=(C1y+C2y)/2.0+2.0;
	var c12img='('+c12imgx.toString()+','+c12imgy.toString()+')';
	var c2bx=C2x-2.0;
	var c2by=C2y+2.0;
	var c2b='('+c2bx.toString()+','+c2by.toString()+')';
	ggbApplet.evalCommand('IMG='+c12img+'\nIMGEND='+c2b+'\nSetBackgroundColor("Light green")\nsnap1 = ExportImage("view", 1, "corner",IMG,"corner2",IMGEND,"height",'+h1.toString()+',"width",'+w1.toString()+')\nSetBackgroundColor("White")');
	//ggbApplet.evalCommand('SetBackgroundColor("Light green")\nsnap1 = ExportImage("view", 1, "corner",C_1,"corner2",C_2,"height",'+h1.toString()+',"width",'+w1.toString()+')\nSetBackgroundColor("White")');
	//ggbApplet.evalCommand('IMG='+img+'\nIMGEND='+c2b+'\nSetBackgroundColor("Light green")\nsnap1 = ExportImage("view", 1, "corner",IMG,"corner2",IMGEND,"height",'+h1.toString()+',"width",'+w1.toString()+')\nSetBackgroundColor("White")');
	ggbApplet.setRepaintingActive(true);
	ggbApplet.evalCommand('SetActiveView("D")');
	ggbApplet.setRepaintingActive(false);
	ggbApplet.evalCommand('C_3=Corner(2,1)\nC_4=Corner(2,2)\nC_2wh=Corner(2,5)');
	var w2=ggbApplet.getXcoord('C_2wh');
	var h2=ggbApplet.getYcoord('C_2wh');
	if (!isNaN(w2)) {
		ggbApplet.deleteObject('C_2wh');
		var C3x=ggbApplet.getXcoord('C_3');
		var C3y=ggbApplet.getYcoord('C_3');
		//ggbApplet.deleteObject('C_3');
		var C4x=ggbApplet.getXcoord('C_4');
		var C4y=ggbApplet.getYcoord('C_4');
		//ggbApplet.deleteObject('C_4');
		var c34imgx=(C3x+C4x)/2.0+2.0;
		var c34imgy=(C3y+C4y)/2.0+2.0;
		var c34img='('+c34imgx.toString()+','+c34imgy.toString()+')';
		var c4bx=C4x-2.0;
		var c4by=C4y+2.0;
		var c4b='('+c4bx.toString()+','+c4by.toString()+')';
		ggbApplet.evalCommand('SetBackgroundColor("Light green")\nsnap2 = ExportImage("view", 2, "corner",'+c34img+',"corner2",'+c4b+',"height",'+h2.toString()+',"width",'+w2.toString()+')\nSetBackgroundColor("White")');
		ggbApplet.setRepaintingActive(true);
	}
	//ggbApplet.undo();
	//ggbApplet.redo();
	alert("Snapshot taken");
	ggbApplet.deleteObject(button);
}


function RT_R_Snapshot2Add(){
	debugger;
 	var grade=ggbApplet.getValue('grade');
 	var message='"Re Pnt:'+grade.toString()+'"';
	ggbApplet.evalCommand("Re="+message);
	ggbApplet.evalCommand('SetActiveView("G")');
	ggbApplet.evalCommand('C_1=Corner(1,1)');
	ggbApplet.evalCommand('C_2=Corner(1,2)');
	ggbApplet.evalCommand('C_1wh=Corner(1,5)');
	ggbApplet.evalCommand('w_1=x(C_1wh)');
	ggbApplet.evalCommand('h_1=y(C_1wh)');
	ggbApplet.evalCommand('C_12=(C_1+C_2)/2+(2,2)');//RT_unlockPoint('C_12');
	ggbApplet.evalCommand('C_2b=C_2+(-2,2)');//RT_unlockPoint('C_2b');
	ggbApplet.evalCommand('SetBackgroundColor("Light green")');
	ggbApplet.evalCommand('snap1 = ExportImage("view", 1, "corner",C_12,"corner2",C_2b,"height",h_1,"width",w_1)');
	ggbApplet.evalCommand('SetBackgroundColor("White")');
	ggbApplet.evalCommand('SetActiveView("D")');
	ggbApplet.evalCommand('C_3=Corner(2,1)');
	ggbApplet.evalCommand('C_4=Corner(2,2)');
	ggbApplet.evalCommand('C_34=(C_3+C_4)/2+(2,2)');//RT_unlockPoint('C_34');
	ggbApplet.evalCommand('C_4b=C_4+(-2,2)');//RT_unlockPoint('C_4b');
	ggbApplet.evalCommand('C_2wh=Corner(2,5)');
	ggbApplet.evalCommand('w_2=x(C_2wh)');
	ggbApplet.evalCommand('h_2=y(C_2wh)');
	ggbApplet.evalCommand('SetBackgroundColor("Light green")');
	ggbApplet.evalCommand('snap2 = ExportImage("view", 2, "corner",C_34,"corner2",C_4b,"height",h_2,"width",w_2)');
	ggbApplet.evalCommand('SetBackgroundColor("White")');
	//ggbApplet.undo();
	//ggbApplet.redo();
	alert("Snapshot taken");
}
END of deletable code no longer used
*/
function RT_R_SnpHndl(){
	debugger;
	RT_R_log();
	alert("Snapshot taken");
}

function RT_R_StoreHndl(){
	//alert("RT_GGBEXIT called!");
	//debugger;
	RT_R_saveHistory(()=>{RT_outcoreGlob();});
}

function RT_GGBExitHook() {
	RT_R_StoreHndl();
}

function RT_R_DocHndl(){RT_dumpsteps(RT_globlod("THISFILENAME"));}

function RT_dumpsteps(title){
	//debugger;
	let doc = document.implementation.createHTMLDocument(title);
	RT_R_dump(doc);//(x)=>{return x},"",(x) => {return x}); 
	RT_saveFileHtml(title+".html",
			[doc.documentElement.outerHTML],()=>{
	});
}

function RT_R_init(name,fun){
	//debugger;
	type=ggbApplet.getObjectType(name);	
		switch (type) {
		case "button":
		case "slider":
		case "checkbox":
		case "inputbox":
		case "textfield":
		case "point":
			ggbApplet.registerObjectClickListener(name,fun);
			break;
		case "text":
		case 'boolean':
		case "number":
		case "numeric":
			ggbApplet.registerObjectUpdateListener(name,fun);
			break;
		case "undefined":
		default:
		}
	}

//--------------------------------------------------------------------------
// Heuristics for snapshotting 3 channels iterat, ok, err  
// a status encoded in 4 global variables annotated, step err ok
// annotated is true if we have a good chance that the relevant item has already 
// been snapshotted. The number of relevant snapshots is ok+err 
// if step> ok+err+limit we think we went too far and annotated is set to true 
// 
// at least one thing must be initialized by RT_R_init_iterat(name,limit)
// note that ok and err are set to zero so if not used the only cap is on steps
// if err and ok are used the calls to  err and ok must be interleaved at list by a call to
// iterat
// note that these are per session limits and snapshotting the same situation
// will produce empty deltas and no memory footprint
// 
//--------------------------------------------------------------------------
function RT_R_init_iterat(name,limit){
		RT_globsto("limit", limit);
		RT_globsto("step", 0);
		RT_globsto("err", 0);
		RT_globsto("ok", 0);
		RT_R_init(name,"RT_R_iterat");
		RT_globsto("annotated",false);
}
function RT_R_iterat(){//name)
	//debugger;
		limit=RT_globlod("limit");
		step=RT_globlod("step");
		err=RT_globlod("err");
		ok=RT_globlod("ok");
		if(step<err+ok+limit){
			now=step+1;
			RT_globsto("step",now);
			RT_R_log();//name,"IN EXE! ok:"+ok.toString()+" err:"+now.toString()+" ex:"+step.toString());
			RT_globsto("annotated",false);
		}
}
//--------------------------------------------------------------------------
function RT_R_init_err(name){
		RT_globsto("err", 0);
		RT_R_init(name,"RT_R_err");
}
function RT_R_err(name){
	//debugger;
		if (RT_globlod("annotated")) return;
		iterate=RT_globlod("step");
		err=RT_globlod("err");
		ok=RT_globlod("ok");
		now=err+1;
		RT_globsto("err",now);
		RT_R_log();//name,"ERR! ok:"+ok.toString()+" err:"+now.toString()+" ex:"+iterate.toString());
		RT_globsto("annotated",true);
}
//--------------------------------------------------------------------------
function RT_R_init_ok(name){
		RT_globsto("ok", 0);
		RT_R_init(name,"RT_R_ok");
}
function RT_R_ok(name){
	//debugger;
		if (RT_globlod("annotated")) return;
		ok=RT_globlod("ok");
		now=ok+1;
		RT_globsto("ok",now);
		RT_R_log();
		RT_globsto("annotated",true);
}
// --------- History
// all activities that offer the reporting mechanism comes with an history in the 
// couple of global string GGB variables hisBase and history. If they are not present they
// they are created at the first call to RT_R_saveHistory. 
// Since history takes a lot of space it is saved only before exiting with a call to 
// RT_R_saveHistory that computes the incremental coding of the sequence of snapshots.
// At the beginnig of an activity a call to RT_R_initHistory loads this delta encoded 
// history. The snapshots are attempted heuristically and yet whenever we call RT_R_saveHistory
// When we call thiss (the camera button)  also the current history is transferred into the GGB string and becomes the 
// history will be offered upon reload by a call to RT_R_restoreHistory.    , 
// Therefore the sequence when logging  must be 
// RT_R_initHistory()(RT_R_log()|RT_R_saveHistory())*
// One could  think of going to a certain snapshot change something and proceed in the history
// i.e. do some temporal editing. This is too complex especially if randomized values are used.
// here we heuristically take a number of snapshots, let the user snapshot, provide a report.
//var pic=1; // a snapshot counter
var RT_R_dmpx ;// in intialization = new diff_match_patch();
var RT_R_XMLDump ;// in initialization=[];

function RT_R_initHistory(cont){
	//debugger;
	if(!RT_globExists("hisBase") || !RT_globExists("history")){
		RT_R_XMLDump=[];
		RT_R_saveHistory(()=>{RT_R_restoreHistory();cont();});
		return;
		}
	RT_R_restoreHistory();cont();
}
function RT_R_saveHistory(cont){
		RT_R_getGGBXML((s)=>{
			RT_R_XMLDump.push(s); // put the last snapshot
			RT_globsto("hisBase",RT_base64EncodeUnicode(RT_R_XMLDump[0]));
			var deltas=[];
			var l = RT_R_XMLDump.length;
			var winName=window.document.title
	    	for (let i = 0 ; i < l-1; ++i) {
				var thisdelta=RT_R_delta(RT_R_XMLDump[i],RT_R_XMLDump[i+1]);
				debugger;
				window.document.title="Saving "+i.toString()+"/"+l.toString();
				if(RT_globExists("DELTA")){if(!(thisdelta==="")) deltas.push(thisdelta)}
					else {if (!(RT_R_XMLDump[i]===RT_R_XMLDump[i+1])) deltas.push(thisdelta)}
			}
			RT_globsto("history",deltas);
			RT_R_restoreHistory(); // take advantage of the delta recalculation
			window.document.title=winName;
			cont();
		})
}


function RT_R_restoreHistory(){
	// set the base
		RT_R_XMLDump=[];
		RT_R_XMLDump.push(RT_base64DecodeUnicode(RT_globlod("hisBase")));
		deltas=RT_globlod("history");
	    for (let i = 1, l = deltas.length; i < l+1; ++i) {
			//debugger;
			RT_R_XMLDump.push(RT_R_stepdelta(RT_R_XMLDump[i-1],deltas[i-1]));
		}
		// apply the last recorded status
}

//-- returns a string as the delta between two XML
function RT_R_delta(oldXML,newXML){
	if(RT_globExists("DELTA")){
		newscript=newXML;//RT_base64EncodeUnicode(newXML);
		oldscript=oldXML;//RT_base64EncodeUnicode(oldXML);
		diff = RT_R_dmpx.diff_main(oldscript,newscript);
		RT_R_dmpx.diff_cleanupEfficiency(diff);
		patches=RT_R_dmpx.patch_make(diff);
		return RT_R_dmpx.patch_toText(patches);
	}
	else return newXML; //no delta encoding
}
//--- takes  a XML and a string oldXML strDelta and returns the XML 
//--- strOldXML+strDelta  
function RT_R_stepdelta(oldXML,strDelta){
	//oldscript=RT_base64DecodeUnicode(strOldXML);
	if(RT_globExists("DELTA")){
	patch2=RT_R_dmpx.patch_fromText(strDelta);
	return RT_R_dmpx.patch_apply(patch2, oldXML)[0]; 
	}
	else return strDelta; //no delta encoding
}

function RT_R_dump(doc){//(f,accu,end)//(obj,s)
	for (let index = 0; index < RT_R_XMLDump.length; index++) {
		//debugger;
		newIframe = doc.createElement("iframe");
		newIframe.src = RT_R_XMLDump[index];
		newIframe.height="100%";//"500px";
		newIframe.width="100%" ;
		doc.body.append(newIframe);
	}
}
function RT_R_log(){
	//debugger;
	RT_R_getGGBXML((newscript)=>{
		RT_R_XMLDump.push(newscript);
	});
	return;
}
function RT_R_getGGBXML(cont){
 	RT_R_exportsnap(cont);return; 
}
//-----------------------------------------------------------------------------
// --------- end of History
function RT_R_start(){
	//alert("RT_R_start");
		//debugger;
			RT_initGGBMoodle();
			RT_incoreGlob(); //uncomment if too slow myst revert to outcore before saving
			RT_R_XMLDump=[];
			if( RT_globExists("DELTA"))RT_R_dmpx = new diff_match_patch();
			RT_R_initHistory(()=>{
				RT_R_LinkBtn();
		});
}