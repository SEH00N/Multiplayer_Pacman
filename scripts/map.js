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
    '20070000002000000000070000002007\n' +
    '20070016002000000000070016002007\n' +
    '25580027003555555555580027003557\n' +
    '20000027000000000000000027000007\n' +
    '20146027001444444444460027014607\n' +
    '20207038002000000000070038020707\n' +
    '20207000002000000000070000020707\n' +
    '20207000002000000000070000020707\n' +
    '20358000003555555555580000035807\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '20000000000000000000000000000007\n' +
    '24444444444600000000144444444447\n' +
    '20000000000701444460200000000007\n' +
    '20000000000702000070200000000007\n' +
    '20000000000703555580200000000007\n' +
    '25555555555800000000355555555557\n' +
    '20007000000000000000000000020007\n' +
    '20007016000000000000000016020007\n' +
    '20007038000000000000000038020007\n' +
    '25558000000014444446000000035557\n' +
    '20000000000020000007000000000007\n' +
    '20000000000020000007000000000007\n' +
    '20000000000035555558000000000007\n' +
    '20001460000000000000000001460007\n' +
    '20003580000000000000000003580007\n' +
    '20000000000000000000000000000007\n' +
    '20001460000000000000000001460007\n' +
    '24603580000000000000000003580147\n' +
    '20700000000000000000000000000207\n' +
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
                else 
                    tile.addComponent(new CoinTile(5, player, tile));

                this.tileList[y][x] = tile;
            }
        }
    }
}

class CoinTile {
    constructor(spawnDelay, player, gameObject) {
        this.player = player;
        this.gameObject = gameObject;
        this.spawnDelay = spawnDelay * 1000;

        this.coinSprite = loadImage('coin');
        this.baseSprite = loadImage('base');

        this.spawnCoin(0);

        this.collider = new Collider(gameObject, player, 'Coin');
        this.collider.setActive(false);
    }

    update() {
        this.collider.update();
    }

    async spawnCoin(delay) {
        await this.setDelay(delay).then(() => {
            if(this.collider.active == false) {
                this.collider.setActive(true);
                this.gameObject.sprite = this.coinSprite;
            }
        });
    }

    onAdded() {
        this.gameObject.sprite = this.baseSprite;
        this.collider.setActive(false);

        this.spawnCoin(this.spawnDelay);
    }

    setDelay(time) {
        return new Promise(r => setTimeout(r, time));
    }
}

class Collider {
    constructor(gameObject, player, name) {
        this.gameObject = gameObject;
        this.player = player;

        this.name = name;
        this.active = true;

        this.playerCollision = player.getComponent(PlayerCollision);
    }

    setActive(active) {
        this.active = active;
    }

    //나중에 델리게이트 형식으로 바꿀 예정
    //Obstacle은 충돌 감지만 하고 충돌했을 때 이벤트를 델리게이트에 쌓을 예정정
    update() {
        if(this.active)
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
        this.playerCollision.onCollision(this);
    }
}

export { Map, CoinTile };