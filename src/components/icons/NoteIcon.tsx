import type { IconProps } from './types';

/** 조리 단계 사진 자리 표시 (Component 5.svg 의 문서 아이콘). */
const NoteIcon = ({
  size = 24,
  color = 'currentColor',
  className,
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M18 5.5H6C4.9 5.5 4 6.4 4 7.5V16.5C4 17.6 4.9 18.5 6 18.5H18C19.1 18.5 20 17.6 20 16.5V7.5C20 6.4 19.1 5.5 18 5.5Z"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M7 9H17M7 12H14.5M7 15H12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default NoteIcon;
