export type Point = number;

export type GameId = number;

export type AvatarId = 1 | 2 | 3 | 4 | 5;

export type SetScore = {
  win: boolean;
  point: number;
};

export type Player = {
  name: string;
  hasService: boolean;
  currentPoint: Point;
  avatarId: AvatarId;
  sets: SetScore[];
};

export type NewPlayer = {
  name: string;
  avatarId: AvatarId;
};

export type Game = {
  id: GameId;
  players: [Player, Player];
  status: GameStatus;
  chrono: number;
  currentSet: number;
  winner?: Player;
};

export type StoreState = {
  gameList: Game[];
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type StoreGetGame = {
  gameId: GameId;
};

export type StoreGetPlayer = StoreGetGame & {
  playerIndex: number;
};
