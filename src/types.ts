enum WS_MESSAGE_TYPE {
  REGISTER = "reg",
  UPDATE_WINNERS = "update_winners",
  CREATE_ROOM = "create_room",
  ADD_USER_TO_ROOM = "add_user_to_room",
  CREATE_GAME = "create_game",
  UPDATE_ROOM = "update_room",
  ADD_SHIPS = "add_ships",
  START_GAME = "start_game",
  ATTACK = "attack",
  RANDOM_ATTACK = "randomAttack",
  TURN = "turn",
  FINISH = "finish",
}

enum AttackStatus {
  MISS = "miss",
  KILLLED = "killed",
  SHOT = "shot",
}

type WsMessage = {
  type: WS_MESSAGE_TYPE;
  data: string;
  id: number;
};

type Coordinates = {
  x: number;
  y: number;
};

export { WS_MESSAGE_TYPE, AttackStatus };
export type { WsMessage, Coordinates };
