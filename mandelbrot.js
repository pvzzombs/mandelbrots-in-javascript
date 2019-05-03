//Create the canvas, then collect the height and width
var a, b, c, canvas;

//zoomon click
var zoomOnClick = true;

//to prevent error during loading, make sure that
//the canvas is loaded first before calling any methods
window.onload = function(){
canvas = document.getElementById("paper");
c = canvas.getContext("2d");
a = canvas.width;
b = canvas.height;
}

document.getElementById("paper").onclick = function(e){
  if(zoomOnClick){
    var mx = panX + e.clientX / zooms;
    var my = panY + e.clientY / zooms;
    zf = 1.5;
    zooms *= zf;
    panX = mx - (e.clientX / zooms);
    panY = my - (e.clientY / zooms);
  }else{
    var mx = panX + e.clientX / zooms;
    var my = panY + e.clientY / zooms;
    zf = 1.5;
    zooms /= zf;
    panX = mx - (e.clientX / zooms);
    panY = my - (e.clientY / zooms);
  }
  
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);
  
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  
  pallete.setNumberRange(0,maxI);
  if(0 < zooms && zooms < 100){
    pallete.setNumberRange(0,100);
    maxI = 100;
  }else if(100 < zooms && zooms < 1000){
    pallete.setNumberRange(0,255);
    maxI = 255;
  }else if(1000 < zooms && zooms < 10000){
    pallete.setNumberRange(0,500);
    maxI = 500;
  }else if(10000 < zooms && zooms < 100000){
    pallete.setNumberRange(0, 750);
    maxI = 750;
  }
  
  show();
  mandelbrot(zooms, panX, panY)
}

function plus(){
  zoomOnClick = true;
}
function minus(){
  zoomOnClick = false;
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
var pan, zooms, panX, panY, zf, maxI = 50, ticks;

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

for(px = 0; px < a; px+=2){
  for(py = 0; py < b; py+=2){
    //zoom factors
	x0 = panX + px/zm;
	y0 = panY + py/zm;
	
	var x = 0;
	var y = 0;
	
	var i = 0;
    var xtemp;
    
	while (x*x + y*y <= 2*2  &&  i < maxI) {
	  ticks++
	  xtemp = x*x - y*y + x0
	  y = 2*x*y + y0
	  x = xtemp
   	  i = i + 1
	}
	
	//coloring
	var shade = pallete.colourAt(i);
	c.fillStyle = "#"+shade;
	c.fillRect(px,py,2,2);
	}
}
console.log("Total ticks: " + ticks + ", Is Freezing ? Then Click Reset Button...");
}

//reset
function work(){
document.getElementById("xa").value = -1;
document.getElementById("ya").value = -2;
document.getElementById("za").value = a/4;

pan = 0.01;
zooms = a / 4;
panX = -2.5;
panY = -2.0;
zf = 50;
maxI = 50;
pallete.setNumberRange(0,maxI);

show();
mandelbrot(zooms, panX, panY);
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