import { style } from '@vanilla-extract/css';
import { flex } from '@/styles';

export const wrapper = style([flex.COLUMN_FLEX, { minHeight: '100vh' }]);

export const main = style({
  flex: 1,
  width: '100%',
  margin: '0 auto',
});
