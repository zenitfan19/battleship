import { Player } from "./Player";

class Room {
  id: string;
  players: Player[];

  constructor() {
    this.id = crypto.randomUUID();
    this.players = [];
  }

  addPlayerToRoom(player: Player) {
    this.players.push(player);
  }
}

export { Room };
