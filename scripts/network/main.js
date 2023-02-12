import { WebSocketServer } from 'ws';
import Express from 'express';
import { createServer } from 'http';
import { Handler } from './handler.js';
import { Action, Observer, parseData, Singleton } from './module.js';
import path from 'path';

let packetQueue = [];
let packetStream = new Observer();
let onUpdate = new Action();

let handler = new Handler();
handler.init(packetStream);

let playerList = {};

let singleton = new Singleton();
singleton.playerList = playerList;

const __dirname = path.resolve();
const app = Express();

app.use(Express.static("public"));
app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const expressServer = createServer(app).listen(8081, function() {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] Express server listening`);
});

const wsServer = new WebSocketServer({ server: expressServer });

wsServer.once('listening', () => {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] server opened on port ${wsServer.options.server.address().port}`);
});

wsServer.on('connection', (socket) => {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] client connected`);

    socket.on('message', msg => {
        console.log(msg.toString());
        while(msg.length > 0) {
            let length = msg[0];
            let packet = parseData(msg.slice(1, length));
            packet.socket = socket;
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