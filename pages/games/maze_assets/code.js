c = document.querySelector('canvas');
cc = c.getContext('2d');
c.crossOrigin = "anonymous";
cc.imageSmoothingEnabled = false; paused = false;
leaves = new Image; leaves.src = 'maze_assets/leaves.png';
hand = new Image; hand.src = 'maze_assets/hand.png';
zombGFX = new Image; zombGFX.src = 'maze_assets/zombie.png';
ctrls = new Image; ctrls.src = "maze_assets/controls.png";

pauseStart = new Date();
var playerSpeed = 0;

currentS = "";
sfxList = ["uisfx/press","uisfx/focus","uisfx/back"];
sfx = {};
for(i=0; i<sfxList.length; i++){

sfx[sfxList[i]] = new Audio;
sfx[sfxList[i]].src = "maze_assets/" + sfxList[i] + ".wav";
sfx[sfxList[i]].load();
sfx[sfxList[i]].volume = 1;
}


options = {

"fov":70,
"bob":true,
"musicVolume":100,
"sfxVolume":100,
"res":true,
"fullScreen":false,
"pointerLock":true,
"hud":true,
"hand":true,
}

panorama = new Image; panorama.src = "maze_assets/panorama.png"
grass = new Image; lastScreen = "Title"
grass.src = 'maze_assets/grass.png';

currentSplash = Math.floor(Math.random() * (splash.length - 1) )


dirtWall = new Image; hud = new Image;
dirtWall.src = 'maze_assets/dirtwall.png';
hud.src = 'maze_assets/menuhud.png';

screen = "Title"
transition = 0;
mx = -100; my = -100; md=0;
lw = 64;
lh = 192;
verbose = false
viewingblocks = [];
startDate = null;

compiledZombies = [];

const mapscale = 6
const mapsize = 84
const maprange = mapscale * mapsize;
const pi = Math.PI;
const deg = pi / 180
const HH = c.height / 2;
const HW = c.width / 2;


function reset(){

startDate = new Date;
player = {
x:83, y:40, z:0, a:270,
hp:10, zx:0
}
playerName = ""
zombies = [

{x:82, y:40, z:0, a:270,
hp:10, zx:0}
]

player.x *= mapscale; player.y *= mapscale;
player.x -= mapscale / 2
player.y -= mapscale / 2
lastX = player.x;
lastY = player.y;

for(i=0; i<zombies.length; i++){

zombies[i].x *= mapscale; 
zombies[i].y *= mapscale;
zombies[i].x -= mapscale / 2
zombies[i].y -= mapscale / 2
}


}


reset(); 
timestamp = -99;
sprint = 0;


pressed = [

{"left":0, "right":0, "up":0, "down":0, "rl":0, "rr":0},
{"left":0, "right":0, "up":0, "down":0, "rl":0, "rr":0}
]

document.onkeydown = function(EEVEE){
e = EEVEE.key.toLowerCase();

EEVEE.preventDefault();

if(screen == "Game" & e == "escape" & options.pointerLock == false ){ screen = "Paused"; transition = frame; paused = true; pauseStart = new Date(); }
if(screen == "Credits"){screen = lastScreen;}

if(e == ' ' & player.z == 0){player.zx = 16; if(pressed[0].up){move(player.a,1)} }

//if(e == 'g'){ zombies[zombies.length] = {x:player.x, y:player.y, z:player.z, a:player.a,hp:10, zx:0} }
if(e == 'f5'){ verbose = !verbose}
if(e == ','){pressed[0].left = true}
if(e == '.'){pressed[0].right = true}
if(e == 'w' & pressed[0].up == false){pressed[0].up = true; if(frame - timestamp < 8){sprint = 1} timestamp = frame }
if(e == 's'){pressed[0].down = true}
if(e == 'a'){pressed[0].rl = true}
if(e == 'd'){pressed[0].rr = true}

}

