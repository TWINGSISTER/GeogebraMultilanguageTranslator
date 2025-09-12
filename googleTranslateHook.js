/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 * 
 */
 function translateHtml(fname,origlang,trlist,html,cont){
 debugger;
 //translates and saves html then passes to cont()
  if(trlist.length===0){cont();return;}
  else{
   var to=trlist[0];
	 	translateOneHtml(fname,origlang,to,html,
 	   			(htmltrad)=>{RT_saveFileHtml(fname+"_"+to,htmltrad,
 	   				()=>{translateHtml(fname,origlang,trlist.slice(1),html,cont);}
 	   			)}
        ); 
   }
  }
 
 function splitHTML(html,limit){
	//debugger;
	var strBits = html.match(/<[^> ]+[^>]*>[^<]*/g);
	var head="";
	var tail="";
	var filled=false;
	for (let str of strBits) {
		if(head.length+str.length<limit&& !filled) {head=head+str;} else{filled=true;tail=tail+str;}
	}
	return [head,tail];
}

 /* async */ function translateOneHtml(fname,from,to,html,cont){
 // translates and passes to cont(htmltran)
	if(html.length<=2000){
		var URLBASE="https://script.google.com/macros/s/AKfycbxchOU_VYyIW0CB0EkjZnk_E6PAoLExVMi2JaRWYuvgbjZ4_xZ0cw6fBytMvrpYkVwv/exec";
		var URL=URLBASE+"?from="+from+"&to="+to+"&text="+html;
		/* 
		let response = await fetch(URL);
  			debugger;
		if (response.ok) { // se l'HTTP-status è 200-299
  			let json = await response.json();
			} else {
  					alert("HTTP-Error: " + response.status);
			}
			*/
		var xhr = new XMLHttpRequest();
		xhr.onload = (e) => {
				debugger;
  				if (xhr.readyState === 4) {
    				if (xhr.status === 200) {cont(xhr.responseText);return;
    				} else { console.log(xhr.statusText); }
  				}
  			}
		xhr.onerror = (e) => {console.log(xhr.statusText);}//debugger; 
		// do not use statechange just onload and error
		//xhr.onprogress = () => {} ; // readyState will be 3 ;
		/*
		xhr.onreadystatechange = function() {
			//debugger;
 	   		// readystate 2, headers recieved
 	   		if (this.readyState == 2||this.readyState == 3 ){return;} 
 	   		if (this.readyState == 4 && this.status == 200 ){cont(this.responseText);return;} 
 	   		//only 4 is ok
			} 
			*/
		xhr.open("GET", URL, true); //true is async=true 
		xhr.send(null);
	}else{// htmltobedone too long
		[htmlhead,htmltail]=splitHTML(html,2000);
	 	translateOneHtml(fname,from,to,htmlhead,
 	   		(htmlheadtrad)=>{
				translateOneHtml(fname,from,to,htmltail,
 	   				(htmltailtrad)=>{
						//RT_saveFileHtml(fname+"_"+to,htmlheadtrad+htmltailtrad,cont);
						cont(htmlheadtrad+htmltailtrad);return; 
					}
			)}
		)
	}
}
/*
 	   				()=>{translateHtml(fname,origlang,to.slice(1),html,cont)}
	 	(translation)=>{};cont)

  	()=>{translateHtml(fname,origlang,trlist.slice(1),html,cont);}
 }
 }
function translateHTMLcont(fname,origlang,trlist,htmlContent,cont){
  if(htmlcontent.length===0){cont();return;}
  else{translateHTML(fname,from,to.slice(1),html,"",html,cont),return;}
}
function translateHTML(fname,from,to,html,htmltobedone,htmldone,cont){
	debugger;alert("go to translate");
	if(to.length===0){cont();return;}
	else{
			// split htmltobedone int htmltobedonehead and htmltobedonetail
			[htmltobedonehead,htmltobedonetail]=spliHTML(htmltobedone,2000);
			var URL=URLBASE+"?from="+from+"&to="+to[0]+"&text="+htmltobedonehead;
			xhr.open("GET", URL, true);
			xhr.onreadystatechange = function() {
				debugger;
				var htmldone2=htmldone+htmltobedonehead; // recover the translation of htmltobedonehead
 	   			translateHTML(fname,from,to,html,htmldone2,htmltobedonetail)
			}//too long
		
		}//too long
		xhr.send(null);
 	}
}
*/