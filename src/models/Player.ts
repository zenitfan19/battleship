type PlayerInput = {
  name: string;
  password: string;
};

class Player {
  id: string;
  name: string;
  password: string;
  wins: number;

  constructor(playerData: PlayerInput) {
    this.id = crypto.randomUUID();
    this.name = playerData.name;
    this.password = playerData.password;
    this.wins = 0;
  }

  incrementWins() {
    this.wins += 1;
  }
}

export { Player };
export type { PlayerInput };
