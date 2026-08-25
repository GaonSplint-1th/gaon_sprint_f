import { style } from '@vanilla-extract/css';
import { flex, font, radius, spacing, theme } from '@/styles';

/**
 * 오류 팝업 (피그마 node 207:4666). 고정 크기 328 x 204 카드.
 * 하단 버튼이 카드 폭을 꽉 채우는 전용 형태라 공용 Button 대신 여기서 스타일을 잡는다.
 */
export const overlay = style([
  flex.CENTER,
  {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    padding: spacing.md,
    backgroundColor: theme.dim,
  },
]);

export const dialog = style([
  flex.COLUMN_FLEX,
  {
    width: '328px',
    minHeight: '204px',
    overflow: 'hidden',
    border: `1px solid ${theme.border}`,
    borderRadius: radius.lg,
    backgroundColor: theme.surface,
  },
]);

export const content = style([
  flex.COLUMN_CENTER,
  {
    flex: 1,
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.lg} 0`,
    color: theme.primary, // 경고 아이콘 색
  },
]);

export const message = style([
  font.bodySmall,
  {
    fontWeight: 500, // 스펙상 14/20 Medium
    whiteSpace: 'pre-line',
    textAlign: 'center',
    color: theme.textPrimary,
  },
]);

export const code = style([font.caption, { color: theme.textTertiary }]);

export const actions = style([flex.FLEX, { height: '40px' }]);

const buttonBase = style([font.label, { flex: 1 }]);

export const confirmButton = style([
  buttonBase,
  {
    backgroundColor: theme.primary,
    color: theme.onPrimary,
    borderRadius: `0 0 ${radius.lg} ${radius.lg}`,
  },
]);

/** cancelText 가 있을 때(2버튼)만 쓰인다. */
export const cancelButton = style([
  buttonBase,
  {
    backgroundColor: theme.background,
    color: theme.textSecondary,
    borderRadius: `0 0 0 ${radius.lg}`,
    borderRight: `1px solid ${theme.border}`,
  },
]);

export const confirmButtonWithCancel = style([
  confirmButton,
  { borderRadius: `0 0 ${radius.lg} 0` },
]);
