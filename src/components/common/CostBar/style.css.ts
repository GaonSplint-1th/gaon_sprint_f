import { style } from '@vanilla-extract/css';
import { spacing, theme } from '@/styles';

export const bar = style({
  marginTop: spacing.sm,
  height: '32px',
  paddingTop: '5px',
  borderRadius: '8px',
  background: theme.surface,
  color: theme.primaryScale[600],
  textAlign: 'center',
  fontSize: '16px',
});
