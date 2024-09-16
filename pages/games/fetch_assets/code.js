
c = document.getElementById("canvas");
cc = c.getContext("2d"); md = 0; msx = 0; msy = 0;

var levelcolors = ['grey','grey','blue','blue','blue','orange','orange','aqua'];
var playerspawns = [ {'x':100,'y':400},{'x':100,'y':400},{'x':100,'y':400},{'x':200,'y':400},{'x':200,'y':400},{'x':100,'y':100},{'x':200,'y':100},{'x':150,'y':150} ]
var wandspawns = [{'x':350,'y':100},{'x':200,'y':250},{'x':400,'y':100},{'x':200,'y':200},{'x':200,'y':250},{'x':350,'y':150},{'x':80,'y':420},{'x':300,'y':150}];


var abouttext = [

["Fetch is a game I made a long time ago,"],
["what you see today is a recreation."],
[""],
["Use the arrow keys, AWSD, or tap to move."],
["collect the wand, and enter the portal to win."],
["Be sure not to touch any walls along the way, because"],
["that will kill you. Walking to the edge of the screen will"],
["warp you to the other side of the screen."],
["When trying to warp on mobile, tap the edges of the"],
["screen to always move that direction."],
[""],
["If this is your first time playing, play the Normal mode,"],
["the Original mode is more difficult with it's terrible controls."],
["Younger me knew this though, and put a bunch of"],
["timing obstacles to mess with the player ;)"],


]
var redblocks = [ 'filler',[],[],[],[],[],[[200, 330, 100, 112]],[[273, 383, 226, 82]],[[120,328,81,77],[291,321,82,88]]]
var leveldata = ['filler',

[ [0,0,250,250] , [0,0,500,20] , [0,0,20,500] , [480,0,20,500] , [0,480,500,20] ],
[ [100,100,250,90],[0,0,500,20],[0,0,20,500],[480,0,20,500],[0,480,500,20],[304,189,46,157],[7,311,343,49] ], 
[ [1,5,22,491],[12,470,485,26],[474,3,24,493],[3,5,490,70],[493,75,0,0],[138, 168, 343, 24],[9,317,324,31] ],
[[6,4,110,492],[60,256,370,108],[367,2,126,492]],
[[6,297,481,64],[282,344,210,154],[9,355,148,144],[2,2,151,302],[143,103,115,64],[285,241,206,103],[266,1,233,9],[358,6,136,244]],
[[4,5,64,489],[25,5,273,61],[433,7,66,488],[19,444,287,48],[197,48,101,278],[194,278,263,52]],
[[9,6,167,373],[5,467,487,29],[274,6,224,379],[144,375,32,110]],
[[208,5,80,267],[115,4,248,114],[443,5,51,492],[3,7,35,487],[24,193,443,31],[18,204,90,116],[384,207,101,112],[121,413,237,82]]
]

c.width = 500; c.height = 500;
var cw = c.width; gamescale = 1;
var ch = c.height; mx = 0; my = 0;
var cwH = cw / 2; select = 0; keys = {"l":0, 'r':0, 'u':0, 'd':0, 's':0}
var chH = ch / 2; level = 1; px = 0; py = 0; pw = 45; ph = 35;
var gamestate = "title"; globalTimer = 0; wand = false; 
border = new Image; border.src = "fetch_assets/border.bmp"
canvas = document.querySelector('canvas');

playerIMG = new Image; playerIMG.src = "fetch_assets/player.png";
portalIMG = new Image; portalIMG.src = "fetch_assets/portal.png";

var myFont = new FontFace('poorrichard', 'url(fetch_assets/PoorRichard.otf)');

myFont.load().then(function(font){

document.fonts.add(font);
cc.fillStyle = "white"
cc.font = "70px poorrichard"; // set font
cc.textAlign = "center"; // center text

window.requestAnimationFrame(loop);

});


c.addEventListener('mousedown',function(EEVEE){mx = EEVEE.offsetX / gamescale ;my = EEVEE.offsetY / gamescale;
if(md==false){msx=mx; msy=my;} 

md=true;
EEVEE.preventDefault();

});



c.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {e.preventDefault();}
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  c.dispatchEvent(mouseEvent);
}, false);

