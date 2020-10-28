const twoTimesImage = new Image();
twoTimesImage.src = './assets/2x.png';

class ScoreTwice{
    constructor(gameWidth){
        this.width = 30;
        this.height = 30;
        this.image = twoTimesImage;
        this.speedX = 1;
        this.position = {
            x: gameWidth - this.width,
            y: 30
        };
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.position.x -= this.speedX;
    }
}