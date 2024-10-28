import { Player, PlayerInput } from "./Player";

class Database {
  static database: Database;

  static getDBInstance() {
    if (!Database.database) {
      Database.database = new Database();
    }

    return Database.database;
  }

  players: Player[];

  constructor() {
    this.players = [];
  }

  getWinners() {
    return this.players.map(({ name, wins }) => ({ name, wins }));
  }

  getUserByName(userName: string) {
    return this.players.find(({ name }) => name === userName);
  }

  loginPlayer(player: Player, password: string) {
    if (player.password !== password) {
      throw new Error("Password is incorrect");
    }

    return player;
  }

  registerPlayer(player: PlayerInput) {
    const newPlayer = new Player(player);

    this.players.push(newPlayer);

    return newPlayer;
  }

  authenticatePlayer(player: PlayerInput) {
    const exsistingPlayer = this.getUserByName(player.name);

    if (!exsistingPlayer) {
      return this.registerPlayer(player);
    } else {
      return this.loginPlayer(exsistingPlayer, player.password);
    }
  }
}

export { Database };
