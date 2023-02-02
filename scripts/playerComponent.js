import { Vector2, Input, GameObject } from "./engine.js";

class Player {
    constructor(gameObject) {
        this.gameObject = gameObject;

        this.playerMovement = this.setComponentVariable(PlayerMovement);
        this.playerCollision = this.setComponentVariable(PlayerCollision); 
        this.cameraFollowing = this.setComponentVariable(CameraFollowing);
        this.playerWallet = this.setComponentVariable(PlayerWallet);
    }

    setComponentVariable(type) {
        let component = this.gameObject.getComponent(type);
        component.player = this;

        return component;
    }
}

class PlayerMovement {
    constructor(gameObject) {
        this.gameObject = gameObject;

        this.direction = new Vector2(1, 0);
        this.directionCode = 'right';
        this.speed = 2;

        this.directions = {
            up: new Vector2(0, -1),
            down: new Vector2(0, 1),
            left: new Vector2(-1, 0),
            right: new Vector2(1, 0),
        }
        this.input = new Input();

        this.gameObject.degree = 90;
    }

    update() {
        this.rotate();

        if(!this.player.playerCollision.untouchable)
            this.move();
    }

    rotate() {
        let targetDirCode = '';

        if (this.input.getKeyDown('ArrowLeft'))
            targetDirCode = 'left';
        else if (this.input.getKeyDown('ArrowRight'))
            targetDirCode = 'right';
        else if (this.input.getKeyDown('ArrowUp'))
            targetDirCode = 'up';
        else if (this.input.getKeyDown('ArrowDown'))
            targetDirCode = 'down';

        if (this.input.getKeyDown(' '))
            this.speed = 0;
        else if (this.input.getKeyUp(' '))
            this.speed = 1;

        if (targetDirCode != '')
            this.changeDirection(targetDirCode);
    }

    move() {
        this.gameObject.position = this.gameObject.position.add(this.direction.multiply(this.speed));
    }

    changeDirection(targetDirection) {
        this.direction = this.directions[targetDirection];
        this.directionCode = targetDirection;

        switch (targetDirection) {
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

class PlayerCollision {
    constructor(player) {
        this.defaultSize = new Vector2(player.size.x, player.size.y);

        this.untouchable = false;
        this.breakTime = 1;
    }

    onCollision(other) {
        if(other == 'Obstacle') {
            if(this.untouchable) return;
            
            this.changeDirection();
            this.movementRestriction();
        } else if(other == 'Coin') {

        }
    }
    
    changeDirection() {
        let targetDirCode = '';
    
        switch (this.player.playerMovement.directionCode) {
            case 'up':
                targetDirCode = 'down';
                break;
            case 'down':
                targetDirCode = 'up';
                break;
            case 'left':
                targetDirCode = 'right';
                break;
            case 'right':
                targetDirCode = 'left';
                break;
        }

        this.player.playerMovement.changeDirection(targetDirCode);
        this.player.playerMovement.move();
    }

    movementRestriction() {
        this.untouchable = true;

        this.twinkle(2);
        let breakInterval = setInterval(() => {
            this.untouchable = false;
            clearInterval(breakInterval);
        }, this.breakTime * 1000);
    }
    
    twinkle(twinkleCount) {
        console.log(this.untouchable);
        if(twinkleCount <= 0) return;

        this.player.gameObject.size = new Vector2(0, 0);

        let disappearInterval = setInterval(() => {
            this.player.gameObject.size = this.defaultSize;
            clearInterval(disappearInterval);

            let appearInterval = setInterval(() => {
                this.twinkle(--twinkleCount);
                clearInterval(appearInterval);
            }, 0.2 * 1000);
        }, 0.2 * 1000);
    }
}

class PlayerWallet {
    constructor() {
        this.player = null;

        this.coin = 0;
    }

    addCoin() {
        this.coin ++;
    }

    splitInHalfCoin() {
        this.coin = Math.floor(this.coin / 2);
        
        if(this.coin <= 0) {
            
        }
    }
}

class CameraFollowing {
    constructor(camera, gameObject) {
        this.gameObject = gameObject;
        this.camera = camera;
    }

    update() {
        if(this.player.playerCollision.untouchable) return;

        let gameObjectPos = this.gameObject.position;
        let gameObjectSize = this.gameObject.size;

        let cameraPos = new Vector2(gameObjectPos.x, gameObjectPos.y);
        let cameraSize = this.camera.size;

        cameraPos.x -= (cameraSize.x - gameObjectSize.x) / 2;
        cameraPos.y -= (cameraSize.y - gameObjectSize.y) / 2;

        this.camera.position = cameraPos;
    }
}

export { PlayerMovement, CameraFollowing, PlayerCollision, PlayerWallet, Player };