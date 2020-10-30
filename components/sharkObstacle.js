const sharkImage = new Image();
sharkImage.src = './assets/shark.png';

class SharkObstacle extends TopObstacle{
    constructor(gameWidth){
        super(gameWidth);
        this.image = sharkImage;
        this.width = 130;
        this.height = 70;
        this.speedX = 4;
        this.position.y = 420 - this.height;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.position.x -= this.speedX;
    }
}