var root = "/"
document.write(`
<div style="display:inline-block; text-align:center; width:min-content"><img src="`+root+`/link.gif"></img><br><a style="cursor: copy; " onclick=" copycode(0,this); ">Copy Code</a> </div>
<div style="display:inline-block; text-align:center; width:min-content"><img src="`+root+`/melon/link.gif"></img><br><a style="cursor: copy; " onclick=" copycode(1,this); ">Copy Code</a> </div>
`);