import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

export const container = style([
  flex.BETWEEN,
  {
    alignItems: 'flex-start',
    gap: spacing.lg,
    width: '100%',
    minHeight: '101px',
  },
]);

export const description = style([
  font.bodyStrong,
  {
    flex: 1,
    // 원안은 justify 였으나 keep-all 과 겹치면 어절 사이가 과하게 벌어져 좌측 정렬로 둔다.
    textAlign: 'left',
    wordBreak: 'keep-all',
    color: theme.textPrimary,
  },
]);

export const photo = style([
  flex.CENTER,
  {
    flexShrink: 0,
    width: '102px',
    height: '102px',
    overflow: 'hidden',
    borderRadius: radius.sm,
    backgroundColor: theme.neutral[200],
    color: theme.textPrimary,
  },
]);

export const photoImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
