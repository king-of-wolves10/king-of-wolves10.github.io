//Thanks Pokemon Peninsula pokemon.ryux.net

var footer = document.getElementById("footer");
var add = document.getElementById("mail")
var address = "safewrdg3rgreg"
var site = "gmail.com"

if(add){add.innerHTML = "<a href='mailto:" + address + "@" + site + "'>E-Mail</a>" }
else{
footer.innerHTML = footer.innerHTML + "| <a href='mailto:" + address + "@" + site + "'>E-Mail</a>"
}
