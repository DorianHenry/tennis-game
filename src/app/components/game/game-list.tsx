import { useAppSelector } from "../../hooks/redux";
import { selectGames } from "../../../store/reducers";
import type { Game } from "../../../types";
import { GameListItem } from "./game-list-item";
export function GameListWithStore() {
  const games = useAppSelector(selectGames);
  return (
    <div className="stack-inner">
      <h1>Liste des jeux </h1>
      <GameList games={games} />
    </div>
  );
}

export function GameList({ games }: { games: Game[] }) {
  return (
    <div className="grid-list-games">
      {games.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
    </div>
  );
}
