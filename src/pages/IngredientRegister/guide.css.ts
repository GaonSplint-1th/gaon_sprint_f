import { style } from '@vanilla-extract/css';
import { flex, font, spacing, theme } from '@/styles';

/**
 * 온보딩 안내(시안 "안내") 스타일.
 * 화면을 어둡게 덮고, 실제 요소 위에 초록 점선 하이라이트와 설명을 얹는다.
 */
export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  // 시안처럼 아래 내용이 충분히 물러나야 설명 글이 읽힌다.
  // 0.72 에서는 카테고리 라벨(검은 글자)이 그대로 살아 설명과 겹쳐 보였다.
  background: 'rgba(0, 0, 0, 0.93)',
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
  },
]);

/** 대상 요소 위에 얹는 초록 점선 테두리. */
export const highlight = style({
  position: 'fixed',
  border: `1.5px dashed ${theme.primaryScale[600]}`,
  borderRadius: '8px',
  pointerEvents: 'none',
});

/** 등록하기 버튼처럼 채워진 대상은 어두운 초록으로 비쳐 보이게 한다. */
export const highlightFilled = style({
  background: 'rgba(65, 170, 44, 0.28)',
});

export const connector = style({
  position: 'fixed',
  color: theme.primaryScale[600],
  pointerEvents: 'none',
});

export const callout = style({
  position: 'fixed',
  maxWidth: '260px',
  color: theme.onPrimary,
  pointerEvents: 'none',
});

/** 등록하기 설명은 오른쪽 정렬로 버튼 쪽을 향한다. */
export const calloutRight = style({
  textAlign: 'right',
  maxWidth: 'none',
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
