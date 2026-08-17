import { style } from '@vanilla-extract/css';
import { flex, theme, spacing } from '@/styles';

/**
 * 피그마 스펙(node 207:4666) 그대로 고정 크기 328x204 카드.
 * 본문 타이포(14/20 Medium)와 버튼 타이포(18/24 SemiBold)가 font.ts 토큰과
 * 값이 맞지 않아(폰트 토큰이 DESIGN.md 스펙보다 커짐) 이 컴포넌트만 스펙 값을 직접 사용한다.
 */
export const overlay = style([
  flex.CENTER,
  {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 디자인 스펙: 검정 30%
    zIndex: 999,
    padding: spacing.md,
  },
]);

export const dialog = style([
  flex.COLUMN_FLEX,
  {
    width: '328px',
    minHeight: '204px',
    backgroundColor: theme.surface,
    border: `1px solid ${theme.neutral[200]}`,
    borderRadius: '16px',
    overflow: 'hidden',
  },
]);

export const content = style([
  flex.COLUMN_CENTER,
  {
    flex: 1,
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.lg} 0`,
  },
]);

export const message = style({
  margin: 0,
  whiteSpace: 'pre-line',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  color: theme.textPrimary,
  textAlign: 'center',
});

export const code = style({
  margin: 0,
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
  color: theme.textTertiary,
});

export const actions = style([
  flex.FLEX,
  {
    height: '40px',
  },
]);

const buttonBase = style({
  flex: 1,
  fontFamily: 'Pretendard',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '24px',
  border: 'none',
  cursor: 'pointer',
});

export const confirmButton = style([
  buttonBase,
  {
    backgroundColor: theme.primary,
    color: theme.onPrimary,
    borderRadius: '0 0 16px 16px',
  },
]);

/** cancelText가 있을 때(2버튼)만 쓰인다 — 아직 해당 케이스의 별도 디자인은 없어 임시로 구성. */
export const cancelButton = style([
  buttonBase,
  {
    backgroundColor: theme.background,
    color: theme.textSecondary,
    borderRadius: '0 0 0 16px',
    borderRight: `1px solid ${theme.neutral[200]}`,
  },
]);

export const confirmButtonWithCancel = style([
  confirmButton,
  {
    borderRadius: '0 0 16px 0',
  },
]);
