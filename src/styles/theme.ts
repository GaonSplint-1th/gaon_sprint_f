const primary = {
  900: '#1C8B06',
  800: '#1F9408',
  700: '#2D9D17',
  600: '#41AA2C',
  500: '#3DBC23',
  400: '#48C02F',
  300: '#5BCF44',
  200: '#70D95B',
  100: '#87E175',
  50: '#9AE88B',
} as const;

const neutral = {
  900: '#241F1F',
  600: '#666666',
  400: '#A3A3A3',
  200: '#D9D9D9',
  150: '#E6E6E6',
  50: '#F6F6F6',
  0: '#FFFFFF',
} as const;

const theme = {
  /* 스케일 */
  primaryScale: primary,
  neutral,

  /* Surface / Base */
  primary: '#41AA2C', // primary 600
  background: '#F6F6F6', // neutral 50
  surface: '#FFFFFF', // neutral 0

  /* Information (정보성 색) */
  error: '#FF0004',
  success: '#41AA2C',
  link: '#1A4CFF',

  /* On-colors (해당 배경 위 텍스트/아이콘 색) */
  onPrimary: '#FFFFFF',
  onBackground: '#241F1F',
  onSurface: '#241F1F',
  onError: '#FFFFFF',
  onSuccess: '#FFFFFF',
  onLink: '#FFFFFF',
  onPrimaryLight: '#1C8B06', // 배경이 primary 50일 때는 primary 900 사용

  /* Outline */
  outline: '#A3A3A3', // neutral 400
  border: '#D9D9D9', // neutral 200 — 카드/입력창 테두리
  selectedOutline: '#1F9408', // primary 800

  /* Skeleton (Frame 49.svg 로딩 카드 기준) */
  skeleton: '#E6E6E6', // neutral 150 — 텍스트/뱃지 자리
  skeletonStrong: '#D9D9D9', // neutral 200 — 이미지 자리
  skeletonHighlight: 'rgba(255, 255, 255, 0.75)', // 로딩 shimmer 하이라이트

  /* Disabled (Component 15.svg 비활성 버튼) */
  disabled: '#D9D9D9', // neutral 200
  onDisabled: '#A3A3A3', // neutral 400

  /* Dim (모달 배경) */
  dim: 'rgba(0, 0, 0, 0.3)',

  /* Text 위계 (정보 위계에 따라 primary/secondary/tertiary) */
  textPrimary: '#241F1F', // neutral 900
  textSecondary: '#666666', // neutral 600
  textTertiary: '#A3A3A3', // neutral 400
  textDisabled: '#F6F6F6', // 비활성 텍스트 = neutral/50 (스펙 기준)
} as const;

export default theme;
