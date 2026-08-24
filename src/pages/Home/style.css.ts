import { style } from '@vanilla-extract/css';
import { flex, font, layout, spacing, theme } from '@/styles';

export const screen = style({
  width: '100%',
  maxWidth: layout.frame.width,
  minHeight: '100dvh',
  margin: '0 auto',
  padding: '44px 16px 40px',
  background: theme.background,
});
export const pageTitle = style([
  flex.BETWEEN,
  {
    minHeight: '44px',
    padding: '0 16px',
    borderRadius: '8px',
    background: theme.surface,
  },
]);
export const title = style([
  font.titleSmall,
  { flex: 1, color: theme.textPrimary },
]);
export const backButton = style({
  fontSize: '38px',
  lineHeight: '20px',
  width: '28px',
  textAlign: 'left',
});
export const infoIcon = style({
  display: 'grid',
  placeItems: 'center',
  width: '20px',
  height: '20px',
  border: `2px solid ${theme.primaryScale[600]}`,
  borderRadius: '50%',
  color: theme.primaryScale[600],
  fontWeight: 700,
});
export const dateBar = style([
  flex.BETWEEN,
  {
    marginTop: spacing.lg,
    height: '60px',
    padding: '0 18px',
    borderRadius: '8px',
    background: theme.primaryScale[600],
    color: theme.onPrimary,
    fontSize: '20px',
    lineHeight: '24px',
  },
]);
export const costBar = style({
  marginTop: spacing.sm,
  height: '32px',
  paddingTop: '5px',
  borderRadius: '8px',
  background: theme.surface,
  color: theme.primaryScale[600],
  textAlign: 'center',
  fontSize: '16px',
});
export const mealSection = style({ marginTop: '24px' });
export const sectionTitle = style([
  font.labelMedium,
  { color: theme.textPrimary },
]);
export const mealList = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, marginTop: spacing.md },
]);
export const mealCard = style([
  flex.BETWEEN,
  {
    minHeight: '116px',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: '8px',
    background: theme.surface,
  },
]);
/*
 * 식사 카드 글자 크기는 시안(08/09 메뉴수정하기) 값을 그대로 쓴다.
 * 공용 토큰에는 18px SemiBold 가 없고, titleSmall(24px)을 쓰면
 * 카드가 시안 높이(116px)를 넘겨 버린다.
 */
