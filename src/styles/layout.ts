/**
 * 레이아웃 환경 토큰.
 * 기준 프레임 393 x 852 (iPhone 16). 좌우 마진 16 → 콘텐츠 폭 361.
 *
 * 디자이너 컴포넌트 SVG가 전부 폭 361 기준으로 그려져 있으므로,
 * 모든 화면은 Screen 컴포넌트를 써서 이 폭을 공유한다.
 */
const layout = {
  frame: {
    width: '393px',
    height: '852px',
  },
  /** 좌우 마진 */
  sideMargin: '16px',
  /** 프레임(393) - 좌우 마진(16 x 2) */
  contentWidth: '361px',
  columns: 4,
  gutter: '16px',

  /** 컴포넌트 고정 높이 (SVG 실측) */
  size: {
    /** App Bar.svg */
    appBar: '44px',
    /** Component 15.svg */
    button: '48px',
    /** Input.svg */
    input: '48px',
    /** Frame 62.svg */
    dateBar: '60px',
    /** App Bar.svg 4번째 variant — 모달 헤더 */
    modalHeader: '64px',
    /** 아이콘 기본 박스 */
    icon: '24px',
    /** 터치 타깃 최소 (Material Design 3) */
    touchTarget: '44px',
  },
} as const;

export default layout;
