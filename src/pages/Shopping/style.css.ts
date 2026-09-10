import { style, styleVariants } from '@vanilla-extract/css';
import { elevation, flex, font, layout, spacing, theme } from '@/styles';
import { skeletonPiece } from '@/styles/skeleton.css';

const CTA_HEIGHT = 48;

/** 영수증 종이의 톱니 한 칸. 폭 14 / 높이 7. */
const ZIG_W = '14px';
const ZIG_H = '7px';

/* 종이 위 점선은 neutral 200 보다 한 단계 옅어야 인쇄물처럼 보인다. */
const PAPER_LINE = '#E7E5E3';
/* 태그 배경 — theme.error 원색은 배경으로 쓰기엔 세서 옅은 틴트로 낮춘다. */
const TINT_GREEN = '#F1FAEE';
const TINT_RED = '#FFF1F1';
const WASTE_TEXT = '#C7000B';

export const screen = style([
  flex.COLUMN_FLEX,
  {
    position: 'relative',
    width: '100%',
    maxWidth: layout.frame.width,
    minHeight: '100dvh',
    marginInline: 'auto',
    paddingTop: '44px',
    paddingInline: spacing.md,
    // 하단 고정 CTA + 그라디언트만큼 비워 둔다 (safe area 포함)
    paddingBottom: `calc(${CTA_HEIGHT + 64}px + env(safe-area-inset-bottom))`,
    background: theme.background,
  },
]);

