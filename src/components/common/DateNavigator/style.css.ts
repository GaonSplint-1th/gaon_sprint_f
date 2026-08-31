import { style } from '@vanilla-extract/css';
import { flex, spacing, theme } from '@/styles';

export const bar = style([
  flex.BETWEEN,
  {
    marginTop: spacing.lg,
    height: '60px',
    padding: `0 ${spacing.md}`,
    borderRadius: '8px',
    background: theme.primaryScale[600],
    color: theme.onPrimary,
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
  },
]);
export const arrow = style([
  flex.CENTER,
  { width: '24px', height: '24px', flex: 'none', color: theme.onPrimary },
]);
export const arrowNext = style({ transform: 'rotate(180deg)' });
