davis = document.querySelector("#davisanswer")

davisvideo = document.querySelector("#davisvideo")
davisvideo.innerHTML = `<a title="sorry for faking a link, it takes you to YouTube">Link to the video</a>`

//idk y but i had 2 fake a link cuz it kept screwing up
davisvideo.onclick = function(){
window.location =  "https://www.youtube.com/watch?v=LnmZSfagwmM";
}
now = new Date();
start = new Date("3/14/2024");


function datediff(first, second) {        
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

if( Math.ceil(datediff(start,now) / 7) % 2 == 0 ) davis.innerText = "Yes"
else davis.innerText = "No"

setInterval(othertick,1000)

function othertick(){

now = new Date();
var movie = new Date( now.getTime() + 4920000  ).toLocaleString().replace(/.*,./,"");
var collection = new Date( now.getTime() + 7740000 ).toLocaleString().replace(/.*,./,"");
var shrek = new Date( now.getTime()  + 5400000 ).toLocaleString().replace(/.*,./,"");
document.querySelector("#movieTime").innerHTML = movie + "<br>(" + collection + " for Digimon the Movies Collection)" 
document.querySelector("#shrekTime").innerHTML = shrek
}