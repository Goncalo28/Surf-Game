const seagull = new Image();
seagull.src = './assets/seagull.png'
class TopObstacle {
    constructor(gameWidth, y){
        this.width = 50;
        this.height = 30;
        this.image = seagull;
        this.speedX = 3;
        this.position = {
            x: gameWidth - this.width,
            y: y
        };
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.position.x -= this.speedX;
    }
}