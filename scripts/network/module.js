let textEncoder = new TextEncoder();

class Singleton {
    static instance;

    constructor() {
        if(Singleton.instance != null) return Singleton.instance;

        Singleton.instance = this;
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
        let byteArray = new Array(this.data.length + 3);

        byteArray[0] = byteArray.length;
        byteArray[1] = this.type;
        byteArray[2] = this.event;
        let arrayData = Array.from(textEncoder.encode(this.data));
        console.log(arrayData);
        byteArray.concat(arrayData);
        console.log(byteArray);

        return byteArray;
    }
}

function parseData(rawData) {
    let type = rawData[0];
    let event = rawData[1];
    let data =  rawData.slice(2).toString();
    console.log(Array.from(rawData.slice(2)));

    return new Packet(type, event, data);
}

export { Singleton, Action, Observer, Packet, parseData };