import type { SVGProps } from 'react';

/** 영수증. 아래쪽 톱니로 '뜯어낸 종이'라는 걸 말한다. */
const ReceiptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M5 3h14v16.5l-2.3-1.4-2.35 1.4L12 18.1l-2.35 1.4-2.35-1.4L5 19.5V3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 8h7M8.5 11.5h4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
export default ReceiptIcon;
