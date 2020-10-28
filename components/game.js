const wave = new Image();
wave.src = 'assets/wave.png';

class Game {
    constructor(difficulty){
        this.image = wave;
        this.surfer = {},
        this.obstacles = [];
        this.score = 0;
        this.gameIsRunning = true;
        this.difficulty = difficulty;
    }

    draw(){
        ctx.drawImage(this.image, 0, 0,canvas.width, canvas.height)
    }

}
