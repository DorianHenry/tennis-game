import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { getTimeWithSeconds } from "../../../functions/numbers";
import { getLocalTwoNumber } from "../../../functions/string";

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
      {getLocalTwoNumber(hours)}:{getLocalTwoNumber(minutes)}:
      {getLocalTwoNumber(seconds)}
    </h3>
  );
}
