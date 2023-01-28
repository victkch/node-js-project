import { parse } from "path";
import { Request, Response, NextFunction } from "express";
import { DisplayError } from "../errors/http-errors/display-error";
import { jwt, jwtKey } from "../services/user-service";

const showErr = new DisplayError();

const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let userToken: string = parse(req.url).base;
  jwt.verify(userToken, jwtKey, function (err: Error, decoded: any) {
    if (err) {
      next(showErr.infoNotFound(res, "Token not found"));
    } else {
      req.body.userId = decoded["id"];
      next();
    }
  });
};

export { tokenMiddleware };
