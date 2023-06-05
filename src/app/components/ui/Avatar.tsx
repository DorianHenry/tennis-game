import { getAvatar } from '../../../functions';
import type { AvatarId } from '../../../types';

type Props = {
  avatarId: AvatarId;
  type?: 'small' | 'medium' | 'large';
};

export function Avatar({ avatarId, type = 'medium' }: Props) {
  const imgSrc = `${getAvatar(avatarId)}`;
  return (
    <div className={`avatar avatar--${type}`}>
      <img src={imgSrc} alt={`player ${avatarId}`} />
    </div>
  );
}
