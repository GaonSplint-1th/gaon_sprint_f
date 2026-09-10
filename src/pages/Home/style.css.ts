import { style } from '@vanilla-extract/css';
import { elevation, flex, font, layout, spacing, theme } from '@/styles';
import { skeletonPiece } from '@/styles/skeleton.css';

export const screen = style({
  width: '100%',
  maxWidth: layout.frame.width,
  minHeight: '100dvh',
  margin: '0 auto',
  padding: '44px 16px 40px',
  background: theme.background,
});
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
export const mealSection = style({ marginTop: '24px' });
/** 섹션 제목 줄. 오른쪽 끝에 수정 진입을 얹는다. */
export const sectionHead = style([flex.BETWEEN, { gap: spacing.sm }]);
export const sectionTitle = style([
  font.labelMedium,
  { color: theme.textPrimary },
]);
export const mealList = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, marginTop: spacing.md },
]);
export const recipeButton = style({
  color: theme.link,
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  selectors: {
    '&:disabled': { color: theme.textTertiary },
  },
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
/** 카드 위 요리 이미지 칸. 배경·대체 아이콘은 DishImage 가 그린다. */
export const cardImage = style({
  flex: 1,
  height: '72px',
  borderRadius: '8px',
});
export const ingredients = style({ marginTop: '10px', fontSize: '14px' });
/*
 * 구성 아이콘. 모양은 MenuStarIcon SVG 가 그리고 여기서는 색만 정한다.
 * 선택된 초록 카드에서는 흰색으로 뒤집는다(selectedCard 규칙).
 */
export const ingredientIcon = style({
  display: 'inline-flex',
  flex: 'none',
  marginRight: '6px',
  color: theme.primaryScale[600],
  selectors: {
    [`${selectedCard} &`]: { color: theme.onPrimary },
  },
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
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: 'min(361px, calc(100vw - 32px))',
  maxHeight: 'min(623px, calc(100dvh - 64px))',
  overflow: 'hidden',
  borderRadius: '16px',
  background: theme.surface,
});
/** 시안의 모달 헤더는 식단 이름만 있고 닫기는 하단 버튼이 맡는다. */
export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  flex: '0 0 auto',
  height: '64px',
  padding: `0 ${spacing.md}`,
  background: theme.primaryScale[600],
  color: theme.onPrimary,
  fontSize: '22px',
  fontWeight: 600,
});
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
  // 하단 닫기 버튼이 덮는 만큼 비워 둔다. 시안처럼 내용이 버튼 뒤로 흘러간다.
  paddingBottom: '96px',
});
/** 스크롤 영역 위에 떠 있는 닫기 버튼 (시안 07). */
export const modalFooter = style([
  flex.CENTER,
  {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: `${spacing.md} ${spacing.md} ${spacing.lg}`,
    background: `linear-gradient(to bottom, rgba(255,255,255,0), ${theme.surface} 40%)`,
  },
]);
export const modalCloseButton = style({
  width: '100%',
  maxWidth: '241px',
  height: '48px',
  borderRadius: '8px',
  background: theme.primaryScale[600],
  color: theme.onPrimary,
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 600,
});
export const dayMeals = style([
  flex.BETWEEN,
  { gap: spacing.sm, marginTop: spacing.sm },
]);
export const dayMeal = style({
  flex: '1 1 0',
  minWidth: 0,
  // 이름이 길면 그 칸만 높아져 세 칸이 들쭉날쭉했다. 높이를 고정한다.
  height: '104px',
  padding: '8px',
  border: `1px solid ${theme.neutral[200]}`,
  borderRadius: '8px',
  fontSize: '13px',
  lineHeight: '16px',
  overflow: 'hidden',
});
/** 끼니 이름. 칸을 넘으면 줄바꿈 대신 말줄임으로 자른다. */
export const dayMealName = style({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
/** 미리보기 한 끼의 요리 이미지. */
export const dayMealImage = style({
  height: '56px',
  marginBottom: '6px',
  borderRadius: '4px',
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
export const skeletonImage = style([
  skeletonPiece,
  {
    gridColumn: '1 / -1',
    width: '100%',
    height: '72px',
    borderRadius: '8px',
  },
]);
export const skeletonLine = style([
  skeletonPiece,
  { height: '12px', borderRadius: '8px' },
]);
export const skeletonSideImage = style([
  skeletonPiece,
  { width: '112px', height: '72px', borderRadius: '8px' },
]);

/* ── 식단 수정 화면 ─────────────────────────────────────────── */

export const planTitle = style({
  marginTop: spacing.lg,
  color: theme.textPrimary,
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 600,
});
/** 시안의 빨간 박스 = 실제로 보이는 범위. 이 안에서 카드가 세로로 스크롤된다. */
export const editScroll = style({
  marginTop: spacing.md,
  maxHeight: '396px',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  scrollbarWidth: 'none',
  selectors: { '&::-webkit-scrollbar': { display: 'none' } },
});
export const editMeals = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});
/*
 * 카드와 액션 바를 한 덩어리로 묶는다.
 * 모서리는 이 창이 잘라 내므로 카드 위쪽 / 액션 바 아래쪽만 둥글게 남는다.
 * 배경을 카드와 같은 흰색으로 두어야 카드 아래쪽 둥근 모서리 틈으로
 * 페이지 배경이 비쳐 액션 바와의 이음매가 파이지 않는다.
 */
export const mealRow = style({
  borderRadius: '8px',
  overflow: 'hidden',
  background: theme.surface,
});
export const mealActions = style({ display: 'flex' });
const mealAction = style([
  flex.CENTER,
  {
    flex: '1 1 0',
    height: '40px',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 500,
  },
]);
export const deleteAction = style([
  mealAction,
  {
    background: theme.error,
    color: theme.onError,
    selectors: {
      '&:disabled': {
        background: theme.neutral[200],
        color: theme.textTertiary,
      },
    },
  },
]);
export const changeAction = style([
  mealAction,
  {
    background: theme.neutral[200],
    color: theme.textSecondary,
    selectors: {
      '&:disabled': { color: theme.textTertiary },
    },
  },
]);

/* ── 장보기 영수증 진입 카드 (홈 → /shopping) ─────────────── */

/** 추천 카드와 같은 r16 · surface · elevation 1. 목록 위에 얹는다. */
export const receiptCard = style([
  flex.VERTICAL,
  {
    gap: '12px',
    width: '100%',
    marginTop: spacing.md,
    padding: '14px',
    borderRadius: '16px',
    background: theme.surface,
    boxShadow: elevation[1],
    textAlign: 'left',
  },
]);
/** 왼쪽 아이콘 타일. 영수증이라는 걸 한 번에 알리는 자리다. */
export const receiptTile = style([
  flex.CENTER,
  {
    flex: 'none',
    width: '44px',
    height: '44px',
    borderRadius: '8px',
    background: theme.neutral[50],
    color: theme.primaryScale[600],
  },
]);
export const receiptBody = style({ display: 'block', flex: 1, minWidth: 0 });
export const receiptTitle = style({
  display: 'block',
  fontSize: '16px',
  lineHeight: '140%',
  fontWeight: 600,
  color: theme.textPrimary,
});
export const receiptSub = style({
  display: 'block',
  marginTop: '3px',
  fontSize: '12px',
  color: theme.textSecondary,
  fontVariantNumeric: 'tabular-nums',
});
/** 안 사기로 한 개수만 색을 준다 — 이 화면에서 되짚어 볼 유일한 숫자다. */
export const receiptSkipped = style({ color: theme.error });
export const receiptTrack = style({
  display: 'block',
  marginTop: spacing.sm,
  height: '5px',
  borderRadius: '999px',
  background: theme.neutral[50],
  overflow: 'hidden',
});
export const receiptFill = style({
  display: 'block',
  height: '100%',
  borderRadius: '999px',
  background: theme.primaryScale[600],
  transition: 'width 0.18s ease',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});
export const receiptGo = style({ flex: 'none', color: theme.neutral[400] });

/**
 * 식단 수정 진입. 카드에 있는 '레시피보기' 와 같은 말투(파란 링크)로 둔다 —
 * 홈에 큰 버튼을 하나 더 세우면 화면이 카드 더미가 된다.
 */
export const editMenuButton = style({
  flex: 'none',
  padding: '4px 2px',
  color: theme.link,
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
});
