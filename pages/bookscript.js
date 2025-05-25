
currentBook = "#artbook"
progress = {"#artbook":0 }
function getEle(ele){
return document.querySelector(ele)
}

for(i=1; i<getEle(currentBook).children.length; i++){
getEle(currentBook).querySelector('[name="page'+ i +'"]').hidden = true

}

function jumpto(page){

if( getEle(currentBook).querySelector("[name=page"+ page +"]") == null){
	return false;
}
getEle(currentBook).querySelector('[name="page'+ progress[currentBook] +'"]').hidden = true
progress[currentBook] = page;
var page = getEle(currentBook).querySelector('[name="page'+ progress[currentBook] +'"]')
page.hidden = false
return true;
}

function flip(amount){

var hasflip = true;
getEle(currentBook).querySelector('[name="page'+ progress[currentBook] +'"]').hidden = true
progress[currentBook] += amount
if( getEle(currentBook).querySelector('[name="page'+ progress[currentBook] +'"]') == null ){
progress[currentBook] -= amount
hasflip = false;
} 
var page = getEle(currentBook).querySelector('[name="page'+ progress[currentBook] +'"]')
page.hidden = false

if(progress[currentBook] > 1 & hasflip){

page.querySelector(".rp").onanimationend = function(e){
e.target.style.animation = "";
e.target.style.animationDelay = "";
e.target.style.contentVisibility = "visible";
}
page.querySelector(".lp").onanimationend = function(e){
e.target.style.animation = "";
e.target.style.animationDelay = "";
e.target.style.contentVisibility = "visible";
}

if(amount > 0){

page.querySelector(".lp").style.contentVisibility = "hidden";
page.querySelector(".rp").style.animation = "0.2s linear flip"
page.querySelector(".lp").style.animation = "0.2s linear flip"
page.querySelector(".lp").style.animationDelay = "0.1s"
page.querySelector(".rp").style.animationDelay = ""

}else{

page.querySelector(".rp").style.contentVisibility = "hidden";
page.querySelector(".rp").style.animation = "0.2s linear flip"
page.querySelector(".lp").style.animation = "0.2s linear flip"
page.querySelector(".rp").style.animationDelay = "0.1s"
page.querySelector(".lp").style.animationDelay = ""
}
}


}