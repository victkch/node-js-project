const express = require("express");
const http = require("http");
const app = express();

app.get("/", function (req, res) {
  res.send("Hi. This is HTTP-server!");
});

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
  console.log("The HTTP-server started.");
});

export { httpServer };