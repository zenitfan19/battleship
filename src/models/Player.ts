type PlayerInput = {
  name: string;
  password: string;
};

class Player {
  id: string;
  name: string;
  password: string;

  constructor(playerData: PlayerInput) {
    this.id = crypto.randomUUID();
    this.name = playerData.name;
    this.password = playerData.password;
  }
}

export { Player };
export type { PlayerInput };
