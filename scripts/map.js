import { GameObject, Vector2, loadImage } from "./engine.js";
import { PlayerCollision } from "./playerComponent.js";

const TileType = {
    0: 'base',
    1: 'obstacle_leftTop',
    2: 'obstacle_left',
    3: 'obstacle_leftBottom',
    4: 'obstacle_top',
    5: 'obstacle_bottom',
    6: 'obstacle_rightTop',
    7: 'obstacle_right',
    8: 'obstacle_rightBottom'
}

const MapData =
    '14444444444444444444444444444446\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000014600000014600000001460007\n' +
    '20000020700000020700000002070007\n' +
    '20000035800000035800000003580007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000146000000000000000007\n' +
    '20000000000207000000000000000007\n' +
    '20000000000358000000000146000007\n' +
    '20000000000000000000000207000007\n' +
    '20000000000000000000000358000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000014600000000000000000007\n' +
    '20000000020700000000000146000007\n' +
    '20000000035800000000000207000007\n' +
    '20000000000000000000000358000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '35555555555555555555555555555558';

class Map {
    constructor(tileSize, player) {
        this.size = new Vector2(0, 0);
        this.tileList = [];

        this.createTiles(tileSize, player)
    }

    createTiles(tileSize, player) {
        let mapData = MapData.split('\n');
        this.size.x = mapData[0].length;
        this.size.y = mapData.length;

        for (let y = 0; y < this.size.y; y++) {
            this.tileList[y] = [];

            for (let x = 0; x < this.size.x; x++) {
                let xPos = x * tileSize;
                let yPos = y * tileSize;

                let tileType = mapData[y][x];

                let tile = new GameObject(xPos, yPos, tileSize, tileSize, loadImage(TileType[tileType]));
                if(tileType != 0)
                    tile.addComponent(new Collider(tile, player, 'Obstacle'));

                this.tileList[y][x] = tile;
            }
        }
    }
}

class Collider {
    constructor(gameObject, player, name) {
        this.gameObject = gameObject;
        this.player = player;

        this.name = name;

        this.playerCollision = player.getComponent(PlayerCollision);
    }

    //나중에 델리게이트 형식으로 바꿀 예정
    //Obstacle은 충돌 감지만 하고 충돌했을 때 이벤트를 델리게이트에 쌓을 예정정
    update() {
        if(this.checkCollision())
            this.onCollision();
    }
    
    checkCollision() {
        let rangeL = this.player.position.x + this.player.size.x > this.gameObject.position.x;
        let rangeR = this.player.position.x < this.gameObject.position.x + this.gameObject.size.x;

        let rangeT = this.player.position.y + this.player.size.y > this.gameObject.position.y;
        let rangeB = this.player.position.y < this.gameObject.position.y + this.gameObject.size.y;

        return rangeL && rangeR && rangeT && rangeB;
    }

    onCollision() {
        this.playerCollision.onCollision(this.name);
    }
}

export { Map };