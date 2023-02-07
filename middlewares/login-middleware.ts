import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database/user-repository-pg";
import { DisplayError } from "../errors/http-errors/display-error";
import { dbConnect } from "../servers/server";

const showErr = new DisplayError();
const dbQueries = new UserRepository();

const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let queryString = dbQueries.findUser();
  dbConnect
    .postgresqlConnect()
    .query(
      queryString,
      [req.body.email, req.body.password],
      (err: Error, results: any) => {
        if (err) {
          next(showErr.infoNotFound(res, "Error"));
        } else if (results.rows.length === 0) {
          next(showErr.infoNotFound(res, "User not found"));
        } else {
          req.body.userId = results.rows[0].id;
          req.body.userName = results.rows[0].username;
          req.body.userClassId = results.rows[0].class_id;
          next();
        }
      }
    );
};

export { loginMiddleware };
