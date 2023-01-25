import { ClassRepository } from "../database-queries/class-repository";
import { DisplayResult } from "../database-responses/displayResult";
import { pool } from "../servers/server";

class ClassService {
  public classQuery = new ClassRepository();

  public returnClasses(response: any) {
    let displayRes = new DisplayResult();
    let message: string = "All available classes";
    let queryString = this.classQuery.returnAllClasses();
    pool.query(queryString, (err: Error, results: any) => {
      if (err) {
        message = "Error. Cannot display classes";
        return displayRes.displayResult(response, 404, message);
      } else
        return displayRes.displayResult(response, 200, message, results.rows);
    });
  }
}

export { ClassService };
