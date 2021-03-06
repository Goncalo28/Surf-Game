class Player {
    constructor(gameWidth, gameHeight){
        this.width = 65;
        this.height = 75;
        this.speedX = 1;
        this.speedY = 1;
        this.direction = 'down'
        this.position = {
            x: gameWidth / 2 - this.width - 300,
            y: gameHeight / 2 - this.height / 2 + 110
        };
        this.jumped = false;
        const imagePaths = {
            left: './assets/surfer-left.png',
            up: './assets/surfer-up.png',
            right: './assets/surfer-right.png',
            down: './assets/surfer-down.png'
        };
      
        this.images = {};
      
        for (let direction in imagePaths) {
            this.images[direction] = new Image();
            this.images[direction].src = imagePaths[direction];
        }
        
    }

    draw(ctx){
        ctx.drawImage(this.images[this.direction], this.position.x, this.position.y, this.width, this.height);
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
        // if(this.position.y > 310){
        //     this.jumped = false;
        // }
    }

    moveUp(){
        // if(this.position.y + this.height > 310 ){
            this.speedY--;
            this.direction = 'up';
        // }
    }

    moveDown(){
        this.speedY++;
        this.direction = 'down'
    }

    moveRight(){
        this.speedX++;
        this.direction = 'right';
    }

    moveLeft(){
        this.speedX--;
        this.direction = 'left'; 
    }

    // jump(){
    //     if(!this.jumped){
    //         if(this.position.y + this.height <= 310){
    //             this.jumped = !this.jumped;
    //             this.speedY -= 0.5;
    //             this.speedX += 1;
    //             this.position.y -= this.speedY;
    //             this.position.x += this.speedX;
    //         }
    //     }
    // }
}
