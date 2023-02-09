let textEncoder = new TextEncoder();

class Handler {
    //핸들러를 어떤 식으로 짜야할지 고민중
    //기본적인 구조는
    //클라이언트 입장 => 1/20 초마다 데이터를 쌓아서 보냄
    //서버 입장 => {
    //    받은 데이터를 파싱해서 패킷 큐에 쌓아둠
    //    1/20 초 마다 패킷 큐에 쌓인 데이터들 빼서 패킷 감시자에 구독하고 있는 핸들러 들에게 뿌림 
    //} 
    // 이 구조로 돌아가는데
}

class Singleton {
    static instance;

    constructor() {
        if(instance != null) return instance;

        instance = this;
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

export { Singleton, Action, Observer, Packet, parseData };