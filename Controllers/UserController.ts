import { Request, Response, NextFunction } from "express";
import { UserService } from "../Services/UserService";

class UserController {
  public userService = new UserService();

  public login = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.createJWTToken(req.body.email);
    res.send("This is your token");
    //jwt token
  };

  public register = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.createUser(req.body.name);
    res.send("You registered");
    //return a user
  };

  public update = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.updateUser(req.body.newName);
    res.send("Your info has been updated");
    //return updated user
  };

  public passwordReset = (req: Request, res: Response, next: NextFunction): void => {
    this.userService.createUser(req.body.name);
    res.send("You have created a new account");
    //reset password
  };
}

export { UserController };
