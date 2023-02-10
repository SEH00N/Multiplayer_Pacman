let textEncoder = new TextEncoder();

class Singleton {
    /** @type {Singleton} */
    static Instance;

    constructor() {
        if(Singleton.Instance == null) 
            Singleton.Instance = this;

        return Singleton.Instance;
    }
}

class Action {
    constructor() {
        this.actionList = [];
    }

    addListener(callback) {
        this.actionList.push(callback);
    }

    invoke(args) {
        this.actionList.forEach(action => {
            action(args);
        });
    }
}

class Observer {
    constructor() {
        this.action = new Action();
    }

    subscribe(callback) {
        this.action.addListener(callback);
    }

    send(args) {
        this.action.invoke(args);
    }
}

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
        let length = this.data.length + 3;
        let byteArray = [];

        byteArray[0] = length;
        byteArray[1] = this.type;
        byteArray[2] = this.event;
        byteArray = byteArray.concat(Array.from(textEncoder.encode(this.data)));

        return byteArray;
    }
}

function parseData(rawData) {
    let type = rawData[0];
    let event = rawData[1];
    let data =  rawData.slice(2).toString();

    return new Packet(type, event, data);
}

export { Action, Observer, Packet, Singleton, parseData };