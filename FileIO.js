/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//export
function saveFileHtml(fname,htmlContent,...args) {
	// htmlContent must be an array of strings, each representing the portion of an HTML document
  //var htmlContent = [ "<head><meta charset='utf-8'><title>Test</title></head>", "<style>.container{max-width: 940px;margin: 0 auto;}</style>", "<body><div class=\"container\">'Content Here'</div></body>" ];
  //var htmlContent = ["your-content-here"];
  var bl = new Blob(htmlContent, {type: "text/html"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(bl);
  a.download =fname;
  a.hidden = true;
  document.body.appendChild(a);
  a.innerHTML = "Save file hidden by CSS";
  if(args.length>0){a.addEventListener('click',args[0], {once : true});}
  a.click();
}
function readFileHtml(file,charencoding,callback) {
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    callback(reader.result);}, false, {once : true});
//debugger;
    //reader.readAsDataURL(file);
    reader.readAsText(file,charencoding);
}

//---------------------------------------------------
// callback(s) where s is  the .ggb  for file handle as a string
//---------------------------------------------------
function readGGBBase64(file,callback) {
//function previewFile() 
//  const file = document.querySelector('input[type=file]').files[0];
//debugger;

  var reader = new FileReader();
  reader.addEventListener("load", function () {
    // convert file to base64 string using reader.result
	var result=reader.result.replace("data:application/vnd.geogebra.file;base64,","")
	// no replace before...
	//debugger;
    callback(result);}, false, {once : true});
    reader.readAsDataURL(file);
}

function saveGGB(fname,GGBContent,...args) {
	// htmlContent must be an array of strings, each representing the portion of an HTML document
  //var htmlContent = [ "<head><meta charset='utf-8'><title>Test</title></head>", "<style>.container{max-width: 940px;margin: 0 auto;}</style>", "<body><div class=\"container\">'Content Here'</div></body>" ];
  //var htmlContent = ["your-content-here"];
	//debugger;
  var a = document.createElement("a");
  a.setAttribute('href', 'data:text/plain;base64,' + GGBContent);
  a.download =fname;
  a.hidden = true;
  document.body.appendChild(a);
  a.innerHTML = "Save file hidden by CSS";
  if(args.length>0){a.addEventListener('click',args[0], {once : true});}
  a.click();
}
function selectFiles(multi,pattern,...args){ 
	// the last argument is a function to which is passed 
	// the fileList 
	//debugger;
	var fileList;
	var fileSelector = document.createElement('input');
	fileSelector.setAttribute('type', 'file');
	fileSelector.style.display = 'none';
    fileSelector.setAttribute('multiple',multi)
    fileSelector.setAttribute('accept',pattern);
			function fileL(){
				//debugger;
				fileList=fileSelector.files;
				var strhandles =[];
					var dir=fileList[0].webkitRelativePath;
				var numFiles = fileList.length;
				var filenameArray=[fileList,dir];
				var confirmString="Selected "+numFiles.toString()+" files from folder "+ dir+"\r\n";
				for (let i = 0 ; i <numFiles; i ++){
						const file = fileList [i];
					filenameArray.push(file.name);
					strhandles.push(JSON.stringify(file));
					confirmString=confirmString+file.name+"\r\n";
					}
				if(args.length>0){args[0]([...fileList]);}
				RT_globsto("selectedFiles",filenameArray);
				RT_globsto("selectedhandles",strhandles);
				if(args.length>0){alert(confirmString);}else{confirm(confirmString);}
    			document.body.removeChild(fileSelector);
    			document.body.removeChild(selectDialogueLink);
			};
	fileSelector.addEventListener('change',fileL, {once : true});
    document.body.appendChild(fileSelector);
	var selectDialogueLink = document.createElement('a');
	selectDialogueLink.setAttribute('href', '');
	selectDialogueLink.innerText = "Select File"
	selectDialogueLink.hidden=true;
	selectDialogueLink.onclick = function () {
 		fileSelector.click();
 		return false;
	}
	document.body.appendChild(selectDialogueLink);
	selectDialogueLink.click();
}
/*
function test(){
	function loadXML(file){
		//debugger;
		ggbApplet.openFile(file.name);
	}
selectFiles(true,".ggb",loadXML);
	filenameArray=			RT_globlod("selectedFiles");
		strhandles=		RT_globlod("selectedhandles");
}
*/