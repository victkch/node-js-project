import { connectedUsers, webSocket } from "../servers/WebSocket-server";

class EventsService {
  public attack(userID: number) {
    console.log(`User attacked user${userID}.`);
  }
  public ability(userID: number) {
    console.log(`User used his ability against user${userID}.`);
  }
  public message(message: string, ws: typeof webSocket, userToken: string) {
    connectedUsers.forEach((user) => {
      if (user !== ws) {
        user.send(`user${userToken}: ${message}`);
      }
    });
    console.log(`user${userToken} sent to everybody '${message}'.`);
  }
  public restore() {
    console.log(`User restored theirs hp.`);
  }
}
export { EventsService };
