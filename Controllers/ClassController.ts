import { Request, Response, NextFunction } from "express";
import { ClassService } from "../Services/ClassService";

class ClassController {
  public classService = new ClassService();

  public showClasses = (req: Request, res: Response, next: NextFunction): void => {
    this.classService.returnClasses();
    //return classes
  };
}

export { ClassController };