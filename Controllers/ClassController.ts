import { Request, Response, NextFunction } from "express";
import { ClassService } from "../Services/ClassService";

class ClassController {
  public showClasses = (req: Request, res: Response, next: NextFunction): void => {
    ClassService.returnClasses();
    //return classes
  };
}

export { ClassController };
