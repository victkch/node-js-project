import { Request, Response } from "express";
import { ClassService } from "../services/class-service";

const classService = new ClassService();

class ClassController {
  public showClasses = (req: Request, res: Response) => {
    classService.returnClasses(res);
  };
}

export { ClassController };
