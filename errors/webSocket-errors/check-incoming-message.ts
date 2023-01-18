import { EventType } from "../../middlewares/events-middleware";

class CheckMessagesFormat {
  public isMessageJSON(message: string) {
    return new Promise((res, rej) => {
      if (JSON.parse(message)) {
        res(JSON.parse(message));
      } else rej(false);
    });
  }
  public checkTypeProperty(recievedMessage: any) {
    return new Promise((res, rej) => {
      if (recievedMessage["type"] && recievedMessage["type"] !== "") {
        res(true);
      } else rej("No property 'type' found or property 'type' is empty");
    });
  }
  public checkEventProperties(eventType: string, message: any) {
    return new Promise((res, rej) => {
      switch (eventType) {
        case EventType.attack:
        case EventType.ability:
          if (message["userId"] && Number.isInteger(message["userId"])) {
            res(true);
          } else rej("Missing 'userId' or 'userId' is not a number");
          break;
        case EventType.message:
          if (message["message"] && message["message"] !== "") {
            res(true);
          } else rej("Missing 'message' or 'message' is empty");
          break;
        case EventType.restore:
          res(true);
          break;
      }
    });
  }
}

export { CheckMessagesFormat };
