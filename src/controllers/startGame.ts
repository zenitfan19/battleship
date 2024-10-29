import { Database } from "../models/Database";
import { WS_MESSAGE_TYPE } from "../types";
import { sendNextTurn } from "./sendNextTurn";

const db = Database.getDBInstance();

const startGame = (gameId: string) => {
  const game = db.getGameById(gameId);
  const isGameReady = game?.isGameReady;

  if (isGameReady) {
    game?.players.forEach(({ id }) => {
      db.connections.get(id)?.send(
        JSON.stringify({
          type: WS_MESSAGE_TYPE.START_GAME,
          data: JSON.stringify({
            ships: game
              .getPlayerShips(id)
              ?.map(({ coordinates, direction, length, type }) => ({
                position: coordinates,
                direction,
                length,
                type,
              })),
            currentPlayerIndex: id,
          }),
          id: 0,
        })
      );
    });

    sendNextTurn(gameId);
  }
};

export { startGame };
