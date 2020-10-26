const rock = new Image();
rock.src = 'assets/rock.png'
class WaveObstacle extends TopObstacle{
    constructor(gameWidth, height){
        super(gameWidth)
        this.image = rock;
        this.width = 70;
        this.height = height;
        this.position.y = 550 - this.height
    } 
    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.position.x -= this.speedX;
    }
}