document.onkeyup = function(EEVEE){
e = EEVEE.key.toLowerCase();

if(e == ','){pressed[0].left = false}
if(e == '.'){pressed[0].right = false}
if(e == 'w'){pressed[0].up = false; }
if(e == 's'){pressed[0].down = false}
if(e == 'a'){pressed[0].rl = false}
if(e == 'd'){pressed[0].rr = false}

}
moving = false;
c.onmousemove = function(EEVEE){

var bbox = EEVEE.target.getBoundingClientRect();
var scaleHeight = bbox.height / c.height;
var scaleWidth = bbox.width / c.width;
var scale = Math.min(scaleHeight, scaleWidth)
var virtuaWidth = c.width * scale / scaleWidth;
var virtuaHeight = c.height * scale / scaleHeight;
var mouseX = EEVEE.offsetX * c.width / c.offsetWidth;
var mouseY = EEVEE.offsetY * c.height / c.offsetHeight;


mx = ((mouseX - c.width / 2 + virtuaWidth / 2) / virtuaWidth) * c.width;
my = ((mouseY - c.height / 2 + virtuaHeight / 2) / virtuaHeight) * c.height;

if(document.pointerLockElement == null){return}
player.a += (EEVEE.movementX / -10) * 2

}

document.onmousedown = function(EEVEE){md = 1; }
document.onmouseup = function(EEVEE){md = 0;}

frame = 0;
var fps, fpsInterval, startTime, now, then, elapsed; 

        function startAnimating(fps) { 
        fpsInterval = 1000 / fps; 
        then = Date.now(); 
        startTime = then; 
        loop(); 
    } 

var sinceStart, currentFps, mainLoop;
function loop(){


mainLoop = requestAnimationFrame(loop)

        now = Date.now(); 
        elapsed = now - then; 

        if (elapsed > fpsInterval) { 
             then = now - (elapsed % fpsInterval); 
  
		draw();
  
            sinceStart = now - startTime; 
            currentFps =  Math.round((1000 / (sinceStart / ++frame)) * 100) / 100; 
        } 

}

rx = 0;

var myFont = new FontFace('seven', 'url(maze_assets/seven.ttf)');

myFont.load().then(function(font){

document.fonts.add(font);
cc.fillStyle = "white"
cc.font = "18px seven"; // set font



startAnimating(30);

});


