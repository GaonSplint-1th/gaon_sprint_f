import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

// Figma node 260:2417 재료상세팝업
export const overlay = style([
  flex.CENTER,
  {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
]);

export const popup = style([
  flex.COLUMN_FLEX,
  {
    position: 'relative',
    width: '329px',
    height: '609px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    borderRadius: '16px',
    backgroundColor: theme.surface,
    overflow: 'hidden',
  },
]);

export const header = style([
  flex.BETWEEN,
  {
    flexShrink: 0,
    gap: '8px',
    minHeight: '64px',
    padding: '16px',
    backgroundColor: theme.primary,
  },
]);

// Figma Title/Large: Pretendard 24px / SemiBold(600) / 32px
export const title = style({
  flex: 1,
  minWidth: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  fontSize: '24px',
  fontWeight: 600,
  lineHeight: '32px',
  color: theme.onPrimary,
});

export const closeButton = style([
  flex.CENTER,
  {
    flexShrink: 0,
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: 'transparent',
  },
]);

export const body = style({
  position: 'relative',
  flex: 1,
  overflow: 'hidden',
});

export const list = style([
  flex.COLUMN_FLEX,
  {
    gap: '8px',
    height: '100%',
    padding: '24px 16px 128px',
    overflowY: 'auto',
    listStyle: 'none',
  },
]);

export const row = style([
  flex.BETWEEN,
  {
    flexShrink: 0,
    height: '32px',
    borderBottom: `1px solid ${theme.outline}`,
  },
]);

// Figma Body/Large: Pretendard 16px / Regular(400) / 24px
export const ingredientName = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: theme.textPrimary,
});

export const ingredientAmount = style({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: theme.textPrimary,
  textAlign: 'right',
});

export const footer = style([
  flex.CENTER,
  {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '128px',
    paddingBottom: '24px',
    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${theme.surface} 25%)`,
  },
]);

// Figma Title/Small: Pretendard 18px / SemiBold(600) / 24px
export const closeCta = style([
  flex.CENTER,
  {
    width: '180px',
    height: '48px',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: theme.primary,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '24px',
    color: theme.onPrimary,
  },
]);
