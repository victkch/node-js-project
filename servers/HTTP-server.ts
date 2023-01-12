import { Router } from "express";
import { loginMiddleware } from "../Middlewares/loginMiddleware";
import { newUserMiddleware } from "../Middlewares/newUserMiddleware";
import { updateUserMiddleware } from "../Middlewares/updateUserMiddleware";
import { ClassController } from "../Controllers/ClassController";
import { UserController } from "../Controllers/UserController";

const express = require("express");
const http = require("http");
const app = express();
const router = Router();

const classController = new ClassController();
const userController = new UserController();

app.use(express.json());
app.use(router);

router.post("/login", loginMiddleware, userController.login);
router.post("/newUser", newUserMiddleware, userController.register);
router.put("/update/:userId", updateUserMiddleware, userController.update);
router.post("/passwordReset", userController.passwordReset);
router.get("/classes", classController.showClasses);

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log("The HTTP-server started.");
});

export { httpServer };
