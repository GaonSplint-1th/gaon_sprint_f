import { keyframes, style } from '@vanilla-extract/css';
import theme from './theme';

/** 스켈레톤을 훑고 지나가는 빛. */
const shimmer = keyframes({
  from: { backgroundPosition: '-160px 0' },
  to: { backgroundPosition: '240px 0' },
});

/**
 * 스켈레톤 조각 공통 모양.
 *
 * 레시피는 opacity 로 깜빡이고 추천은 빛이 훑고 지나가 서로 달랐다.
 * 로딩 표현은 앱 전체가 같아야 해서 하나로 맞춘다.
 */
export const skeletonPiece = style({
  // 바탕색을 따로 둔다. background 단축 속성만 쓰면 배경색이 transparent 로 초기화돼
  // 빛이 지나가는 400px 띠 바깥은 아무것도 안 보인다 (조각이 통째로 사라진다).
  backgroundColor: theme.neutral[200],
  backgroundImage: `linear-gradient(90deg, ${theme.neutral[200]} 0%, ${theme.neutral[50]} 50%, ${theme.neutral[200]} 100%)`,
  backgroundSize: '400px 100%',
  backgroundRepeat: 'no-repeat',
  animation: `${shimmer} 1.2s ease-in-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': { animation: 'none' },
  },
});
