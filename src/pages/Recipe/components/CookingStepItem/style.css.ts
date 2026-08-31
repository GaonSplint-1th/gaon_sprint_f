import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

// Figma node 207:4508 레이아웃 스펙
export const container = style([
  flex.BETWEEN,
  {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: '24px',
    minHeight: '101px',
    width: '100%',
  },
]);

// Figma Body/Large/extrabold: Pretendard 16px / SemiBold(600) / 24px(150%) / justify
// 색상 변수명은 text-secondary이나 실측 hex(#241F1F)는 Neutral/900과 동일해 textPrimary 사용
export const description = style({
  flex: 1,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  textAlign: 'justify',
  wordBreak: 'keep-all',
  color: theme.textPrimary,
});

export const photo = style([
  flex.CENTER,
  {
    flexShrink: 0,
    width: '102px',
    height: '102px',
    borderRadius: '8px',
    backgroundColor: theme.neutral[200],
  },
]);

export const photoImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
});
