import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

export const card = style([
  flex.COLUMN_FLEX,
  {
    gap: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
  },
]);

export const message = style([
  font.bodyLarge,
  { color: theme.textSecondary, textAlign: 'center' },
]);
