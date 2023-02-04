let textEncoder = new TextEncoder();

class Packet {
    constructor(type, event, data) {
        this.type = type;
        this.event = event;
        this.data = data;
    }

    length() {
        return this.data.length + 3;
    }

    toByte() {
        let byteArray = new Array(this.data.length + 3);

        byteArray[0] = byteArray.length;
        byteArray[1] = this.type;
        byteArray[2] = this.event;
        byteArray.concat(Array.from(textEncoder.encode(this.data)));

        return byteArray;
    }
}

function parseData(rawData) {
    let type = rawData[0];
    let event = rawData[1];
    let data =  rawData.slice(2).toString();

    return new Packet(type, event, data);
}

export { Packet, parseData };