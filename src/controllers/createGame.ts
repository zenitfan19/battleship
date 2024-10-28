import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";

const db = Database.getDBInstance();

const createGame = (roomId: string) => {
  const room = db.getRoomById(roomId);
  const [player1, player2] = room?.players ?? [];

  if (player1 && player2) {
    const newGame = db.createGame(player1, player2);

    room?.players.forEach(({ id }) => {
      db.connections.get(id)?.send(
        JSON.stringify({
          type: WS_MESSAGE_TYPE.CREATE_GAME,
          data: JSON.stringify({ idGame: newGame.id, idPlayer: id }),
          id: 0,
        })
      );
    });
  }
};

export { createGame };
