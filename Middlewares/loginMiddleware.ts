import { Request, Response, NextFunction } from "express";

const loginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  // if(){
  //     user found
  //     next();
  // }
  // else next(error)
};

export { loginMiddleware };
