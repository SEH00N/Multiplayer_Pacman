import { GameObject, Camera, loadImage } from "./engine.js";

let canvas = null;
let context = null;

let objectList = [];
let camera = new Camera(0, 0, 500, 500);

let backgroundImage = loadImage('black');

canvas = document.createElement('canvas');
context = canvas.getContext('2d');


canvas.width = camera.size.x;
canvas.height = camera.size.y;

document.body.appendChild(canvas);

for(let i = 0; i < 500; i += 50)
    objectList.push(new GameObject(i, i, 32, 32, loadImage('white')));

update();

function update() {
    objectList.forEach(obj => obj.update());

    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.fillText(`camera position : (${camera.position.x}, ${camera.position.y})`, 130, 20);
    context.fillStyle = 'white';
    context.font = '20px Arial';

    camera.doRendering(objectList, context);

    camera.position.x += 1;

    requestAnimationFrame(update);
}