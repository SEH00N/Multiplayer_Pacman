let handlers = [];

class Handler {
    constructor(packetStream) {
        packetStream.subscribe(this.packetHandling);
    }

    packetHandling() {
        let packet = arguments[0];
        console.log('packet to handling');
        console.log(packet);
        console.log('');
    }
}

export { Handler };