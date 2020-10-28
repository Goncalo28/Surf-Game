class InputHandler {
    constructor(surfer){
        document.addEventListener('keydown', e => {
            switch(e.keyCode){
                case 37:
                    surfer.moveLeft();
                break;

                case 38:
                    surfer.moveUp();
                break;

                case 39:
                    surfer.moveRight();
                break;

                case 40:
                    surfer.moveDown();
                break;

                // case 32:
                //     surfer.jump();
                // break;
            }
        })
    }
}