import { theme } from '@/styles';
import type { IconProps } from './types';

/** 원본 레이아웃 비율 (40.526 x 35). */
const ASPECT_RATIO = 40.526 / 35;

const WarningOutline = ({ size = 35, color = theme.primary, className }: IconProps) => {
  return (
    <svg
      width={size * ASPECT_RATIO}
      height={size}
      viewBox="0 0 41 35"
      fill="none"
      className={className}
      role="img"
      aria-label="경고"
    >
      <path
        d="M20.2632 7.35L34.1342 31.3158H6.39211L20.2632 7.35ZM20.2632 0L0 35H40.5263L20.2632 0Z"
        fill={color}
      />
      <path d="M22.1052 25.7896H18.421V29.4738H22.1052V25.7896Z" fill={color} />
      <path d="M22.1052 14.7368H18.421V23.9473H22.1052V14.7368Z" fill={color} />
    </svg>
  );
};

export default WarningOutline;
