class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(target) {
        this.x += target.x;
        this.y += target.y;

        return this;
    }

    multiply(amount) {
        this.x *= amount;
        this.y *= amount;

        return this;
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

            this.context.translate(this.size.x, 0);
            this.context.rotate(obj.degree * Math.PI / 180);

            // this.context.drawImage(obj.sprite, drawPos.x - obj.size.x / 2, drawPos.y - obj.size.y / 2, obj.size.x, obj.size.y);
            this.context.drawImage(obj.sprite, drawPos.x, drawPos.y, obj.size.x, obj.size.y);
            
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

export { Vector2, GameObject, Camera, loadImage };