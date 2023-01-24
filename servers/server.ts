import { Router } from "express";
import { loginMiddleware } from "../middlewares/login-middleware";
import { ClassController } from "../controllers/class-controller";
import { UserController } from "../controllers/user-controller";
import { JSONchecker } from "../errors/http-errors/check-JSON-message";
import { tokenMiddleware } from "../middlewares/token-middleware";

const Pool = require("pg").Pool;
const express = require("express");
const http = require("http");
const app = express();
const router = Router();

const pool = new Pool({
  user: "viktoriiakocherha",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 8080,
});

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
router.post("/passwordReset", userController.passwordReset);
router.get("/classes", classController.showClasses);

const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  console.log("The HTTP-server started.");
});

export { httpServer, pool };
