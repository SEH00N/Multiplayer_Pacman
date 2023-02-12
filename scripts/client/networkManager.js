import { LoginEvent, Type } from "../network/enum.js";
import { Action, Observer, Packet } from "../network/module.js";
import { Handler } from "./handler.js";

class NetworkManager {
    /** @type {NetworkManager} */
    static Instance;

    constructor() {
        if(NetworkManager.Instance == null) 
        {
            this.socket = new WebSocket('ws://localhost:8081/ws');
    
            this.resPacketQueue = [];
            this.reqPacketQueue = [];

            this.id = '';
            this.playerList = {};
            this.onStart = false;
            
            this.handlingInit();
            this.serverInit();
    
            this.update();

            NetworkManager.Instance = this;
        }

        return NetworkManager.Instance;
    }

    handlingInit() {
        this.packetStream = new Observer();
        this.sendStream = new Observer();

        this.handler = new Handler();
        this.handler.init(this.packetStream);

        this.onUpdate = new Action();
        this.onUpdate.addListener(() => {
            this.sendStream.send(true);
            this.socket.send(this.reqPacketQueue);

            while(this.resPacketQueue.length > 0) {
                let packet = this.resPacketQueue.shift();
                this.packetStream.send(packet);
            }
        });
    }

    serverInit() {
        this.socket.onopen = () => {
            this.socket.send(new Packet(Type.login, LoginEvent.join, 'asd').toByte());
        }

        this.socket.onmessage = e => {
            while(msg.length > 0) {
                let length = msg[0];
                let packet = parseData(msg.slice(1, length));
                this.resPacketQueue.push(packet);
    
                msg = msg.slice(length);
            }
        }
    }

    sendRequest(packet) {
        this.reqPacketQueue = this.reqPacketQueue.concat(packet.toByte());
    }

    packetSubscribe(callback) {
        this.packetStream.subscribe(callback);
    }

    sendingSubscribe(callback) {
        this.sendStream.subscribe(callback);
    }

    async update() {
        this.onUpdate.invoke();
    
        await new Promise(r => setTimeout(r, 1/20 * 1000)).then(() => {
            this.update();
        });
    }
}

export { NetworkManager };