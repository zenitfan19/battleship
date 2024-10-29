import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";

const db = Database.getDBInstance();

const sendNextTurn = (gameId: string) => {
  const game = db.getGameById(gameId);

  game?.players.forEach(({ id }) => {
    db.connections.get(id)?.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.TURN,
        data: JSON.stringify({
          currentPlayer: game.currentPlayerId,
        }),
        id: 0,
      })
    );
  });
};

export { sendNextTurn };
