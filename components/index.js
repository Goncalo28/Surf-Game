document.getElementById('game-board').style.display = 'none';
document.getElementById('score-div').style.display = 'none';
document.getElementById('high-score').style.display = 'none';

let surfer;
let currentGame;
let difficulty;
let foamObstacle = new FoamObstacle(280);


document.getElementById('easy-start-button').onclick = () => {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('score-div').style.display = 'block';
    document.getElementById('high-score').style.display = 'block';
    document.getElementById('game-image').style.display = 'none';

    startGame(1);
}
document.getElementById('medium-start-button').onclick = () => {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('score-div').style.display = 'block';
    document.getElementById('high-score').style.display = 'block';
    document.getElementById('game-image').style.display = 'none';

    startGame(2);
}
document.getElementById('hard-start-button').onclick = () => {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('score-div').style.display = 'block';
    document.getElementById('high-score').style.display = 'block';
    document.getElementById('game-image').style.display = 'none';

    startGame(3);
}

function startGame(difficulty) {
    currentGame = new Game(difficulty);
    surfer = new Player(gameWidth, gameHeight);
    new InputHandler(surfer);
    checkHighScore();
    updateGame();
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height; 


let shieldsArr = [];
let shieldsFrequency = 0;
function updateShieldsArr(){
    shieldsFrequency++;
    if(shieldsFrequency % 1800 === 0){
        let randomY = Math.floor(Math.random() * 450);
        shieldsArr.push(new Shield(gameWidth, randomY));
    }
}


let twoTimesArr = [];
let twoTimesFrequency = 0;

function updateTwoTimesArr(){
    twoTimesFrequency++;
    if(twoTimesFrequency % 1500 === 0){
        twoTimesArr.push(new ScoreTwice(gameWidth));
    }
}


let topObstacleArr = [];
let obstaclesFrequency = 0;

function updateTopObstacleArr(){
    obstaclesFrequency++;
    if(obstaclesFrequency % Math.floor(320/currentGame.difficulty) === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 300) + gameWidth;
        let randomY = Math.floor(Math.random() * 300);
        topObstacleArr.push(new TopObstacle(newGameWitdh, randomY));
    }
}


let waveObstacleArr = [];
let frames = 0;

function updateWaveObstacleArr(){
    frames ++
    if(frames % Math.floor(250/currentGame.difficulty) === 0 ){
        let newGameWitdh = Math.floor(Math.random() * 350) + gameWidth;
        let randomHeight = Math.floor(Math.random() * 160);
        waveObstacleArr.push(new WaveObstacle(newGameWitdh, randomHeight));
    }
}

let sharkObstacleArr = [];
let sharkFrequecy = 0;

function updatesharkObstacleArr(){
    sharkFrequecy ++
    if(sharkFrequecy % Math.floor(500/currentGame.difficulty) === 0 ){
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
    increaseObstacles();
    updateTwoTimesArr();
    updateShieldsArr();
    foamObstacle.draw(ctx);   
    
    //check if surfer hit shield power up
    shieldsArr.forEach(powerUp => {

        powerUp.draw(ctx);
        powerUp.update();

        if (detectCollision(powerUp)) {
            obstaclesFrequency = 0
            frames = 0
            sharkFrequecy = 0
            shieldsArr = [];
            topObstacleArr = [];
            waveObstacleArr = [];
            sharkObstacleArr = [];
        }
    });

    //check if surfer hit 2x power up
    twoTimesArr.forEach(powerUp => {

        powerUp.draw(ctx);
        powerUp.update();

        if (detectCollision(powerUp)) {
            currentGame.score *= 2;
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
    });
    
    // to check if surfer hit shark obstacle
    sharkObstacleArr.forEach(obstacle => {

        obstacle.draw(ctx);
        obstacle.update();

        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
            restartGame();
        }
    });


    //add score
    document.getElementById('score-value').innerHTML = currentGame.score ++; 

    // more obstacles if score is over X
    if (currentGame.score > 6000){
        increaseObstacles();
        updateShieldsArr();
    };
    if (currentGame.score > 18000){
        increaseObstacles();
        updateShieldsArr();
    };
    if (currentGame.score > 36000){
        increaseObstacles();
        updateShieldsArr();
    }
    if (currentGame.score > 72000){
        increaseObstacles();
        updateShieldsArr();
    };
    if (currentGame.score > 144000){
        increaseObstacles();
        updateShieldsArr();
    };
   
    //check if game is running if not show game over screen and try again button
    if(currentGame.gameIsRunning){
        requestAnimationFrame(updateGame);
        document.getElementById('difficulty-buttons').style.display = 'none';
        document.getElementById('difficulty').style.display = 'none';

    } else {
        ctx.beginPath();
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0,0, gameWidth, gameHeight);
    
        ctx.font = "70px Ubuntu";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", gameWidth/2, gameHeight/2);

        
        document.getElementById('difficulty-buttons').style.display = 'block';
        document.getElementById('difficulty').style.display = 'block';

    };
}

function checkHighScore(){
    let currentScore = currentGame.score;

    let highScore = localStorage.getItem('HighScore');

    if(currentScore > highScore){
        localStorage.HighScore = currentScore;
    }
    
    document.getElementById("high-score-value").innerHTML = localStorage.getItem("HighScore");
}

function restartGame(){
    checkHighScore();
    currentGame.surfer = {};
    topObstacleArr = [];
    waveObstacleArr = [];
    sharkObstacleArr = [];
    twoTimesFrequency = 0;
    twoTimesArr = [];
    shieldsFrequency = 0;
    shieldsArr = [];
}