export const mealInfo = style([
  flex.COLUMN_FLEX,
  { alignItems: 'flex-start', gap: spacing.xs, minWidth: 0, flex: 1 },
]);
export const mealTime = style({
  color: theme.textPrimary,
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 600,
});
export const mealName = style({
  color: theme.textPrimary,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
});
export const mealDetail = style({
  color: theme.textPrimary,
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
});
export const recipeButton = style({
  color: theme.link,
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  selectors: {
    '&:disabled': { color: theme.textTertiary },
  },
});
export const recipePreview = style([
  flex.CENTER,
  {
    flex: '0 0 178px',
    alignSelf: 'stretch',
    borderRadius: '8px',
    background: theme.neutral[200],
  },
]);
export const recipeIcon = style({
  width: '22px',
  height: '22px',
  border: `2px solid ${theme.textPrimary}`,
  borderRadius: '4px',
  position: 'relative',
  selectors: {
    '&::after': {
      content: '"☰"',
      position: 'absolute',
      left: '3px',
      top: '-2px',
      fontSize: '13px',
    },
  },
});
export const bottomButton = style({
  width: '100%',
  height: '48px',
  marginTop: '28px',
  borderRadius: '8px',
  background: theme.primaryScale[600],
  color: theme.onPrimary,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 700,
});
export const disabledButton = style({
  background: theme.neutral[200],
  color: theme.neutral[400],
});
export const recommendList = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, marginTop: spacing.lg },
]);
export const recommendCard = style({
  position: 'relative',
  minHeight: '196px',
  padding: '16px',
  borderRadius: '16px',
  background: theme.surface,
  cursor: 'pointer',
});
export const selectedCard = style({
  background: theme.primaryScale[600],
  color: theme.onPrimary,
});
export const recommendTop = style([
  flex.BETWEEN,
  { fontSize: '16px', lineHeight: '24px' },
]);
export const imageRow = style([
  flex.BETWEEN,
  { gap: spacing.sm, marginTop: spacing.sm },
]);
export const placeholder = style([
  flex.CENTER,
  {
    flex: 1,
    height: '72px',
    borderRadius: '8px',
    background: theme.neutral[200],
    color: theme.textSecondary,
    fontSize: '12px',
  },
]);
export const ingredients = style({ marginTop: '10px', fontSize: '14px' });
export const ingredientIcon = style({
  display: 'inline-grid',
  placeItems: 'center',
  width: '18px',
  height: '18px',
  marginRight: '6px',
  borderRadius: '3px',
  background: theme.primaryScale[600],
  color: theme.onPrimary,
  fontSize: '11px',
});
export const previewButton = style({
  display: 'block',
  margin: '12px 0 0 auto',
  color: theme.link,
  fontSize: '14px',
  selectors: {
    // 선택된 카드는 배경이 초록이라 링크 기본색(파랑)이 대비 2:1 수준으로 떨어진다.
    // 같은 카드의 다른 텍스트와 맞춰 흰색으로 둔다.
    [`${selectedCard} &`]: { color: theme.onPrimary },
  },
});
export const planDescription = style({
  marginTop: '8px',
  color: theme.textSecondary,
  fontSize: '14px',
});
export const modalBackdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 10,
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(0,0,0,.18)',
});
/*
 * 7일 × 3끼가 모두 들어가면서 내용 높이가 화면을 넘어선다.
 * 고정 px 대신 뷰포트 기준으로 재고, 헤더는 고정한 채 본문만 스크롤시킨다.
 */
export const previewModal = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'min(361px, calc(100vw - 32px))',
  maxHeight: 'min(623px, calc(100dvh - 64px))',
  overflow: 'hidden',
  borderRadius: '16px',
  background: theme.surface,
});
export const modalHeader = style([
  flex.BETWEEN,
  {
    flex: '0 0 auto',
    height: '64px',
    padding: '0 16px',
    background: theme.primaryScale[600],
    color: theme.onPrimary,
    fontSize: '22px',
  },
]);
export const modalBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  padding: '24px 16px',
  minHeight: 0,
  flex: 1,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  WebkitOverflowScrolling: 'touch',
  fontSize: '14px',
});
export const dayMeals = style([
  flex.BETWEEN,
  { gap: spacing.sm, marginTop: spacing.sm },
]);
export const dayMeal = style({
  flex: 1,
  padding: '8px',
  border: `1px solid ${theme.neutral[200]}`,
  borderRadius: '8px',
  fontSize: '13px',
});
export const modalPlaceholder = style({
  height: '56px',
  marginBottom: '6px',
  borderRadius: '4px',
  background: theme.neutral[200],
});
export const skeletonTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.sm,
  height: '44px',
  padding: '0 16px',
  borderRadius: '8px',
  background: theme.surface,
});
export const skeletonCard = style({
  display: 'grid',
  gridTemplateColumns: '1fr 112px',
  gap: spacing.sm,
  marginTop: spacing.md,
  padding: '16px',
  minHeight: '184px',
  borderRadius: '16px',
  background: theme.surface,
});
export const skeletonCircle = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: theme.neutral[200],
});
export const skeletonTitleLine = style({
  width: '136px',
  height: '24px',
  background: theme.neutral[200],
});
export const skeletonImage = style({
  gridColumn: '1 / -1',
  width: '100%',
  height: '72px',
  borderRadius: '8px',
  background: theme.neutral[200],
});
export const skeletonLine = style({
  height: '12px',
  borderRadius: '8px',
  background: theme.neutral[200],
});
export const skeletonSideImage = style({
  width: '112px',
  height: '72px',
  borderRadius: '8px',
  background: theme.neutral[200],
});
