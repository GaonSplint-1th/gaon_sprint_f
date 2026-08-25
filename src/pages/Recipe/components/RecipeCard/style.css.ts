import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

export const container = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, width: '100%' },
]);

export const imageArea = style([
  flex.COLUMN_CENTER,
  {
    gap: spacing.sm,
    width: '100%',
    height: '185px',
    overflow: 'hidden',
    border: `1px solid ${theme.outline}`,
    borderRadius: radius.sm,
    backgroundColor: theme.neutral[200],
    color: theme.textTertiary,
  },
]);

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const imageEmptyText = style([
  font.captionStrong,
  { color: theme.textTertiary },
]);

export const header = style([
  flex.BETWEEN,
  {
    alignItems: 'flex-start',
    gap: spacing.sm,
    width: '100%',
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${theme.outline}`,
  },
]);

export const name = style([
  font.titleSmall,
  {
    flex: 1,
    minWidth: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    color: theme.textPrimary,
  },
]);

export const ingredientButton = style([
  flex.CENTER,
  font.captionStrong,
  {
    flexShrink: 0,
    height: '24px',
    padding: `0 ${spacing.md}`,
    borderRadius: radius.sm,
    backgroundColor: theme.primary,
    color: theme.onPrimary,
  },
]);

/* ── 재료 상세 모달 ── */

export const ingredientList = style([
  flex.COLUMN_FLEX,
  { gap: spacing.sm, width: '100%' },
]);

export const ingredientRow = style([
  flex.BETWEEN,
  {
    flexShrink: 0,
    gap: spacing.md,
    height: '32px',
    borderBottom: `1px solid ${theme.outline}`,
  },
]);

export const ingredientName = style([
  font.bodyLarge,
  { color: theme.textPrimary },
]);

export const ingredientAmount = style([
  font.bodyLarge,
  { color: theme.textPrimary, textAlign: 'right' },
]);
