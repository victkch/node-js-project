import { EventsService } from "../services/events-service";
import { webSocket } from "../servers/ws-server";

const eventService = new EventsService();

class EventsController {
  public connection(jwtToken: string, ws: typeof webSocket) {
    eventService.connectToWs(jwtToken, ws);
  }
  public disconnection(jwtToken: string, ws: typeof webSocket) {
    eventService.disconnectFromWs(jwtToken, ws);
  }
  public action(ws: typeof webSocket, jwtToken: string, eventMessage: any) {
    eventService.chooseAction(ws, jwtToken, eventMessage);
  }
}

export { EventsController };
