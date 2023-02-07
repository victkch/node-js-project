import {
  connectedUserNames,
  connectedUsers,
  mongoRepository,
  webSocket,
} from "../servers/ws-server";
import { EventType } from "../middlewares/events-middleware";
import { ClassRepository } from "../database/class-repository-pg";
import { dbConnect } from "../servers/server";
import { tokenValidation } from "../errors/webSocket-errors/check-token";

const classQuery = new ClassRepository();

enum StatusType {
  alive = 1,
  attacked,
  uses_ability,
}

class EventsService {
  public connectToWs = async (jwtToken: string, ws: typeof webSocket) => {
    await tokenValidation(jwtToken)
      .then((res: any) => {
        this.createMongoDBsession(res, ws);
        this.notifyAndSendUsers(res, ws, "connect");
        this.prevMessages();
      })
      .catch((err) => {
        ws.send("Invalid token");
        ws.close();
      });
  };
  public disconnectFromWs = async (jwtToken: string, ws: typeof webSocket) => {
    await tokenValidation(jwtToken)
      .then((res: any) => {
        this.deleteMongoDBsession(res, ws);
        this.notifyAndSendUsers(res, ws, "disconnect");
      })
      .catch((err) => {
        ws.send("Invalid token");
        ws.close();
      });
  };
  public createMongoDBsession(userInfo: any, ws: typeof webSocket) {
    let queryString = classQuery.getClassInfo();
    dbConnect
      .postgresqlConnect()
      .query(queryString, [userInfo[2]], (err: Error, results: any) => {
        if (err) {
          ws.send("SQL-query error occured");
        } else
          mongoRepository.createSession(
            userInfo,
            results.rows[0].health,
            StatusType.alive,
            ws
          );
      });
  }
  public deleteMongoDBsession(userInfo: any, ws: typeof webSocket) {
    mongoRepository.deleteSession(userInfo[0], ws);
  }
  public prevMessages() {
    //send 10 previous messages
  }
  public notifyAndSendUsers(
    userData: any,
    ws: typeof webSocket,
    event: string
  ) {
    switch (event) {
      case "connect":
        connectedUsers.push(ws);
        connectedUserNames.push(userData[1]);
        break;
      case "disconnect":
        connectedUsers.splice(connectedUsers.indexOf(ws), 1);
        connectedUserNames.splice(connectedUsers.indexOf(ws), 1);
        break;
    }
    connectedUsers.forEach((user) => {
      if (user !== ws) {
        user.send(`${userData[1]} has ${event}ed.`);
      }
    });
    ws.send(`All connected users: ${connectedUserNames}`);
  }
  public attack(
    ws: typeof webSocket,
    whoAttacksData: any,
    userIdToAttack: number
  ) {
    if (whoAttacksData[0] === userIdToAttack) {
      ws.send("You cannot attack yourself");
    } else
      mongoRepository
        .getSessionData(whoAttacksData[0])
        .then((attackerSessionData: any) => {
          if (attackerSessionData[0].hp > 0) {
            mongoRepository
              .getSessionData(userIdToAttack)
              .then((attackedSessionData: any) => {
                if (
                  attackedSessionData[0].hp > 0 &&
                  attackedSessionData[0].statuses[
                    attackedSessionData[0].statuses.length - 1
                  ] !== StatusType.uses_ability
                ) {
                  this.updateUserAfterAttack(
                    ws,
                    whoAttacksData,
                    attackedSessionData
                  );
                } else ws.send("You cannot attack this user");
              });
          } else ws.send("You cannot attack any more");
        });
  }
  public updateUserAfterAttack(
    ws: typeof webSocket,
    whoAttacksData: any,
    attackedSessionData: any
  ) {
    let queryString = classQuery.getClassInfo();
    dbConnect
      .postgresqlConnect()
      .query(queryString, [whoAttacksData[2]], (err: Error, results: any) => {
        if (err) {
          ws.send("SQL-query error occured");
        } else {
          let newHp: number =
            attackedSessionData[0].hp - results.rows[0].damage;
          attackedSessionData[0].statuses.push(StatusType.attacked);
          mongoRepository.updateSession(
            ws,
            "attack",
            attackedSessionData,
            whoAttacksData,
            newHp,
            results.rows[0].attack_type
          );
        }
      });
  }
  public ability(userId: number) {
    //use ability
  }
  public message(ws: typeof webSocket, userInfo: any, message: string) {
    mongoRepository.getSessionData(userInfo[0]).then((mongoInfo: any) => {
      if (mongoInfo[0].hp > 0) {
        connectedUsers.forEach((user: typeof webSocket) => {
          if (user !== ws) user.send(`${userInfo[1]}: ${message}`);
        });
      } else ws.send("Error! You cannot send a message, your hp <= 0");
    });
  }
  public restore(ws: typeof webSocket, userInfo: any) {
    mongoRepository.getSessionData(userInfo[0]).then((sessionInfo: any) => {
      if (sessionInfo[0].hp > 0) {
        ws.send("You cannot restore your session, because you are still alive");
      } else {
        let queryString = classQuery.getClassInfo();
        dbConnect
          .postgresqlConnect()
          .query(queryString, [userInfo[2]], (err: Error, results: any) => {
            if (err) {
              ws.send("SQL-query error occured");
            } else {
              let userHp: number = results.rows[0].health;
              sessionInfo[0].statuses = [1];
              mongoRepository.updateSession(
                ws,
                "restore",
                sessionInfo,
                userInfo,
                userHp
              );
            }
          });
      }
    });
  }
  public chooseAction = async (
    ws: typeof webSocket,
    jwtToken: string,
    eventMessage: any
  ) => {
    let eventType: string = eventMessage["type"];
    await tokenValidation(jwtToken)
      .then((whoCalledEvent: any) => {
        switch (eventType) {
          case EventType.attack:
            this.attack(ws, whoCalledEvent, eventMessage["userId"]);
            break;
          case EventType.ability:
            this.ability(eventMessage["userId"]);
            break;
          case EventType.message:
            this.message(ws, whoCalledEvent, eventMessage["message"]);
            break;
          case EventType.restore:
            this.restore(ws, whoCalledEvent);
            break;
        }
      })
      .catch((err) => {
        ws.send("Invalid token");
        ws.close();
      });
  };
}
export { EventsService };
