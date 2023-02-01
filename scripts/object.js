import { Vector2 } from "./engine.js";

class Player {
    constructor(gameObject) {
        this.gameObject = gameObject;

        this.direction = new Vector2(0.1, 0);
        this.speed = 1;

        this.gameObject.degree = 90;
    }
    
    update() {
        this.move();
    }
    
    move() {
        this.gameObject.position.add(this.direction.multiply(this.speed));
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