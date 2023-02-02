import { GameObject, Camera, loadImage, Input } from "./engine.js";
import { CameraFollowing, PlayerMovement } from "./playerComponent.js";
import { Map } from "./map.js";

//#region project setting
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

let objectList = [];
let backgroundImage = loadImage('black');

let camera = new Camera(0, 0, 500, 500, context);

canvas.width = camera.size.x;
canvas.height = camera.size.y;

document.body.appendChild(canvas);
//#endregion


//#region object variables

// let map = new Map();

let player = new GameObject(0, 200, 32, 32, loadImage('player'));
player.addComponent(new PlayerMovement(player));
player.addComponent(new CameraFollowing(camera, player));

objectList.push(player);

//#endregion

update();

function update() {
    objectList.forEach(obj => obj.update());

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.fillText(`camera position : (${camera.position.x}, ${camera.position.y})`, 140, 20);
    context.fillStyle = 'white';
    context.font = '20px Arial';

    camera.doRendering(objectList, context);

    requestAnimationFrame(update);
}