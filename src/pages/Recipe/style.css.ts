import { style } from '@vanilla-extract/css';
import { flex, spacing, theme } from '@/styles';

export const container = style([
  flex.COLUMN_FLEX,
  {
    // RootLayout 이 폭(393)을 잡아 주므로 여기서는 좌우 여백만 맞춘다.
    gap: spacing.md,
    padding: `${spacing.md} ${spacing.md} 40px`,
  },
]);

export const card = style([
  flex.COLUMN_FLEX,
  {
    gap: '24px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: theme.surface,
  },
]);
