import type { IconProps } from './types';

/** 추천 카드 메뉴 목록 앞 표시 (Frame 49.svg). */
const StarIcon = ({
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
      d="M12 17.27L15.27 19.25C15.87 19.61 16.6 19.08 16.44 18.4L15.57 14.68L18.46 12.18C18.99 11.72 18.71 10.85 18.01 10.79L14.2 10.47L12.71 6.95C12.44 6.31 11.56 6.31 11.29 6.95L9.8 10.46L5.99 10.78C5.29 10.84 5.01 11.71 5.54 12.17L8.43 14.67L7.56 18.39C7.4 19.07 8.13 19.6 8.73 19.24L12 17.27Z"
      fill={color}
    />
  </svg>
);

export default StarIcon;
