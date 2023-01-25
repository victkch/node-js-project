import { EventsService } from "../services/events-service";
import { webSocket } from "../servers/ws-server";
import { tokenValidation } from "../errors/webSocket-errors/check-token";

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
    this.eventService.chooseAction(eventMessage);
  }
}

export { EventsController };
