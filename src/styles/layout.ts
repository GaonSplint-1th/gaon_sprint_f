/**
 * 레이아웃 환경 토큰.
 * 기준 프레임 393 x 852 (iPhone 16).
 * 좌우 마진 16, 4 칼럼, 칼럼 gutter 16.
 */
const layout = {
  frame: {
    width: '393px',
    height: '852px',
  },
  sideMargin: '16px',
  columns: 4,
  gutter: '16px',
} as const;

export default layout;
