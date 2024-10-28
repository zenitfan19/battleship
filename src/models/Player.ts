type PlayerInput = {
  name: string;
  password: string;
};

class Player {
  id: string;
  name: string;
  password: string;
  wins: number;
  online: boolean;

  constructor(playerData: PlayerInput) {
    this.id = crypto.randomUUID();
    this.name = playerData.name;
    this.password = playerData.password;
    this.wins = 0;
    this.online = false;
  }

  setOnline() {
    this.online = true;
  }

  setOffline() {
    this.online = false;
  }

  incrementWins() {
    this.wins += 1;
  }
}

export { Player };
export type { PlayerInput };
