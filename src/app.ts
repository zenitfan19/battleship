import { WebSocketServer } from "ws";
import { httpServer } from "./http_server/server";
import { messageHandler } from "./messageHandler";
import { Database } from "./models/Database";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const db = Database.getDBInstance();

console.log(
  `\x1b[38;2;70;130;180m Start static http server on the ${HTTP_PORT} port! \x1b[0m`
);
httpServer.listen(HTTP_PORT);

console.log(
  `\x1b[38;2;70;130;180m Start WS server on the ${WS_PORT} port! \x1b[0m`
);
const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", (socket) => {
  console.log("\x1b[38;2;46;139;87m New connection established \x1b[0m");
  socket.on("message", (message) => messageHandler(message, socket));
  socket.on("close", () => {
    const player = db.getPlayerByConnection(socket);
    player?.setOffline();
    console.log(
      `\x1b[38;2;178;34;34m Connection for player ${
        player?.name ?? "Anonymous"
      } closed \x1b[0m`
    );
  });
});
