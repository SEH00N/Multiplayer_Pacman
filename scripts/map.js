import { GameObject, Vector2, loadImage } from "./engine.js";

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
    constructor(tileSize) {
        this.size = new Vector2(0, 0);
        this.tileList = [];

        this.createTiles(tileSize)
    }

    createTiles(tileSize) {
        let mapData = MapData.split('\n');
        this.size.x = mapData[0].length;
        this.size.y = mapData.length;

        for (let y = 0; y < this.size.y; y++) {
            this.tileList[y] = [];

            for (let x = 0; x < this.size.x; x++) {
                let xPos = x * tileSize;
                let yPos = y * tileSize;

                let tileType = mapData[y][x];

                this.tileList[y][x] = new GameObject(xPos, yPos, tileSize, tileSize, loadImage(TileType[tileType]));
            }
        }
    }
}

export { Map };