/* ── 초록 요약 (DateNavigator 의 primary 600 바를 세로로 늘린 변형) ── */
export const summary = style({
  marginTop: spacing.lg,
  padding: spacing.md,
  borderRadius: '8px',
  background: theme.primaryScale[600],
  color: theme.onPrimary,
});
export const summaryTop = style([
  flex.BETWEEN,
  { alignItems: 'baseline', gap: spacing.sm },
]);
export const summaryRange = style({
  fontSize: '20px',
  lineHeight: '28px',
  fontWeight: 600,
});
export const summaryPlan = style({
  fontSize: '13px',
  opacity: 0.9,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
export const summaryTotal = style([
  flex.BETWEEN,
  { alignItems: 'baseline', gap: spacing.sm, marginTop: '10px' },
]);
export const summaryLabel = style({ fontSize: '13px', opacity: 0.92 });
export const summaryAmount = style({
  fontSize: '26px',
  lineHeight: '32px',
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
});
export const progress = style({ marginTop: '14px' });
export const progressRow = style([
  flex.BETWEEN,
  { fontSize: '12px', opacity: 0.95, marginBottom: '6px' },
]);
export const progressCount = style({ fontVariantNumeric: 'tabular-nums' });
export const track = style({
  height: '6px',
  borderRadius: '999px',
  background: 'rgba(255, 255, 255, 0.28)',
  overflow: 'hidden',
});
export const fill = style({
  height: '100%',
  background: theme.onPrimary,
  borderRadius: '999px',
  transition: 'width 0.18s ease',
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});

export const lead = style([
  font.caption,
  {
    margin: `${spacing.md} 2px 0`,
    lineHeight: '170%',
    color: theme.textSecondary,
  },
]);
export const leadStrong = style({ color: theme.textPrimary, fontWeight: 600 });

/* ── 영수증 종이 ──────────────────────────────────────────── */
/* 마스크는 그림자를 잘라 먹는다. 그림자는 바깥 래퍼가 drop-shadow 로 그린다. */
export const paperWrap = style({
  marginTop: spacing.md,
  filter: 'drop-shadow(0 4px 8px rgba(36, 31, 31, 0.10))',
});
const zigzagMask = `
  conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg) top / ${ZIG_W} ${ZIG_H} repeat-x,
  conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / ${ZIG_W} ${ZIG_H} repeat-x,
  linear-gradient(#000 0 0) center / 100% calc(100% - 2 * ${ZIG_H}) no-repeat`;
export const paper = style({
  background: theme.surface,
  padding: `calc(${ZIG_H} + 20px) ${spacing.md}`,
  WebkitMask: zigzagMask,
  mask: zigzagMask,
});

export const receiptHead = style({ textAlign: 'center' });
export const receiptTitle = style({
  fontSize: '15px',
  fontWeight: 700,
  letterSpacing: '0.42em',
  // letter-spacing 은 마지막 글자 뒤에도 붙어 가운데 정렬이 왼쪽으로 밀린다.
  textIndent: '0.42em',
  color: theme.textPrimary,
});
export const receiptMeta = style({
  marginTop: spacing.sm,
  fontSize: '11px',
  lineHeight: '180%',
  color: theme.textSecondary,
  fontVariantNumeric: 'tabular-nums',
});

export const rule = style({
  height: 0,
  borderTop: `1px dashed ${PAPER_LINE}`,
  margin: `${spacing.md} 0`,
});
export const ruleSolid = style({
  height: 0,
  borderTop: `1px solid ${theme.neutral[200]}`,
  margin: `${spacing.md} 0`,
});

/* ── 카테고리 ─────────────────────────────────────────────── */
export const category = style([
  flex.VERTICAL,
  {
    gap: spacing.sm,
    margin: '20px 0 4px',
    selectors: { '&:first-child': { marginTop: 0 } },
  },
]);
export const categoryName = style({
  fontSize: '13px',
  fontWeight: 600,
  color: theme.textPrimary,
});
export const categoryLine = style({
  flex: 1,
  height: 0,
  borderTop: `1px dashed ${PAPER_LINE}`,
});
export const categoryCount = style({
  fontSize: '11px',
  color: theme.textTertiary,
  fontVariantNumeric: 'tabular-nums',
});

/* ── 항목 ─────────────────────────────────────────────────── */
export const item = style({
  display: 'grid',
  gridTemplateColumns: '24px minmax(0, 1fr)',
  gap: '10px',
  padding: `12px ${spacing.sm}`,
  margin: `0 -${spacing.sm}`,
  borderRadius: '8px',
  transition: 'background 0.15s ease, opacity 0.15s ease',
  selectors: {
    '& + &': { boxShadow: `inset 0 1px 0 ${PAPER_LINE}` },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});
export const itemState = styleVariants({
  pending: {},
  checked: { background: TINT_GREEN },
  skipped: { opacity: 0.5 },
});

/* 체크박스 — 네이티브 input 을 덮고 모양만 새로 그린다. */
export const check = style({
  position: 'relative',
  width: '24px',
  height: '24px',
  marginTop: '1px',
});
export const checkInput = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  opacity: 0,
  cursor: 'pointer',
});
export const checkBox = style({
  display: 'block',
  width: '22px',
  height: '22px',
  borderRadius: '6px',
  border: `1.5px solid ${theme.outline}`,
  background: theme.surface,
  transition: 'background 0.12s ease, border-color 0.12s ease',
  selectors: {
    [`${checkInput}:checked + &`]: {
      background: theme.primaryScale[600],
      borderColor: theme.primaryScale[600],
    },
    [`${checkInput}:focus-visible + &`]: {
      outline: `2px solid ${theme.selectedOutline}`,
      outlineOffset: '2px',
    },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': { transition: 'none' },
  },
});
export const checkMark = style({
  position: 'absolute',
  left: '5px',
  top: '6px',
  color: theme.onPrimary,
  opacity: 0,
  pointerEvents: 'none',
  selectors: {
    [`${checkInput}:checked ~ &`]: { opacity: 1 },
  },
});
/* 안 사기로 한 줄은 체크박스 자리에 ✕ 를 남긴다. 빈 칸이면 '아직 안 정함'과 구분이 안 된다. */
export const markSkip = style([
  flex.CENTER,
  {
    width: '22px',
    height: '22px',
    marginTop: '1px',
    borderRadius: '6px',
    border: `1.5px solid ${theme.neutral[200]}`,
    background: theme.neutral[50],
    color: theme.textTertiary,
  },
]);

export const line1 = style([
  flex.BETWEEN,
  { alignItems: 'baseline', gap: spacing.sm },
]);
export const name = style({
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '140%',
  color: theme.textPrimary,
});
export const price = style({
  fontSize: '15px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
  color: theme.textPrimary,
});
export const struck = style({
  textDecoration: 'line-through',
  textDecorationThickness: '1px',
});

export const units = style([
  flex.VERTICAL,
  {
    marginTop: '6px',
    gap: spacing.sm,
    flexWrap: 'wrap',
    fontSize: '12px',
    color: theme.textSecondary,
    fontVariantNumeric: 'tabular-nums',
  },
]);
export const unitBuy = style({ color: theme.textPrimary });
export const unitArrow = style({ color: theme.neutral[400] });
export const unitUse = style({
  color: theme.primaryScale[800],
  fontWeight: 500,
});

export const bar = style({
  display: 'flex',
  marginTop: spacing.sm,
  height: '8px',
  borderRadius: '3px',
  background: theme.neutral[50],
  overflow: 'hidden',
});
export const barUse = style({
  height: '100%',
  background: theme.primaryScale[600],
});
/* 남는 양은 빗금으로 — 색만 다르면 '또 다른 사용분'으로 읽힌다. */
export const barLeft = style({
  height: '100%',
  background: `repeating-linear-gradient(135deg, ${theme.neutral[200]} 0 3px, ${theme.neutral[50]} 3px 6px)`,
});

export const foot = style([
  flex.BETWEEN,
  { gap: spacing.sm, marginTop: '7px' },
]);
const tagBase = style([
  flex.VERTICAL,
  {
    gap: '5px',
    padding: '5px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: 1,
  },
]);
export const tag = styleVariants({
  good: [tagBase, { background: TINT_GREEN, color: theme.primaryScale[900] }],
  mid: [tagBase, { background: theme.neutral[50], color: theme.textSecondary }],
  waste: [tagBase, { background: TINT_RED, color: WASTE_TEXT }],
});
export const tagDot = style({
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  background: 'currentColor',
});
export const skipButton = style({
  padding: '4px 2px',
  fontSize: '12px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  color: theme.link,
  selectors: {
    '&:disabled': { color: theme.textTertiary },
  },
});
export const skipButtonUndo = style({ color: theme.textSecondary });

export const usedIn = style({
  margin: '6px 0 0',
  fontSize: '11.5px',
  lineHeight: '150%',
  color: theme.textTertiary,
});
export const usedInNames = style({
  fontWeight: 500,
  color: theme.textSecondary,
});

/* ── 합계 ─────────────────────────────────────────────────── */
export const totals = style({ fontVariantNumeric: 'tabular-nums' });
export const totalRow = style([
  flex.BETWEEN,
  {
    alignItems: 'baseline',
    gap: spacing.sm,
    padding: '5px 0',
    fontSize: '13px',
    color: theme.textSecondary,
  },
]);
export const totalValue = style({ color: theme.textPrimary });
export const totalValueMinus = style({ color: theme.error });
export const grandRow = style([
  flex.BETWEEN,
  {
    alignItems: 'baseline',
    gap: spacing.sm,
    paddingTop: spacing.sm,
    fontSize: '15px',
    fontWeight: 700,
    color: theme.textPrimary,
  },
]);
export const grandValue = style({
  fontSize: '20px',
  color: theme.primaryScale[800],
});
export const note = style({
  marginTop: spacing.sm,
  padding: '10px 12px',
  borderRadius: '8px',
  background: theme.neutral[50],
  fontSize: '11.5px',
  lineHeight: '170%',
  color: theme.textSecondary,
});
export const noteStrong = style({
  fontWeight: 600,
  color: theme.textPrimary,
  fontVariantNumeric: 'tabular-nums',
});

/* 영수증 바닥의 발행 번호. 종이라는 걸 마지막에 한 번 더 말해 준다. */
export const stamp = style([
  flex.COLUMN_VERTICAL,
  {
    gap: '6px',
    marginTop: '18px',
    fontSize: '10px',
    letterSpacing: '0.22em',
    color: theme.textTertiary,
    fontVariantNumeric: 'tabular-nums',
  },
]);

/* ── 빈 상태 ──────────────────────────────────────────────── */
export const empty = style([
  flex.COLUMN_VERTICAL,
  {
    gap: spacing.md,
    marginTop: '80px',
    padding: `0 ${spacing.md}`,
    textAlign: 'center',
  },
]);
export const emptyTitle = style([
  font.labelMedium,
  { color: theme.textPrimary },
]);
export const emptyBody = style([
  font.caption,
  { lineHeight: '170%', color: theme.textSecondary },
]);

/* ── 하단 고정 CTA (IngredientRegister 와 같은 독) ─────────── */
export const ctaGradient = style({
  position: 'fixed',
  left: '50%',
  bottom: 0,
  transform: 'translateX(-50%)',
  width: `min(${layout.frame.width}, 100%)`,
  height: '112px',
  background: `linear-gradient(to top, ${theme.background} 0%, ${theme.background} 75%, rgba(246, 246, 246, 0) 100%)`,
  pointerEvents: 'none',
  zIndex: 25,
});
export const ctaDock = style({
  position: 'fixed',
  left: '50%',
  bottom: 'calc(24px + env(safe-area-inset-bottom))',
  transform: 'translateX(-50%)',
  width: `min(361px, calc(100% - 32px))`,
  zIndex: 30,
});
export const cta = style([
  flex.CENTER,
  {
    gap: spacing.sm,
    width: '100%',
    height: `${CTA_HEIGHT}px`,
    borderRadius: '8px',
    background: theme.primaryScale[600],
    color: theme.onPrimary,
    fontSize: '16px',
    fontWeight: 700,
    boxShadow: elevation[1],
    selectors: {
      '&:disabled': {
        background: theme.neutral[200],
        color: theme.neutral[400],
        cursor: 'default',
        boxShadow: elevation.default,
      },
    },
  },
]);
export const ctaCount = style({
  fontWeight: 500,
  opacity: 0.9,
  fontVariantNumeric: 'tabular-nums',
});

/* ── 로딩 ─────────────────────────────────────────────────── */
/*
 * 영수증이 오기 전에 본문을 그리면 '재료 0종 · 0원' 영수증이 잠깐 스친다.
 * 같은 자리를 같은 크기로 미리 잡아 두어 값이 도착해도 화면이 튀지 않게 한다.
 */
export const skeletonSummary = style([
  skeletonPiece,
  { marginTop: spacing.lg, height: '138px', borderRadius: '8px' },
]);
export const skeletonRows = style([
  flex.COLUMN_FLEX,
  { gap: '18px', marginTop: spacing.md },
]);
export const skeletonRow = style({
  display: 'grid',
  gridTemplateColumns: '24px minmax(0, 1fr)',
  gap: '10px',
});
export const skeletonCheck = style([
  skeletonPiece,
  { width: '22px', height: '22px', borderRadius: '6px' },
]);
export const skeletonLine = style([skeletonPiece, { borderRadius: '4px' }]);
