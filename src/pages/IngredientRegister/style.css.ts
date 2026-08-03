import { style } from '@vanilla-extract/css';
import { flex, font, theme, spacing, layout } from '@/styles';

/* ── 화면 셸 (모바일 393px) ── */
export const screen = style([
  flex.COLUMN_FLEX,
  {
    width: '100%',
    maxWidth: layout.frame.width,
    minHeight: '100vh',
    marginInline: 'auto',
    padding: `44px ${spacing.md}`,
    backgroundColor: theme.background,
  },
]);

/* ── 앱 바 ── */
export const appBar = style([
  flex.VERTICAL,
  {
    gap: spacing.sm,
    height: '44px',
    paddingInline: spacing.md,
    marginInline: `-${spacing.md}`,
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

/* ── 안내 문구 + 검색 ── */
export const intro = style([
  font.bodySmall,
  { marginTop: spacing.lg, color: theme.textPrimary },
]);

export const search = style([
  font.bodySmall,
  {
    width: '100%',
    height: '48px',
    marginTop: spacing.sm,
    paddingInline: spacing.md,
    borderRadius: '8px',
    border: `1px solid ${theme.neutral[200]}`,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    '::placeholder': { color: theme.textTertiary },
    ':focus': { outline: `2px solid ${theme.primary}`, outlineOffset: '-1px' },
  },
]);

/* ── 카테고리 + 칩 ── */
export const groups = style([
  flex.COLUMN_FLEX,
  { gap: spacing.md, marginTop: spacing.lg },
]);

export const groupLabel = style([font.caption, { color: theme.textPrimary }]);

export const chips = style([
  flex.FLEX,
  { gap: spacing.sm, flexWrap: 'wrap', marginTop: spacing.sm },
]);

export const chip = style([
  flex.CENTER,
  font.caption,
  {
    height: '32px',
    paddingInline: spacing.md,
    borderRadius: '12px',
    border: `1px solid ${theme.neutral[200]}`,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    whiteSpace: 'nowrap',
    transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
  },
]);

export const chipSelected = style({
  backgroundColor: theme.primary,
  borderColor: theme.primary,
  color: theme.onPrimary,
});

export const empty = style([
  font.caption,
  { color: theme.textTertiary, marginTop: spacing.sm },
]);

/* ── 하단 버튼 ── */
export const submit = style([
  flex.CENTER,
  font.labelMedium,
  {
    width: '100%',
    height: '48px',
    marginTop: 'auto',
    borderRadius: '8px',
    backgroundColor: theme.primary,
    color: theme.onPrimary,
    transition: 'opacity 0.15s',
    ':hover': { opacity: 0.9 },
    ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
]);
