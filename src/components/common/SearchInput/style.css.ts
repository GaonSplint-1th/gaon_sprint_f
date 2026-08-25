import { style } from '@vanilla-extract/css';
import {
  elevation,
  flex,
  font,
  layout,
  radius,
  spacing,
  theme,
} from '@/styles';

/**
 * 검색 입력 + 자동완성 (Input.svg).
 * 입력창 361 x 48, radius 8, 1px #D9D9D9 테두리.
 * 열리면 같은 카드가 아래로 늘어나고 #A3A3A3 구분선 뒤에 목록이 붙는다.
 */

/** 입력창이 닫혀 있을 때 차지하는 자리. 카드는 이 위에 겹쳐 떠 있는다. */
export const root = style({
  position: 'relative',
  height: layout.size.input,
});

export const card = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 20,
  overflow: 'hidden',
  borderRadius: radius.sm,
  border: `1px solid ${theme.border}`,
  backgroundColor: theme.surface,
});

export const cardOpen = style({ boxShadow: elevation[3] });

/** 테두리 1px x 2 를 포함해 총 높이 48. */
export const field = style([
  flex.VERTICAL,
  {
    gap: spacing.sm,
    height: '46px',
    paddingInline: spacing.md,
  },
]);

export const input = style([
  font.bodyLarge,
  {
    flex: 1,
    minWidth: 0,
    backgroundColor: 'transparent',
    color: theme.textPrimary,
    '::placeholder': { color: theme.textSecondary },
  },
]);

export const icon = style([
  flex.CENTER,
  {
    flexShrink: 0,
    width: layout.size.icon,
    height: layout.size.icon,
    color: theme.textSecondary,
  },
]);

export const divider = style({
  height: '1px',
  marginInline: spacing.sm,
  backgroundColor: theme.outline,
});

export const list = style({
  maxHeight: '176px',
  padding: spacing.sm,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
});

export const option = style([
  flex.BETWEEN,
  font.bodyLarge,
  {
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.xs}`,
    color: theme.textSecondary,
    textAlign: 'left',
    transition: 'color 0.1s',
    ':hover': { color: theme.textPrimary },
  },
]);

export const optionActive = style({ color: theme.textPrimary });

/** 이미 담긴 항목 — 목록에는 남기되 흐리게 표시하고 다시 담기지 않는다. */
export const optionDisabled = style({
  color: theme.textTertiary,
  cursor: 'default',
  ':hover': { color: theme.textTertiary },
});

export const optionBadge = style([
  font.caption,
  { flexShrink: 0, color: theme.textTertiary },
]);

export const empty = style([
  font.bodyLarge,
  { padding: `14px ${spacing.sm}`, color: theme.textSecondary },
]);
