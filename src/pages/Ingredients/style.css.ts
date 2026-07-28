import { style } from '@vanilla-extract/css';
import { flex, font, theme, screen } from '@/styles';

export const container = style([flex.COLUMN_FLEX, { gap: '24px' }]);

export const title = style([font.H2, { color: theme.text }]);
export const desc = style([font.p3, { color: theme.subText }]);

/* 좌: 목록 / 우: 장바구니 2단 레이아웃 */
export const layout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 320px',
  gap: '24px',
  alignItems: 'start',
  '@media': {
    [`(max-width: ${screen.phone})`]: {
      gridTemplateColumns: '1fr',
    },
  },
});

/* ---------- 식재료 목록 ---------- */
export const list = style([flex.COLUMN_FLEX, { gap: '12px' }]);

export const row = style([
  flex.BETWEEN,
  {
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.white,
  },
]);

export const rowInfo = style([flex.COLUMN_FLEX, { gap: '2px' }]);
export const name = style([font.H6, { color: theme.text }]);
export const unit = style([font.p4, { color: theme.subText }]);
export const price = style([font.p2, { color: theme.text }]);

/* ---------- 장바구니 ---------- */
export const cart = style([
  flex.COLUMN_FLEX,
  {
    gap: '12px',
    padding: '20px',
    borderRadius: '12px',
    border: `1px solid ${theme.border}`,
    backgroundColor: theme.white,
    position: 'sticky',
    top: '24px',
  },
]);

export const cartTitle = style([font.H5, { color: theme.text }]);
export const empty = style([font.p3, { color: theme.placeholder }]);

export const cartRow = style([flex.BETWEEN, { gap: '8px' }]);
export const cartName = style([font.p3, { color: theme.text }]);

export const qtyBox = style([flex.VERTICAL, { gap: '8px' }]);
export const qtyText = style([
  font.p3,
  { color: theme.text, minWidth: '20px', textAlign: 'center' },
]);

export const divider = style({
  height: '1px',
  backgroundColor: theme.border,
  margin: '4px 0',
});

export const total = style([flex.BETWEEN, font.H6, { color: theme.text }]);

/* ---------- 버튼 ---------- */
export const addBtn = style([
  font.btn3,
  {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: theme.primary,
    color: theme.white,
    transition: 'opacity 0.15s',
    ':hover': { opacity: 0.9 },
  },
]);

export const iconBtn = style([
  flex.CENTER,
  font.btn3,
  {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: theme.grayLight,
    color: theme.text,
    ':hover': { backgroundColor: theme.border },
  },
]);

export const removeBtn = style([
  font.p4,
  {
    color: theme.red,
    ':hover': { textDecoration: 'underline' },
  },
]);

export const checkoutBtn = style([
  font.btn2,
  {
    marginTop: '4px',
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: theme.primary,
    color: theme.white,
    ':disabled': { opacity: 0.4, cursor: 'not-allowed' },
  },
]);
