import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

/**
 * 식사 카드 (Component 5.svg).
 * 폭 361 x 높이 116, radius 8, 패딩 8.
 * 우측 썸네일 178 x 100 (= 116 - 패딩 8 x 2).
 */
export const THUMBNAIL_WIDTH = 178;

export const card = style([
  flex.BETWEEN,
  {
    alignItems: 'stretch',
    gap: spacing.sm,
    width: '100%',
    height: '116px',
    padding: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
  },
]);

export const info = style([
  flex.COLUMN_FLEX,
  {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
]);

export const time = style([font.titleSmall, { color: theme.textPrimary }]);

export const name = style([
  font.bodySmall,
  {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.textPrimary,
  },
]);

export const detail = style([font.labelSmall, { color: theme.textPrimary }]);

/** 카드 안에서 항상 바닥에 붙는 보조 링크. */
export const recipeLink = style([
  font.labelSmall,
  { marginTop: 'auto', color: theme.link },
]);

/** 로딩 상태에서 링크 자리를 바닥에 붙여 둔다. */
export const pinBottom = style({ marginTop: 'auto' });

export const thumbnail = style([
  flex.CENTER,
  {
    flex: `0 0 ${THUMBNAIL_WIDTH}px`,
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderRadius: radius.sm,
    backgroundColor: theme.neutral[200],
    color: theme.textPrimary,
  },
]);

export const thumbnailImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
