const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Connection established with client", socket.handshake.address);
});

httpServer.listen(7000);

module.exports = { socket: io };
