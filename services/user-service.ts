import { UserRepository } from "../database/user-repository-pg";
import { DisplayResult } from "../errors/database-errors/displayResult";
import { dbConnect } from "../servers/server";

const jwt = require("jsonwebtoken");
const jwtKey = "my-super-duper-secure-jwt-signing-key-ha-ha-ha";

const dbQueries = new UserRepository();
const displayResult = new DisplayResult();

class UserService {
  public createJWTtoken(response: any, userInfo: any) {
    let usersJWTtoken: string = jwt.sign(
      {
        id: userInfo.userId,
        name: userInfo.userName,
        class_id: userInfo.userClassId,
        email: userInfo.email,
      },
      jwtKey,
      { expiresIn: "12h" }
    );
    displayResult.displayResult(
      response,
      200,
      "Your token was generated",
      usersJWTtoken
    );
  }
  public createUser(response: any, userInfo: any) {
    let queryString = dbQueries.findUserByName();
    let resultmessage: string = "SQL-query error occured";
    dbConnect
      .postgresqlConnect()
      .query(queryString, [userInfo.name], (err: Error, results: any) => {
        if (err) {
          displayResult.displayResult(response, 404, resultmessage);
        } else if (results.rows.length !== 0) {
          resultmessage = "User with this name already exists";
          displayResult.displayResult(response, 404, resultmessage);
        } else this.queryToAddNewUser(response, userInfo);
      });
  }
  public queryToAddNewUser(response: any, userInfo: any) {
    let queryString = dbQueries.addUser();
    let resultmessage: string = "Added new user";
    dbConnect
      .postgresqlConnect()
      .query(
        queryString,
        [
          userInfo.name,
          userInfo.email,
          userInfo.password,
          userInfo.classId,
          new Date(),
          new Date(),
        ],
        (err: Error, results: any) => {
          if (err) {
            resultmessage = "SQL-query error occured";
            displayResult.displayResult(response, 404, resultmessage);
          } else
            displayResult.displayResult(
              response,
              200,
              resultmessage,
              results.rows
            );
        }
      );
  }
  public queryToUpdateUser(
    response: any,
    userInfo: any,
    message: string,
    id: number
  ) {
    let queryString = dbQueries.updateUser();
    let resultmessage: string = "Updated user's info";
    dbConnect
      .postgresqlConnect()
      .query(
        queryString,
        [
          userInfo.newName,
          userInfo.newPassword,
          userInfo.newClassId,
          new Date(),
          id,
        ],
        (err: Error, results: any) => {
          if (err) {
            displayResult.displayResult(response, 404, message);
          } else
            displayResult.displayResult(
              response,
              200,
              resultmessage,
              results.rows
            );
        }
      );
  }
  public updateUser(response: any, userInfo: any, userId: number) {
    let queryString = dbQueries.findUserByName();
    let resultmessage: string = "SQL-query error occured";
    dbConnect
      .postgresqlConnect()
      .query(queryString, [userInfo.newName], (err: Error, results: any) => {
        if (err) {
          displayResult.displayResult(response, 404, resultmessage);
        } else if (results.rows.length !== 0) {
          resultmessage = "User with this name already exists";
          return displayResult.displayResult(response, 404, resultmessage);
        } else
          this.queryToUpdateUser(response, userInfo, resultmessage, userId);
      });
  }
}

export { UserService, jwt, jwtKey };
