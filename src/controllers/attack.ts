import { Database } from "../models/Database";
import { AttackStatus, WS_MESSAGE_TYPE } from "../types";
import { sendNextTurn } from "./sendNextTurn";

type AttackInput = {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string;
};

const db = Database.getDBInstance();

const attack = ({ gameId, indexPlayer, x, y }: AttackInput) => {
  const game = db.getGameById(gameId);
  const player = db.getPlayerById(indexPlayer);

  if (indexPlayer !== game?.currentPlayerId) {
    throw new Error(`It is not ${player?.name} player's turn`);
  }

  let status: AttackStatus;

  const hittedShip = game?.attack(x, y);

  if (hittedShip?.isKilled) {
    status = AttackStatus.KILLLED;
  } else if (hittedShip) {
    status = AttackStatus.SHOT;
  } else {
    status = AttackStatus.MISS;
  }

  game?.players.forEach(({ id }) => {
    db.connections.get(id)?.send(
      JSON.stringify({
        type: WS_MESSAGE_TYPE.ATTACK,
        data: JSON.stringify({
          position: {
            x,
            y,
          },
          currentPlayer: indexPlayer,
          status,
        }),
        id: 0,
      })
    );
  });

  sendNextTurn(gameId);
};

export { attack };
