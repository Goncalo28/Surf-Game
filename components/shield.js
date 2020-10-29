const shield = new Image();
shield.src = './assets/shield.png';

class Shield{
    constructor(gameWidth, y){
        this.width = 45;
        this.height = 45;
        this.image = shield;
        this.speedX = 1;
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