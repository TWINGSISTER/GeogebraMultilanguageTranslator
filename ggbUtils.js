/**
 * 
 */
//----------------------------------------------------------------------
function deleteButton(name){
            ggbApplet.deleteObject(name);
}

//----------------------------------------------------------------------
// returns a graphics view without objects if any, if not returns 2
//----------------------------------------------------------------------
function freeView(){
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

function createButton(name,caption){
	//debugger;
	if (!RT_globExists("buttonpos")) {
        RT_globsto("buttonpos",[5,5])
    }
	var pos = RT_globlod("buttonpos");
	// create button name with caption 
	var vw=RT_globlod("freeview"); // graphics view to use 1 or 2
	var viewcmd = "SetVisibleInView(\"" + name + "\","+vw.toString()+",true)";
	var noviewcmd = "SetVisibleInView(\"" + name + "\","+(vw==1?"2":"1")+",false)";
	var actvcmd = "SetActiveView(" + vw.toString() + ")"; // View "D" or
	var storecmd = name + " = Button(\"" + caption + "\")";
	ggbApplet.evalCommand(actvcmd);
	ggbApplet.evalCommand(storecmd);
	ggbApplet.evalCommand(viewcmd);
	ggbApplet.evalCommand(noviewcmd);
	var setcoordstr = "SetCoords(\""+name+"\","+
		pos[0].toString()+","+pos[1].toString()+")"
	ggbApplet.evalCommand(setcoordstr);
	ggbApplet.setCoords(name,pos[0],pos[1] );
    RT_globsto("buttonpos",[pos[0]+45,pos[1]]);
	//script ggbApplet.SetPerspective("+D")
}
//----------------------------------------------------------------------