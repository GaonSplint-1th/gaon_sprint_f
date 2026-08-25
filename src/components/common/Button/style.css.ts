import { style } from '@vanilla-extract/css';
import { theme } from '@/styles';

/** 화면 하단 주요 버튼. */
export const bottom = style({
  width: '100%',
  height: '48px',
  marginTop: '28px',
  borderRadius: '8px',
  background: theme.primaryScale[600],
  color: theme.onPrimary,
  fontSize: '16px',
  lineHeight: '24px',
  fontWeight: 700,
  selectors: {
    '&:disabled': {
      background: theme.neutral[200],
      color: theme.neutral[400],
    },
  },
});