function draw(){





if( screen=="Title" ){
cc.drawImage(dirtWall,0,0);

if( startTime % 1000 == 0 ){ //idk the chances of this, probably once in a lifetime

cc.drawImage(hud,0,0,162,53,HW - 222, 60, 273,80);//MY M
cc.drawImage(hud,192,0,38,53,HW + 50, 60, 63,80);//Z
cc.drawImage(hud,163,0,30,53,HW + 112, 60, 54,80);//A
cc.drawImage(hud,230,0,35,53,HW + 166, 60, 59,80); //E
}else{
cc.drawImage(hud,0,0,265,53,HW - 222, 60, 444,80);
}

cc.textAlign="left"
cc.fillStyle="white";
cc.fillText("Version 1.0",16,c.height - 16)
cc.fillText("king-of-wolves10.github.io",c.width - 250,c.height - 16)

cc.save();
cc.translate(500,120);
cc.rotate(deg * -25);
cc.textAlign = "center"; 

var textsize = (550 / splash[currentSplash].length )
if( textsize > 22){ textsize = 22}

cc.font= (Math.sin(frame / (80 / textsize) ) + textsize ) + 'px seven'

cc.fillStyle = "#755c2e"
cc.fillText(splash[currentSplash],4,4);

cc.fillStyle = "yellow"
cc.fillText(splash[currentSplash],0,0);
cc.restore();

cc.font = '18px seven'
drawButton("Play Game",HW,HH,"Game");

drawButton("Help & Options",HW,HH + 90,"Options");
}

else if( screen=="Options" ){

cc.drawImage(dirtWall,0,0);
cc.drawImage(hud,0,0,265,53,HW - 222, 60, 444,80);
//drawButton("Change Skin",HW,HH - 80,"skinselect");
drawButton("How to Play",HW,HH - 40,"howToPlay");
drawButton("Game Options",HW,HH,"generalOptions");
drawButton("Controls",HW,HH + 40,"controlOptions");
drawButton("User Interface",HW,HH + 80,"uiOptions");
drawButton("Credits",HW,HH + 120,"Credits");
drawButton("Return",HW,HH + 160,"Title");
}

else if( screen=="howToPlay" ){
cc.drawImage(dirtWall,0,0);
cc.fillStyle="#d0d0d0"
cc.fillRect(HW-150,50,300,400);
drawButton("Whats new",HW,80,"whatsNew");
drawButton("The Goal",HW,120,"goal");
drawButton("HUD",HW,160,"hud");
//drawButton("Zombies",HW,200,"goal");
drawButton("Return",HW,240,"Options");
}
else if(screen=="whatsNew"){
cc.drawImage(dirtWall,0,0);
cc.fillStyle = "#5a98db57"
cc.fillRect(30,30,580,410);

cc.fillStyle = "White"

text = ["Version 1.0, everythings new, and likely buggy.", "", "", "", "", "Removed Herobrine",]
for(i=0; i<text.length; i++){
if( 50 + i*20 - transition> 600){break}
if( 50 + i*20 - transition < 50){continue}
cc.fillText(text[i],50,50 + i*20 - transition);
}

if(pressed[0].up == 1){ transition --}
if(pressed[0].down == 1){ transition ++}
if(transition > (text.length * 20) - 400){ transition = (text.length * 20) - 410 }
if(transition < 0){transition = 0}


drawButton("Return",HW,460,"howToPlay");
}
else if(screen=="goal"){
cc.drawImage(dirtWall,0,0);
cc.fillStyle = "#5a98db57"
cc.fillRect(30,30,580,410);

cc.fillStyle = "White"

text = ["The Goal", "", "", "The goal of the game is the same as any other maze,","get to the end.","","I'd have more interesting things here if they weren't","so difficult to program"]
for(i=0; i<text.length; i++){
if( 50 + i*20 - transition> 600){break}
if( 50 + i*20 - transition < 50){continue}
cc.fillText(text[i],50,50 + i*20 - transition);
}

if(pressed[0].up == 1){ transition --}
if(pressed[0].down == 1){ transition ++}
if(transition > (text.length * 20) - 400){ transition = (text.length * 20) - 410 }
if(transition < 0){transition = 0}


drawButton("Return",HW,460,"howToPlay");
}
else if(screen=="hud"){
cc.drawImage(dirtWall,0,0);
cc.fillStyle = "#5a98db57"
cc.fillRect(30,30,580,410);

cc.fillStyle = "White"

text = ["Hud", "", "", "It's useless... for now",]
for(i=0; i<text.length; i++){
if( 50 + i*20 - transition> 600){break}
if( 50 + i*20 - transition < 50){continue}
cc.fillText(text[i],50,50 + i*20 - transition);
}

if(pressed[0].up == 1){ transition --}
if(pressed[0].down == 1){ transition ++}
if(transition > (text.length * 20) - 400){ transition = (text.length * 20) - 410 }
if(transition < 0){transition = 0}


drawButton("Return",HW,460,"howToPlay");
}
else if( screen=="Game"){

if(document.pointerLockElement == null & options.pointerLock ){screen = "Paused"; paused = true; pauseStart = new Date(); }
mainLogic();

if(options.hud){
cc.drawImage(hud,0,94,182,5,HW - 182, c.height - 92, 364,10);
cc.drawImage(hud,0,105,182,22,HW - 182, c.height - 80, 364,44);
cc.drawImage(hud,0,127,24,24,HW - 184, c.height - 82, 48,48);
cc.fillStyle = "white"

cc.fillRect( HW - 3,HH - 12,4,22); //tall
cc.fillRect( HW - 12,HH - 3,22,4); //wide
}

}

else if( screen=="youwon"){

var tx = Math.floor(player.x / mapscale)
var ty = Math.floor(player.y / mapscale)

if(transition >= 60){

cc.fillStyle = "white"
cc.fillRect(0,0,c.width,c.height);

cc.fillStyle = "green"; cc.font = "18px seven"
cc.drawImage(hud,0,0,265,53,HW - 222, c.height - Math.floor(transition - 80), 444,80);

cc.textAlign = "left";
for(i=0; i<endText.length; i++){

cc.fillText(endText[i].replaceAll("[NAME]",playerName),10,(c.height - Math.floor(transition)) + 200 + i * 48 )
}
drawButton("Wake up",130,1905 - transition,"Credits");
if(transition < 1470){
transition += 0.8;
}

if(transition > 1181 ){ if(trophy == undefined){trophy = new Image; trophy.src = "maze_assets/winner.png"}

var seconds = Math.floor(finishTime / 1000) % 60;
var minutes = Math.floor(finishTime / 60000) % 60;
var hours = Math.floor(finishTime / 3600000);

cc.drawImage(trophy, HW - trophy.width / 2, HH - trophy.height / 2);

cc.textAlign = "center"; cc.fillStyle="black"; cc.font = "20px seven"
if(hours == 0){

cc.fillText("It took you: " + minutes + " minutes & " + seconds + " seconds", HW,30);
}else{
cc.fillText("It took you: " + hours + " hours, " + minutes + " minutes & " + seconds + " seconds.. sorry", HW,30);
}

if(transition < 1322 ){
cc.fillStyle = "#FFFFFF" + Math.round(255 - (transition - 1181) * 1.7 ).toString(16)
cc.fillRect(HW - trophy.width / 2, HH - trophy.height / 2,trophy.width,trophy.height);
}


 }

if( Math.round(transition) == 400 ){ playerName = prompt("Input your name") }
if(playerName == "" ){ playerName = "Villager №" + Math.floor(startTime / 100000) }

}else{

if(transition == 0){ var nownow = new Date(); finishTime = nownow.getTime() - startDate.getTime() 

if(map[ty * mapsize + tx] != 3){ screen = "Title"; reset(); alert("Sneaky sneaky, I know you didn't actually win :P "); }
winTiles = 0;
for(b=0; b<map.length; b++){
if(map[b] == 3 ){winTiles ++;}
if(winTiles > 1){break}
}

if(winTiles > 1){ screen = "Title"; reset(); alert("Sneaky sneaky, I know you didn't actually win :P "); 

window.location.reload()

 }
if(map[252] != 3){ screen = "Title"; reset(); alert("Sneaky sneaky, I know you didn't actually win :P "); 

window.location.reload()
 }

}
transition ++;
cc.fillStyle = "#FFFFFF20"
cc.fillRect(0,0,c.width,c.height);

}

}else if(screen=="Credits"){

transition ++;
cc.drawImage(panorama,transition % 1929,0,640,480,0,0,640,480);
cc.drawImage(panorama,-1929 + (transition % 1929),0,640,480,0,0,640,480);
if(transition >= 3858 ){transition = 0;}
cc.textAlign = "center";
for(i=0; i<credits.length; i++){

if(credits[i].includes("[h]") ){cc.fillStyle = "Yellow"}else{cc.fillStyle = "white"; }
cc.fillText(credits[i].replaceAll("[h]"," "),HW,(c.height - Math.floor(transition)) + i * 48 )
}


}else if(screen=="controlOptions"){
cc.drawImage(dirtWall,0,0);
drawCheck("Pointer Lock",100,100,"pointerLock");
cc.drawImage(ctrls,0,(ctrls.height / 2) * Number(options.pointerLock) ,ctrls.width,ctrls.height / 2,HW - ctrls.width / 2, HH - ctrls.height / 4, ctrls.width, ctrls.height / 2);
drawButton("Back",HW,HH + ctrls.height / 4 + 20,"Options");

}else if(screen=="Paused"){


cc.fillStyle = "skyblue"
cc.fillRect(0,0,c.width,HH);
cc.fillStyle = "green"
cc.fillRect(0,HH,c.width,HH);


var step = c.width / data.length
var gap = step * 1.5;


for(i=0; i<data.length; i++){
var height = (c.height / data[i].dist ) * (12 - 0.1 * (options.fov / 2) )


if(moving & options.bob){

var yoffset = (player.z + Math.cos(transition / 3)  ) * (height / 200)

}else{

var yoffset = player.z * (height / 200);
}

var DATA = [c.width - ( (i + 1) * step) ,(HH - height) + yoffset,gap,height * 2]


cc.drawImage(leaves,Math.floor( data[i].offset * lw) + (lw * data[i].tex), 0, 1,lh,DATA[0], DATA[1],DATA[2],DATA[3])


cc.fillStyle = "#00000060"
if(data[i].h == true){cc.fillRect( DATA[0], DATA[1],DATA[2],DATA[3] )}

}

if(options.hand){
if(moving){
cc.drawImage(hand,453 + Math.sin(transition / (6 - 0.2 * sprint)  ) * (20 + 1 * sprint )  , 353 + Math.cos(transition / (3 - 0.1 * sprint) ) * (10 + 1 * sprint ) + player.zx);
}else{
cc.drawImage(hand,453, 353  + player.zx);
}
}

cc.fillStyle ="#00000080";
cc.fillRect(0,0,640,480);

cc.drawImage(hud,0,0,265,53,HW - 222, 20, 444,80);
drawButton("Resume Game", HW, 200,"Game");
drawButton("Help & Options", HW, 240,"Options")
drawButton("Exit Game", HW, 280,"Title")

}else if(screen=="generalOptions"){

cc.drawImage(dirtWall,0,0);

drawCheck("View Bobbing",100,100,"bob");
drawCheck("High Resolution",100,140,"res");
drawSlider("FOV",100,180,"fov",50,160);
drawCheck("Fullscreen",100,220,"fullScreen");
drawSlider("Music",100,260,"musicVolume",0,100);
drawSlider("Sound",100,310,"sfxVolume",0,100);

for(i=0; i<sfxList.length; i++){
sfx[sfxList[i]].volume = parseFloat(options.sfxVolume / 100)
}

drawButton("Return",HW,c.height - 40,"Options");

}else if(screen == "uiOptions"){

cc.drawImage(dirtWall,0,0);
drawCheck("View HUD",100,100,"hud");
drawCheck("View Hand",100,120,"hand");
drawButton("Return",HW,c.height - 40,"Options");

}else{
cc.drawImage(dirtWall,0,0);
cc.fillStyle="#d0d0d0"; cc.textAlign = "center"
cc.fillText("Invalid Screen, Returning to main menu.",HW,HH)
drawButton("OK",HW,HH + 70,"Title");

}

if(verbose){
var compass= ["S","SE","E","NE","N","NW","W","SW","S"]
cc.fillStyle="white"
cc.fillText("FPS: " + currentFps,8,16);
cc.fillText("Screen: " + screen,8,32);
cc.fillText("MouseDown (md) :" + md,8,48);
cc.fillText("X: " + Math.floor(player.x * 100) / 100 + " Y: " + Math.floor(player.y * 100) / 100 + " Z: " + Math.floor(player.z * 100) / 100 ,8,64);
cc.fillText("Angle: " + Math.floor(player.a * 100) / 100,8,80);
cc.fillText("Facing:" + compass[Math.round(player.a / 45)],130,80)
cc.fillText("???: "+ startTime % 1000,8,120);
var nownow = new Date()
var seconds = Math.floor( (nownow.getTime() - startDate.getTime() ) / 1000) % 60;
var minutes = Math.floor( (nownow.getTime() - startDate.getTime()  ) / 60000) % 60;
var hours = Math.floor( (nownow.getTime() - startDate.getTime() ) / 3600000);

cc.fillText("Play time: " + hours + ":" + minutes + ":" + seconds, 8,160);


}

if(md==1){md=2}

}

