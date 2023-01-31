class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class GameObject {
    constructor(x, y, width, height, sprite) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);
        this.sprite = sprite;
    }

    update() {

    }
}

class Camera {
    constructor(x, y, width, height) {
        this.position = new Vector2(x, y);
        this.size = new Vector2(width, height);
    }

    doRendering(objectList, context) {
        let renderableObjects = this.getRenderableObjects(objectList);
        
        renderableObjects.forEach(obj => {
            let drawPos = new Vector2(obj.position.x - this.position.x, obj.position.y - this.position.y);
            context.drawImage(obj.sprite, drawPos.x, drawPos.y, obj.size.x, obj.size.y);
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