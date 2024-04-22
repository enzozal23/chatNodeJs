import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

//logger de morgan te devuelve la request y el status code
app.use(logger("dev"));
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

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
