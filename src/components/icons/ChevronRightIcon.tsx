import type { IconProps } from './types';

/** 날짜 바 다음 버튼 (Frame 62.svg). */
const ChevronRightIcon = ({
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
      d="M9.3 21.1C9.05 20.85 8.925 20.558 8.925 20.225C8.925 19.892 9.05 19.6 9.3 19.35L16.65 12L9.3 4.65C9.067 4.417 8.95 4.129 8.95 3.788C8.95 3.446 9.075 3.15 9.325 2.9C9.575 2.65 9.867 2.525 10.2 2.525C10.533 2.525 10.825 2.65 11.075 2.9L19.5 11.3C19.6 11.4 19.671 11.508 19.712 11.625C19.754 11.742 19.775 11.867 19.775 12C19.775 12.133 19.754 12.258 19.712 12.375C19.671 12.492 19.6 12.6 19.5 12.7L11.075 21.125C10.842 21.358 10.55 21.475 10.2 21.475C9.85 21.475 9.55 21.35 9.3 21.1Z"
      fill={color}
    />
  </svg>
);

export default ChevronRightIcon;
