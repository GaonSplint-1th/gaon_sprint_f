/**
 * 모서리 반경 토큰.
 * 디자이너 컴포넌트 SVG 기준:
 * - 앱바 / 버튼 / 입력창 / 카드 / 썸네일 : 8
 * - 추천 카드 · 모달                    : 16
 * - 칩                                  : 12
 * - 작은 썸네일                         : 4
 * - 스켈레톤 바 · 원형                  : full
 */
const radius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  full: '9999px',
} as const;

export default radius;
