import WebSocket from "ws";
import crypto from "crypto";
import { MsgBox } from "./packet/packet";

export default class Session
{
    socket: WebSocket;
    id: string;
    
    constructor(socket: WebSocket) {
        this.socket = socket;
        this.id = crypto.randomUUID();
    }

    Process(rawData: WebSocket.RawData) {
        let box = MsgBox.deserialize(rawData as Uint8Array);
    }
}