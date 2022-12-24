import { httpServer } from "./HTTP-server";

const webSocket = require("ws");
const webSocketServer = new webSocket.Server({ server: httpServer });

webSocketServer.on("connection", (ws: typeof webSocket) => {
  console.log("The WebSocket-server started.");
  ws.send("Hi. This is WebSocket-server!");
  ws.on("message", (sentMessage: string) => {
    console.log(`User sent this message - ${sentMessage}`);
    ws.send(`Hi, there! The message you sent - ${sentMessage}`);
  });
  ws.on("close", () => console.log("The WebSocket-server stopped."));
});