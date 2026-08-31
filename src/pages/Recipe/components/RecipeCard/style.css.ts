import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

export const container = style([
  flex.COLUMN_FLEX,
  { gap: '16px', width: '100%' },
]);

export const imageArea = style([
  flex.COLUMN_CENTER,
  {
    height: '185px',
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${theme.outline}`,
    backgroundColor: theme.neutral[200],
  },
]);

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
});

export const imageEmpty = style([flex.COLUMN_CENTER, { gap: '8px' }]);

// DESIGN.md 3장 caption (12/16, SemiBold)
export const imageEmptyText = style({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '16px',
  color: theme.textTertiary,
});

export const header = style([
  flex.BETWEEN,
  {
    alignItems: 'flex-start',
    gap: '8px',
    width: '100%',
    borderBottom: `1px solid ${theme.outline}`,
    paddingBottom: '16px',
  },
]);

// DESIGN.md 3장 title-small (18/24, SemiBold)
export const name = style({
  flex: 1,
  minWidth: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.textPrimary,
});

// DESIGN.md 3장 caption (12/16, SemiBold)
export const ingredientButton = style({
  flexShrink: 0,
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '16px',
  height: '24px',
  padding: '0 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: theme.primary,
  color: theme.onPrimary,
});