function drawCheck(label,x,cy,option){

/*
Draws a clickable checkbox on the screen
label: string, the name of the option to set
x: number, the X position of the text from the left
cy: number, the Y position of the checkbox from the center
option: bool, the option to set;
*/
var align = cc.textAlign;
var selected = false;

var labelWidth = cc.measureText(label).width

if(mx > (x + labelWidth + 16) && mx < (x + labelWidth + 42) ){
if(my > cy-16 & my < cy + 6 ){selected = true;} }

if(selected){ if(label != currentS){ sfx["uisfx/focus"].play(); } currentS = label; }
if(selected == false){cc.fillStyle = "white";}else{cc.fillStyle = "yellow";}

cc.textAlign = "left";
cc.fillText(label,x,cy);

if(options[option] ){
cc.drawImage(hud,110,130,13,11,x + labelWidth + 16, cy - 16,26,22);
}else{
cc.drawImage(hud,123,130,13,11,x + labelWidth + 16, cy - 16,26,22);
}

if(md == 1 & selected){ sfx["uisfx/press"].play(); options[option] = !options[option]; if(option == "fullScreen" ){ if(options[option]){c.requestFullscreen();}else{document.exitFullscreen(); } }  }
cc.textAlign = align

}

function drawSlider(title,x,cy,value,min,max){
var align = cc.textAlign;
cc.fillStyle="grey";
cc.fillRect(x,cy - 12,200,24);
var selected = false;
if(mx>x & mx<x+200 & my>cy-12 & my<cy+12){selected = true}
cc.textAlign="center";

if(selected){cc.fillStyle ="yellow"}else{cc.fillStyle = "white"}
cc.fillText(title + ": " + options[value], x+100,cy+6);
cc.fillStyle="silver";
var slideper = (options[value] - min) / (max - min)
if(md > 0 & selected){ slideper = ((mx - (x + 20) ) / 160);

if(slideper < 0 ){slideper=0}
if(slideper > 1 ){slideper=1}


}
options[value] = Math.round(min + slideper * (max - min) );
if(options[value] > max){options[value] = max}
if(options[value] < min){options[value] = min}

cc.fillRect( x + (184 * slideper) + 4 ,cy - 8,8,16);
cc.textAlign = align;
}
function drawButton(title,cx,cy,send){

/*
Draws a clickable button on the screen
title: string, the text string that appears on the button
cx: number, the X position of the button from the center
cy: number, the Y position of the button from the center
send: string, which game screen to send you to, if it's undefined, it will send you to title
*/

var align = cc.textAlign;
var mt = cc.measureText(title)
var Twidth = 300
var Theight = 30

var selected = false

if(mx > cx - Twidth/2 & mx < cx + Twidth/2  & my > (cy - 5) - Theight/2 & my < (cy - 5) + Theight/2){selected = true}


if(selected){ if(title != currentS){ sfx["uisfx/focus"].play(); } currentS = title; }
if(!selected){cc.drawImage(hud,0,73,200,20,cx - Twidth / 2,cy - Theight / 2,Twidth,Theight) }
else{cc.drawImage(hud,0,53,200,20,cx - Twidth / 2,cy - Theight / 2,Twidth,Theight)}



if(selected){cc.fillStyle = "yellow"}
else{cc.fillStyle = "white"}

cc.textAlign = 'center'
cc.fillText(title,cx,cy + 5);
cc.textAlign = align

if(selected & md==1){  if(["Back","Return"].includes(title)){ sfx["uisfx/back"].play(); }else{ sfx["uisfx/press"].play();  }
md = 0;
currentSplash = Math.floor(Math.random() * (splash.length - 1) )
if(send == undefined){send = title}

if(screen == "youwon"){lastScreen = "Title";}else{lastScreen = screen;} 
if(send == "Title" & paused & screen != "Paused" ){screen = "Paused"} 
else{

if(send == "Title" & screen == "Paused" ){ reset(); paused = false; }
if(send == "Game" & screen == "Title"){reset(); }
if(send == "Game" & screen == "Paused"){ var pauseEnd = new Date(); startDate = new Date( startDate.getTime() + ( pauseEnd.getTime() - pauseStart.getTime()  ) ) }
if(send == "Game" & options.pointerLock ){ c.requestPointerLock(); }
screen = send;
}

transition = 0; 
}

}

