import { ClassRepository } from "../database/class-repository-pg";
import { DisplayResult } from "../errors/database-errors/displayResult";
import { dbConnect } from "../servers/server";

const classQuery = new ClassRepository();
const displayRes = new DisplayResult();

class ClassService {
  public returnClasses(response: any) {
    let message: string = "All available classes";
    let queryString = classQuery.returnAllClasses();
    dbConnect
      .postgresqlConnect()
      .query(queryString, (err: Error, results: any) => {
        if (err) {
          message = "Error. Cannot display classes";
          return displayRes.displayResult(response, 404, message);
        } else
          return displayRes.displayResult(response, 200, message, results.rows);
      });
  }
}

export { ClassService };
