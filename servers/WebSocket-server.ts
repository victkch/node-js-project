import { httpServer } from "./HTTP-server";

const webSocket = require("ws");
const webSocketServer = new webSocket.Server({ server: httpServer });

webSocketServer.on("connection", (ws: typeof webSocket) => {
  ws.send("Hi. This is WebSocket-server!");
  if(){
    //token validation
    console.log("Connected."); 
  }
  else ws.close();
  ws.on("close", () => console.log("Disonnected."));
  ws.on("message", (sentJSON: JSON) => {
    if(){
      //attack
      console.log("User attacks another user.");
    }
    else if(){
      //ability
      console.log("User's ability.");
    }
    else if(){
      //mesage
      console.log("User sent a message.");
    }
    else if(){
      //restore
      console.log("Restore user.");
    }  
  });
});