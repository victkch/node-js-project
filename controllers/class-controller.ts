import { Request, Response } from "express";
import { ClassService } from "../services/class-service";

class ClassController {
  public classService = new ClassService();

  public showClasses = (req: Request, res: Response) => {
    this.classService.returnClasses(res);
  };
}

export { ClassController };
