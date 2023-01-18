import { Request, Response, NextFunction } from "express";
import { DisplayError } from "../errors/http-errors/display-error";

const showErr = new DisplayError();

const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (userEmail === "myemail@gmail.com" && userPassword === "mypassword") {
    next();
  } else next(showErr.infoNotFound(res, "User"));
};

export { loginMiddleware };
