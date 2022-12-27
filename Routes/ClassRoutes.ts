import { Route, Router } from "./Route";
import { ClassController } from "../Controllers/ClassController";

class ClassRoutes implements Route {
  public path = "/classes";
  public router = Router();
  public userController = new ClassController();

  constructor() {
    this.router.get(`${this.path}`, this.userController.showClasses);
  }
}

export { ClassRoutes };
