let handlers = [];

class Handler {
    constructor() {
    }
    
    init(packetStream) {
        packetStream.subscribe(this.packetHandling);
    }

    packetHandling() {
        let packet = arguments[0];

        let callback = handlers[packet.type][packet.event];
        if(typeof(callback) == 'function')
            callback(packet)
        else
            console.log('\x1b[33m%s\x1b[0m', `[NetworkManager] there is no callback for handling | type:${packet.type}, evet:${packet.event}`);

    }
}

export { Handler };