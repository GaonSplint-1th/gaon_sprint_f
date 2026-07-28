/**
 * 전역 색상 팔레트.
 * 컴포넌트 스타일(*.css.ts)에서 `theme.primary` 처럼 참조한다.
 */
const theme = {
  primary: '#2C6EEE',
  primaryLight: '#E8F0FE',
  purple: '#A375FF',
  red: '#FF5C5F',
  green: '#00CC87',
  yellow: '#FFB020',

  white: '#FFFFFF',
  background: '#F7F8FA',
  black: '#000000',

  text: '#1A1A1A',
  subText: '#666666',
  placeholder: '#9E9E9E',
  border: '#E5E7EB',
  gray: '#BABABA',
  grayLight: '#F1F3F5',
} as const;

export default theme;
