//Create the canvas, then collect the height and width
var a, b, c, canvas;


//to prevent error during loading, make sure that
//the canvas is loaded first before calling any methods
window.onload = function(){
canvas = document.getElementById("paper");
c = canvas.getContext("2d");
a = canvas.width;
b = canvas.height;
}

//in the instance, create all thngs
try{
//pan is the length of scroll
//zooms is the current number of zoom
//panX is the upper left Corner
//panY is the bottom left Corner
//zf is the increase factor in the zoom
//maxI is the total number of iteration
//per complex number
//create pallete to color mandelbrot by
//using rainbowvis.js
var pan = 0.01;
var zooms = 50;
var panX = -1.0;
var panY = -2.0;
var zf = 50;
var maxI = 100;
var ticks = 0;

var pallete = new Rainbow();
pallete.setSpectrum("#000764","#206bcb","#edffff","#ffaa00","#000200");
pallete.setNumberRange(0,maxI);

//create mandelbrot function that 
//accepts zooms, panX and panY
function mandelbrot(zm, panX, panY){
//reset ticks
ticks = 0;
//px - Canvas x
//py - canvas y
//x - real x
//y - imaginary y

var px, py, x, y; 

//loop from y's, then loop all x's

for(py = 0; py < a; py++){
	for(px = 0; px < b; px++){
	
	//zoom factors
	x = panX + px/zm;
	y = panY + py/zm;
	
	//x=-.50 + px/1200;
	//y=-.74 + py/1200;
	
	var xOld = x;
	var yOld = y;
	
	var r = 0;
	var i;
	//
	for(i = 0; i < maxI; i++){
	ticks++
	var xNew = (xOld * xOld) - (yOld * yOld) - x;
	var yNew = (2 * xOld * yOld) - y;
	

	var r = Math.sqrt((xNew * xNew) + (yNew * yNew));
	if((xNew * xNew + yNew * yNew ) > 4){
	break;
	}
	
	xOld = xNew;
	yOld = yNew;
	
	}
	//color
	var shade = pallete.colourAt(i);
	c.fillStyle = "#"+shade;
	c.fillRect(px,py,1,1);
	}
}
console.log("Total ticks: " + ticks + ", Is Freezing ? Then Click Reset Button...");
}
//reset :-)
function work(){
document.getElementById("xa").value = -1;
document.getElementById("ya").value = -2;
document.getElementById("za").value = 50;

pan = 0.01;
zooms = 50;
panX = -1.0;
panY = -2.0;
zf = 50;
maxI = 50;
pallete.setNumberRange(0,maxI);

show();
mandelbrot(50, -1.0, -2.0);
}

//left to right scroll adjustment
function xScroll(n){
var temp = n ? parseFloat(document.getElementById("xa").value) + pan : parseFloat(document.getElementById("xa").value) - pan;
document.getElementById("xa").value = temp;
panX = temp;
show();
mandelbrot(zooms, temp, panY);
}

//top to bottom scroll adjustment
function yScroll(n){
var temp = n ? parseFloat(document.getElementById("ya").value) + pan : parseFloat(document.getElementById("ya").value) - pan;
document.getElementById("ya").value = temp;
panY = temp;
show();
mandelbrot(zooms, panX, temp);
}

//zoom in function
function zoomIn(){
zooms = zooms + zf;
pan = (panX + 2 / zooms) - (panX - 1 / zooms);
document.getElementById("za").value = zooms;

if(0 < zooms && zooms < 100){
pallete.setNumberRange(0,100);
maxI = 100;
}else if(100 < zooms && zooms < 1000){
pallete.setNumberRange(0,255);
maxI = 255;
}else if(1000 < zooms && zooms < 10000){
pallete.setNumberRange(0,500);
maxI = 500;
}

show();
mandelbrot(zooms, panX, panY);
}

//zoom out function
function zoomOut(){
zooms = zooms - zf;
pan = (panX + 2 / zooms) - (panX - 1 / zooms)
document.getElementById("za").value = zooms;

if(zooms < 100){
pallete.setNumberRange(0,50);
maxI = 50;
}else if(zooms > 100 && zooms < 1000){
pallete.setNumberRange(0,100);
maxI = 100;
}else if(zooms > 1000 && zooms < 10000){
pallete.setNumberRange(0,255);
maxI = 255;
}
show();
mandelbrot(zooms, panX, panY);
}

//adjust zoomfactor
function zoomFactor(){
var temp = document.getElementById("zf").value;
zf = parseInt(temp);
show();
}

//show details
function show(){
var temp = "Scroll: " + pan + "<br /> Current zoom: " + zooms + "<br /> topLeftX: " +  panX + "<br /> topRightY: " + panY + "<br /> zoom factor: " +  zf + "<br /> max iterations of loop: " + maxI;
document.getElementById("dtls").innerHTML = temp;
}

/*favorable zoom
-0.373346235978374
-0.6582261932152258
7000

-0.3618206208864465
-0.6453957620586814
155300315925100
*/
}catch(e){

throw "Error: " + e ;

}