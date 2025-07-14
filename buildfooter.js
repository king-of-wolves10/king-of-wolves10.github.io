
var subpages = {

"Games":[ {title:"Fetch", href:"Fetch" }, {title:"My Minecraft Maze", href:"MinecraftMaze" }, ],
"About Me":[ {title:"Minecraft PS3", href:"minecraft"},{title:"My art", href:"art"} ]

}


var list = ""
for(i=0; i<links.length; i++){

if( links[i].href + ".html" == window.location.toString().replace(root,"") ){continue}
var sub = subpages[links[i].title]
  if(sub != undefined){
  var sublist = ""
  for(b=0; b<sub.length; b++){
        var newurl = links[i].href.split("/")
        newurl.length -= 1
        newurl = newurl.join("/")
	sublist += `<div class="sublink"><a href="` + root + newurl + "/" + sub[b].href +`.html">` + sub[b].title +`</a></div>`  
  }
  list += `<details> <summary class="maplink"><a href="`+ root + links[i].href +`.html">` + links[i].title + `</a></summary>` + sublist + `</details>`
  }else{
  list += `<div class="maplink"><a href="`+ root + links[i].href +`.html">` + links[i].title + `</a></div><br>`
  }

}


var art = document.querySelector(".sidebar")

art.innerHTML = `\
\
\
Check it out, I got a brand new sidebar.<br>\
<br>\
Full map <hr color=white>
<div><nav>`+ list +`</nav><br><br> New pages are blue!</div>
<hr color=white>

<div style="width:80%; align-content: center; height:300px; display: inline-block; color:black;">
<b>Blog</b>
<div style="overflow-y:scroll; width:110%; height:70%" class="scroll">
July 29 2025<br>
About that Popeye game.. I forgot that I wanted to make a copyright free version
of that &lt;('=' )\
<hr>
June 28 2025<br>
Is my website really a year old? Time does fly!!<br>
I've been busy trying to finish a game called Popeye for 2 players, it will play
exactly the same as the classic game (minus a few kinks), except another player has
to control Bluto/Brutus. I hope it will be done soon, once it is, you'll be able to
download it here. (Ooh an executable)
<hr>
May 24th 2024<br>
I've been running in circles deciding when is the time to finish anything.<br>
That time is always never. Have fun exploring the new page though.
<br><br>
I'm trying to learn how to make Windows games with Direct3D11 to have complete freedom
compared to Godot Game Engine. It will also make a good future for me knowing DirectX with C++.
<br><br>
I thank you, Chuck Walbourn for not only answering my question on stackoverflow, but guiding me
in the right path to making videogames.
<hr>

I hope y'all like the new layout. I thought a sidebar would be good for displaying links.
Also, there's a new game on the horizon; It's not very fun, but it should be neat.<br>
<br>
You've totally noticed the brand new banner, Isn't it rad? The guy in the center is my avatar.
I already have an avatar called "Lazy Bones", but he was a plain skeleton with a purple bandana,
certinaly not the guy to tame Wolves and Dragons. The wolves would eat him up.<br><br>
The picture is also a <a class="outerlink" href="images/digimon.jpg">refrence to Digimon</a>, just saying it aloud so no-one thinks I'm being sneaky
<br><br>

</div></div><br>
Other Cool sites <hr>

<a href="https://wikimon.net">Wikimon</a><br>
<a href="https://digivice.net/">Patamon's World</a><br>
<a href="https://pokemon.ryux.net/">Pokemon Peninsula</a><br>
<a href="https://neal.fun">Neal.fun</a><br>
<a href="https://edp.org/sm64coin.htm">Eric's Coinpage</a><br>
<a href="http://konaka.com/alice6/indexe.html">Konaka.com (English site map)</a><br>
<a href="http://konaka.com/">Konaka.com (Main page)</a><br>
<a href="https://www.masswerk.at/JavaPac/">mass:werk</a><br>
<a href="https://i-made-a.website/">Lyra made a website</a><br>
<a href="https://www.zophar.net/">Zophars Domain</a><br>
<a href="https://nitehackr.github.io/games_index.html">Neil Roy's website</a><br>
<br><br>
I am not affiliates with any of the people who made the websites above, 
They are just websites I found that I think other people would like.
<br>
<sub>Lot of these are Digimon and Pokemon websites...</sub>
\
`

/*
document.querySelector(".sidebar").style.height = art.offsetHeight + "px";

window.onresize = function(e){
//im sorry, i don't know how to make the sidebar go all of the way down
document.querySelector(".sidebar").style.height = art.offsetHeight + "px";
}

*/

