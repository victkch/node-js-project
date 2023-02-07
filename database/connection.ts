class DatabaseConnection {
  public postgresqlConnect() {
    const Pool = require("pg").Pool;
    const pool = new Pool({
      user: "viktoriiakocherha",
      host: "localhost",
      database: "postgres",
      password: "",
      port: 8080,
    });
    return pool;
  }
  public mongoConnect() {
    const mongoose = require("mongoose");
    mongoose
      .connect(
        "mongodb+srv://vkocherha:k91PDHwvuzSs8Bb4@db1.jwlytxg.mongodb.net/test"
      )
      .catch((err: Error) => console.log("Cannot connect to MongoDB"));
  }
}
export { DatabaseConnection };
