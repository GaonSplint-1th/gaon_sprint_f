import { keyframes, style } from '@vanilla-extract/css';
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
/*
 * 안내 아이콘. 원은 InfoIcon SVG 가 직접 그린다.
 * 예전에 텍스트 'i' 를 쓰던 시절의 CSS 테두리 원이 남아 있어
 * 원이 두 겹으로 보이고 20px 상자 안에서 아이콘이 눌렸다.
 */
export const infoIcon = style({
  display: 'grid',
  placeItems: 'center',
  width: '24px',
  height: '24px',
  flex: 'none',
  color: theme.primaryScale[600],
});
export const dateBar = style([
  flex.BETWEEN,
  {
    marginTop: spacing.lg,
    height: '60px',
    padding: `0 ${spacing.md}`,
    borderRadius: '8px',
    background: theme.primaryScale[600],
    color: theme.onPrimary,
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
  },
]);
/** 날짜 이동 화살표. 시안과 같은 24px 아이콘 버튼. */
export const dateArrow = style([
  flex.CENTER,
  { width: '24px', height: '24px', flex: 'none', color: theme.onPrimary },
]);
export const dateArrowNext = style({ transform: 'rotate(180deg)' });
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
/** 이미지 자리 표시 아이콘 색. 모양은 NoteOutline SVG 가 그린다. */
export const recipeIcon = style({ color: theme.textPrimary });
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
/** 움직임 최소화를 켠 사용자에게는 애니메이션을 끈다. */
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** 목록이 뜰 때 카드가 아래에서 올라온다. */
const cardRise = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

/** 스켈레톤이 훑고 지나가는 빛. */
const shimmer = keyframes({
  from: { backgroundPosition: '-160px 0' },
  to: { backgroundPosition: '240px 0' },
});

export const recommendCard = style({
  position: 'relative',
  minHeight: '196px',
  padding: '16px',
  borderRadius: '16px',
  background: theme.surface,
  cursor: 'pointer',
  // 선택하면 초록으로 물드는 과정을 눈으로 따라갈 수 있게 한다.
  transition: 'background-color 220ms ease, transform 160ms ease',
  animation: `${cardRise} 300ms cubic-bezier(.2,.7,.3,1) both`,
  selectors: {
    '&:active': { transform: 'scale(.985)' },
  },
  '@media': {
    [REDUCED_MOTION]: { animation: 'none', transition: 'none' },
  },
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
/*
 * 구성 아이콘. 모양은 MenuStarIcon SVG 가 그리고 여기서는 색만 정한다.
 * 선택된 초록 카드에서는 흰색으로 뒤집는다(selectedCard 규칙).
 */
export const ingredientIcon = style({
  display: 'inline-flex',
  flex: 'none',
  marginRight: '6px',
  color: theme.primaryScale[600],
  transition: 'color 200ms ease',
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
/** 스켈레톤 조각 공통 — 빛이 훑고 지나간다. */
const skeletonPiece = style({
  background: `linear-gradient(90deg, ${theme.neutral[200]} 0%, ${theme.neutral[50]} 50%, ${theme.neutral[200]} 100%)`,
  backgroundSize: '400px 100%',
  backgroundRepeat: 'no-repeat',
  animation: `${shimmer} 1.2s ease-in-out infinite`,
  '@media': {
    [REDUCED_MOTION]: { animation: 'none' },
  },
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
export const swipeMeals = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
});
/** 카드와 삭제 버튼을 함께 담는 창. 카드가 왼쪽으로 밀리면 버튼이 드러난다. */
export const swipeRow = style({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
});
export const swipeDelete = style([
  flex.CENTER,
  {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '72px',
    background: theme.error,
    color: theme.onPrimary,
    fontSize: '14px',
    fontWeight: 600,
  },
]);
/*
 * 스와이프로 열리는 카드 본체.
 * translate 로 밀면 왼쪽 글자가 화면 밖으로 잘려 나간다. 시안처럼 글자를
 * 그대로 두려면 카드가 밀리는 게 아니라 폭이 줄어야 한다.
 */
export const swipeCard = style({
  position: 'relative',
  width: '100%',
  touchAction: 'pan-y',
  transition: 'width 200ms cubic-bezier(.2,.7,.3,1)',
});
export const swipeCardDragging = style({ transition: 'none' });
/** 카드가 줄어드는 동안 이미지 자리가 먼저 좁아지도록. */
export const swipePreviewShrink = style({ minWidth: 0 });
