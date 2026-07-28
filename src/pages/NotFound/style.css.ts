import { style } from '@vanilla-extract/css';
import { flex, font, theme } from '@/styles';

export const container = style([
  flex.COLUMN_CENTER,
  { gap: '12px', padding: '80px 0', textAlign: 'center' },
]);

export const code = style([font.H1, { color: theme.primary }]);
export const message = style([font.p2, { color: theme.subText }]);

export const link = style([
  font.btn2,
  {
    marginTop: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: theme.primary,
    color: theme.white,
  },
]);
