import { WebSocketServer } from 'ws';
import { Handler } from './handlers.js';
import { Action, Observer, parseData, Singleton } from './module.js';

let packetQueue = [];
let packetStream = new Observer();
let onUpdate = new Action();

let singleton = new Singleton();
singleton.packetStream = packetStream;

let handler = new Handler();

const server = new WebSocketServer({ port: 8081 });

server.once('listening', () => {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] server opened on port ${server.options.port}`);
});

server.on('connection', (socket) => {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] client connected`);

    socket.on('message', msg => {
        while(msg.length > 0) {
            let length = msg[0];
            let packet = parseData(msg.slice(1, length));
            packetQueue.push(packet);

            msg = msg.slice(length);
        }
    });
});

update();

onUpdate.addListener(() => {
    while(packetQueue.length > 0) {
        packetStream.send(packetQueue.shift());
    }
});

async function update() {
    onUpdate.invoke();

    await new Promise(r => setTimeout(r, 1/20 * 1000)).then(() => {
        update();
    });
}