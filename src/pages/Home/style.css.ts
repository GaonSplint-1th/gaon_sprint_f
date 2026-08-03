import { style } from '@vanilla-extract/css';
import { flex, font, theme } from '@/styles';

export const container = style([flex.COLUMN_FLEX, { gap: '24px' }]);

export const title = style([font.titleLarge, { color: theme.textPrimary }]);

export const desc = style([font.bodyLarge, { color: theme.textSecondary }]);
