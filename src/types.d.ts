export type Point = number;

export type GameId = number;

export type SetScore = {
  win: boolean;
  point: number;
};

export type Player = {
  name: string;
  hasService: boolean;
  currentPoint: Point;
  sets: SetScore[];
};

export type Game = {
  id: GameId;
  players: [Player, Player];
  status: GameState;
  chrono: number;
  currentSet: number;
  winner?: Player;
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type StoreState = {
  gameList: Game[];
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
