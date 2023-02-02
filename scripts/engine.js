class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(target) {
        let addedVector = new Vector2(this.x + target.x, this.y + target.y);

        return addedVector;
    }

    multiply(amount) {
        let multipliedVector = new Vector2(this.x * amount, this.y * amount);

        return multipliedVector;
    }

    compareValue(target) {
        if(this.x == target.x && this.y == target.y)
            return true;

        return false;
    }
}

class GameObject {
    constructor(x, y, width, height, sprite) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);
        this.sprite = sprite;

        this.degree = 0;

        this.scripts = [];
    }

    update() {
        this.scripts.forEach(script => {
            script.update();
        });
    }

    addScript(script) {
        this.scripts.push(script);
    }
}

class Camera {
    constructor(x, y, width, height, context) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);

        this.context = context;
    }

    doRendering(objectList) {
        let renderableObjects = this.getRenderableObjects(objectList);
        
        renderableObjects.forEach(obj => {
            let drawPos = new Vector2(obj.position.x - this.position.x, obj.position.y - this.position.y);
            
            // this.context.drawImage(obj.sprite, drawPos.x, drawPos.y, obj.size.x, obj.size.y);
            this.context.save();

            this.context.setTransform(1, 0, 0, 1, 0, 0);
            this.context.translate(drawPos.x + obj.size.x / 2, drawPos.y + obj.size.y / 2);

            this.context.rotate(obj.degree * Math.PI / 180);

            this.context.drawImage(obj.sprite, -(obj.size.x / 2), -(obj.size.y / 2), obj.size.x, obj.size.y);
            
            this.context.restore();
        });
    }

    getRenderableObjects(objectList) {
        let renderableObjects = [];

        objectList.forEach(obj => {
            let rangeL = obj.position.x + obj.size.x > this.position.x;
            let rangeR = obj.position.x < this.position.x + this.size.x;

            let rangeT = obj.position.y + obj.size.y > this.position.y;
            let rangeB = obj.position.y < this.position.y + this.size.y;

            let inRange = rangeL && rangeR && rangeT && rangeB;

            if(inRange)
                renderableObjects.push(obj);
        });

        return renderableObjects;
    }
}

function loadImage(imgName) {
    let image = new Image();
    image.src = `sprites/${imgName}.png`;

    return image;
}

class Input {
    constructor() {
        this.keysDown = {};
        this.keysUp = {};
        
        this.setUpEventListenr(document);
    }

    getKeyDown(keyName) {
        return keyName in this.keysDown;
    }

    getKeyUp(keyName) {
        return keyName in this.keysDown;
    }

    setUpEventListenr() {
        document.addEventListener('keydown', e => {
            if(e.key in this.keysDown == false) 
                this.keysDown[e.key] = true;
        });

        document.addEventListener('keyup', e => {
            if(e.key in this.keysDown)
                delete this.keysDown[e.key];

            if(e.key in this.keysUp == false)
                this.keysUp[e.key] = true;

            requestAnimationFrame(() => {
                if(e.key in this.keysUp)
                    delete this.keysUp[e.key]
            });
        });
    }
}

export { Vector2, GameObject, Camera, Input, loadImage };