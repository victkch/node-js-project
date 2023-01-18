import { Request, Response } from "express";
import { ClassService } from "../services/class-service";

class ClassController {
  public classService = new ClassService();

  public showClasses = (req: Request, res: Response): Response => {
    //this.classService.returnClasses();
    return res.status(200).json({
      success: true,
      message: "All available classes",
    });
  };
}

export { ClassController };
