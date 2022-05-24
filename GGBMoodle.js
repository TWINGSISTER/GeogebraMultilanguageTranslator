/**
 * 
 */
function		RT_initGGBMoodle(){
	try {
	adapter.doExit=
		function ()  { 	try  { RT_GGBExitHook(); }catch(e){};
		var duration = Math.floor(new Date().getTime() / 1000) - adapter.startTime;
		adapter.properties.state = adapter.applet.getBase64();
		adapter.properties.grade = adapter.applet.getValue('grade');
		adapter.properties.duration = parseInt(adapter.properties.duration) + duration;
		adapter.encodeProperties();
	}
}catch(e){};
}