c.onfullscreenchange = function(e){

if(document.fullscreen == false){ options.fullScreen = false; }
}

window.onerror = function(e){
cancelAnimationFrame(mainLoop);
cc.fillStyle = "white"
cc.textAlign = "center"
cc.font = "72px sans-serif"
cc.fillText("Script Error!",c.width / 2 ,c.height / 2);
}


function move(angle,force){

moving = true;
a = false;
b = false
player.x += Math.sin(angle * deg) * walkspeed(force);
var tempx = player.x + Math.sin(angle * deg) * 2;


var tx = Math.floor(tempx / mapscale)

var ty = Math.floor(player.y / mapscale)
if( [0,3].includes(map[ty * mapsize + tx]) == false  ){
a = true;
player.x -= Math.sin(angle * deg) * walkspeed(force);

}
var trueTX = Math.floor(player.x / mapscale)
if( map[ty * mapsize + trueTX] == 3){
screen = "youwon";
playerName = ""
}


player.y += Math.cos(angle * deg) * walkspeed(force);
var tempy = player.y + Math.cos(angle * deg) * 2

var tx = Math.floor(player.x / mapscale)
var ty = Math.floor(tempy / mapscale)
if( [0,3].includes(map[ty * mapsize + tx]) == false ){
b = true;
player.y -= Math.cos(angle * deg) * walkspeed(force);

}

if(a&b){moving = false}
}

