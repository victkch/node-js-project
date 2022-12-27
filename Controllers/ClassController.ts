import { Controller, Router } from "./Controller";
import { Request, Response, NextFunction } from "express";

class ClassController implements Controller {
  public path = "/classes";
  public router = Router();

  constructor() {
    this.router.get(`${this.path}`, this.showClasses);
  }

  public showClasses = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    //return classes
  };
}

export { ClassController };
