import { connectedUsers, dbCollection, webSocket } from "../servers/ws-server";

const mongoose = require("mongoose");

class MongoRepository {
  public createCollection() {
    const usersData = new mongoose.Schema({
      _id: Number,
      username: String,
      hp: Number,
      statuses: Array<number>,
    });
    const usersSessions = mongoose.model("users-sessions", usersData);
    usersSessions.createCollection();
    return usersSessions;
  }
  public createSession(
    userIdAndName: any[],
    health: number,
    statuses: number,
    ws: typeof webSocket
  ) {
    let userInfo = {
      _id: userIdAndName[0],
      username: userIdAndName[1],
      hp: health,
      statuses: [statuses],
    };
    dbCollection.collection.insertOne(userInfo, (err: Error) => {
      if (err) {
        ws.send("MongoDB-query error occured");
      } else this.getAllSessions(ws);
    });
  }
  public getAllSessions(ws: typeof webSocket) {
    dbCollection.find({}, (err: Error, data: any) => {
      if (err) {
        ws.send("MongoDB-query error occured");
      } else {
        connectedUsers.forEach((user: typeof webSocket) => {
          data.forEach((session: object, ind: number) =>
            user.send(`${ind + 1}) ${session}`)
          );
          user.send(`Active users' sessions:`);
        });
      }
    });
  }
  public deleteSession(id: number, ws: typeof webSocket) {
    dbCollection.collection.deleteOne({ _id: id }, (err: Error) => {
      if (err) {
        ws.send("MongoDB-query error occured");
      } else this.getAllSessions(ws);
    });
  }
  public getSessionData(userId: number) {
    return new Promise((res, rej) => {
      dbCollection.find({ _id: userId }, (err: Error, data: any) => {
        if (err) {
          rej(false);
        } else res(data);
      });
    });
  }
  public updateSession(
    ws: typeof webSocket,
    eventType: string,
    updateInfo: any,
    whoCalledEventInfo: any,
    newHealth?: number,
    attackType?: string
  ) {
    let updateId: object = { _id: updateInfo[0]._id };
    let updatedData: object = {
      hp: newHealth,
      statuses: updateInfo[0].statuses,
    };
    dbCollection.findOneAndUpdate(updateId, updatedData, (err: Error) => {
      if (err) {
        ws.send("MongoDB-query error occured");
      } else {
        switch (eventType) {
          case "attack":
            this.sendUpdatedSession(
              ws,
              eventType,
              updateInfo,
              whoCalledEventInfo,
              attackType
            );
            break;
          case "restore":
            this.sendUpdatedSession(
              ws,
              eventType,
              updateInfo,
              whoCalledEventInfo
            );
            break;
        }
      }
    });
  }
  public sendUpdatedSession(
    ws: typeof webSocket,
    eventType: string,
    updateInfo: any,
    whoCalledEventInfo: any,
    attackType?: string
  ) {
    dbCollection.find(
      { _id: updateInfo[0]._id },
      (err: Error, updatedSession: any) => {
        if (err) {
          ws.send("MongoDB-query error occured");
        } else {
          let message: string = "";
          switch (eventType) {
            case "attack":
              message = `${whoCalledEventInfo[1]} used theirs attack power - ${attackType} - on ${updateInfo[0].username}`;
              break;
            case "restore":
              message = `${whoCalledEventInfo[1]} restored theirs session`;
              break;
          }
          connectedUsers.forEach((user: typeof webSocket) => {
            user.send(message);
            user.send(`${updatedSession}`);
            user.send(`Updated ${updateInfo[0].username}'s session:`);
          });
        }
      }
    );
  }
}

export { MongoRepository };
