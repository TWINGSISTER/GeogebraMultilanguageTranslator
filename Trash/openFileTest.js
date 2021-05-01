/**
 * 
 */


function init()
{ggbApplet.registerClearListener("loadCompleted");
ggbApplet.registerUpdateListener("loadCompleted");
function loadCompleted(){
		alert("load done");
	}
ggbApplet.openFile("test.ggb");
}