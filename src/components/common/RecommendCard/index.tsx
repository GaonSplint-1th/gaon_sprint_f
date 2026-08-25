import { useState } from 'react';
import { NoteIcon, StarIcon } from '@/components/icons';
import Skeleton from '../Skeleton';
import * as s from './style.css';

const THUMBNAIL_COUNT = 3;

/** 썸네일 한 칸. 이미지가 없거나 로드에 실패하면 자리 표시 아이콘으로 떨어진다. */
const CardThumbnail = ({ url }: { url?: string }) => {
  const [isFailed, setIsFailed] = useState(false);
  const showImage = Boolean(url) && !isFailed;

  return (
    <div className={s.thumbnail}>
      {showImage ? (
        <img
          className={s.thumbnailImage}
          src={url}
          alt=""
          onError={() => setIsFailed(true)}
        />
      ) : (
        <NoteIcon />
      )}
    </div>
  );
};

interface RecommendCardProps {
  name: string;
  price: string;
  /** 대표 메뉴 이미지. 없으면 자리 표시 아이콘이 들어간다. */
  thumbnailUrls?: (string | undefined)[];
  /** 제육볶음 · 김치찌개 · 계란찜 */
  menus: string;
  selected?: boolean;
  onSelect?: () => void;
  onPreview?: () => void;
}

/** 식단 추천 카드 (Frame 49.svg). */
const RecommendCard = ({
  name,
  price,
  thumbnailUrls = [],
  menus,
  selected = false,
  onSelect,
  onPreview,
}: RecommendCardProps) => {
  const thumbnails = Array.from(
    { length: THUMBNAIL_COUNT },
    (_, index) => thumbnailUrls[index],
  );

  return (
    <div
      className={selected ? `${s.card} ${s.cardSelected}` : s.card}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        onSelect?.();
      }}
    >
      <div className={s.header}>
        <strong className={s.name}>{name}</strong>
        <span className={s.price}>{price}</span>
      </div>

      <div className={s.thumbnails}>
        {thumbnails.map((url, index) => (
          <CardThumbnail key={index} url={url} />
        ))}
      </div>

      <p className={s.menus}>
        <span className={s.menuIcon}>
          <StarIcon />
        </span>
        <span className={s.menuText}>{menus}</span>
      </p>

      <button
        type="button"
        className={
          selected
            ? `${s.previewButton} ${s.previewButtonSelected}`
            : s.previewButton
        }
        onClick={(event) => {
          event.stopPropagation();
          onPreview?.();
        }}
      >
        미리보기 ›
      </button>
    </div>
  );
};

/** Frame 49.svg 의 로딩 변형 — 실제 카드와 같은 높이·같은 자리. */
export const RecommendCardSkeleton = () => (
  <div className={s.card}>
    <div className={s.header}>
      <Skeleton width={100} height={24} />
      <Skeleton width={100} height={24} />
    </div>

    <div className={s.thumbnails}>
      {Array.from({ length: THUMBNAIL_COUNT }, (_, index) => (
        <Skeleton key={index} variant="image" height="100%" grow />
      ))}
    </div>

    <div className={s.menus}>
      <Skeleton variant="circle" width={24} />
      <Skeleton height={24} grow />
    </div>

    <Skeleton height={20} />
  </div>
);

export default RecommendCard;
