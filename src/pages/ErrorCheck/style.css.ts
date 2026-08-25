import { style } from '@vanilla-extract/css';
import { elevation, flex, font, radius, spacing, theme } from '@/styles';

export const desc = style([font.bodySmall, { color: theme.textSecondary }]);

export const list = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const item = style([
  flex.BETWEEN,
  {
    gap: spacing.md,
    padding: spacing.md,
    border: `1px solid ${theme.border}`,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
    boxShadow: elevation[1],
  },
]);

export const itemLabel = style([font.titleSmall, { color: theme.textPrimary }]);

export const itemDesc = style([
  font.caption,
  { marginTop: spacing.xs, color: theme.textTertiary },
]);

export const triggerButton = style([
  flex.CENTER,
  font.labelSmall,
  {
    flexShrink: 0,
    height: '40px',
    padding: `0 ${spacing.md}`,
    borderRadius: radius.full,
    backgroundColor: theme.primary,
    color: theme.onPrimary,
  },
]);
