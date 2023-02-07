import { Request, Response } from "express";
import { UserService } from "../services/user-service";

const userService = new UserService();

class UserController {
  public login = (req: Request, res: Response) => {
    userService.createJWTtoken(res, req.body);
  };
  public register = (req: Request, res: Response) => {
    userService.createUser(res, req.body);
  };
  public update = (req: Request, res: Response) => {
    userService.updateUser(res, req.body, req.body.userId);
  };
  public passwordReset = (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "You have to create a new account",
    });
  };
}

export { UserController };
