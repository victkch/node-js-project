import { UserRepository } from "../database-queries/user-repository";
import { DisplayResult } from "../database-responses/displayResult";
import { pool } from "../servers/server";

const jwt = require("jsonwebtoken");
const jwtKey = "my-super-duper-secure-jwt-signing-key-ha-ha-ha";

class UserService {
  public dbQueries = new UserRepository();
  public displayResult = new DisplayResult();

  public createJWTtoken(response: any, userEmail: string) {
    let usersJWTtoken: string = jwt.sign({ userEmail }, jwtKey, {
      expiresIn: "12h",
    });
    this.displayResult.displayResult(
      response,
      200,
      "Your token was generated",
      usersJWTtoken
    );
  }
  public createUser(response: any, userInfo: any) {
    let queryString = this.dbQueries.findUserByName();
    let resultmessage: string = "SQL-query error occured";
    pool.query(queryString, [userInfo.name], (err: Error, results: any) => {
      if (err) {
        this.displayResult.displayResult(response, 404, resultmessage);
      } else if (results.rows.length !== 0) {
        resultmessage = "User with this name already exists";
        this.displayResult.displayResult(response, 404, resultmessage);
      } else this.queryToAddNewUser(response, userInfo);
    });
  }
  public queryToAddNewUser(response: any, userInfo: any) {
    let queryString = this.dbQueries.addUser();
    let resultmessage: string = "Added new user";
    pool.query(
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
          this.displayResult.displayResult(response, 404, resultmessage);
        } else
          this.displayResult.displayResult(
            response,
            200,
            resultmessage,
            results.rows
          );
      }
    );
  }
  public queryToGetID(response: any, userInfo: any, message: string) {
    let queryString = this.dbQueries.findUserByPassword();
    pool.query(
      queryString,
      [userInfo.oldPassword],
      (err: Error, results: any) => {
        if (err) {
          this.displayResult.displayResult(response, 404, message);
        } else if (results.rows.length === 0) {
          message = "User with this password not found";
          this.displayResult.displayResult(response, 404, message);
        } else {
          console.log(results.rows);
          this.queryToUpdateUser(response, userInfo, message, results);
        }
      }
    );
  }
  public queryToUpdateUser(
    response: any,
    userInfo: any,
    message: string,
    id: any
  ) {
    let queryString = this.dbQueries.updateUser();
    let resultmessage: string = "Updated user's info";
    pool.query(
      queryString,
      [
        userInfo.newName,
        userInfo.newPassword,
        userInfo.newClassId,
        new Date(),
        id.rows[0].id,
      ],
      (err: Error, results: any) => {
        if (err) {
          this.displayResult.displayResult(response, 404, message);
        } else
          this.displayResult.displayResult(
            response,
            200,
            resultmessage,
            results.rows
          );
      }
    );
  }
  public updateUser(response: any, userInfo: any) {
    let queryString = this.dbQueries.findUserByName();
    let resultmessage: string = "SQL-query error occured";
    pool.query(queryString, [userInfo.newName], (err: Error, results: any) => {
      if (err) {
        this.displayResult.displayResult(response, 404, resultmessage);
      } else if (results.rows.length !== 0) {
        resultmessage = "User with this name already exists";
        return this.displayResult.displayResult(response, 404, resultmessage);
      } else this.queryToGetID(response, userInfo, resultmessage);
    });
  }
}
export { UserService, jwt, jwtKey };
