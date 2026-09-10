import type { SVGProps } from 'react';

/** 체크 표시. 체크박스 안에서 쓰므로 기본 크기가 작다. */
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M2 6.4 4.7 9 10 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CheckIcon;
