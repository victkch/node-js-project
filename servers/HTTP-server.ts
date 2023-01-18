import { Router } from "express";
import { loginMiddleware } from "../Middlewares/loginMiddleware";
import { ClassController } from "../Controllers/ClassController";
import { UserController } from "../Controllers/UserController";
import { JSONchecker } from "../Errors/HTTP errors/CheckJSONmessage";
import { tokenMiddleware } from "../Middlewares/tokenMiddleware";

const express = require("express");
const http = require("http");
const app = express();
const router = Router();

const classController = new ClassController();
const userController = new UserController();
const jsonCheckFormat = new JSONchecker();

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
router.post(
  "/passwordReset",
  jsonCheckFormat.checkRegisterInfo,
  userController.passwordReset
);
router.get("/classes", classController.showClasses);

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log("The HTTP-server started.");
});

export { httpServer };
