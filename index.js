const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    const msgparse = JSON.parse(msg)
    msgparse.id = uuidv4()
    io.emit("messagelist", JSON.stringify(msgparse));
  })
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});