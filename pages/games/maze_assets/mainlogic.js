function mainLogic(){

if(frame % 60 < 2){
lastX = player.x
lastY = player.y
}
moving = false
data = [];
var fov = (options.fov + 2 * sprint) / 2;

if(player.z > 0){player.zx -= 2}
player.z += player.zx;
if(player.zx < -64){player.zx = -64}
if(player.z < 0){player.z = 0; player.zx = 0; }

cc.clearRect(0,0,c.width,c.height);

cc.fillStyle = "skyblue"
cc.fillRect(0,0,c.width,HH);
cc.fillStyle = "green"
cc.fillRect(0,HH,c.width,HH);

if(sprint > 0 & sprint < 10 * pressed[0].up){sprint += 3; }
if(sprint > 0 & pressed[0].up == false){sprint -= 3; }
if(sprint < 0 ){sprint = 0; }


if(pressed[0].up){

move(player.a,1.3 + (0.08 * sprint) )
}

if(pressed[0].down){
move(player.a + 180,1.3)
}

if(document.pointerLockElement == null){
if(pressed[0].right){ move(player.a - 90,1.3)  }
if(pressed[0].left){ move(player.a + 90,1.3)  }
player.a += (pressed[0].rl - pressed[0].rr) * walkspeed(15)

}else{

if(pressed[0].rr){ move(player.a - 90,1.3) }
if(pressed[0].rl){ move(player.a + 90,1.3) }
player.a += (pressed[0].left - pressed[0].right) * walkspeed(15)

}

if(player.a > 360){player.a -= 360}
if(player.a < 0){player.a += 360}

count = 0;

viewingblocks = [];
if(options.res){
for(i=-fov ; i<fov; i+=0.1){
data[count] = castRay(player.a + i);

count++
}

}else{

for(i=-fov ; i<fov; i+=0.3){
data[count] = castRay(player.a + i);

count++
}


}




var step = c.width / data.length
var gap = step * 1.5;


for(i=0; i<data.length; i++){
var height = (c.height / data[i].dist ) * (12 - 0.1 * fov)


if(moving & options.bob){

var yoffset = (player.z + Math.cos(frame / 3)  ) * (height / 200)

}else{

var yoffset = player.z * (height / 200);
}

var DATA = [c.width - ( (i + 1) * step) ,(HH - height) + yoffset,gap,height * 2]


/*floor rendering
for(why=DATA[1] + DATA[3]; why<c.height; why+=8){
var rayAngle = player.a + (-fov + i)
var alpha = rayAngle - (90 * deg)
var beta = Math.abs(rayAngle - player.a)
var r = why - HH
unfinished
}
*/


cc.drawImage(leaves,Math.floor( data[i].offset * lw) + (lw * data[i].tex), 0, 1,lh,DATA[0], DATA[1],DATA[2],DATA[3])


cc.fillStyle = "#00000060"
if(data[i].h == true){cc.fillRect( DATA[0], DATA[1],DATA[2],DATA[3] )}



}


if(options.hand){
if(moving & options.bob){
cc.drawImage(hand,453 + Math.sin(frame / (6 - 0.2 * sprint)  ) * (20 + 1 * sprint )  , 353 + Math.cos(frame / (3 - 0.1 * sprint) ) * (10 + 1 * sprint ) + player.zx);
}else{
cc.drawImage(hand,453, 353  + player.zx);
}
}

/* secreet map screen
cc.fillStyle="yellow";
for(i=0; i<map.length; i++){

if(map[i] != 0){
cc.fillRect( (i % mapsize) * mapscale,Math.floor(i / mapsize) * mapscale,mapscale,mapscale );
}
}
cc.fillStyle="red";
for(a=0; a<viewingblocks.length; a++){
var b = viewingblocks[a];

cc.fillRect( (b % mapsize) * mapscale,Math.floor(b / mapsize) * mapscale,mapscale,mapscale );

}


cc.fillRect( player.x - mapscale / 2,player.y - mapscale / 2,mapscale,mapscale );
*/


playerSpeed = Math.abs( (player.x - lastX) + (player.y - lastY) );
if( playerSpeed > 80 ){ reset(); alert("Sneaky sneaky, I know you teleported "); }

}
trophy = undefined
endText = [

"Congratulations...",
"uh...",
"",
"Excuse me, but what is your name?",
"","",
"Congratulations [NAME], you've beat my maze",
"That feat would take villagers days.",
"But here you are,",
"you made it this far,",
"Your amazing prize awaits.",
"","","","","","","","","","","","","","",
"[NAME], Wake up!"
]

credits = [
"[h]Credits","","",

"[h]Based on the game created by",
"Marcus \"Notch\" Persson", "","","",

"[h]Programming",
"king_of_wolves10", "", "", "",

"[h]Art",
"Mojang Studios",
"4J Studios",
"Microsoft",
"king_of_wolves10 (game title) ", "", "", "",

"[h]Music",
"C418", "", "", "",

"[h]Sounds",
"Mojang Studios",
"4J Studios",
"Microsoft", "", "", "",

"[h]Special Thanks", "",

"[h]The Textures Resource",
"Whitetimber - Block textures", "",

"[h]The Spriters Resource",
"ArcticMIA & Saadexe - GUI", "",

"[h]Sketchfab",
"JohnElkes - Zombie Model",

"[h]Planet Minecraft",
"Brick_UnStable - Background image",

"[h]Other",
"Zophar's Domain - Music", 
"Github Page - Hosting", "", "", "",

"[h]Game Hosted at",
"https://king-of-wolves10.github.io", "", "", "",

"All assets were used without permission, without any",
"involvement from Mojang, Microsoft, or 4J Studios.",
"All rights belong to their respective owners",

]