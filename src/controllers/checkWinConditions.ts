import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";
import { updateWinners } from "./updateWinners";

const db = Database.getDBInstance();

const checkWinConditions = (gameId: string, playerId: string) => {
  const game = db.getGameById(gameId);

  if (game?.areAllEnemyShipsKilled) {
    game.addWinForCurrentPlayer();
    game.players.forEach(({ id }) => {
      db.connections.get(id)?.send(
        JSON.stringify({
          type: WS_MESSAGE_TYPE.FINISH,
          data: JSON.stringify({
            winPlayer: playerId,
          }),
          id: 0,
        })
      );
    });

    updateWinners();
    db.deleteGame(gameId);
  }
};

export { checkWinConditions };
