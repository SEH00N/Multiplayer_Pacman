import { Vector2, Input } from "./engine.js";

class Player {
    constructor(gameObject) {
        this.gameObject = gameObject;

        this.direction = new Vector2(1, 0);
        this.speed = 1;

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

        if(targetDirCode != '')
            this.changeDirection(this.directions[targetDirCode]);
    }
    
    move() {
        this.gameObject.position = this.gameObject.position.add(this.direction.multiply(this.speed));
    }

    changeDirection(targetDirection) {
        this.direction = targetDirection;

        if (this.direction.compareValue(new Vector2(0, -1)))
            this.gameObject.degree = 0;
        else if (this.direction.compareValue(new Vector2(0, 1)))
            this.gameObject.degree = 180;
        else if (this.direction.compareValue(new Vector2(1, 0)))
            this.gameObject.degree = 90;
        else if (this.direction.compareValue(new Vector2(-1, 0)))
            this.gameObject.degree = 270;
    }
}

export { Player };