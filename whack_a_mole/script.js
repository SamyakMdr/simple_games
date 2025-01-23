let currMoleTile;
let currPlantTile;
let score=0;
let gameOver= false;
let moleInterval, plantInterval;

window.onload = function(){
    setGame();
    document.getElementById("restart").querySelector("button").addEventListener("click", restartGame);
}

function setGame() {
    score = 0; // Reset score
    gameOver = false; // Reset game over flag
    document.getElementById("score").innerHTML = "Score is: 0"; // Update score display

    let board = document.getElementById("board");
    board.innerHTML = ""; // Clear any existing tiles

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    if (moleInterval) clearInterval(moleInterval);
    if (plantInterval) clearInterval(plantInterval);

    moleInterval = setInterval(setMole, 2000);
    plantInterval = setInterval(setPlant, 1000);
}

function getRandomTile(){
    let num = Math.floor(Math.random()*9);
    return num.toString();
}

function setMole(){
    if(gameOver){
        return;
    }

    if (currMoleTile){
        currMoleTile.innerHTML ="";
    }

    let mole= document.createElement("img");
    mole.src = "img/monty-mole.png";

    let num= getRandomTile();
    if(currMoleTile && currPlantTile.id == num){
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant(){
    if(gameOver){
        return;
    }

    if (currPlantTile){
        currPlantTile.innerHTML ="";
    }

    let plant= document.createElement("img");
    plant.src = "img/piranha-plant.png";

    let num= getRandomTile();

    if(currPlantTile && currMoleTile.id == num){
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameOver){
        return;
    }
    if(this==currMoleTile){
        score += 10;
        document.getElementById("score").innerHTML= score.toString();
    }
    else if(this == currPlantTile){
        document.getElementById("score").innerHTML="GAME OVER:"+ score.toString();
        gameOver= true;
    }
}

function restartGame(){
    if(gameOver){
       return setGame();
    }
}