import { style } from '@vanilla-extract/css';
import { theme } from '@/styles';

/**
 * 공용 App Bar 컨테이너 (Figma node 207:4512 레이아웃/색상 스펙).
 * 페이지별 App Bar(RecipeAppBar 등)는 이 컴포넌트로 감싸 내부 구성만 다르게 채운다.
 */
export const container = style({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: '16px',
  width: '100%',
  height: '44px',
  padding: '0 16px',
  borderRadius: '8px',
  backgroundColor: theme.surface,
});
