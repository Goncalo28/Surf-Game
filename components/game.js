const wave = new Image();
wave.src = 'assets/wave.png';

class Game {
    constructor(){
        this.image = wave;
        this.surfer = {},
        this.obstacles = [];
        this.score = 0;
        this.gameIsRunning = true;
    }

    draw(){
        ctx.drawImage(this.image, 0, 0,canvas.width, canvas.height)
    }

}