c.addEventListener("touchend", function (e) {
if (e.target == canvas) {e.preventDefault();}
  var mouseEvent = new MouseEvent("click", {});
  c.dispatchEvent(mouseEvent);
  var mouseEvent = new MouseEvent("mouseup", {});
  c.dispatchEvent(mouseEvent);
}, false);

c.addEventListener("touchmove", function (e) {
if (e.target == canvas) {e.preventDefault();}
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  c.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

c.addEventListener('mouseup',function(EEVEE){md=false; 
keys.l = 0; keys.r = 0; keys.u = 0; keys.d = 0;

}// seeecret level editor if(keys.s==0){return} console.log(msx + "," + msy + "," + (mx - msx) + "," + (my - msy) ) 
//leveldata[level][leveldata[level].length] = [msx,msy,(mx - msx),(my - msy)];
//}
)




c.addEventListener('mousemove',function(EEVEE){ mx = EEVEE.offsetX / gamescale ;my = EEVEE.offsetY / gamescale;
});

//c.addEventListener('touchmove',function(EEVEE){ console.log(EEVEE)});



c.addEventListener('click',click)

function click(EEVEE){

if(gamestate == "yay"){gamestate = "game"; if(level==9){gamestate="title"; level = 1;} }
if(gamestate == "about"){gamestate = "title"; select="nil";}
if(select != "" & gamestate == "chooseGM"){gamestate = "game"; init(); }
if(select == "Play"){gamestate = "chooseGM"}
if(select == "About"){gamestate = "about"}


}

window.addEventListener('keydown',function(EEVEE){

e = EEVEE.key.toLowerCase();

if(e == " " & EEVEE.target == document.body ){EEVEE.preventDefault(); }
if(e == "arrowdown" & EEVEE.target == document.body ){EEVEE.preventDefault(); }
if(e == "arrowup" & EEVEE.target == document.body ){EEVEE.preventDefault(); }
if(e == " " & keys.s < 2){keys.s ++;}
if( (e == "a" || e == "arrowleft") & keys.l < 2){keys.l = 1; }
if( (e == "d" || e == "arrowright") & keys.r < 2){keys.r = 1;}
if( (e == "w" || e == "arrowup") & keys.u < 2){keys.u = 1;}
if( (e == "s" || e == "arrowdown") & keys.d < 2){keys.d = 1;}

if(select == "Original" & !md){ 

if( e == "a" || e == "arrowleft" ){px -= 16; }
if( e == "d" || e == "arrowright" ){px += 16;}
if( e == "w" || e == "arrowup" ){py -= 16;}
if( e == "s" || e == "arrowdown" ){py += 16;}

}

if(keys.s == 1){
if(gamestate == "about"){gamestate = "title";}
if(gamestate == "yay"){gamestate = "game"; if(level==9){gamestate="title"; level = 1;} }

}
})

window.addEventListener('keyup',function(EEVEE){

e = EEVEE.key.toLowerCase();


if(e == " "){keys.s=0;}
if( (e == "a" || e == "arrowleft")){keys.l =0;}
if( (e == "d" || e == "arrowright")){keys.r =0;}
if( (e == "w" || e == "arrowup") ){keys.u =0;}
if( (e == "s" || e == "arrowdown")){keys.d =0;}

})

function loop(){
gamescale = (c.offsetHeight / 500) 
if(gamestate == "title"){
handleTitle();
}

if(gamestate == "game"){
handleGame();
}

if(gamestate == "yay"){
handleVictory();
}

if(gamestate == "chooseGM"){
handleGM();

}

if(gamestate == "about"){
cc.clearRect(0,0,cw,ch);
cc.font = "20px poorrichard";
cc.textAlign = "start"; 

cc.fillStyle = "silver";

for(i=0; i<abouttext.length; i++){
cc.fillText( abouttext[i],0,20 + i*20)
}
cc.fillStyle = "white";
cc.fillText("Click anywhere to return",0,420);

cc.font = "15px poorrichard";
cc.fillText("Created by king_of_wolves10, hosted at king-of-wolves10.github.io",0,ch - 20);
}

globalTimer += 0.05;
globalTimer %= 496;



window.requestAnimationFrame(loop);
}


function handleTitle(){

select = ""; cc.textAlign = "center";
cc.clearRect(0,0,cw,ch); 

cc.fillStyle = "white"
var pad = 15; cc.font = "70px poorrichard";
var f = cc.measureText("Fetch!");

cc.drawImage(border,(cwH - f.width / 2) - pad ,c.width / 3 - (55 + pad), f.width + (pad * 2),60 + (pad * 2) );
cc.fillText("Fetch!",cwH,c.height / 3);

cc.font = "30px poorrichard";
var f = cc.measureText("Play Game");


if( mx > cwH - f.width /2 & mx  < (cwH + f.width /2) ){
if( my > chH - 30 & my < chH + 0 ){
cc.fillStyle = "yellow"; select = "Play";
}}

cc.fillText("Play Game",cwH,chH);

cc.fillStyle = "white";

var f = cc.measureText("About");

if( mx > cwH - f.width /2 & mx  < (cwH + f.width /2) ){
if( my > (chH + 60) - 30 & my < (chH + 60) + 0 ){
cc.fillStyle = "yellow"; select = "About";
}}

cc.fillText("About",cwH,chH + 60);

}

function handleGM(){

cc.clearRect(0,0,cw,ch);
cc.font = "30px poorrichard";
cc.textAlign = "center";  cc.fillStyle = 'white'

var f = cc.measureText("Choose a game mode");
var pad = 18;
cc.drawImage(border,(cwH - f.width / 2) - pad ,100 - (30 + pad), f.width + (pad * 2),30 + (pad * 2) );


cc.fillText("Choose a game mode.",cwH,100);
select = "";
var f = cc.measureText("Normal");
if( mx > (cwH / 2) - f.width /2 & mx < (cwH / 2) + f.width / 2){
if( my > chH - 30 & my  < (chH + 30) ){
cc.fillStyle = "yellow"; select = "Normal";
}}

cc.fillText("Normal",cwH / 2,chH);

cc.fillStyle = "white";
var f = cc.measureText("Original");
if( mx > (cwH + (cwH / 2) ) - f.width /2 & mx < cwH + (cwH / 2)  + f.width / 2){
if( my > chH - 30 & my < (chH + 30) ){
cc.fillStyle = "yellow"; select = "Original";
}}

cc.fillText("Original",cwH + (cwH / 2) ,chH);

}
function init(){
cc.clearRect(0,0,cw,ch);



if(playerspawns[level - 1]){

for(i=0; i<leveldata[level].length; i++){
var a = leveldata[level][i];
rect( a[0],a[1],a[2],a[3] );
}

px = playerspawns[level - 1].x;
py = playerspawns[level - 1].y;
}

}
function handleVictory(){
cc.font = "30px poorrichard";
cc.textAlign = "center";
cc.fillStyle="white";
cc.drawImage(border,110,100,280,200);

if(level < 9){
cc.fillText("Level " + level,cwH,ch / 3);
cc.fillText("Press Space/Tap ",cwH,cwH);
}else{
cc.fillText("Game Complete",cwH,ch / 3);
cc.fillText("Press Space to reset ",cwH,cwH);
}

}

function handleGame(){
	cc.clearRect(0,0,cw,ch);
if(md){

	if( my < 20){keys.u ++; keys.d = 0;}
	else if( my > 470){keys.d ++; keys.u = 0;}

	else if(my < py){keys.u ++; keys.d = 0; }	
	else if(my > py+ph ){keys.d ++; keys.u = 0;}

	else if( mx > 470){keys.r ++; keys.l = 0;}
	else if( mx < 20){keys.l ++; keys.r = 0;}

	else if(mx > px+pw){keys.r ++; keys.l = 0; keys.u = 0; keys.d = 0;}
	else if(mx < px){keys.l++; keys.r = 0;  keys.u = 0; keys.d = 0;}

	else { keys.l = 0; keys.r = 0; keys.u = 0; keys.d = 0}
}
for(i=0; i<leveldata[level].length; i++){
var a = leveldata[level][i];
var b = redblocks[level][i];
rect( a[0],a[1],a[2],a[3] );
if(b){
redrect( b[0],(b[1] - Math.sin(globalTimer) * (b[3] / 2) ) - (b[3] / 2) ,b[2],b[3] );
}
}

if(select == "Normal"){
if(keys.l > 0){px -= 8}
if(keys.r > 0){px += 8}
if(keys.u > 0){py -= 8}
if(keys.d > 0){py += 8}
}else if(md){
if(keys.l == 1 || (keys.l > 30 & (keys.l % 2) == 0 ) ){px -= 16}
if(keys.r == 1 || (keys.r > 30 & (keys.r % 2) == 0 ) ){px += 16}
if(keys.u == 1 || (keys.u > 30 & (keys.u % 2) == 0 ) ){py -= 16}
if(keys.d == 1 || (keys.d > 30 & (keys.d % 2) == 0 ) ){py += 16}
}


pl = px + 8;
if(px > 500){px = -50;}
if(px < -50){px = 499;}
if(py > 500){py = -50;}
if(py < -50){py = 499;}

if(wand == true){ 

if(select == "Normal"){
cc.drawImage(playerIMG,63,33,26,26,px + 50,py + 10,26,26); 
}else{
drawoldwand(px + 50,py + 10);
}


if(select == "Normal"){
cc.drawImage(portalIMG,Math.round(globalTimer) * 64 % 256 ,0,64,64,playerspawns[level - 1].x - 8, playerspawns[level - 1].y - 20,64,64)
}else{
drawoldportal();
}

	if(pl < playerspawns[level - 1].x + 26 & pl + pw > playerspawns[level - 1].x + 26){
		if(py < playerspawns[level - 1].y + 6 & py + (ph - 20) > playerspawns[level - 1].y - 20 & wand == true){
			wand = false; level ++; gamestate = "yay"; init(); return;
		}
	}


}

if(select == "Normal"){
cc.drawImage(playerIMG,5,1,56,60,px,py - 23,56,60);
}else{
drawoldrock();
}

	if(pl < wandspawns[level - 1].x + 26 & pl + pw > wandspawns[level - 1].x){
		if(py < wandspawns[level - 1].y + 26 & py + ph > wandspawns[level - 1].y){
			wand = true;
		}
	}

if(wand == false){ 

if(select == "Normal"){
cc.drawImage(playerIMG,63,33,26,26,wandspawns[level - 1].x, wandspawns[level - 1].y,26,26) 
}else{
drawoldwand( wandspawns[level - 1].x, wandspawns[level - 1].y );
}

}

cc.strokeStyle = "aqua"
//seeecret level editor if(md){cc.strokeRect(msx,msy,(mx - msx),(my - msy) );}
cc.fillStyle = "white"; cc.font = "20px poorrichard";
cc.textAlign = "start"
cc.fillText("Level "+level,0,20);
}

function rect(x,y,w,h){
cc.fillStyle = levelcolors[level - 1];
cc.fillRect(x,y,w,h);
if( (px + 6) < x + w & (px + 6) + pw > x & py + ph > y & py < y + h){wand = false; px = playerspawns[level - 1].x; py = playerspawns[level - 1].y; }
}

function redrect(x,y,w,h){
cc.fillStyle = 'red'
cc.fillRect(x,y,w,h);
if( (px + 6) < x + w & (px + 6) + pw > x & py + ph > y & py < y + h){wand = false; px = playerspawns[level - 1].x; py = playerspawns[level - 1].y; }
}

function drawoldrock(){

cc.fillStyle = "blue"
cc.fillRect(pl - 10,py - 10,pw + 20,10)
cc.fillRect(pl ,py - 20,pw,10)
cc.fillRect(pl - 10,py - 30,pw,10)

cc.fillStyle = "grey"
cc.fillRect(pl,py,pw,ph)
}

function drawoldwand(x,y){

cc.fillStyle = "brown"
cc.fillRect(x + 2,y + 10,5,10)
cc.fillRect(x + 7,y,5,10)

cc.fillStyle = "yellow"
cc.fillRect(x + 13,y - 10,10,10)
cc.fillRect(x + 8,y - 10,20,5)
cc.fillRect(x + 8,y + 0,5,5)
cc.fillRect(x + 23,y + 0,5,5)
cc.fillRect(x + 18,y - 15,5,5)
}

function drawoldportal(){


cc.fillStyle = "yellow"
cc.fillRect(playerspawns[level - 1].x - 8, playerspawns[level - 1].y - 20,64,64)


}
