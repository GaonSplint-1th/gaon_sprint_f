import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

export const cardList = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const message = style([font.bodySmall, { color: theme.textSecondary }]);

/* ── 미리보기 모달 본문 (시안 07) ── */

/** 하루 묶음 사이 간격 24. 라벨 24 + 4 + 카드 96 + 24 = 148 (시안 행 간격). */
export const dayList = style([flex.COLUMN_FLEX, { gap: spacing.lg }]);

export const day = style([flex.COLUMN_FLEX, { gap: spacing.xs }]);

export const dayLabel = style([font.titleSmall, { color: theme.textPrimary }]);

/** 카드 99 x 3 + 간격 16 x 2 = 329 (모달 본문 폭). */
export const dayMeals = style([flex.FLEX, { gap: spacing.md }]);

/** 시안 07: 99 x 96, radius 8, 1px 테두리, 패딩 8. 라벨은 좌측 정렬. */
export const dayMeal = style([
  flex.COLUMN_FLEX,
  font.caption,
  {
    flex: 1,
    minWidth: 0,
    gap: spacing.sm,
    padding: spacing.sm,
    // 테두리를 안쪽에 그려야 시안처럼 카드 99 / 썸네일 83 이 나온다.
    boxShadow: `inset 0 0 0 1px ${theme.border}`,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
  },
]);

export const dayMealThumbnail = style({
  height: '56px',
  borderRadius: radius.xs,
  backgroundColor: theme.neutral[200],
});
