import { WebSocket } from "ws";
import { Packet } from "./scripts/network/module.js";

const server = new WebSocket('ws://localhost:8081/ws');

server.on('open', () => {
    let arr = new Packet(10, 20, 'Hello, World!').toByte();
    arr = arr.concat(new Packet(10, 20, 'Goodbye, World!').toByte());
    server.send(arr);
});