function walkspeed(move){
return move * (elapsed / 100)
}

function castRay(currentAngle){
var reverse = 0
var tex = 0;
var rayStartX = Math.floor(player.x / mapscale) * mapscale;
var rayStartY = Math.floor(player.y / mapscale) * mapscale;

var cSine = Math.sin(currentAngle * deg);
var cCos = Math.cos(currentAngle * deg);
if(cSine == 0){cSine = 0.000001;}
if(cCos == 0){cCos = 0.000001;}

//vertical line intersection
var rayEndX, rayEndY, rayDirectionX, verticalDepth;
if( cSine > 0 ){ rayEndX = rayStartX + mapscale; rayDirectionX = 1}
else{ rayEndX = rayStartX; rayDirectionX = -1}

for(offset=0; offset<maprange; offset += mapscale){
verticalDepth = (rayEndX - player.x) / cSine;
rayEndY = player.y + verticalDepth * cCos;
var mapTargetX = Math.floor(rayEndX / mapscale);
var mapTargetY = Math.floor(rayEndY / mapscale);
if (cSine <= 0){mapTargetX += rayDirectionX; reverse = 1} // get the right side of tile, instead of left if needed

var targetSquare = mapTargetY * mapsize + mapTargetX;



if (targetSquare < 0 || targetSquare > map.length - 1){break;}
if( map[targetSquare] != 0){ tex = map[targetSquare] - 1; break;}


rayEndX += rayDirectionX * mapscale;
if( viewingblocks.includes(targetSquare) == false & map[targetSquare] == 0){
viewingblocks[viewingblocks.length] = targetSquare
}
}


var tempX = rayEndX; 
var tempY = rayEndY;
var tempW = reverse;
var tempT = tex;

reverse = 1

//horizontal line intersection
var rayEndX, rayEndY, rayDirectionY, horizontalDepth;
if( cCos > 0 ){ rayEndY = rayStartY + mapscale; rayDirectionY = 1}
else{ rayEndY = rayStartY; rayDirectionY = -1}

for(offset=0; offset<maprange; offset += mapscale){
horizontalDepth = (rayEndY - player.y) / cCos;
rayEndX = player.x + horizontalDepth * cSine;
var mapTargetX = Math.floor(rayEndX / mapscale);
var mapTargetY = Math.floor(rayEndY / mapscale);
if (cCos <= 0){mapTargetY += rayDirectionY; reverse = 0 } 

var targetSquare = mapTargetY * mapsize + mapTargetX;



if (targetSquare < 0 || targetSquare > map.length - 1){break;}
if( map[targetSquare] != 0){ tex = map[targetSquare] - 1; break;}



rayEndY += rayDirectionY * mapscale;

if( viewingblocks.includes(targetSquare) == false & map[targetSquare] == 0){
viewingblocks[viewingblocks.length] = targetSquare
}
}

var endX = verticalDepth < horizontalDepth ? tempX : rayEndX;
var endY = verticalDepth < horizontalDepth ? tempY : rayEndY;

if(verticalDepth < horizontalDepth){reverse = tempW; tex = tempT}

var offset1 = reverse == 1 ? 1 - (endY % mapscale) / mapscale : (endY % mapscale) / mapscale;
var offset2 = reverse == 1 ? 1 - (endX % mapscale) / mapscale : (endX % mapscale) / mapscale


if(verticalDepth < horizontalDepth){return {dist:verticalDepth * Math.cos( (currentAngle - player.a) * deg ),offset: offset1, h:false, tex:tex }  }
else{ return {dist:horizontalDepth * Math.cos( (currentAngle - player.a) * deg ) ,offset: offset2 , h:true,tex:tex } }
}



function iamcool(tx,ty,lowestDistance){

var check = Math.floor(tx / mapscale) + mapsize * Math.floor(ty / mapscale);
var hX = tx - player.x
var hY = ty - player.y
var distance = Math.sqrt( hX*hX + hY*hY ) / mapscale;
if(distance < lowestDistance & map[check] == 0){ return true }
return false

}
