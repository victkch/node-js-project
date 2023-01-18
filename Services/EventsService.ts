import {
  connectedUserNames,
  connectedUsers,
  webSocket,
} from "../servers/WebSocket-server";

class EventsService {
  public createMogoDBsession() {
    console.log("create mongo");
    //create mongodb session
  }
  public deleteMogoDBsession() {
    console.log("delete mongo");
    //delete mongodb session
  }
  public prevMessages() {
    console.log("messages");
    //send 10 previous messages
  }
  public notifyAndSendUsers(
    userName: string,
    ws: typeof webSocket,
    event: string
  ) {
    switch (event) {
      case "connect":
        connectedUsers.push(ws);
        connectedUserNames.push("user" + userName);
        break;
      case "disconnect":
        connectedUsers.splice(connectedUsers.indexOf(ws), 1);
        connectedUserNames.splice(connectedUsers.indexOf(ws), 1);
        break;
    }
    connectedUsers.forEach((user) => {
      if (user !== ws) {
        user.send(`user[${userName}] has ${event}ed.`);
      }
    });
    ws.send(`All connected users: ${connectedUserNames}`);
    console.log(`Count of connected users: ${connectedUsers.length}.`);
  }
  public attack(userId: number) {
    console.log("attack");
  }
  public ability(userId: number) {
    console.log("ability");
  }
  public message(message: string) {
    console.log("send message");
  }
  public restore() {
    console.log("restore");
  }
}
export { EventsService };
