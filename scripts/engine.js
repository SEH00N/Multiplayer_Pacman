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

        this.components = [];
    }

    update() {
        this.components.forEach(component => {
            component.update();
        });
    }

    addComponent(component) {
        this.components.push(component);
    }

    getComponent(componentTypeName) {
        let foundedComponent = this.components.filter(x => typeof(x) == componentTypeName);
        return foundedComponent[0];
    }
}

class Camera {
    constructor(x, y, width, height, context, follow) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);

        this.context = context;
    }

    doRendering(objectList) {
        let renderableObjects = this.getRenderableObjects(objectList);
        
        renderableObjects.forEach(obj => {
            let drawPos = new Vector2(obj.position.x - this.position.x, obj.position.y - this.position.y);
            
            this.drawImageWithAngle(drawPos, obj.size, obj.degree * Math.PI / 180, obj.sprite);
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

    drawImageWithAngle(drawPos, objectSize, radian, sprite) {
        this.context.save();

        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.translate(drawPos.x + objectSize.x / 2, drawPos.y + objectSize.y / 2);

        this.context.rotate(radian);

        this.context.drawImage(sprite, -(objectSize.x / 2), -(objectSize.y / 2), objectSize.x, objectSize.y);
            
        this.context.restore();
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
        
        this.setUpEventListenr();
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