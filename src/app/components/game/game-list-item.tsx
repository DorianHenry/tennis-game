import { getStateByNumber } from "../../../functions/string";
import type { Game } from "../../../types";

import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { ChronometerWithStore } from "./chronometer";
import { PlayersPresentation } from "./player";

export function GameListItem({ game }: { game: Game }) {
  return (
    <Card>
      <div className="stack-inner stack-inner--2">
        <header>
          <Label>{getStateByNumber(game.status)}</Label>
        </header>
        <section>
          <PlayersPresentation players={game.players} />
        </section>
        <footer>
          <ChronometerWithStore key={game.id} gameId={game.id} />
        </footer>
      </div>
    </Card>
  );
}
