import type { IconProps } from './types';

/** 원본 뷰박스 비율 (22.887 x 24). */
const ASPECT_RATIO = 22.887 / 24;

const NoteOutline = ({
  size = 24,
  color = '#1A1A1A',
  className,
}: IconProps) => {
  return (
    <svg
      width={size * ASPECT_RATIO}
      height={size}
      viewBox="0 0 23 24"
      fill="none"
      className={className}
      role="img"
      aria-label="사진 없음"
    >
      <path
        d="M17.642 5.5H5.24489C4.19155 5.5 3.33765 6.39543 3.33765 7.5V16.5C3.33765 17.6046 4.19155 18.5 5.24489 18.5H17.642C18.6953 18.5 19.5492 17.6046 19.5492 16.5V7.5C19.5492 6.39543 18.6953 5.5 17.642 5.5Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M6.19861 9H16.6885M6.19861 12H14.3044M6.19861 15H11.9203"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NoteOutline;
