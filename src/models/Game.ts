import { Player } from "./Player";

class Game {
  id: string;
  players: Player[];

  constructor(player1: Player, player2: Player) {
    this.id = crypto.randomUUID();
    this.players = [player1, player2];
  }
}

export { Game };
