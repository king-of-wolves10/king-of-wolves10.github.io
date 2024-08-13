//This doesnt work for GitHub Pages, because I need to update the HTML file anyways, what a rip.

audiotag = document.getElementById("song");
songtitle = document.getElementById("songname");

songname = "Dragon Ball Z, Tenkaichi Tag Team/Budokai HD Collection: Options/Game Select";
songsrc = "songoftheday.mp3";

songtitle.addEventListener("load",function(){
if(songsrc == "" || songname == ""){return}
  if(songsrc != "songoftheday.mp3"){
  songtitle.innerText = songname + "\n" + "Audio source: " + songsrc;
  }else{
   songtitle.innerText = songname + "\n" + "Audio source: Here"; 
  }
  audiotag.style.display = block;
  audiotag.src = songsrc
  
})
