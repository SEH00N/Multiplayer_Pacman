import { WebSocket } from "ws";
import { Packet } from "./scripts/network/module.js";

const server = new WebSocket('ws://localhost:8081/ws');

server.on('open', () => {
    let packet = new Packet(10, 20, "Hello, World!");
    server.send(packet.toByte());
});