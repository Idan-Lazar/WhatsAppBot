const socketIo = require("socket.io")
const express = require('express');
const { Client } = require("whatsapp-web.js");
const schedule = require("node-schedule");
const app = express();

const port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log(`App running on port ${port}`)
);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("new client");
  newClient(socket);
});
function newClient(socket) {
  const client = new Client();
  socket.emit("getClient", client);
  client.on("qr", (qr) => {
    // Generate and scan this code with your phone
    socket.emit("getQr", qr);
  });

  client.on("ready", () => {
    socket.emit("ClientReady", "client ready");
  });
  client.on("message", (message) => {
    console.log(message.body);
  });
  socket.on("submitMessages", (data) => {
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
      for (const [key2, value2] of Object.entries(value)) {
        console.log(`${key2}: ${value2}`);
        console.log(new Date(key2));
        schedule.scheduleJob(new Date(key2), function () {
          console.log("in");
          client.sendMessage(key+'@c.us', value2);
        });
      }
    }
  });
  client.initialize();
}
