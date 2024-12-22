links = [ 
{"title":"Home", href:"index"},
{"title":"Guilds Game", href:"pages/GuildGame"}, 
{"title":"How to make your own website", href:"pages/makeOwn"}, 
{"title":"About Me", href:"pages/aboutme"  },
{"title":"Games", href:"pages/games/index" },



]
var root = "/"

var list = ""
for(i=0; i<links.length; i++){

if( links[i].href + ".html" == window.location.toString().replace(root,"") ){continue}
list = list + `<a href="`+ root + links[i].href +`.html"><div class="link">`+ links[i].title +`</div></a>`
}
document.write(`

      <header>
	<div style="display: flex;    overflow: hidden; "><a><img id="logo" style="height:128px"src="`+ root + `logo2.png"></img></a>
	<div style='display:inline-block; width: 80%;'>
    <h1 id="Welcome">King of Wolves website! </h1><br>
    <nav id="mainnav"> <a href="#wrapper" id="skip">Skip Navigation</a> `+list+`
     </nav>
</div>
<b id="est" class="border" style="background-color:#123456; height:min-content; float:right;"></b>
</div>

  </header>
`
);

logo = document.querySelector('#logo');

logo.onmouseenter = function(e){

//document.querySelector('#welcome').innerText = "Visit MelonHead"
}

logo.onmouseleave = function(e){

//document.querySelector('#welcome').innerText = "King of Wolves website!"
}


tick(); 
setInterval(tick,1000)

function tick(){

  var d = new Date();
  d = d.toLocaleString('en-US', { timeZone: 'EST' } ).replace(/.*,./,"") + " EST"
  document.getElementById("est").innerText = d

}
