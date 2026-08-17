import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

export const container = style([flex.COLUMN_FLEX, { gap: '16px' }]);

export const card = style([
  flex.COLUMN_FLEX,
  {
    gap: '24px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: theme.surface,
  },
]);
