let maze1;
resetMaze();
function resetMaze(){
    maze1=[
        [5,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0],
        [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
        [0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0],
        [1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
        [0,0,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,1,1,0],
        [0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
        [0,1,0,1,0,1,0,1,0,1,2,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1,0,2,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0],
        [0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,0,0],
        [0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1],
        [0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],
        [0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,3]
    ];
}

function drawSubtiles(y, x){
    let tileStartpointY = tileSize*y;
    let tileStartpointX = tileSize*x;
    ctx.drawImage((maze[y][x].tile.tileset.tileImages[maze[y][x].subTiles[1]]), tileStartpointX, tileStartpointY, tileSize/2, tileSize/2);
    ctx.drawImage((maze[y][x].tile.tileset.tileImages[maze[y][x].subTiles[2]]), tileStartpointX + (tileSize/2), tileStartpointY, tileSize/2, tileSize/2);
    ctx.drawImage((maze[y][x].tile.tileset.tileImages[maze[y][x].subTiles[3]]), tileStartpointX, tileStartpointY + (tileSize/2), tileSize/2, tileSize/2);
    ctx.drawImage((maze[y][x].tile.tileset.tileImages[maze[y][x].subTiles[4]]), tileStartpointX + (tileSize/2), tileStartpointY + (tileSize/2), tileSize/2, tileSize/2);
}


//Constructor
function Tile(tileName, tileset, walkable){
    //Tile ID
    // this.number = tileCounter++;

    //Tile Name
    this.tileName = tileName;

    //Boolean - decides if the player can walk on that tile
    this.walkable = walkable;

    //Tileset - The smaller tiles underneath what's placed on the tile
    this.tileset = tileset;

    //Tile Image - The image that the tile looks like
    if(tileName !== "floor"){
        let tileImage = new Image();
        tileImage.src = "media/imgs/" + tileName + ".png";
        this.image = tileImage;
    }
}

function Tileset(tilesetName, tileAmount){
    this.tilesetName = tilesetName;
    this.tileImages = [];
    this.tileAmount = tileAmount || 1;
    for(let i = 0; i < tileAmount; i++){
        let tilesetImage = new Image();
        tilesetImage.src = "media/imgs/" + tilesetName + "/" + i + ".png";
        this.tileImages[i] = tilesetImage;
    }
}
 
let maze;
let mazeSubTiles;
let canvas;
let ctx;
let canvasSize;
let tiles = [
    "floor",
    "wall",
    "mouse",
    "start1",
    "player1",
    "start2",
    "player2"
];
let tileSize;
let grass = new Tileset("grass", 3);
let catWins = new Audio("media/sounds/catWins.mp3");
let dogWins = new Audio("media/sounds/dogWins.mp3");
let mouseCaught = new Audio("media/sounds/mouseCaught.mp3");
let player1;
let player2;
let dogCanMove;
let wallRandomness;
let mouseRandomness;
let mouseCounter;
for(let i = 0; i < tiles.length; i++){
    tiles[i] = new Tile(tiles[i], grass, true);
}

// Returns a random tile from a given tileset
function randomTile(tileset){
    return Math.floor(Math.random() * (tileset.tileAmount));
}

// Draws the maze
function drawMaze(){
    for(let y = 0;y < maze.length; y++){
        for(let x = 0; x < maze[y].length; x++){
            if(maze[y][x].tile.tileName !== "player1" && maze[y][x].tile.tileName !== "player2"){
                drawSubtiles(y, x);
            }
            let tileStartpointY = tileSize*y;
            let tileStartpointX = tileSize*x;

            if(maze[y][x].tile.tileName !== "floor"){
                ctx.drawImage(maze[y][x].tile.image, tileStartpointX, tileStartpointY, tileSize, tileSize);
            }
        }
    }
}

// Initializes the maze
function initializeMaze(){
    resetMaze();
    dogCanMoveAgain();
    maze = maze1;
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext('2d');
    canvasSize = 960;
    tileSize = (canvasSize/maze.length);
    tileCounter = 0;
    wallRandomness = 7;
    mouseRandomness = 25;
    mouseCounter = 0;
    for(let i = 0; i < tiles.length; i++){
        if(tiles[i].tileName === "player1"){
            player1 = tiles[i];
            tiles[i].walkable = false;
            if(player1.score == null){
                player1.score = 0;
            }
        }else if(tiles[i].tileName === "player2"){
            player2 = tiles[i];
            if(player2.score == null){
                player2.score = 0;
            }
        }
    }
    document.querySelector("#player1Score").innerHTML = "Hund: " + player1.score;
    document.querySelector("#player2Score").innerHTML = "Kat: " + player2.score;
    player1.previousTile = "start1";
    player2.previousTile = "start2";
    for(let y = 0;y < maze.length; y++){
        for(let x = 0; x < maze[y].length; x++){
            if(maze[y][x] === 1){
                if(maze[y][x] === Math.floor(Math.random() * wallRandomness)){
                    maze[y][x] = 0;
                }
            }
            if(maze[y][x] === 0){
                if(maze[y][x] === Math.floor(Math.random() * mouseRandomness)){
                    maze[y][x] = 2;
                }
            }
            if(maze[y][x] === 2){
                mouseCounter++;
            }
            maze[y][x] = {
                tile: tiles[maze[y][x]],
                subTiles: {
                    1: "",
                    2: "",
                    3: "",
                    4: ""
                }
            }
            maze[y][x].subTiles[1] = randomTile(maze[y][x].tile.tileset);
            maze[y][x].subTiles[2] = randomTile(maze[y][x].tile.tileset);
            maze[y][x].subTiles[3] = randomTile(maze[y][x].tile.tileset);
            maze[y][x].subTiles[4] = randomTile(maze[y][x].tile.tileset);
            if(maze[y][x].tile.tileName === "wall"){
                maze[y][x].tile.walkable = false;
            }else if(maze[y][x].tile.tileName === "start1"){
                player1.y = y;
                player1.x = x;
                player1.previousTile = maze[y][x].tile;
                drawSubtiles(y, x);
                maze[y][x].tile = player1;
            }else if(maze[y][x].tile.tileName === "start2"){
                player2.y = y;
                player2.x = x;
                player2.previousTile = maze[y][x].tile;
                drawSubtiles(y, x);
                maze[y][x].tile = player2;
            }
        }
    }
    drawMaze();
}

// Delays initialization until the page has fully loaded
window.onload = function() {
    initializeMaze();
}

// Movement controls -------------------------------------------------------------------------
window.addEventListener("keydown", (e)=>{
    checkMovement(e.key);
});
function movePlayer(playerNumber){
    movementDestination = maze[playerNumber.y + movement.y][playerNumber.x + movement.x].tile;
    if(movementDestination.walkable){
        maze[playerNumber.y + movement.y][playerNumber.x + movement.x].tile = playerNumber;
        maze[playerNumber.y][playerNumber.x].tile = playerNumber.previousTile;
        playerNumber.y = playerNumber.y + movement.y;
        playerNumber.x = playerNumber.x + movement.x;
        playerNumber.previousTile = movementDestination;
        drawMaze();
        if(playerNumber === player1 && movementDestination.tileName === "player2"){
            alert("Hunden har fanget katten, og hunden har dermed vundet!");
            dogWins.play();
            player1.score++;
            initializeMaze();
        }else if(movementDestination.tileName === "mouse"){
            mouseCaught.play();
            playerNumber.previousTile = new Tile("floor", grass, true);
            playerNumber.previousTile.subTiles = movementDestination.subTiles;
            mouseCounter--;
            if(playerNumber == player1){
                console.log("hund spiser mus");
                dogCanMove = false;
                console.log(dogCanMove);
                window.setTimeout(dogCanMoveAgain, 2000);
                console.log(dogCanMove);
            }
            if(mouseCounter === 0){
                alert("Der er ikke flere mus, og katten har dermed vundet!");
                catWins.play();
                player2.score++;
                initializeMaze();
            }
        }
    }
    // movementDestination.sound.play();
}

function dogCanMoveAgain(){
    dogCanMove = true;
}

function checkMovement(input){
    if(input === "ArrowUp"){
        console.log(dogCanMove);
        if(dogCanMove === true){
            movement = {x: 0, y: -1};
            movePlayer(player1);
        }
    }else if(input === "ArrowDown"){
        if(dogCanMove === true){
            movement = {x: 0, y: 1};
            movePlayer(player1);
        }
    }else if(input === "ArrowLeft"){
        if(dogCanMove === true){
            movement = {x: -1, y: 0};
            movePlayer(player1);
        }
    }else if(input === "ArrowRight"){
        if(dogCanMove === true){
            movement = {x: 1, y: 0};
            movePlayer(player1);
        }
    }else if(input === "w"){
        movement = {x: 0, y: -1};
        movePlayer(player2);
    }else if(input === "s"){
        movement = {x: 0, y: 1};
        movePlayer(player2);
    }else if(input === "a"){
        movement = {x: -1, y: 0};
        movePlayer(player2);
    }else if(input === "d"){
        movement = {x: 1, y: 0};
        movePlayer(player2);
    }
}
