import { Type, LoginEvent } from './enum.js';
import { Packet, Singleton } from './module.js';
import { Player } from './entity.js';

let handlers = [];

let singleton = new Singleton();

handlers[LoginEvent.join] = function(packet) {
    let id = '';

    do id = Math.random().toString(36).substring(2, 11).toUpperCase();
    while (id in singleton.playerList == false)

    singleton.playerList[id] = new Player(packet.socket);
    delete packet.socket;

    let connectedPacket = new Packet(Type.login, LoginEvent.otherConnect, id);
    singleton.playerList.forEach(socket => {
        socket.send(connectedPacket.toByte());
    });

    let playerList = {};
    Object.keys(singleton.playerList).forEach(playerId => {
        playerList[playerId] = singleton.playerList[playerId].position;
    });

    packet.data = id + JSON.stringify(playerList);
    singleton.playerList.socket.send(packet.toByte());
};