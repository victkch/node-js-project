import { loginMiddleware } from "../Middlewares/loginMiddleware";
import { newUserMiddleware } from "../Middlewares/newUserMiddleware";
import { updateUserMiddleware } from "../Middlewares/updateUserMiddleware";
import { Controller, Router } from "./Controller";
import { Request, Response, NextFunction } from "express";

class UserController implements Controller {
  public path = "/users";
  public router = Router();

  constructor() {
    this.router.post(`${this.path}/login`, loginMiddleware, this.login);
    this.router.post(`${this.path}/newUser`, newUserMiddleware, this.register);
    this.router.put(
      `${this.path}/update/:userId`,
      updateUserMiddleware,
      this.update
    );
    this.router.post(`${this.path}/passwordReset`, this.passwordReset);
  }

  public login = (req: Request, res: Response, next: NextFunction): void => {
    //jwt token
  };

  public register = (req: Request, res: Response, next: NextFunction): void => {
    //return a user
  };

  public update = (req: Request, res: Response, next: NextFunction): void => {
    //return updated user
  };

  public passwordReset = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    //reset password
  };
}

export { UserController };
