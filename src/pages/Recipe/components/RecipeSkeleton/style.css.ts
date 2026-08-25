import { style } from '@vanilla-extract/css';
import { flex, spacing, theme } from '@/styles';

/** RecipeCard.header 자리 */
export const header = style([
  flex.BETWEEN,
  {
    width: '100%',
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${theme.outline}`,
  },
]);

export const list = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, width: '100%' },
]);

/** CookingStepItem 자리 */
export const item = style([
  flex.BETWEEN,
  {
    alignItems: 'flex-start',
    gap: spacing.lg,
    width: '100%',
    height: '102px',
  },
]);

export const textGroup = style([
  flex.COLUMN_FLEX,
  { flex: 1, gap: spacing.sm, paddingTop: spacing.xs },
]);
