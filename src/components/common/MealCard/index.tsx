import { useState, type ReactNode } from 'react';
import { NoteIcon } from '@/components/icons';
import Skeleton from '../Skeleton';
import * as s from './style.css';

interface MealCardProps {
  /** 아침 / 점심 / 저녁 */
  time: string;
  /** 메뉴 이름. 메뉴 수정 화면처럼 직접 UI 를 넣어야 하면 노드를 넘긴다. */
  name: ReactNode;
  /** 약 5,800원 · 조리 25분 등 */
  detail: string;
  thumbnailUrl?: string;
  onRecipeClick?: () => void;
}

/** 식사 카드 (Component 5.svg). 오늘의 식단 / 식단 수정 화면에서 함께 쓴다. */
const MealCard = ({
  time,
  name,
  detail,
  thumbnailUrl,
  onRecipeClick,
}: MealCardProps) => {
  const [isImageFailed, setIsImageFailed] = useState(false);
  const showImage = Boolean(thumbnailUrl) && !isImageFailed;

  return (
    <article className={s.card}>
      <div className={s.info}>
        <h3 className={s.time}>{time}</h3>

        {typeof name === 'string' ? <p className={s.name}>{name}</p> : name}

        <p className={s.detail}>{detail}</p>

        {onRecipeClick && (
          <button
            type="button"
            className={s.recipeLink}
            onClick={onRecipeClick}
          >
            레시피보기
          </button>
        )}
      </div>

      <div className={s.thumbnail}>
        {showImage ? (
          <img
            className={s.thumbnailImage}
            src={thumbnailUrl}
            alt=""
            onError={() => setIsImageFailed(true)}
          />
        ) : (
          <NoteIcon />
        )}
      </div>
    </article>
  );
};

/** 같은 자리·같은 크기를 차지하는 로딩 상태. */
export const MealCardSkeleton = () => (
  <div className={s.card}>
    <div className={s.info}>
      <Skeleton width={64} height={24} />
      <Skeleton width={96} height={20} />
      <Skeleton width={72} height={20} />
      <Skeleton width={64} height={20} className={s.pinBottom} />
    </div>
    <Skeleton variant="image" width={s.THUMBNAIL_WIDTH} height="100%" />
  </div>
);

export default MealCard;
