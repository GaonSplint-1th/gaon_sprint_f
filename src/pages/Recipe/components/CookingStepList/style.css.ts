import { style } from '@vanilla-extract/css';
import { flex, font, spacing, theme } from '@/styles';

export const container = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, width: '100%' },
]);

export const title = style([font.titleSmall, { color: theme.textPrimary }]);

export const list = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, width: '100%' },
]);
