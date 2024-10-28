import { WebSocket } from "ws";
import { Player, PlayerInput } from "./Player";
import { Room } from "./Room";

class Database {
  static database: Database;

  static getDBInstance() {
    if (!Database.database) {
      Database.database = new Database();
    }

    return Database.database;
  }

  players: Player[];
  connections: Map<string, WebSocket>;
  rooms: Room[];

  constructor() {
    this.players = [];
    this.rooms = [];
    this.connections = new Map();
  }

  getWinners() {
    return this.players.map(({ name, wins }) => ({ name, wins }));
  }

  getRooms() {
    return this.rooms.map(({ id, players }) => ({
      roomId: id,
      roomUsers: players.map(({ id, name }) => ({ name, index: id })),
    }));
  }

  getPlayerByName(userName: string) {
    return this.players.find(({ name }) => name === userName);
  }

  getPlayerById(userId: string) {
    return this.players.find(({ id }) => id === userId);
  }

  getPlayerByConnection(connection: WebSocket) {
    const [playerId] =
      Array.from(this.connections.entries()).find(
        ([_, userConnection]) => userConnection === connection
      ) ?? [];
    return this.getPlayerById(playerId ?? "");
  }

  loginPlayer(player: Player, password: string) {
    if (player.password !== password) {
      throw new Error("Password is incorrect");
    }

    if (player.online) {
      throw new Error(`Player ${player.name} already logged in`);
    }

    return player;
  }

  registerPlayer(player: PlayerInput) {
    const newPlayer = new Player(player);

    this.players.push(newPlayer);

    return newPlayer;
  }

  authenticatePlayer(player: PlayerInput) {
    const exsistingPlayer = this.getPlayerByName(player.name);

    if (!exsistingPlayer) {
      return this.registerPlayer(player);
    } else {
      return this.loginPlayer(exsistingPlayer, player.password);
    }
  }

  registerPlayerConnection(playerId: string, socket: WebSocket) {
    const player = this.getPlayerById(playerId);
    player?.setOnline();
    this.connections.set(playerId, socket);
  }

  closePlayerConnection(playerId: string) {
    const player = this.getPlayerById(playerId);
    player?.setOffline();
    this.connections.delete(playerId);
  }
}

export { Database };
