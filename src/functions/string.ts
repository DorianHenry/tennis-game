import { GameState } from "../enums";

export const gameStateMap = new Map<GameState, string>([
  [GameState.ONGOING, "En cours"],
  [GameState.FINISH, "Match terminé"],
]);

export function getStateByNumber(state: GameState) {
  return gameStateMap.get(state);
}
