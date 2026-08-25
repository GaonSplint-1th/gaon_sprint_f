import { style } from '@vanilla-extract/css';
import { flex, font, theme } from '@/styles';

export const header = style([
  flex.BETWEEN,
  {
    minHeight: '44px',
    padding: '0 16px',
    borderRadius: '8px',
    background: theme.surface,
  },
]);
export const title = style([
  font.titleSmall,
  { flex: 1, color: theme.textPrimary },
]);
export const iconButton = style([
  flex.CENTER,
  { width: '24px', height: '24px', flex: 'none', color: theme.textPrimary },
]);
/** 안내 아이콘은 primary 초록. */
export const infoButton = style([
  flex.CENTER,
  {
    width: '24px',
    height: '24px',
    flex: 'none',
    color: theme.primaryScale[600],
  },
]);
/** 좌우 아이콘이 없을 때 제목이 가운데로 쏠리지 않도록 자리만 잡는다. */
export const spacer = style({ width: '24px', flex: 'none' });
