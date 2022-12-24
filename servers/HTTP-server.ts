const express = require("express");
const http = require("http");
const app = express();

app.get("/home", function (req, res) {
  res.send("Hi. This is HTTP-server!");
  console.log("/home");
});

app.post("/login", function (req, res) {
  res.send("Trying to log in some user.");
  console.log("/login");
});

app.post("/users/newUser", function (req, res) {
  res.send("Trying to register new user.");
  console.log("/users/newUser");
});

app.put("/users/update/:userId", function (req, res) {
  res.send("Trying to update some user's info.");
  console.log("/users/update/:userId");
});

app.get("/classes", function (req, res) {
  res.send("Trying to see all classes.");
  console.log("/classes");
});

app.post("/forgot_password", function (req, res) {
  res.send("Trying to reset a password.");
  console.log("/forgot_password");
});

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log("The HTTP-server started.");
});

export { httpServer };