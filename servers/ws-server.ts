import { parse } from "path";
import { Request } from "express";
import { EventsController } from "../controllers/events-controller";
import { eventsMiddleware } from "../middlewares/events-middleware";
import { isTokenProvided } from "../errors/webSocket-errors/check-token";
import { CheckMessagesFormat } from "../errors/webSocket-errors/check-incoming-message";
import { MongoRepository } from "../database/mongo-repository";
import { dbConnect } from "../servers/server";

const webSocket = require("ws");

const eventController = new EventsController();
const messageChecker = new CheckMessagesFormat();
const mongoRepository = new MongoRepository();

const connectedUsers: typeof webSocket[] = [];
const connectedUserNames: string[] = [];
const dbCollection = mongoRepository.createCollection();

function webSocketController(webSocketServer: any) {
  webSocketServer.on(
    "connection",
    async (ws: typeof webSocket, req: Request) => {
      let userToken: string = parse(req.url).base;
      await isTokenProvided(userToken)
        .then((res) => {
          dbConnect.mongoConnect();
          eventController.connection(userToken, ws);
        })
        .then((res) =>
          ws.on("close", () => eventController.disconnection(userToken, ws))
        );

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
                eventController.action(ws, userToken, message);
              }
            });
        }
      });
    }
  );
}

export {
  webSocketController,
  webSocket,
  connectedUserNames,
  connectedUsers,
  dbCollection,
  mongoRepository,
};
