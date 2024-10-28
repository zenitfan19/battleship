import { WebSocketServer } from "ws";
import { httpServer } from "./http_server/server";
import { messageHandler } from "./messageHandler";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start WS server on the ${WS_PORT} port!`);
const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", (socket) =>
  socket.on("message", (message) => messageHandler(message, socket))
);
