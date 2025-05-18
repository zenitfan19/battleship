import { Player } from "./Player";

class Room {
  id: string;
  players: Player[];

  constructor() {
    this.id = crypto.randomUUID();
    this.players = [];
  }

  addPlayerToRoom(player: Player) {
    if (this.players.length > 1) {
      throw new Error(`The room ${this.id} is already full`);
    }
    if (!this.hasPlayerInRoom(player.id)) {
      this.players.push(player);
    } else {
      throw new Error(`Player ${player.name} already in room`);
    }
  }

  hasPlayerInRoom(playerId: string) {
    return this.players.some(({ id }) => id === playerId);
  }
}

export { Room };
