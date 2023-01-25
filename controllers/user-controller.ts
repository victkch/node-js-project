import { Request, Response } from "express";
import { UserService } from '../services/user-service';

class UserController {
  public userService = new UserService();

  public login = (req: Request, res: Response) => {
    this.userService.createJWTtoken(res, req.body.email);
  };

  public register = (req: Request, res: Response) => {
    this.userService.createUser(res, req.body);
  };
  public update = (req: Request, res: Response) => {
    this.userService.updateUser(res, req.body);
  };
  public passwordReset = (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "You have to create a new account",
    });
  };
}

export { UserController };
