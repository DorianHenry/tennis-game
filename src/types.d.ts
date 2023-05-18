export type Point = number;

export type GameId = number;

export type Player = {
  name: string;
  hasService: boolean;
  currentPoint: Point;
  sets: [number, number, number];
};

export type Game = {
  id: GameId;
  players: [Player, Player];
  status: GameState;
  chrono: number;
  currentSet: number;
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type StoreState = {
  gameList: Game[];
};
