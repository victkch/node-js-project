import { Request, Response, NextFunction } from "express";
import { DisplayError } from "./DisplayError";

const showErr = new DisplayError();

class JSONchecker {
  public checkLoginInfo = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (
      req.body.email &&
      req.body.password &&
      req.body.email !== null &&
      req.body.password !== null
    ) {
      next();
    } else next(showErr.wrongFormatError(res, "login"));
  };

  public checkRegisterInfo = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.copyPassword &&
      req.body.classId &&
      req.body.name !== null &&
      req.body.email !== null &&
      req.body.password !== null &&
      req.body.copyPassword !== null &&
      req.body.classId !== null
    ) {
      next();
    } else next(showErr.wrongFormatError(res, "registration"));
  };

  public checkUpdateInfo = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (
      req.body.newName &&
      req.body.oldPassword &&
      req.body.newPassword &&
      req.body.copyPassword &&
      req.body.newClassId &&
      req.body.newName !== null &&
      req.body.oldPassword !== null &&
      req.body.newPassword !== null &&
      req.body.copyPassword !== null &&
      req.body.newClassId !== null
    ) {
      next();
    } else next(showErr.wrongFormatError(res, "update"));
  };
}
export { JSONchecker };
