import { parse } from "path";
import { EventsController } from "../Controllers/EventsController";
import { actionTypeMiddleware } from "../Middlewares/eventsMiddleware";
import { httpServer } from "./HTTP-server";

const webSocket = require("ws");
const webSocketServer = new webSocket.Server({ server: httpServer });

const eventController = new EventsController();
const connectedUsers: typeof webSocket[] = [];

webSocketServer.on("connection", (ws: typeof webSocket, req) => {
  let userToken: string = parse(req.url).base;
  eventController.connection(userToken);

  connectedUsers.push(ws);
  connectedUsers.forEach((user) => {
    if (user !== ws) {
      user.send(`user${userToken} has connected.`);
    }
  });
  console.log("Count of connected users: " + connectedUsers.length);

  ws.on("close", () => {
    eventController.disconnection();
    let indexOfUser = connectedUsers.indexOf(ws);
    connectedUsers.splice(indexOfUser, 1);
    connectedUsers.forEach((user) => {
      if (user !== ws) {
        user.send(`user${userToken} has disconnected.`);
      }
    });
    console.log(
      `user${userToken} has disconnected. Count of connected users: ${connectedUsers.length}.`
    );
  });

  ws.on("message", async (recievedMessage: string) => {
    let message: object = JSON.parse(recievedMessage);
    await actionTypeMiddleware(message["type"]).catch((err) =>
      ws.send("error")
    );
    eventController.action(message, ws, userToken);
  });
});

export { webSocket, connectedUsers };
