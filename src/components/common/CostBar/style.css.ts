import { keyframes, style } from '@vanilla-extract/css';
import { spacing, theme } from '@/styles';

export const bar = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: spacing.sm,
  height: '32px',
  borderRadius: '8px',
  background: theme.surface,
  color: theme.primaryScale[600],
  fontSize: '16px',
});

export const amount = style({ lineHeight: '32px' });

/** 금액은 줄 가운데에 두고, 버튼만 오른쪽 끝에 얹는다. */
export const refreshButton = style({
  position: 'absolute',
  right: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  color: theme.primaryScale[600],
  selectors: {
    '&:disabled': { color: theme.textTertiary },
  },
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const spinning = style({
  animation: `${spin} 0.8s linear infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
});
