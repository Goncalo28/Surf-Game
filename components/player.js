const surferRegStance = new Image()
surferRegStance.src = 'assets/surfer-stance1.png'

class Player {
    constructor(gameWidth, gameHeight){
        this.width = 65;
        this.height = 75;
        this.image = surferRegStance;
        this.speedX = 1;
        this.speedY = 1;
        this.position = {
            x: gameWidth / 2 - this.width - 300,
            y: gameHeight / 2 - this.height / 2 + 110
        };
        this.jumped = false;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.position.x += this.speedX
        this.position.y += this.speedY
        
        if(this.position.x < 0){
            this.position.x = 0;
        }
        if(this.position.x + this.width > gameWidth){
            this.position.x = gameWidth - this.width;
        }
        if(this.position.y < 0){
            this.position.y = 0;
        }
        if(this.position.y + this.height > 510){
            this.position.y = 510 - this.height;
        }

        if(this.position.y < 10){
            this.speedY += 1;
            this.position.y += this.speedY; 
        }
        if(this.position.y > 310){
            this.jumped = false;
        }

    }

    moveUp(){
        this.position.y -= this.speedY;
    }

    moveDown(){
        this.position.y += this.speedY;
    }

    moveRight(){
        this.position.x += this.speedX;
    }

    moveLeft(){
        this.position.x -= this.speedX;
    }

    jump(){
        this.position.y -= this.speedY;
    }

    // hit(obstacle){
    //     return !(this.position.y + obstacle.height < obstacle.position.y || 
    //     this.position.y > obstacle.position.y + obstacle.height || 
    //     this.position.x + obstacle.width < obstacle.position.x || 
    //     this.position.x > obstacle.position.x + obstacle.width)
    // }
}
