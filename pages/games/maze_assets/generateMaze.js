table = document.getElementById("maze")



seed = Math.random() * 4294967295 
function doRNG(){
//Skawo on YouTube
 
seed=(seed*1664525+1013907223) % 2147483647

return seed/2147483647 //this should create a random number between 1 and 0


}


function generateRandomMaze(){

for(i=0; i<map.length; i++){
	map[i] = 1;
}

frontiers = [];
var selectedTile = Math.round( doRNG() * (map.length) )
map[selectedTile] = 0
getFrontierCells(selectedTile)
var failsafe = 0
selectedIdx = 0;

while( frontiers.length > 0 ){

	selectedIdx = Math.round( doRNG() * (frontiers.length - 1) )
	selectedTile = frontiers[selectedIdx]
	
	if( connectNeighbors(selectedTile) == true){
		
	frontiers.splice(selectedIdx,1)
	getFrontierCells(selectedTile)
	failsafe -= 1
	}
	
	for(b=0; b<frontiers.length; b++){
		
		if( map[frontiers[b]] == 0 ){
			frontiers.splice(b,1)
		}
	}
	
	
	
	if( failsafe > frontiers.length ){console.error("failsafe engaged, your loop is faulty"); clearInterval(interval) }

	failsafe ++;
}

setPoints();

}
function setPoints(){
ENDcell = 85
while(map[ENDcell] == 1){
	ENDcell += mapsize
	if(ENDcell > map.length - mapsize){
		ENDcell = (ENDcell % mapsize) + 1
	}
}

STARTcell = 166
while(map[STARTcell] == 1){
	STARTcell += mapsize
	if(STARTcell > map.length - mapsize){
		STARTcell = (STARTcell % mapsize) - 1
	}
}



if(STARTcell == ENDcell){console.log("how is this possible") }
map[ENDcell] = 3

if( map[STARTcell + 1] == 1){
	map[STARTcell + 1] = 2
}

if( map[STARTcell - 1] == 1){
	map[STARTcell - 1] = 2
}

if( map[STARTcell - mapsize] == 1){
	map[STARTcell - mapsize] = 2
}

if( map[STARTcell + mapsize] == 1){
	map[STARTcell + mapsize] = 2
}


player.x = Math.ceil(STARTcell % mapsize) * mapscale
player.y = Math.ceil(STARTcell / mapsize) * mapscale

player.x += mapscale / 2
player.y -= mapscale / 2
}


function colorArray(array){
	
	for(i=0;i<array.length;i++){
	var tableCell = document.getElementById("cell"+array[i] )
	if(map[ array[i] ] == 0){
		tableCell.style.backgroundColor = "pink"
	}
	if(map[ array[i] ] == 1){
		tableCell.style.backgroundColor = "red"
	}
	
	
}
	
}




function getFrontierCells(cell){
	//computes frontier cells. A frontier cell is a neighboring cell that is 2 cells away that is blocked
	
	var cellX = cell % mapsize
	
	if(cell > mapsize * mapsize || cell < 0){
		console.error("Cell " + cell + " is out of bounds")
		return false
	}
	
	if( (cell + 2) % mapsize > cellX & (cell+2)%mapsize < mapsize - 1 ){ //if moving right is indeed right instead of looping left like pacman
		if(map[cell + 2] == 1){frontiers[frontiers.length] =( cell+2)}
	}
	if( cell + mapsize * 2 < map.length - mapsize ){//if the bottom cell is within the maze
		if(map[cell + mapsize * 2] == 1){frontiers[frontiers.length]= cell + mapsize * 2 }
	}
	if( (cell - 2) % mapsize < cellX& (cell-2)%mapsize > 0 ){
		if(map[cell - 2] == 1){frontiers[frontiers.length] =( cell-2)}
	}
	if( cell - mapsize * 2 > mapsize){//if the top cell is within the maze
		if(map[cell - mapsize*2] == 1){frontiers[frontiers.length] =( cell - mapsize * 2 )}
	}
	
	return true
}


function connectNeighbors(frontierCell){
	//a neighbor is a neighboring cell that is 2 cells away that is NOT blocked
	//return values: true - found and connected a neighbor, false - no neighbors to connect, false & error, bad frontier cell	
	var neighbors = []
	var cellX = frontierCell % mapsize
	
	if(frontierCell > mapsize * mapsize || frontierCell < 0){
		console.error("Frontier Cell " + frontierCell + " is out of bounds")
		return false
	}
	
	
	if( (frontierCell + 2) % mapsize > cellX){  //c&v of above code
	//instead of noting the neighbor, I'm noting the spot in between the neighbor and the cell
		if(map[frontierCell + 2] == 0){neighbors[neighbors.length] = frontierCell + 1 } 
	}
	if( frontierCell + mapsize * 2 < mapsize * mapsize){
		if(map[frontierCell + mapsize * 2] == 0){neighbors[neighbors.length] =frontierCell + mapsize}
	}
	if( (frontierCell - 2) % mapsize < cellX){
		if(map[frontierCell - 2] == 0){neighbors[neighbors.length] = frontierCell-1}
	}
	if( frontierCell - mapsize * 2 > 0){
		if(map[frontierCell - mapsize*2] == 0){neighbors[neighbors.length] = frontierCell - mapsize}
	}
	
	if(neighbors.length == 0){return false}
	var selectedNeighbor = Math.round( doRNG() * (neighbors.length - 1) )
	map[ neighbors[selectedNeighbor] ] = 0
	map[frontierCell] = 0

	return true
}