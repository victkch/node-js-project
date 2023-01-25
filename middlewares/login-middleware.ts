import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../database-queries/user-repository";
import { DisplayError } from "../errors/http-errors/display-error";
import { pool } from "../servers/server";

const showErr = new DisplayError();
const dbQueries = new UserRepository();

const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let queryString = dbQueries.findUser();
  pool.query(
    queryString,
    [userEmail, userPassword],
    (err: Error, results: any) => {
      if (err) {
        next(showErr.infoNotFound(res, "Error"));
      } else if (results.rows.length === 0) {
        next(showErr.infoNotFound(res, "User not found"));
      } else next();
    }
  );
};

export { loginMiddleware };
