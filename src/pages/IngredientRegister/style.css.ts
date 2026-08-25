import { style } from '@vanilla-extract/css';
import { flex, font, spacing, theme } from '@/styles';

export const searchSection = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const lead = style([font.caption, { color: theme.textPrimary }]);

export const empty = style([font.bodySmall, { color: theme.textSecondary }]);

export const categories = style([flex.COLUMN_FLEX, { gap: spacing.lg }]);

export const category = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const categoryLabel = style([
  font.titleSmall,
  { color: theme.textPrimary },
]);

export const chips = style([
  flex.FLEX,
  { gap: `${spacing.sm} ${spacing.md}`, flexWrap: 'wrap' },
]);
