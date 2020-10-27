const foam = new Image();
foam.src = 'assets/foam.png';
class FoamObstacle{
    constructor(width){
        this.image = foam;
        this.width = width;
        this.height = 250;
        // this.speedX = 2;
        this.position = {
            x: width - this.width,
            y: 520 - this.height
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}