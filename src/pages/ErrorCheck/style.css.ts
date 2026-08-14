import { style } from '@vanilla-extract/css';
import { flex, font, theme, elevation, spacing } from '@/styles';

export const container = style([flex.COLUMN_FLEX, { gap: spacing.lg }]);

export const title = style([font.titleLarge, { color: theme.textPrimary }]);

export const desc = style([font.bodyLarge, { color: theme.textSecondary }]);

export const list = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, margin: 0, padding: 0, listStyle: 'none' },
]);

export const item = style([
  flex.BETWEEN,
  {
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: theme.surface,
    border: `1px solid ${theme.outline}`,
    borderRadius: '8px',
    boxShadow: elevation[1],
  },
]);

export const itemLabel = style([font.titleSmall, { color: theme.textPrimary }]);

export const itemDesc = style([
  font.caption,
  { color: theme.textTertiary, marginTop: spacing.xs },
]);

export const triggerButton = style([
  font.labelMedium,
  {
    flexShrink: 0,
    height: '40px',
    padding: `0 ${spacing.md}`,
    borderRadius: '999px',
    border: 'none',
    backgroundColor: theme.primary,
    color: theme.onPrimary,
    cursor: 'pointer',
  },
]);
