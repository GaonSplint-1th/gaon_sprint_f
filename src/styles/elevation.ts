/**
 * Elevation 토큰 (바깥 그림자).
 * 요소의 높이에 따라 default → 3 단계로 지정한다.
 * box-shadow 값으로 사용: `boxShadow: elevation[1]`
 */
const elevation = {
  default: 'none',
  1: '0 1px 2px rgba(36, 31, 31, 0.08)',
  2: '0 4px 8px rgba(36, 31, 31, 0.1)',
  3: '0 8px 16px rgba(36, 31, 31, 0.12)',
} as const;

export default elevation;
