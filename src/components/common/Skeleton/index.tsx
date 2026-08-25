import type { CSSProperties } from 'react';
import * as s from './style.css';

type SkeletonVariant = 'text' | 'image' | 'circle';

interface SkeletonProps {
  /**
   * text  — 글자·뱃지 자리 (#E6E6E6, 알약)
   * image — 사진 자리 (#D9D9D9, radius 8)
   * circle— 아바타 자리 (#E6E6E6, 원형)
   */
  variant?: SkeletonVariant;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  /** grid/flex 안에서 남는 공간을 채워야 할 때. */
  grow?: boolean;
  className?: string;
}

/**
 * 스켈레톤 한 조각.
 * 실제 콘텐츠와 같은 크기·같은 자리에 두어야 로딩 후 레이아웃이 흔들리지 않는다.
 */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  grow,
  className,
}: SkeletonProps) => {
  const size =
    variant === 'circle' && width !== undefined
      ? { width, height: width }
      : { width, height };

  return (
    <span
      className={
        className ? `${s.variant[variant]} ${className}` : s.variant[variant]
      }
      style={{ ...size, flex: grow ? 1 : undefined }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
