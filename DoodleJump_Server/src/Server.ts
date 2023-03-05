import ws from "ws";
import Express from "express";
import Session from "./Session";
import SessionManager from "./SessionManager";

const App = Express();

const httpServer = App.listen(8080, () => {
    console.log("[Server.ts] Express Server is running on port 8080");
});

const wsServer = new ws.Server({server: httpServer});

wsServer.on("listening", () => {
    console.log(`[Server.ts] WebSocket Server is running on port ${wsServer.options.port}`);
});

wsServer.on("connection", (soc, req) => {
    const session = new Session(soc);
    SessionManager.Instance.addSession(session);

    soc.on("message", (rawData, isBinary) => {
        if(isBinary) session.Process(rawData);
    });

    soc.on('close', (code, reason) => {
        SessionManager.Instance.removeSession(session.id);
    });
});