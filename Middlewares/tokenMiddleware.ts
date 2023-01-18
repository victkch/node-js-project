import { parse } from "path";
import { Request, Response, NextFunction } from "express";
import { DisplayError } from "../Errors/HTTP errors/DisplayError";
import { jwt, jwtKey } from "../Services/UserService";

const showErr = new DisplayError();

const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let userToken: string = parse(req.url).base;
  jwt.verify(userToken, jwtKey, function (err: Error) {
    if (err) {
      next(showErr.infoNotFound(res, "Token"));
    } else next();
  });
};

export { tokenMiddleware };
