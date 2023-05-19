import { getStateByNumber } from "../../../functions/string";
import { Game } from "../../../types";
import { Card } from "../card";
import { Label } from "../label";
import { ChronometerWithStore } from "./chronometer";

export function GameListItem({ game }: { game: Game }) {
  return (
    <Card>
      <Label>{getStateByNumber(game.status)}</Label>
      <h3>{game.id}</h3>
      <ChronometerWithStore key={game.id} gameId={game.id} />
    </Card>
  );
}
