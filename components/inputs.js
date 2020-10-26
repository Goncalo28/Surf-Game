class InputHandler {
    constructor(surfer){
        document.addEventListener('keydown', e => {
            switch(e.keyCode){
                case 37:
                    surfer.speedX--
                break;

                case 38:
                    if(surfer.position.y + surfer.height > 310 ){
                        surfer.speedY--
                    }
                break;

                case 39:
                    surfer.speedX++
                break;

                case 40:
                    surfer.speedY++
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