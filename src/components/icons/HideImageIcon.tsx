import type { IconProps } from './types';

/** 이미지를 불러오지 못했을 때. */
const HideImageIcon = ({
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
      d="M20.9998 5C20.9998 3.9 20.0998 3 18.9998 3H5.82983L20.9998 18.17V5Z"
      fill={color}
    />
    <path
      d="M2.80989 2.81006L1.38989 4.22006L2.99989 5.83006V19.0001C2.99989 20.1001 3.89989 21.0001 4.99989 21.0001H18.1699L19.7799 22.6101L21.1899 21.2001L2.80989 2.81006ZM5.99989 17.0001L8.99989 13.0001L11.2499 16.0001L12.0699 14.9001L14.1699 17.0001H5.99989Z"
      fill={color}
    />
  </svg>
);

export default HideImageIcon;
