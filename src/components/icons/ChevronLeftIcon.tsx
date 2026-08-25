import type { IconProps } from './types';

/** 날짜 바 이전 버튼 (Frame 62.svg). */
const ChevronLeftIcon = ({
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
      d="M14.7 21.1L6.275 12.7C6.175 12.6 6.104 12.492 6.063 12.375C6.021 12.258 6 12.133 6 12C6 11.867 6.021 11.742 6.063 11.625C6.104 11.508 6.175 11.4 6.275 11.3L14.7 2.875C14.933 2.642 15.225 2.525 15.575 2.525C15.925 2.525 16.225 2.65 16.475 2.9C16.725 3.15 16.85 3.442 16.85 3.775C16.85 4.108 16.725 4.4 16.475 4.65L9.125 12L16.475 19.35C16.708 19.583 16.825 19.871 16.825 20.212C16.825 20.554 16.7 20.85 16.45 21.1C16.2 21.35 15.908 21.475 15.575 21.475C15.242 21.475 14.95 21.35 14.7 21.1Z"
      fill={color}
    />
  </svg>
);

export default ChevronLeftIcon;
