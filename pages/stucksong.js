//This is just a way to quickly edit the Song of the Day without digging in the HTML

audiotag = document.getElementById("song");
nametag = document.getElementById("songname");

var songname = "Dragon Ball Z, Tenkaichi Tag Team/Budokai HD Collection: Options/Game Select";
var songsrc = "";

nametag.addEventListener("load",function(){

  if(songsrc != "songoftheday.mp3"){
  nametag.innerText = songname + "\n" + "Audio source: " + songsrc;
  }else{
   nametag.innerText = songname + "\n" + "Audio source: Here"; 
  }
  audiotag.style.display = block;
  audiotag.src = songsrc
  
})