import { Request, Response, NextFunction } from "express";

function updateUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const newName = req.body.newName;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const copyNewPassword = req.body.copyPassword;
  const newClassId = req.body.newClassId;
  // if(){
  //     check token
  //     validate provided info
  // }
  // else
}

export { updateUserMiddleware };
