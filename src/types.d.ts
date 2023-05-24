export type Point = number;

export type GameId = number;

export type AvatarId = 1 | 2 | 3 | 4 | 5;

export type NumberOfSets = 2 | 3;

export type SetScore = {
  win: boolean;
  point: number;
};

export type Player = {
  name: string;
  winTheMatch: boolean;
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
  isTieBreak: boolean;
  status: GameStatus;
  chrono: number;
  currentSet: number;
  numberOfSets: NumberOfSets;
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
