import { ClassRoutes } from "../Routes/ClassRoutes";
import { UserRoutes } from "../Routes/UserRoutes";

const express = require("express");
const http = require("http");
const app = express();

const userRoutes = new UserRoutes();
const classRoutes = new ClassRoutes();

app.use(express.json());
app.use(userRoutes.router);
app.use(classRoutes.router);

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log("The HTTP-server started.");
});

export { httpServer };
