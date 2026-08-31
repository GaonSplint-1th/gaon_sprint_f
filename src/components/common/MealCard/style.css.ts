import { style } from '@vanilla-extract/css';
import { flex, spacing, theme } from '@/styles';

/*
 * 식사 카드. 글자 크기는 시안(08/09 메뉴수정하기) 값을 그대로 쓴다.
 * 공용 토큰에는 18px SemiBold 가 없고, titleSmall(24px)을 쓰면
 * 카드가 시안 높이(116px)를 넘겨 버린다.
 */
export const card = style([
  flex.BETWEEN,
  {
    minHeight: '116px',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: '8px',
    background: theme.surface,
  },
]);
export const info = style([
  flex.COLUMN_FLEX,
  { alignItems: 'flex-start', gap: spacing.xs, minWidth: 0, flex: 1 },
]);
export const time = style({
  color: theme.textPrimary,
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 600,
});
export const name = style({
  color: theme.textPrimary,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 400,
});
export const detail = style({
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
export const preview = style([
  flex.CENTER,
  {
    flex: '0 0 178px',
    alignSelf: 'stretch',
    borderRadius: '8px',
    background: theme.neutral[200],
  },
]);
/** 이미지 자리 아이콘 색. 모양은 NoteOutline SVG 가 그린다. */
export const previewIcon = style({ color: theme.textPrimary });
