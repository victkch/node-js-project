import { parse } from "path";
import { Request } from "express";
import { EventsController } from "../controllers/events-controller";
import { eventsMiddleware } from "../middlewares/events-middleware";
import { httpServer } from "./server";
import { isTokenProvided } from "../errors/webSocket-errors/check-token";
import { CheckMessagesFormat } from "../errors/webSocket-errors/check-incoming-message";

const webSocket = require("ws");
const webSocketServer = new webSocket.Server({ server: httpServer });

const eventController = new EventsController();
const messageChecker = new CheckMessagesFormat();
const connectedUsers: typeof webSocket[] = [];
const connectedUserNames: string[] = [];

webSocketServer.on("connection", async (ws: typeof webSocket, req: Request) => {
  let userToken: string = parse(req.url).base;
  let userName: string, tokenParts: string[];
  await isTokenProvided(userToken)
    .then((res) => {
      tokenParts = userToken.split(".");
      userName = tokenParts[2].substring(2, 6).toUpperCase();
    })
    .then((res) => eventController.connection(userToken, ws, userName))
    .then((res) =>
      ws.on("close", () => eventController.disconnection(ws, userName))
    )
    .catch((err) => {
      ws.send("Invalid token");
      ws.close();
    });
  ws.on("message", async (recievedMessage: string) => {
    let message: any = await messageChecker
      .isMessageJSON(recievedMessage)
      .catch((err) => ws.send("Your message is not a JSON"));
    let eventType: any = "";
    if (message) {
      await messageChecker
        .checkTypeProperty(message)
        .catch((err) => ws.send(`${err}`))
        .then((res) => {
          if (res) {
            eventType = message["type"];
            eventsMiddleware(eventType).catch((err) => ws.send(`${err}`));
          }
        });
      await messageChecker
        .checkEventProperties(eventType, message)
        .catch((err) => ws.send(`${err}`))
        .then((res) => {
          if (res) {
            eventController.action(message);
          }
        });
    }
  });
});

export { webSocket, connectedUsers, connectedUserNames };