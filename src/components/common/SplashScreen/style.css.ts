import { keyframes, style } from '@vanilla-extract/css';
import { flex, layout, theme } from '@/styles';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** 로고가 살짝 커지며 나타난다. */
const logoIn = keyframes({
  from: { opacity: 0, transform: 'scale(.94)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

/** 준비가 끝나면 화면째 사라진다. */
const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const screen = style([
  flex.CENTER,
  {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    width: '100%',
    maxWidth: layout.frame.width,
    margin: '0 auto',
    background: theme.background,
  },
]);

/** 사라지는 동안 클릭을 가로채지 않는다. */
export const leaving = style({
  animation: `${fadeOut} 320ms ease-out both`,
  pointerEvents: 'none',
  '@media': {
    [REDUCED_MOTION]: { animation: 'none', opacity: 0 },
  },
});

export const logo = style({
  width: '191px',
  height: '191px',
  animation: `${logoIn} 420ms cubic-bezier(.2,.7,.3,1) both`,
  '@media': {
    [REDUCED_MOTION]: { animation: 'none' },
  },
});
