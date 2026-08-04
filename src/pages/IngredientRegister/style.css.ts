import { style } from '@vanilla-extract/css';
import { flex, font, theme, spacing, elevation, layout } from '@/styles';

const CTA_HEIGHT = 48;

/* ── 화면 셸 (모바일 393px) ── */
export const screen = style([
  flex.COLUMN_FLEX,
  {
    position: 'relative',
    width: '100%',
    maxWidth: layout.frame.width,
    minHeight: '100vh',
    marginInline: 'auto',
    paddingTop: '44px',
    paddingBottom: `${CTA_HEIGHT + 64}px`, // 하단 고정 CTA 영역 확보
    backgroundColor: theme.background,
  },
]);

/* ── 앱 바 ── */
export const appBar = style([
  flex.VERTICAL,
  {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    gap: spacing.sm,
    height: '44px',
    paddingInline: spacing.md,
    backgroundColor: theme.surface,
  },
]);

export const backButton = style([
  flex.CENTER,
  {
    width: '24px',
    height: '24px',
    color: theme.textPrimary,
  },
]);

export const appBarTitle = style([
  font.titleSmall,
  { color: theme.textPrimary },
]);

/* ── 본문 ── */
export const body = style([
  flex.COLUMN_FLEX,
  { gap: spacing.lg, padding: `${spacing.lg} ${spacing.md} 0` },
]);

export const lead = style([
  font.caption,
  { marginBottom: spacing.md, color: theme.textPrimary },
]);

/* ── 검색 + 자동완성 (입력창 + 구분선 + 목록이 하나의 카드) ── */
export const search = style({ position: 'relative', height: '48px' });

// 입력창과 목록을 감싸는 단일 카드. 열리면 아래로 확장되며 콘텐츠 위에 겹친다.
export const searchCard = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  zIndex: 20,
  borderRadius: '8px',
  border: `1px solid ${theme.neutral[200]}`,
  backgroundColor: theme.surface,
  overflow: 'hidden',
});

export const searchCardOpen = style({ boxShadow: elevation[3] });

export const searchField = style([
  flex.VERTICAL,
  { gap: spacing.sm, height: '48px', paddingInline: spacing.sm },
]);

export const searchInput = style([
  font.caption,
  {
    flex: 1,
    minWidth: 0,
    backgroundColor: 'transparent',
    color: theme.textPrimary,
    '::placeholder': { color: theme.textSecondary },
  },
]);

export const searchIcon = style([
  flex.CENTER,
  { width: '24px', height: '24px', flex: 'none', color: theme.textSecondary },
]);

// 입력창과 목록을 나누는 구분선 (Input.svg 의 #A3A3A3 라인)
export const divider = style({
  height: '1px',
  backgroundColor: theme.neutral[400],
  margin: `0 ${spacing.sm}`,
});

export const suggestList = style({
  margin: 0,
  padding: spacing.sm,
  maxHeight: '176px',
  overflowY: 'auto',
});

export const suggestItem = style([
  flex.BETWEEN,
  font.caption,
  {
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.xs}`,
    color: theme.textSecondary,
    transition: 'color 0.1s',
    ':hover': { color: theme.textPrimary },
  },
]);

export const suggestItemActive = style({ color: theme.textPrimary });

// 이미 추가된 항목 — 목록에는 남되 흐리게 표시하고 재등록 안 됨
export const suggestItemAdded = style({
  color: theme.textTertiary,
  cursor: 'default',
  ':hover': { color: theme.textTertiary },
});

export const addedBadge = style({ flex: 'none', color: theme.textTertiary });

export const suggestEmpty = style([
  font.caption,
  { padding: `14px ${spacing.sm}`, color: theme.textSecondary },
]);

/* ── 카테고리 + 칩 ── */
export const categories = style([flex.COLUMN_FLEX, { gap: spacing.lg }]);

export const category = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const categoryLabel = style([
  font.labelMedium,
  { color: theme.textPrimary },
]);

export const chips = style([
  flex.FLEX,
  { gap: `${spacing.sm} ${spacing.md}`, flexWrap: 'wrap' },
]);

export const chipsEmpty = style([font.caption, { color: theme.textSecondary }]);

export const chip = style([
  flex.VERTICAL,
  font.caption,
  {
    gap: spacing.xs,
    padding: `${spacing.sm} ${spacing.sm} ${spacing.sm} ${spacing.md}`,
    borderRadius: '12px',
    backgroundColor: theme.primaryScale[400],
    color: theme.neutral[50],
  },
]);

export const chipRemove = style([
  flex.CENTER,
  { width: '16px', height: '16px', flex: 'none', color: theme.neutral[50] },
]);

/* ── 하단 고정 CTA ── */
export const ctaDock = style({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '24px',
  width: 'min(361px, calc(100% - 32px))',
  zIndex: 30,
});

export const cta = style([
  flex.CENTER,
  font.labelMedium,
  {
    width: '100%',
    height: `${CTA_HEIGHT}px`,
    borderRadius: '8px',
    backgroundColor: theme.primary,
    color: theme.surface,
    transition: 'opacity 0.15s',
    ':hover': { opacity: 0.9 },
    ':disabled': {
      backgroundColor: theme.neutral[200],
      color: theme.neutral[400],
      cursor: 'default',
      opacity: 1,
    },
  },
]);
