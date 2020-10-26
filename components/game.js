const wave = new Image();
wave.src = 'assets/wave.png';

class Game {
    constructor(){
        //need to add bacground image afterwards
        this.image = wave;
        this.surfer = {},
        this.obstacles = [];
        //this.points = 0;
        this.gameIsRunning = true;
    }
    draw(){
        ctx.drawImage(this.image, 0, 0,canvas.width, canvas.height)
    }
}