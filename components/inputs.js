class InputHandler {
    constructor(surfer){
        document.addEventListener('keydown', e => {
            switch(e.keyCode){
                case 37:
                    // surfer.speedX--;
                    // surfer.direction = 'left'; 
                    surfer.moveLeft();
                break;

                case 38:
                    // if(surfer.position.y + surfer.height > 310 ){
                    //     surfer.speedY--;
                    //     surfer.direction = 'up';
                    // }
                    surfer.moveUp();
                break;

                case 39:
                    // surfer.speedX++;
                    // surfer.direction = 'right';
                    surfer.moveRight();
                break;

                case 40:
                    // surfer.speedY++;
                    // surfer.direction = 'down'
                    surfer.moveDown();
                break;

                case 32:
                    // if(!surfer.jumped){
                    //     if(surfer.position.y + surfer.height <= 310){
                    //         surfer.jumped = !surfer.jumped;
                    //         surfer.speedY -= 0.5;
                    //         surfer.speedX += 1;
                    //         surfer.position.y -= surfer.speedY;
                    //         surfer.position.x += surfer.speedX;
                    //     }
                    // }
                    surfer.jump();
                break;
            }
          })
        

        // document.addEventListener('keyup', () => {
        //     surfer.speedX = 0;
        //     surfer.speedY = 0;
        // })
    }
}