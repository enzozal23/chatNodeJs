const express = require("express");
// import logger from "morgan";
const { Server } = require("socket.io");
const { createServer } = require("node:http");

const port = process.env.PORT || 3000;
const app = express();
const httpServer = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
const io = new Server(httpServer);

//logger de morgan te devuelve la request y el status code
// app.use(logger("dev"));
let messages = [];
io.on("connection", (socket) => {
  console.log(`usuario id: ${socket.id} conectado`);
  socket.on("disconnect", () => {
    console.log(`usuario id: ${socket.id} desconectado`);
  });

  socket.on("chat message", (data) => {
    messages.push(data);
    io.emit("chat message", messages);
  });
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/cliente/index.html");
});
