import { WebSocketServer } from 'ws';
import { parseData } from './packet.js';

const server = new WebSocketServer({ port: 8081 });

server.once('listening', () => {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] server opened on port ${server.options.port}`);
});

server.on('connection', (socket) => {
    console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] client connected`);
    
    socket.on('message', msg => {
        let packets = [];

        while(msg.length > 0) {
            let length = msg[0];
            packets.push(parseData(msg.slice(1, length)));
            
            msg = msg.slice(length);
        }
        
        packets.forEach(packet => {
        });
    });
});