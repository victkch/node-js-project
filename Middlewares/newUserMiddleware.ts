import { Request, Response, NextFunction } from "express";

const newUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const password = req.body.password;
  const copyPassword = req.body.copyPassword;
  const classId = req.body.classId;
  // if(){
  //     all info is provided
  //     next();
  // }
  // else
};

export { newUserMiddleware };
