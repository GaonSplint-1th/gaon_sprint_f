import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

/**
 * 식단 추천 카드 (Frame 49.svg).
 * 폭 361 x 높이 196, radius 16, 패딩 16.
 * 세로 구성: 헤더 24 / 8 / 썸네일 72 / 8 / 메뉴 24 / 8 / 링크 20  = 164 (+ 패딩 32) = 196
 */
export const card = style([
  flex.COLUMN_FLEX,
  {
    gap: spacing.sm,
    width: '100%',
    height: '196px',
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: theme.surface,
    color: theme.textPrimary,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.15s, color 0.15s',
  },
]);

/** 선택된 카드는 primary 로 반전된다. */
export const cardSelected = style({
  backgroundColor: theme.primary,
  color: theme.onPrimary,
});

export const header = style([
  flex.BETWEEN,
  { gap: spacing.sm, height: '24px' },
]);

export const name = style([font.titleSmall, { color: 'inherit' }]);

export const price = style([font.bodySmall, { color: 'inherit' }]);

export const thumbnails = style([
  flex.FLEX,
  { gap: spacing.sm, height: '72px' },
]);

export const thumbnail = style([
  flex.CENTER,
  {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    borderRadius: radius.sm,
    backgroundColor: theme.neutral[200],
    color: theme.textTertiary,
  },
]);

export const thumbnailImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const menus = style([
  flex.VERTICAL,
  {
    gap: spacing.xs,
    height: '24px',
  },
]);

export const menuIcon = style([
  flex.CENTER,
  { flexShrink: 0, width: '24px', height: '24px', color: 'inherit' },
]);

export const menuText = style([
  font.bodySmall,
  {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'inherit',
  },
]);

export const previewButton = style([
  font.labelSmall,
  {
    height: '20px',
    marginLeft: 'auto',
    color: theme.link,
  },
]);

/** 선택 상태에서는 링크도 흰색으로 뒤집는다. */
export const previewButtonSelected = style({
  color: theme.onPrimary,
});
