import { Player } from "./Player";
import { Ship } from "./Ship";

class Game {
  id: string;
  players: Player[];
  ships: Map<string, Ship[]>;
  currentPlayerId: string;
  currentEnemyId: string;

  constructor(player1: Player, player2: Player) {
    this.id = crypto.randomUUID();
    this.players = [player1, player2];
    this.ships = new Map();
    this.currentPlayerId = player1.id;
    this.currentEnemyId = player2.id;
  }

  get isGameReady() {
    const [player1, player2] = this.players;
    return this.ships.has(player1.id) && this.ships.has(player2.id);
  }

  nextTurn() {
    const playerId = this.currentPlayerId;
    const enemyId = this.currentEnemyId;

    this.currentPlayerId = enemyId;
    this.currentEnemyId = playerId;
  }

  attack(x: number, y: number) {
    const hittedShip = this.ships
      .get(this.currentEnemyId)
      ?.find((ship) => ship.attackShip(x, y));

    if (!hittedShip) {
      this.nextTurn();
    }

    return hittedShip;
  }

  placeShipsForPlayer(playerId: string, ships: Ship[]) {
    this.ships.set(playerId, ships);
  }

  getPlayerShips(playerId: string) {
    return this.ships.get(playerId);
  }
}

export { Game };
