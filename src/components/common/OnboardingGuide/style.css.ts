import { keyframes, style } from '@vanilla-extract/css';
import { flex, font, spacing, theme } from '@/styles';

/**
 * 온보딩 안내(시안 "안내") 스타일.
 * 화면을 덮고, 실제 요소 위에 초록 점선 하이라이트와 설명을 얹는다.
 */

/** 움직임 최소화를 켠 사용자에게는 애니메이션을 끈다. */
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const popIn = keyframes({
  from: { opacity: 0, transform: 'scale(1.06)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const riseIn = keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  /*
   * 뒤 내용을 흐리게 만들면 글자가 뭉개져 설명과 겹쳐 읽히지 않는다.
   * 덕분에 시커멓게 덮지 않아도 되고(0.93 → 0.62) 화면이 훨씬 가볍다.
   */
  background: 'rgba(0, 0, 0, 0.62)',
  backdropFilter: 'blur(3px)',
  WebkitBackdropFilter: 'blur(3px)',
  animation: `${fadeIn} 220ms ease-out both`,
  '@media': {
    [REDUCED_MOTION]: { animation: 'none' },
  },
});

export const close = style([
  flex.CENTER,
  {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '44px',
    height: '44px',
    color: theme.onPrimary,
    animation: `${fadeIn} 220ms ease-out 120ms both`,
    '@media': {
      [REDUCED_MOTION]: { animation: 'none' },
    },
  },
]);

/** 대상 요소 위에 얹는 초록 점선 테두리. */
export const highlight = style({
  position: 'fixed',
  border: `1.5px dashed ${theme.primaryScale[600]}`,
  borderRadius: '8px',
  pointerEvents: 'none',
  animation: `${popIn} 320ms cubic-bezier(.2,.7,.3,1) both`,
  '@media': {
    [REDUCED_MOTION]: { animation: 'none' },
  },
});

/** 버튼·카드처럼 면이 있는 대상은 안쪽을 옅은 초록으로 채운다. */
export const highlightFilled = style({
  background: 'rgba(65, 170, 44, 0.22)',
});

export const callout = style({
  position: 'fixed',
  maxWidth: '300px',
  color: theme.onPrimary,
  pointerEvents: 'none',
  // 흐린 배경 위에서도 확실히 읽히도록 글자에 옅은 그림자를 준다.
  textShadow: '0 1px 6px rgba(0,0,0,.6)',
  animation: `${riseIn} 340ms cubic-bezier(.2,.7,.3,1) both`,
  '@media': {
    [REDUCED_MOTION]: { animation: 'none' },
  },
});

export const calloutTitle = style([
  font.labelMedium,
  { marginBottom: spacing.xs, color: theme.onPrimary },
]);

export const calloutBody = style({
  fontSize: '13px',
  lineHeight: '20px',
  fontWeight: 500,
  color: theme.onPrimary,
});
