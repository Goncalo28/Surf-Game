class InputHandler {
    constructor(surfer){
        document.addEventListener('keydown', e => {
            switch(e.keyCode){
                case 37:
                    surfer.speedX--;
                    surfer.direction = 'left'; 
                break;

                case 38:
                    if(surfer.position.y + surfer.height > 310 ){
                        surfer.speedY--;
                        surfer.direction = 'up';
                    }
                break;

                case 39:
                    surfer.speedX++;
                    surfer.direction = 'right';
                break;

                case 40:
                    surfer.speedY++;
                    surfer.direction = 'down'
                break;

                case 32:
                    if(!surfer.jumped){
                        if(surfer.position.y + surfer.height <= 310){
                            surfer.jumped = !surfer.jumped
                            surfer.speedY -= 0.5
                            surfer.speedX += 1
                            surfer.position.y -= surfer.speedY 
                            surfer.position.x += surfer.speedX
                        }
                    }
                break;
            }
          })
        

        // document.addEventListener('keyup', () => {
        //     surfer.speedX = 0;
        //     surfer.speedY = 0;
        // })
    }
}