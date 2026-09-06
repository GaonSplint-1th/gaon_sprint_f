import { useState } from 'react';
import { HideImage } from '@/components/icons';
import * as s from './style.css';

interface DishImageProps {
  /** 없거나(null) 불러오기에 실패하면 대체 아이콘을 보여 준다. */
  src?: string | null;
  alt: string;
  /** 바깥에서 크기·모서리를 정한다. */
  className?: string;
  /** 대체 아이콘 크기. 칸이 작은 곳(미리보기 썸네일)에서는 줄여 쓴다. */
  iconSize?: number;
  /** 이미지 주소를 아직 받아오는 중이면 빈 칸만 둔다. */
  isLoading?: boolean;
}

/**
 * 요리 이미지. 주소가 없거나 로드에 실패하면 같은 크기의 대체 칸으로 떨어진다.
 * 홈·식단 수정·식단 추천이 모두 같은 규칙을 쓰도록 한곳에 모았다.
 */
const DishImage = ({
  src,
  alt,
  className,
  iconSize = 24,
  isLoading = false,
}: DishImageProps) => {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  // src 가 바뀌면 새 이미지에 다시 로드 기회를 준다 (effect 없이 렌더 중 판단).
  const showImage = Boolean(src) && src !== failedUrl;
  const box = className ? `${s.box} ${className}` : s.box;

  if (isLoading) return <div className={box} aria-hidden />;

  return (
    <div className={box}>
      {showImage ? (
        <img
          className={s.image}
          src={src as string}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailedUrl(src as string)}
        />
      ) : (
        <HideImage size={iconSize} />
      )}
    </div>
  );
};

export default DishImage;
