import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { getTimeWithSeconds } from "../../../functions/numbers";

type ChronoPropsStore = {
  gameId: number;
};

type ChronoProps = {
  duration: number;
};

export function ChronometerWithStore({ gameId }: ChronoPropsStore) {
  const data = useAppSelector(
    (state) => state.games.gameList.find((g) => g.id === gameId)?.chrono,
    shallowEqual
  );
  if (data) {
    return <Chronometer duration={data} />;
  }
  return <></>;
}

export function Chronometer({ duration }: ChronoProps) {
  const { seconds, minutes, hours } = getTimeWithSeconds(duration);
  return (
    <h3>
      {hours}h : {minutes}m : {seconds}s
    </h3>
  );
}
