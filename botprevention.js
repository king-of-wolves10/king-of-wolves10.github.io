//Thanks Pokemon Peninsula
var int = undefined
var count = 0;
var footer = document.getElementById("footer");
var add = document.getElementById("mail")
var address = "safewrdg3rgreg"
var site = "gmail.com"

if(add){add.innerHTML = "<a href='mailto:" + address + "@" + site + "'>E-Mail</a>" }
else{
footer.innerHTML = footer.innerHTML + "| <a href='mailto:" + address + "@" + site + "'>E-Mail</a>"
}


function copycode(i,source){

var codes = [
`<a href="https://king-of-wolves10.github.io"><img src="https://king-of-wolves10.github.io/link.gif"></a>`
]
source.innerText = "Copied"
navigator.clipboard.writeText(codes[i]);
int = setInterval(wait,1000,source)
}

function wait(source){
source.innerText = "Copy Code"
count ++;

if(count == 1){
clearInterval(int)
count = 0
}
}

