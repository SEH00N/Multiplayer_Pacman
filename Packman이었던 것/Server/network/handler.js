import { Type } from "./enum.js";
import { loginHandlers } from "./loginHandler.js";

let handlers = [];

handlers[Type.login] = loginHandlers;
// handlers[Type.game] = gameHandlers; <- 이제 이걸 만들어야 됨 ^^ 화이팅!

class Handler {
    constructor() {
        
    }
    
    init(packetStream) {
        packetStream.subscribe(this.packetHandling);
    }

    packetHandling() {
        let packet = arguments[0];
        // console.log(packet);
        console.log(`[Handler] type: ${packet.type}, event: ${packet.event}`);

        let callback = handlers[packet.type][packet.event];
        if(typeof(callback) == 'function')
            callback(packet)
        else
            console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] there is no callback for handling | type:${packet.type}, evet:${packet.event}`);

    }
}

export { Handler };