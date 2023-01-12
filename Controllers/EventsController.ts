import { ActionType } from "../Middlewares/eventsMiddleware";
import { webSocket } from "../servers/WebSocket-server";
import { EventsService } from "../Services/EventsService";

class EventsController {
  public eventService=new EventsService();

  public connection = (jwtToken: string) => {
    //    if(this.tokenValidation(jwtToken)) {
    //     this.createMogoDB();
    //     this.prevMessages();
    //    }
    //    else error
    console.log(`user${jwtToken} connected`);
  };
  public tokenValidation(jwtToken: string) {
    // if(){
    //     token validation
    //     return true;
    // }
    //  else return false;
  }
  public createMogoDB() {
    //creatre mongodb session
    console.log("created mongodb session");
  }
  public prevMessages() {
    //send 10 previous messages
    console.log("sent 10 messages");
  }
  public disconnection() {
    //delete session
    console.log("session deleted");
  }
  public action(message: object, ws: typeof webSocket, userToken: string) {
    let actionType: string = message["type"];
    switch (actionType) {
      case ActionType.attack:
        this.eventService.attack(message["number"]);
        break;
      case ActionType.ability:
        this.eventService.ability(message["number"]);
        break;
      case ActionType.message:
        // if(this.canUserSendMwssage()){
        // this.eventService.message(message["message"], ws, userToken);
        // }
        // else //user cannot send messages
        break;
      case ActionType.restore:
        this.eventService.restore();
        break;
    }
  }
  public canUserSendMwssage(){
    // if(){
    //     //user can send messages
    //     return true;
    // }
    // else return false;
  }
}

export { EventsController };
