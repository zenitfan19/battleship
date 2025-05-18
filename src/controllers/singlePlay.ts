import { WebSocket } from "ws";
import { Database } from "../models/Database";
import { Player } from "../models/Player";
import { WS_MESSAGE_TYPE } from "../types";
import { Room } from "../models/Room";
import { placeBotShips } from "../utils/placeBotShips";

const db = Database.getDBInstance();

const singlePlay = (socket: WebSocket) => {
  const player = db.getPlayerByConnection(socket);
  if (!player) {
    socket.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.SINGLE_PLAY,
        data: JSON.stringify({ error: true, errorText: "Player not found" }),
        id: 0,
      })
    );
    return;
  }

  const bot = new Player({ name: "Bot", password: "" });
  bot.id = `bot-${player.id}`;
  bot.online = true;

  const room = new Room();
  room.addPlayerToRoom(player);
  room.addPlayerToRoom(bot);
  db.rooms.push(room);

  const newGame = db.createGame(player, bot, true);

  db.connections.set(bot.id, undefined as unknown as WebSocket);

  socket.send(
    JSON.stringify({
      type: WS_MESSAGE_TYPE.CREATE_ROOM,
      data: JSON.stringify({
        roomId: room.id,
        roomUsers: room.players.map(({ id, name }) => ({ name, index: id })),
      }),
      id: 0,
    })
  );
  socket.send(
    JSON.stringify({
      type: WS_MESSAGE_TYPE.CREATE_GAME,
      data: JSON.stringify({ idGame: newGame.id, idPlayer: player.id }),
      id: 0,
    })
  );

  const shipsForBot = placeBotShips();
  db.addShipsForPlayer(newGame.id, shipsForBot, bot.id);
};

export { singlePlay };
