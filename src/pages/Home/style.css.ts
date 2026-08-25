import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

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

export const message = style([font.bodySmall, { color: theme.textSecondary }]);

export const section = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const sectionTitle = style([
  font.titleSmall,
  { color: theme.textPrimary },
]);

/** 시안(10)의 식사 카드 간격은 8. */
export const mealList = style([flex.COLUMN_FLEX, { gap: spacing.sm }]);
