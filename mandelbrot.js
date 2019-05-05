//Create the canvas, then collect the height and width
var a, b, c, canvas, rect;

//zoomon click
var zoomOnClick = true;

//if running
var running = false;

//to prevent error during loading, make sure that
//the canvas is loaded first before calling any methods
canvas = document.getElementById("paper");
c = canvas.getContext("2d");
a = canvas.width;
b = canvas.height;

//when canvas is clicked, call drawOnClick function
canvas.onclick = function(e){
  setTimeout(function(){
	drawOnClick(e);
  }, 10)
}

//changes the mandelbrot set based on mouse clicks
function drawOnClick(e){
rect = canvas.getBoundingClientRect()
  if(zoomOnClick){
    var mx = panX + (e.clientX - rect.left) / zooms;
    var my = panY + (e.clientY - rect.top) / zooms;
    zooms *= zf;
    panX = mx - ((e.clientX - rect.left) / zooms);
    panY = my - ((e.clientY - rect.top) / zooms);
  }else{
    var mx = panX + (e.clientX - rect.left) / zooms;
    var my = panY + (e.clientY - rect.top) / zooms;
    zooms /= zf;
    panX = mx - ((e.clientX - rect.left) / zooms);
    panY = my - ((e.clientY - rect.top) / zooms);
  }
  
  pan = (panX + 2 / zooms) - (panX - 1 / zooms);
  
  document.getElementById("xa").value = panX;
  document.getElementById("ya").value = panY;
  document.getElementById("za").value = zooms;
  
  pallete.setNumberRange(0,maxI);
  if(0 < zooms && zooms < 50){
    pallete.setNumberRange(0, 50);
    maxI = 50;
  }else if(50 < zooms && zooms < 100){
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
  }else if(100000 < zooms && zooms < 1000000){
    pallete.setNumberRange(0, 1000);
    maxI = 1000;
  }else if(1000000 < zooms && zooms < 10000000){
    pallete.setNumberRange(0, 2500);
    maxI = 2500;
  }
  
  show();
  abortRun();
  startRun();
}
//when + was clicked above the canvas
function plus(){
  zoomOnClick = true;
}
//same here
function minus(){
  zoomOnClick = false;
}

//aborts startRun
function abortRun(){
  if(running){running = false}
}

//starts calling mandelbrot
function startRun(){
  //(function(){
	  setTimeout(function(){running = true}, 10);
	  setTimeout(function(){mandelbrot(zooms, panX, panY, 8)}, 10);
	  setTimeout(function(){mandelbrot(zooms, panX, panY, 5)}, 20);
	  setTimeout(function(){mandelbrot(zooms, panX, panY, 1)}, 30);
  //})()
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
var pan, zooms, panX, panY, zf = 1.5, maxI = 50, ticks;

var pallete = new Rainbow();
pallete.setSpectrum("#000764","#206bcb","#edffff","#ffaa00","#000200");
pallete.setNumberRange(0,maxI);

//function that draws the mandelbrot set
// based on current zoom, panX, panY and scale
function mandelbrot(zm, panX, panY, scale){
//cncel run in some case
if(!running){
	return;
}
if(scale === 1){
  running = false;
}
scale = scale || 1;
//reset ticks
ticks = 0;
//px - Canvas x
//py - canvas y
//x - real x
//y - imaginary y

var px, py, x, y; 

//loop from y's, then loop all x's

for(px = 0; px < a; px+=scale){
  for(py = 0; py < b; py+=scale){
    //zoom factors
	x0 = panX + px/zm;
	y0 = panY + py/zm;
	
	var x = 0;
	var y = 0;
	
	var i = 0;
    var xtemp;
    
	while (x*x + y*y <= 4  &&  i < maxI) {
	  ticks++
	  xtemp = x*x - y*y + x0
	  y = 2*x*y + y0
	  x = xtemp
   	  i = i + 1
	}
	
	//coloring
	var shade = pallete.colourAt(i);
	c.fillStyle = "#"+shade;
	c.fillRect(px,py,scale, scale);
	}
}
console.log("Total ticks: " + ticks + ", based on scale " + scale);
}

//reset
function work(){
document.getElementById("xa").value = -2.5;
document.getElementById("ya").value = -2;
document.getElementById("za").value = a/4;

pan = 0.01;
zooms = a / 4;
panX = -2.5;
panY = -2.0;
zf = 1.5;
maxI = 50;
pallete.setSpectrum("#000764","#206bcb","#edffff","#ffaa00","#000200");
pallete.setNumberRange(0,maxI);

show();
abortRun();
startRun();
}

//left to right scroll adjustment
function xScroll(n){
var temp = n ? parseFloat(document.getElementById("xa").value) + pan : parseFloat(document.getElementById("xa").value) - pan;
document.getElementById("xa").value = temp;
panX = temp;
show();
abortRun();
startRun();
}

//top to bottom scroll adjustment
function yScroll(n){
var temp = n ? parseFloat(document.getElementById("ya").value) + pan : parseFloat(document.getElementById("ya").value) - pan;
document.getElementById("ya").value = temp;
panY = temp;
show();
abortRun();
startRun();
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
abortRun();
startRun();
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
abortRun();
startRun();
}

//adjust zoomfactor
function zoomFactor(){
var temp = document.getElementById("zf").value;
zf = parseInt(temp);
show();
}

//adjust maxI
function changeMaxI(){
  var temp = document.getElementById("mi").value;
  maxI = parseInt(temp);
  pallete.setNumberRange(0,maxI);
  show();
  abortRun();
  startRun();
}

//adjust pallete
function changePallete(){
  var temp = (document.getElementById("plt").value).split(" ");
  if(temp.length < 3){
	alert(" Please enter more colors ");
	return
  }
  pallete.setSpectrumByArray(temp);
  show();
  abortRun();
  startRun();
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
//about function
function about(){
  alert("A mandelbrot set generator in javascript created by pvzzombs")
  console.log("A mandelbrot set generator in javascript created by pvzzombs");
}
}catch(e){

throw "Error: " + e ;

}