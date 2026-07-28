import { style } from '@vanilla-extract/css';
import { flex, font, theme } from '@/styles';

export const container = style([flex.COLUMN_FLEX, { gap: '24px' }]);

export const title = style([font.H1, { color: theme.text }]);

export const desc = style([font.p2, { color: theme.subText }]);
