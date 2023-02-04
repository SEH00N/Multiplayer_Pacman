// import { WebSocket } from "ws";
// import { Packet } from "./scripts/network/packet.js";

// const server = new WebSocket('ws://localhost:8081/ws');

// let packetQueue = [];

// packetQueue.push(new Packet)

// server.on('open', () => {
//     server.send(new Packet(10, 20, "Hello, World!").toByte());
// });

let a = new Uint8Array(1);
a[0] = 1;

let b = Array.from(a);
console.log(b);