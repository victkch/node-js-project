import { Route, Router } from "./Route";
import { UserController } from "../Controllers/UserController";
import { loginMiddleware } from "../Middlewares/loginMiddleware";
import { newUserMiddleware } from "../Middlewares/newUserMiddleware";
import { updateUserMiddleware } from "../Middlewares/updateUserMiddleware";

class UserRoutes implements Route {
  public path = "/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.router.post(`${this.path}/login`, loginMiddleware, this.userController.login);
    this.router.post(`${this.path}/newUser`, newUserMiddleware, this.userController.register);
    this.router.put(`${this.path}/update/:userId`, updateUserMiddleware, this.userController.update);
    this.router.post(`${this.path}/passwordReset`, this.userController.passwordReset);
  }
}

export { UserRoutes };