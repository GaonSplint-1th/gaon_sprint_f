import { style } from '@vanilla-extract/css';
import { flex, font, spacing, theme } from '@/styles';

export const screen = style([
  flex.COLUMN_FLEX,
  {
    width: '100%',
    maxWidth: '460px',
    minHeight: '100vh',
    marginInline: 'auto',
    padding: '59px 20px 32px',
    backgroundColor: theme.background,
  },
]);

export const pageTitle = style([
  flex.BETWEEN,
  {
    minHeight: '52px',
    paddingInline: spacing.md,
    borderRadius: '10px',
    backgroundColor: theme.surface,
  },
]);

export const title = style([
  font.titleSmall,
  { color: theme.textPrimary },
]);

export const skipButton = style([
  font.caption,
  {
    color: theme.textSecondary,
    whiteSpace: 'nowrap',
    ':hover': { color: theme.textPrimary },
  },
]);

export const summary = style({
  marginTop: '18px',
  padding: '14px 20px 13px',
  borderRadius: '10px',
  backgroundColor: theme.primaryScale[600],
  color: theme.onPrimary,
});

export const date = style(font.titleSmall);

export const summaryDetails = style([
  flex.BETWEEN,
  font.caption,
  { marginTop: '2px' },
]);

export const mealSection = style({ marginTop: '26px' });

export const sectionTitle = style([
  font.labelMedium,
  { color: theme.textPrimary },
]);

export const mealList = style([
  flex.COLUMN_FLEX,
  { gap: '11px', marginTop: '20px' },
]);

export const mealCard = style([
  flex.BETWEEN,
  {
    minHeight: '136px',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: '10px',
    backgroundColor: theme.surface,
  },
]);

export const mealInfo = style([
  flex.COLUMN_FLEX,
  {
    alignItems: 'flex-start',
    minWidth: 0,
    flex: 1,
  },
]);

export const mealTime = style([
  font.titleSmall,
  { color: theme.textPrimary },
]);

export const mealName = style([
  font.caption,
  { marginTop: '8px', color: theme.textPrimary },
]);

export const mealDetail = style([
  font.caption,
  { marginTop: '5px', fontWeight: 600, color: theme.textPrimary },
]);

export const recipeButton = style([
  font.caption,
  {
    marginTop: '6px',
    color: theme.link,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    ':hover': { textDecoration: 'underline' },
  },
]);

export const recipePreview = style([
  flex.CENTER,
  {
    width: '50%',
    minWidth: 0,
    alignSelf: 'stretch',
    borderRadius: '10px',
    backgroundColor: theme.neutral[200],
  },
]);

export const recipeIcon = style({
  position: 'relative',
  width: '25px',
  height: '25px',
  border: `2px solid ${theme.textPrimary}`,
  borderRadius: '4px',

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '6px',
      left: '5px',
      width: '11px',
      height: '2px',
      backgroundColor: theme.textPrimary,
      boxShadow: `0 5px 0 ${theme.textPrimary}`,
    },
  },
});
