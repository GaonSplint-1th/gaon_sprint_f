import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

/**
 * 온보딩 안내 스타일. 퍼블리싱된 "안내" 시안 수치를 그대로 쓴다.
 * (시안은 프레임이 0.7372 배로 축소돼 있어 실제 px 로 환산해 옮겼다.)
 */

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  background: 'rgba(0, 0, 0, 0.77)',
});

export const close = style([
  flex.CENTER,
  {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '44px',
    height: '44px',
    color: theme.onPrimary,
  },
]);

/** 대상 위에 얹는 초록 점선 테두리. */
export const highlight = style({
  position: 'fixed',
  border: `1px dashed ${theme.primaryScale[600]}`,
  borderRadius: '7px',
  pointerEvents: 'none',
});

/** 버튼처럼 면이 있는 대상은 안쪽을 옅은 초록으로 채운다. */
export const highlightFilled = style({
  background: 'rgba(65, 170, 44, 0.22)',
});

/** 대상에서 설명으로 이어지는 곡선. */
export const connector = style({
  position: 'fixed',
  color: theme.primaryScale[600],
  pointerEvents: 'none',
});

/** 곡선 끝의 점. */
export const dot = style({
  position: 'fixed',
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  background: theme.primaryScale[600],
  pointerEvents: 'none',
});

export const callout = style({
  position: 'fixed',
  width: '203px',
  color: theme.onPrimary,
  pointerEvents: 'none',
});

export const calloutTitle = style({
  color: theme.onPrimary,
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 600,
});

export const calloutBody = style({
  marginTop: '2px',
  color: theme.onPrimary,
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
});
