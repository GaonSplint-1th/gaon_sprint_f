import type { IconProps } from './types';

/** 오류 팝업 경고 표시. 원본 비율 40.526 x 35. */
const ASPECT_RATIO = 40.526 / 35;

const WarningIcon = ({
  size = 35,
  color = 'currentColor',
  className,
}: IconProps) => (
  <svg
    width={size * ASPECT_RATIO}
    height={size}
    viewBox="0 0 41 35"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M20.2632 7.35L34.1342 31.3158H6.39211L20.2632 7.35ZM20.2632 0L0 35H40.5263L20.2632 0Z"
      fill={color}
    />
    <path d="M22.1052 25.7896H18.421V29.4738H22.1052V25.7896Z" fill={color} />
    <path d="M22.1052 14.7368H18.421V23.9473H22.1052V14.7368Z" fill={color} />
  </svg>
);

export default WarningIcon;
