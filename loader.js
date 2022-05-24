/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
// load a list of javascript files and returns them as a string.
/* No longer used
function loadtostring(scripts,cont){
	var doc = document.implementation.createHTMLDocument("tempjs"); 
	var head =doc.getElementsByTagName('head').item(0);
    // debugger;
	loadall(scripts,doc,head,0,cont)
}
function loadall(scripts,doc,head,ref,cont){
    if(scripts.length>0){
    	var script = doc.createElement('script');
    	script.src = scripts[0];
		script.id="scr"+ref.toString();
    	script.type = 'text/javascript';
    	script.async = false;
	   	if(scripts.length==1) {
			script.onload = ()=> {
				debugger;
				var code ="";
				for (i = 0; i < ref+1; i++){;
					code = code+doc.getElementById("scr"+i.toString()).innerHTML;
		 		} 
				cont(code);
		 } 
				debugger;
    		head.appendChild(script);
		} else {
    		head.appendChild(script);
			loadall(scripts.slice(1),doc,head,ref+1)
		}
	}
}*/
//function loader(scripts,modules,entry){ 
function loader(scripts,entry){RT_loader(scripts,entry);}
function RT_loader(scripts,entry){  
    debugger;
    if(scripts.length>0){
    	var script = document.createElement('script');
    	script.src = scripts[0];
    	script.type = 'text/javascript';
    	//script.defer = false;
    	script.async = false;
	   //	if(scripts.length==1&& modules.length==0){ script.onload = new Function(entry); } else{script.onload = loader(scripts.slice(1),modules,entry);  }
	   	if(scripts.length==1){
		if (typeof entry === 'string' || entry instanceof String)
			script.onload = new Function(entry);
		else
			script.onload = entry;
    	//var endScript = document.createElement('script');
		//script.textContent=entry;
		//endScript.onload=new Function(entry);
    	//endScript.type = 'text/javascript';
    	//endScript.defer = true;
    	//endScript.async = false;
    	//document.getElementsByTagName('head').item(0).appendChild(endScript);
    	document.getElementsByTagName('head').item(0).appendChild(script);
	  } else
		{
    		document.getElementsByTagName('head').item(0).appendChild(script);
			RT_loader(scripts.slice(1),entry);
		 }
		//{script.onload = loader(scripts.slice(1),entry);  }
	}else{entry();}
    /*else{
    if(modules.length>0){
    	var script = document.createElement('script');
    	script.src = modules[0];
    	script.type = 'text/javascript+module';
    	script.defer = true;
    	document.getElementsByTagName('head').item(0).appendChild(script);
	   	if(modules.length==1){
	   		script.onload = new Function(entry);
		} else {
	   		script.onload = loader(scripts,modules.slice(1),entry);
    	 }
	} 
	}*/
}