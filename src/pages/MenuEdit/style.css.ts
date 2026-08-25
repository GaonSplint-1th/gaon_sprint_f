import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

export const planTitle = style([font.titleSmall, { color: theme.textPrimary }]);

export const planDescription = style([
  font.caption,
  { marginTop: spacing.xs, color: theme.textSecondary },
]);

/** 날짜 바 바로 아래 붙는 합계 금액 줄. */
export const costBar = style([
  flex.CENTER,
  font.bodySmall,
  {
    height: '32px',
    // Screen 기본 간격 24 → 시안의 8 로 좁힌다 (날짜 바에 붙는 줄).
    marginTop: `-${spacing.md}`,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
    color: theme.primary,
  },
]);

/** 시안(08·09)의 식사 카드 간격은 24. 홈(8)과 다르다. */
export const mealList = style([flex.COLUMN_FLEX, { gap: spacing.lg }]);

/** 메뉴 후보를 좌우로 밀어 고르는 영역. 스크롤바는 숨긴다. */
export const menuSwipe = style({
  width: '100%',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  selectors: { '&::-webkit-scrollbar': { display: 'none' } },
});

export const menuSwipeTrack = style([
  flex.FLEX,
  { gap: spacing.sm, width: 'max-content' },
]);

export const menuOption = style([
  font.bodySmall,
  {
    padding: `${spacing.xs} ${spacing.sm}`,
    border: `1px solid ${theme.border}`,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    whiteSpace: 'nowrap',
  },
]);

export const menuOptionActive = style({
  borderColor: theme.primary,
  backgroundColor: theme.primary,
  color: theme.onPrimary,
});
