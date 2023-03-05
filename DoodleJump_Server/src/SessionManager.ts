import Session from "./Session";

export default class SessionManager
{
    static Instance: SessionManager;
    sessionMap: SessionMap;
    
    constructor() {
        this.sessionMap = {};
    }
    
    addSession(session: Session) {
        this.sessionMap[session.id] = session;
    }

    removeSession(id: string) {
        delete this.sessionMap[id]
    }
}

interface SessionMap
{
    [key: string] : Session
}