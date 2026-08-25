import { style } from '@vanilla-extract/css';
import { layout, theme } from '@/styles';

/** 모바일 전용 화면 껍데기. 기준 프레임(393px)을 넘지 않는다. */
export const screen = style({
  width: '100%',
  maxWidth: layout.frame.width,
  minHeight: '100dvh',
  margin: '0 auto',
  padding: '44px 16px 40px',
  background: theme.background,
});
