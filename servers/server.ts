import { Router } from "express";
import { loginMiddleware } from "../middlewares/login-middleware";
import { ClassController } from "../controllers/class-controller";
import { UserController } from "../controllers/user-controller";
import { JSONchecker } from "../errors/http-errors/check-JSON-message";
import { tokenMiddleware } from "../middlewares/token-middleware";
import { webSocket, webSocketController } from "./ws-server";
import { DatabaseConnection } from "../database/connection";

const express = require("express");
const http = require("http");
const app = express();
const router = Router();

const userController = new UserController();
const classController = new ClassController();
const jsonCheckFormat = new JSONchecker();
const dbConnect = new DatabaseConnection();

app.use(express.json());
app.use(router);

router.post(
  "/login",
  jsonCheckFormat.checkLoginInfo,
  loginMiddleware,
  userController.login
);
router.post(
  "/newUser",
  jsonCheckFormat.checkRegisterInfo,
  userController.register
);
router.put(
  "/update/:userToken",
  tokenMiddleware,
  jsonCheckFormat.checkUpdateInfo,
  userController.update
);
router.post("/passwordReset", userController.passwordReset);
router.get("/classes", classController.showClasses);

const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  console.log("The HTTP-server started.");
});

const webSocketServer = new webSocket.Server({ server: httpServer });
webSocketController(webSocketServer);

export { dbConnect };
