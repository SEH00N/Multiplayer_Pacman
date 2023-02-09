import { Singleton } from "./module.js";

let singleton = new Singleton();

class Handler {
    constructor() {
        singleton.packetStream.subscribe(this.packetHandling);
    }

    packetHandling() {
        let packet = arguments[0];
        
        console.log(packet);
    }
}

export { Handler };