document.getElementById('game-board').style.display = 'none';
document.getElementById('score-div').style.display = 'none';
// document.getElementById('restart-button').style.display = 'none';

let currentGame;
let surfer;
let foamObstacle = new FoamObstacle(280);

document.getElementById('start-button').onclick = () => {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('score-div').style.display = 'block';
    // document.getElementById('restart-button').style.display = 'block';

    startGame();

    // document.getElementById('restart-button').onclick = () => {
    //     startGame();
    // }
}

function startGame() {
    currentGame = new Game();
    surfer = new Player(gameWidth, gameHeight);
    new InputHandler(surfer);
    updateGame();
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height; 


let topObstacleArr = [];
let obstaclesFrequency = 0;

function updateTopObstacleArr(){
    obstaclesFrequency++;
    if(obstaclesFrequency % 380 === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 300) + gameWidth;
        topObstacleArr.push(new TopObstacle(newGameWitdh));
    }
}


let waveObstacleArr = [];
let frames = 0;
function updateWaveObstacleArr(){
    frames++
    if(frames % 250 === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 350) + gameWidth;
        let randomHeight = Math.floor(Math.random() * 250);
        waveObstacleArr.push(new WaveObstacle(newGameWitdh, randomHeight));
    }
}

let sharkObstacleArr = [];
let sharkFrequecy = 0;
function updatesharkObstacleArr(){
    sharkFrequecy++;
    if(sharkFrequecy % 500 === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 300) + gameWidth;
        sharkObstacleArr.push(new SharkObstacle(newGameWitdh));
    }
}


function detectCollision(obstacle) {
    return !((surfer.position.y + surfer.height < obstacle.position.y) || 
            (surfer.position.y > obstacle.position.y + obstacle.height) || 
            (surfer.position.x + surfer.width < obstacle.position.x) || 
            (surfer.position.x > obstacle.position.x + obstacle.width))
}

function updateGame(){

    ctx.clearRect(0, 0, gameWidth, gameHeight);
    currentGame.draw();
    surfer.draw(ctx);
    surfer.update();
    updateTopObstacleArr();
    updateWaveObstacleArr();
    updatesharkObstacleArr();
    foamObstacle.draw(ctx);

    //to check if surfer hit top line of foam
    

    //to check if surfer hit top obstacle
    topObstacleArr.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    });

    //to check if surfer hit bottom obstacle
    waveObstacleArr.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    })
    
    //to check if surfer hit shark obstacle
    sharkObstacleArr.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    })

    //score 
    document.getElementById('score-value').innerHTML = currentGame.score ++;

    if(currentGame.gameIsRunning){
        requestAnimationFrame(updateGame);
        document.getElementById('start-button').style.display = 'none'
    } else {
        ctx.font = "60px Ubuntu";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", gameWidth/2, 150);
        document.getElementById('start-button').style.display = 'block'
        document.getElementById('start-button').innerText = 'Try Again'
    }
}


function restartGame(){
    currentGame.surfer = {};
    currentGame.score = 0;
    topObstacleArr = [];
    waveObstacleArr = [];
    sharkObstacleArr = [];
}

