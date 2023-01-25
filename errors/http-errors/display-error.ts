import { Response } from "express";

class DisplayError {
  public wrongFormatError(res: Response, additionalInfo?: string) {
    let dataFormat: string = "";
    switch (additionalInfo) {
      case "login":
        dataFormat = "email: expample@gmail.com, password: your_password";
        break;
      case "registration":
        dataFormat =
          `name: your_name, email: expample@gmail.com, ` +
          `password: your_password, copyPassword: copy_your_password, classId: id`;
        break;
      case "update":
        dataFormat =
          `newName: your_name, oldPassword: old_password, ` +
          `newPassword: new_password, copyPassword: copy_your_password, newClassId: id`;
        break;
    }
    return res.status(404).json({
      success: false,
      message: "Invalid data format",
      dataExpected: dataFormat,
    });
  }
  public infoNotFound(res: Response, message: string) {
    return res.status(404).json({
      success: false,
      message: message,
    });
  }
}

export { DisplayError };
