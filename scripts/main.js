import { GameObject, Camera, loadImage, Input } from "./engine.js";
import { CameraFollowing, Player, PlayerCollision, PlayerMovement, PlayerWallet } from "./playerComponent.js";
import { Map } from "./map.js";

//#region project setting
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

let coinText = document.querySelector('#CoinText');

let objectList = [];
let backgroundImage = loadImage('black');

let camera = new Camera(0, 0, 1800, 850, context);

canvas.width = camera.size.x;
canvas.height = camera.size.y;

document.body.querySelector('#container').appendChild(canvas);
//#endregion

//#region object variables

let player = new GameObject(70, 300, 32, 32, loadImage('player'));
player.addComponent(new PlayerMovement(player));
player.addComponent(new CameraFollowing(camera, player));
player.addComponent(new PlayerCollision(player));
player.addComponent(new PlayerWallet(coinText));
player.addComponent(new Player(player));

objectList.push(player);

let map = new Map(64, player);

//#endregion

update();

function update() {
    objectList.forEach(obj => obj.update());

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    map.tileList.forEach(row => {
        row.forEach(tile => tile.update());
        camera.doRendering(row);
    });
    
    camera.doRendering(objectList);

    context.fillText(`camera position : (${camera.position.x}, ${camera.position.y})`, 140, 20);
    context.fillStyle = 'white';
    context.font = '20px Arial';

    requestAnimationFrame(update);
}
