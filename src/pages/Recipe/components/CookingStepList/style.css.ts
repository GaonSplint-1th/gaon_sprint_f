import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

export const container = style([flex.COLUMN_FLEX, { gap: '16px', width: '100%' }]);

// DESIGN.md 3장 title-small (18/24, SemiBold)
export const title = style({
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.textPrimary,
});

export const list = style([flex.COLUMN_FLEX, { gap: '16px', width: '100%', listStyle: 'none' }]);
