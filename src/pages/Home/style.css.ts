import { style } from '@vanilla-extract/css';
import { flex, font, layout, spacing, theme } from '@/styles';

export const screen = style([
  flex.COLUMN_FLEX,
  {
    // 식재료 화면과 동일한 프레임(393) / 좌우마진 16
    width: '100%',
    maxWidth: layout.frame.width,
    minHeight: '100vh',
    marginInline: 'auto',
    padding: `44px ${spacing.md} 40px`, // Figma body padding
    backgroundColor: theme.background,
  },
]);

export const pageTitle = style([
  flex.BETWEEN,
  {
    minHeight: '44px',
    paddingInline: spacing.md,
    borderRadius: '8px',
    backgroundColor: theme.surface,
  },
]);

export const title = style([font.titleSmall, { color: theme.textPrimary }]);

export const skipButton = style([
  font.caption,
  {
    color: theme.textSecondary,
    whiteSpace: 'nowrap',
    ':hover': { color: theme.textPrimary },
  },
]);

export const summary = style({
  marginTop: spacing.md, // Figma .screen gap 16
  padding: '10px 16px 14px', // Figma .summary
  borderRadius: '8px',
  backgroundColor: theme.primaryScale[600],
  color: theme.onPrimary,
});

export const date = style(font.titleSmall);

export const summaryDetails = style([
  flex.BETWEEN,
  font.caption,
  { marginTop: '12px' }, // Figma .summary__meta
]);

export const mealSection = style({ marginTop: '24px' }); // gap 16 + section-title 여백 8

export const sectionTitle = style([
  font.labelMedium,
  { color: theme.textPrimary },
]);

export const mealList = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, marginTop: '12px' }, // 카드 간격 16, 제목→목록 12
]);

export const mealCard = style([
  flex.BETWEEN,
  {
    gap: spacing.sm, // Figma .meal gap 8
    padding: spacing.sm, // Figma .meal padding 8
    borderRadius: '8px',
    backgroundColor: theme.surface,
  },
]);

export const mealInfo = style([
  flex.COLUMN_FLEX,
  {
    alignItems: 'flex-start',
    minWidth: 0,
    minHeight: '101px', // Figma .meal__info
    flex: 1,
  },
]);

export const mealTime = style([font.titleSmall, { color: theme.textPrimary }]);

export const mealName = style([
  font.caption,
  { marginTop: '8px', color: theme.textPrimary }, // Figma .meal__name
]);

export const mealDetail = style([
  font.caption,
  { marginTop: '8px', fontWeight: 600, color: theme.textPrimary }, // Figma .meal__detail
]);

export const recipeButton = style([
  font.caption,
  {
    marginTop: 'auto', // Figma .meal__link margin-top: auto
    color: theme.link,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    ':hover': { textDecoration: 'underline' },
  },
]);

export const recipePreview = style([
  flex.CENTER,
  {
    flex: '0 0 178px', // Figma grid 1fr 178px
    alignSelf: 'stretch',
    borderRadius: '8px',
    backgroundColor: theme.neutral[200],
  },
]);

export const stateBox = style([
  flex.CENTER,
  {
    minHeight: '160px',
    marginTop: '12px',
    padding: spacing.md,
    borderRadius: '8px',
    backgroundColor: theme.surface,
    textAlign: 'center',
  },
]);

export const stateText = style([font.caption, { color: theme.textSecondary }]);

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
