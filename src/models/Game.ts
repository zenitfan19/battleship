import { Player } from "./Player";
import { Ship } from "./Ship";

class Game {
  id: string;
  players: Player[];
  ships: Map<string, Ship[]>;

  constructor(player1: Player, player2: Player) {
    this.id = crypto.randomUUID();
    this.players = [player1, player2];
    this.ships = new Map();
  }

  get isGameReady() {
    const [player1, player2] = this.players;
    return this.ships.has(player1.id) && this.ships.has(player2.id);
  }

  placeShipsForPlayer(playerId: string, ships: Ship[]) {
    this.ships.set(playerId, ships);
  }

  getPlayerShips(playerId: string) {
    return this.ships.get(playerId);
  }
}

export { Game };
