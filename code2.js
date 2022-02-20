var v=42; //scope global
function f2() {
	debugger;
  var x,y; // scope all the function
  {
    let z = v;  // scope the block
	x=v;y=w;
     }
}