import { Vector2, Input, GameObject } from "./engine.js";

class PlayerMovement {
    constructor(gameObject) {
        this.gameObject = gameObject;

        this.direction = new Vector2(1, 0);
        this.speed = 2;

        this.directions = {
            up : new Vector2(0, -1),
            down : new Vector2(0, 1),
            left : new Vector2(-1, 0),
            right : new Vector2(1, 0),
        }
        this.input = new Input();

        this.gameObject.degree = 90;
    }
    
    update() {
        this.rotate();
        this.move();
    }

    rotate() {
        let targetDirCode = '';

        if(this.input.getKeyDown('ArrowLeft'))
            targetDirCode ='left';
        else if(this.input.getKeyDown('ArrowRight'))
           targetDirCode = 'right';
        else if(this.input.getKeyDown('ArrowUp'))
           targetDirCode = 'up';
        else if(this.input.getKeyDown('ArrowDown'))
            targetDirCode = 'down';

        if(this.input.getKeyDown(' '))
            this.speed = 0;
        else if(this.input.getKeyUp(' '))
            this.speed = 1;

        if(targetDirCode != '')
            this.changeDirection(targetDirCode);
    }

    move() {
        this.gameObject.position = this.gameObject.position.add(this.direction.multiply(this.speed));
    }

    changeDirection(targetDirection) {
        this.direction = this.directions[targetDirection];

        switch(targetDirection) {
            case 'up':
                this.gameObject.degree = 0;
                break;
            case 'down':
                this.gameObject.degree = 180;
                break;
            case 'right':
                this.gameObject.degree = 90;
                break;
            case 'left':
                this.gameObject.degree = 270;
                break;
        }
    }
}

class CameraFollowing {
    constructor(camera, gameObject) {
        this.gameObject = gameObject;
        this.camera = camera;
    }

    update() {
        let gameObjectPos = this.gameObject.position;
        let gameObjectSize = this.gameObject.size;

        let cameraPos = new Vector2(gameObjectPos.x, gameObjectPos.y);
        let cameraSize = this.camera.size;

        cameraPos.x -= (cameraSize.x - gameObjectSize.x) / 2;
        cameraPos.y -= (cameraSize.y - gameObjectSize.y) / 2;

        this.camera.position = cameraPos;
    }
}

export { PlayerMovement, CameraFollowing };