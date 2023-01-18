import { Request, Response } from "express";
import { UserService } from "../Services/UserService";

class UserController {
  public userService = new UserService();

  public login = (req: Request, res: Response): Response => {
    //create mongodb session
    let usersJWTtoken: string = this.userService.createJWTtoken(req.body.email);
    return res.status(200).json({
      success: true,
      message: "Your token was generated",
      token: usersJWTtoken,
    });
  };

  public register = (req: Request, res: Response): Response => {
    // this.userService.createUser(req.body.name);
    return res.status(200).json({
      success: true,
      message: "You successfully registered",
    });
  };

  public update = (req: Request, res: Response): Response => {
    //this.userService.updateUser(req.body.newName);
    return res.status(200).json({
      success: true,
      message: "Your info was successfully updated",
    });
  };

  public passwordReset = (req: Request, res: Response): Response => {
    // this.userService.createUser(req.body.name);
    return res.status(200).json({
      success: true,
      message: "You have created a new account",
    });
  };
}

export { UserController };
