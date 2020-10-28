document.getElementById('game-board').style.display = 'none';
document.getElementById('score-div').style.display = 'none';

let surfer;
let currentGame;
let foamObstacle = new FoamObstacle(280);
let difficulty;

document.getElementById('start-button').onclick = () => {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('score-div').style.display = 'block';

    startGame();
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


let twoTimesArr = [];
let twoTimesFrequency = 0;

function updateTwoTimesArr(){
    twoTimesFrequency++;
    if(twoTimesFrequency % 3000 === 0){
        twoTimesArr.push(new ScoreTwice(gameWidth));
    }
}


let topObstacleArr = [];
let obstaclesFrequency = 0;

function updateTopObstacleArr(){
    obstaclesFrequency++;
    if(obstaclesFrequency % 320 === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 300) + gameWidth;
        let randomY = Math.floor(Math.random() * 300);
        topObstacleArr.push(new TopObstacle(newGameWitdh, randomY));
    }
}


let waveObstacleArr = [];
let frames = 0;

function updateWaveObstacleArr(){
    frames ++
    if(frames % 250 === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 350) + gameWidth;
        let randomHeight = Math.floor(Math.random() * 250);
        waveObstacleArr.push(new WaveObstacle(newGameWitdh, randomHeight));
    }
}

let sharkObstacleArr = [];
let sharkFrequecy = 0;

function updatesharkObstacleArr(){
    sharkFrequecy ++
    if(sharkFrequecy % 500 === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 300) + gameWidth;
        sharkObstacleArr.push(new SharkObstacle(newGameWitdh));
    }
}

function detectCollision(obstacle) {
    return !((surfer.position.y + surfer.height < obstacle.position.y) || 
            (surfer.position.y > obstacle.position.y + obstacle.height) || 
            (surfer.position.x + surfer.width < obstacle.position.x) || 
            (surfer.position.x > obstacle.position.x + obstacle.width));
}

function increaseObstacles(){
    updateTopObstacleArr();
    updateWaveObstacleArr();
    updatesharkObstacleArr();
}

function updateGame(){

    ctx.clearRect(0, 0, gameWidth, gameHeight);
    currentGame.draw();
    surfer.draw(ctx);
    surfer.update();
    updateTopObstacleArr();
    updateWaveObstacleArr();
    updatesharkObstacleArr();
    updateTwoTimesArr();
    foamObstacle.draw(ctx);    

    twoTimesArr.forEach(powerUp => {

        powerUp.draw(ctx);
        powerUp.update();

        if (detectCollision(powerUp)) {
            currentGame.score *= 2
            twoTimesArr = [];
        }
    });

    // to check if surfer hit top obstacle
    topObstacleArr.forEach(obstacle => {

        obstacle.draw(ctx);
        obstacle.update();

        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    });

    // to check if surfer hit bottom obstacle
    waveObstacleArr.forEach(obstacle => {

        obstacle.draw(ctx);
        obstacle.update();

        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    })
    
    // to check if surfer hit shark obstacle
    sharkObstacleArr.forEach(obstacle => {

        obstacle.draw(ctx);
        obstacle.update();

        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    })


    //add score
    document.getElementById('score-value').innerHTML = currentGame.score ++; 

    // more obstacles if over X score
    if(currentGame.score > 3000){
        increaseObstacles();
    } else if (currentGame.score > 9000){
        increaseObstacles();
    } else if (currentGame.score > 18000){
        increaseObstacles();
    } else if (currentGame.score > 36000){
        increaseObstacles();
    } else if (currentGame.score > 72000){
        increaseObstacles();
    } else if (currentGame.score > 144000){
        increaseObstacles();
    }
   
    if(currentGame.gameIsRunning){
        requestAnimationFrame(updateGame);
        document.getElementById('start-button').style.display = 'none';

    } else {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0,0, gameWidth, gameHeight);
    
        ctx.font = "70px Ubuntu";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", gameWidth/2, gameHeight/2);

        document.getElementById('start-button').style.display = 'block';
        document.getElementById('start-button').innerText = 'Try Again';
    }
}

function checkHighScore(){
    let currentScore = currentGame.score

    let highScore = localStorage.getItem('HighScore')

    if(currentScore > highScore){
        localStorage.HighScore = currentScore
    }
    
    document.getElementById("high-score-value").innerHTML = localStorage.getItem("HighScore");
}

function restartGame(){
    checkHighScore();
    currentGame.surfer = {};
    currentGame.score = 0;
    topObstacleArr = [];
    waveObstacleArr = [];
    sharkObstacleArr = [];
}