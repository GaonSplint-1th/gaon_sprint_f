import { style } from '@vanilla-extract/css';
import { flex, font, theme, screen } from '@/styles';

export const wrapper = style([flex.COLUMN_FLEX, { minHeight: '100vh' }]);

export const header = style([
  flex.BETWEEN,
  {
    height: '64px',
    padding: '0 24px',
    borderBottom: `1px solid ${theme.outline}`,
    backgroundColor: theme.surface,
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
]);

export const logo = style([font.titleSmall, { color: theme.primary }]);

export const nav = style([flex.VERTICAL, { gap: '20px' }]);

export const navLink = style([
  font.labelMedium,
  {
    color: theme.textSecondary,
    transition: 'color 0.15s',
    ':hover': { color: theme.textPrimary },
  },
]);

export const navLinkActive = style({
  color: theme.primary,
});

export const main = style({
  flex: 1,
  width: '100%',
  maxWidth: screen.desktop,
  margin: '0 auto',
  padding: '32px 24px',
});
