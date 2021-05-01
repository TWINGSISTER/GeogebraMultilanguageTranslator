/**
 * http://usejsdoc.org/
 */
//export
function saveFileHtml(fname,htmlContent) {
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
  a.click();
}
function selectFiles(multi,pattern){ 
	//debugger;
	var fileList;
	//var style = "top=10, left=10, width=400, height=250, status=no, menubar=no, toolbar=no scrollbars=no";
	//var win = window.open("", "",style);
	// document = win.document;
	var fileSelector = document.createElement('input');
	fileSelector.setAttribute('type', 'file');
	fileSelector.style.display = 'none';
    fileSelector.setAttribute('multiple',multi)
    fileSelector.setAttribute('accept',pattern);
			function fileL(){
				//debugger;
				fileList=fileSelector.files;
					var dir=fileList[0].webkitRelativePath;
				var numFiles = fileList.length;
				var filenameArray=[fileList,dir];
				var confirmString="Selected "+numFiles.toString()+" files from folder "+ dir+"\r\n";
				for (let i = 0 ; i <numFiles; i ++) {
						const file = fileList [i];
					filenameArray.push(file.name);
					confirmString=confirmString+file.name+"\r\n";
					}
				globsto("selectedFiles",filenameArray);
				confirm(confirmString);
    			document.body.removeChild(fileSelector);
    			document.body.removeChild(selectDialogueLink);
			};
	fileSelector.addEventListener('change',fileL);
	//fileSelector.addEventListener('input',fileL);
    document.body.appendChild(fileSelector);
	var selectDialogueLink = document.createElement('a');
	selectDialogueLink.setAttribute('href', '');
	selectDialogueLink.innerText = "Select File"
	//selectDialogueLink.style.display = 'none';
	//		var filehandle;
		//		[fileHandle] = await window.showOpenFilePicker();
		//		const file = await fileHandle.getFile();
		//		const contents = await file.text();
     //       document.body.removeChild(input);
	/*let fileHandle;
	selectDialogueLink.addEventListener('click', () => {
		// Destructure the one-element array.
		try {
		debugger;
		[fileHandle] = window.showOpenFilePicker();
		alert("new library");
    	} catch (err) { console.error(err.name, err.message); }
		// Do something with the file handle.
	});
	*/
	selectDialogueLink.onclick = function () {
 		fileSelector.click();
 		return false;
	}
	document.body.appendChild(selectDialogueLink);
	selectDialogueLink.click();
}
/*
	alert(JSON.stringify(result));
	return result;
	debugger;
	globsto("httpTimeout", 1000); // milliseconds must be greather than 20.
	var result;
    input = document.createElement('input')
    // Set config
    input.setAttribute('multiple','')
    input.setAttribute('accept',".ggb")
    input.setAttribute('type', 'file')
    // IE10/11 Addition
    input.style.display = 'none';
    input.setAttribute('id', 'hidden-file');
    document.body.appendChild(input);
	function fileList(){
		result=input.files};
    input.addEventListener('change',fileList);
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
	applyTimeout();
	alert("Select the file(s) then say OK");
    document.body.removeChild(input);
alert(JSON.stringify(result));
}
foo();
*/
function test(){

//saveFileHtml();
//saveFileHtml();
//var value =asyncFileDialog(true,'.ggb');
//fileDialog();
selectFiles(true,".ggb");
debugger;
	filenameArray=			RT_globlod("selectedFiles");
}
/*
async function foo(){ 
result = await new Promise((resolve) => {
    input = document.createElement('input')
    // Set config
    input.setAttribute('multiple','')
    input.setAttribute('accept',".ggb")
    input.setAttribute('type', 'file')
    // IE10/11 Addition
    input.style.display = 'none';
    input.setAttribute('id', 'hidden-file');
    document.body.appendChild(input);
	function fileList(){
		debugger;
		resolve(input.files)};
    input.addEventListener('change',fileList);
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
	alert("Select the file(s) then say OK");

})
}*/
//foo();
//alert(JSON.stringify(result));
/*
debugger;
globsto("httpTimeout", 1000); // milliseconds must be greather than 20.
var value =asyncFileDialog(true,'.ggb');
	debugger;
alert(JSON.stringify(value));
}
*/
function asyncFileDialog(multi,accpt){
//var skip=false;
var selection;
//function fileReturns(files){
//	debugger;
//	selection=files;
//	skip=true;
//}
fileDialog({ multiple: multi, accept: accpt })//.then(files => {
 //   debugger;
	//selection=files;// files contains an array of FileList
//});//files => {selection = files;});
//while (!skip) {
//	applyTimeout();
//}

return selection;
}
function fileDialog(...args){
debugger;
//	var skip=false;
//	async function waitForSkip(){
//			while (true){
//    		if (skip) {  return; };
//    		await null; // prevents app from hanging
//   		}
//	}
    const input = document.createElement('input')
    // Set config
    if(typeof args[0] === 'object') {
        if(args[0].multiple === true) input.setAttribute('multiple',true)
        if(args[0].accept !== undefined) input.setAttribute('accept',args[0].accept)
    }
    input.setAttribute('type', 'file')
    // IE10/11 Addition
    input.style.display = 'none';
    input.setAttribute('id', 'hidden-file');
    document.body.appendChild(input);
	var FileArray=[];
	function fileList(){
		debugger;
		FileArray=input.files};
    input.addEventListener('change',fileList);
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
	alert("Select the file(s) then say OK");
	return;
//	return FileArray;
//	while (FileArray.length == 0) { applyTimeout(); }
    return  new Promise((resolve, reject) => {
        input.addEventListener('change', e =>{ 
            resolve(input.files);
            const lastArg = args[args.length - 1];
            if (typeof lastArg === "function") {lastArg(input.files);}
            
            // IE10/11 Addition
			alert("Select the file(s) then say OK");
            document.body.removeChild(input);
			
			//skip=true;
        })
        // Simluate click event
        const evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        input.dispatchEvent(evt);
//	while (!skip) {
//		applyTimeout();
//	}
//		waitForSkip();
    });
	applyTimeout();
	//return letitgo; 
	//async function handleinput(){
	//		debugger;
	//	try {
	//		var filehandle;
		//		[fileHandle] = await window.showOpenFilePicker();
		//		const file = await fileHandle.getFile();
		//		const contents = await file.text();
     //       document.body.removeChild(input);
     //	} catch (err) { console.error(err.name, err.message); }
	//}
	//		debugger;
	//input.addEventListener('change',handleinput );
	//	alert("wait for file selection");
}
/*
// Set either CommonJS/AMD/Global
if (typeof define === 'function' && define.amd) {
    define(function () { return fileDialog; });
} else if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = fileDialog;
    }
    exports.fileDialog = fileDialog;
} else {
    global.fileDialog = fileDialog;
}
*/
/*
function openFileDialog(multiple,contentType) {
var input = document.createElement('input');
	input.type = 'file';
    input.multiple = multiple;
    input.accept = contentType;

var skip=false;
var files;

input.onchange = e => { 
		files = e.target.files; 
	skip = true;
}
//<a href="#" onclick="openFileOption();return;">open File Dialog</a>
input.click();
while (!skip) {
	applyTimeout();
}
alert("go");
return files;
*/
/*
var style = "top=10, left=10, width=400, height=250, status=no, menubar=no, toolbar=no scrollbars=no";
var win = window.open("", "",style);
var doc = win.document;
var skip=false;
*/
/*	var input = testo.document.createElement('input');
input.type = 'file';
input.multiple = true;
//input.accept = contentType;
input.onchange = e => { 

   // getting a hold of the file reference
   var file = e.target.files[0]; 

   // setting up the reader
   var reader = new FileReader();
   reader.readAsText(file,'UTF-8');

   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      console.log( content );
	}

}
input.click();
*/
//doc.open();
/*var button = doc.createElement("button");
button.innerHTML = "Do Something";

//2. Append somewhere
var body = doc.getElementsByTagName("body")[0];

//3. Add event handler
let fileHandle;
button.addEventListener('click', async () => {try {
[fileHandle] = await window.showOpenFilePicker();
debugger;
const file = await fileHandle.getFile();
const contents = await file.text();
     } catch (err) { console.error(err.name, err.message); }
skip=true;
});
body.appendChild(button);
*/
/*const openFile = async () => {

// Always returns an array.
const [handle] = await window.showOpenFilePicker();
return handle.getFile();
} catch (err) {
console.error(err.name, err.message);
}
};
openFile();
*/
/*

doc.write("<html>\n");
doc.write(" <head>\n");
doc.write(" <title>Select Files" + "</title>\n");
doc.write(" <basefont size=2 face=Tahoma>\n");
doc.write(" </head>\n");
doc.write("<body>\n");
doc.write("<input type=\"file\" id=\"fileSelezionati\" multiple>");
doc.write("<div id='myLog'> </div>\n");
doc.write("</body>\n");
doc.write("</html>\n");
alert("select a file")
while (!skip) {
	applyTimeout();
}
var fileSelezionati = doc.getElementById("fileSelezionati").files;
var info = doc.getElementById("myLog");
var file;
for (var i=0; i<fileSelezionati.length; i++) {
	file = fileSelezionati[i];
	info.innerHTML = info.innerHTML+file.name+
                 " ("+file.size+" byte, "+
				 file.type+")<br/>";
}	
doc.close();
win.close();
}
*/
