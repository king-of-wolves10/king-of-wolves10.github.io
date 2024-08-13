//This is just a way to quickly edit the Song of the Day without digging in the HTML

audiotag = document.getElementById("song");
songtitle = document.getElementById("songname");

songname = "Dragon Ball Z, Tenkaichi Tag Team/Budokai HD Collection: Options/Game Select";
songsrc = "";

songtitle.addEventListener("load",function(){

  if(songsrc != "songoftheday.mp3"){
  songtitle.innerText = songname + "\n" + "Audio source: " + songsrc;
  }else{
   songtitle.innerText = songname + "\n" + "Audio source: Here"; 
  }
  audiotag.style.display = block;
  audiotag.src = songsrc
  
})
