import { style } from '@vanilla-extract/css';
import { flex, font, spacing, theme } from '@/styles';

export const container = style([
  flex.COLUMN_CENTER,
  {
    flex: 1,
    gap: spacing.md,
    textAlign: 'center',
  },
]);

export const code = style([font.titleLarge, { color: theme.primary }]);

export const message = style([font.bodyLarge, { color: theme.textSecondary }]);
