import { avatarMap } from "../../../enums";

type Props = {
  avatarId: number;
  type?: "small" | "medium" | "large";
};

export function Avatar({ avatarId, type = "medium" }: Props) {
  const imgSrc = `/avatars/${avatarMap.get(avatarId)}`;
  return (
    <div className={`avatar avatar--${type}`}>
      <img src={imgSrc} alt={`girl ${avatarId}`} />
    </div>
  );
}
