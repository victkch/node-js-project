import { EventType } from "../Middlewares/eventsMiddleware";
import { EventsService } from "../Services/EventsService";
import { webSocket } from "../servers/WebSocket-server";
import { tokenValidation } from "../Errors/WebSocket errors/checkToken";

class EventsController {
  public eventService = new EventsService();

  public connection = async (
    jwtToken: string,
    ws: typeof webSocket,
    userName: string
  ) => {
    await tokenValidation(jwtToken).then((res) => {
      this.eventService.createMogoDBsession();
      this.eventService.notifyAndSendUsers(userName, ws, "connect");
      this.eventService.prevMessages();
    });
  };
  public disconnection(ws: typeof webSocket, userName: string) {
    this.eventService.deleteMogoDBsession();
    this.eventService.notifyAndSendUsers(userName, ws, "disconnect");
  }
  public action(eventMessage: any) {
    let eventType: string = eventMessage["type"];
    switch (eventType) {
      case EventType.attack:
        this.eventService.attack(eventMessage["userId"]);
        break;
      case EventType.ability:
        this.eventService.ability(eventMessage["userId"]);
        break;
      case EventType.message:
        this.eventService.message(eventMessage["message"]);
        break;
      case EventType.restore:
        this.eventService.restore();
        break;
    }
  }
}

export { EventsController };
