import { LoginEvent } from "../../Server/network/enum";
import { GameObject, loadImage } from "./engine";
import { NetworkManager } from "./networkManager";

let handlers = [];

let networkManager = new NetworkManager();

handlers[LoginEvent.join] = function(packet) {
    networkManager.onStart = true;

    let id = packet.data.slice(0, 9);
    let playerList = JSON.parse(packet.data.slice(9));

    networkManager.id = id;

    Object.keys(playerList).forEach(playerId => {
        if(playerId == id) return;

        let otherPlayer = new GameObject(playerList[playerId].x, playerList[playerId].y, 32, 32, loadImage('player'));
        networkManager.objectList.push(otherPlayer);
        networkManager.playerList[playerId] = otherPlayer;
    });
};

handlers[LoginEvent.otherConnect] = function(packet) {
    let id = packet.data;
    networkManager.playerList[id] = new GameObject(0, 0, 32, 32, loadImage('player'));
};