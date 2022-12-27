import { ClassController } from "../Controllers/ClassController";
import { UserController } from "../Controllers/UserController";

const express = require("express");
const http = require("http");
const app = express();

const userController = new UserController();
const classController = new ClassController();

app.use(express.json());
app.use("/", userController.router);
app.use("/", classController.router);

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log("The HTTP-server started.");
});

export { httpServer };
