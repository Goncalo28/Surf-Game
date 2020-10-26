const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gameWidth = canvas.width;
const gameHeight = canvas.height; 


let currentGame = new Game();

let surfer = new Player(gameWidth, gameHeight);
new InputHandler(surfer);


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

    //to check if surfer hit top obstacle
    topObstacleArr.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
        }
    });

    //to check if surfer hit bottom obstacle
    waveObstacleArr.forEach(obstacle => {
        obstacle.draw(ctx);
        obstacle.update();
        if (detectCollision(obstacle)) {
            currentGame.gameIsRunning = false;
        }
    })
        
    if(currentGame.gameIsRunning){
        requestAnimationFrame(updateGame);
    } else {
        ctx.font = "60px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", gameWidth/2, 150);
    }
}

updateGame();
 