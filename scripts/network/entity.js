import { Vector2 } from '../client/engine.js';

class Player {
    constructor(socket) {
        this.socket = socket;
        this.position = new Vector2(0, 0);
    }
}

export { Player };