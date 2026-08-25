import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { radius, theme } from '@/styles';

/**
 * 로딩 스켈레톤 (Frame 49.svg / App Bar.svg 로딩 변형).
 * 디자인상 자리 종류에 따라 회색이 두 가지다.
 * - 텍스트 / 뱃지 / 아바타 자리 : #E6E6E6, 알약 모양
 * - 이미지 자리                : #D9D9D9, radius 8
 *
 * 애니메이션은 밝은 띠가 좌 → 우로 훑고 지나가는 shimmer.
 * opacity 를 깜빡이는 방식보다 "불러오는 중"이 잘 읽히고,
 * transform 만 움직이므로 리페인트 없이 합성 단계에서 처리된다.
 */
const shimmer = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(100%)' },
});

const base = style({
  position: 'relative',
  flexShrink: 0,
  // 하이라이트 띠가 스켈레톤 모양(알약·원·라운드 사각) 밖으로 새지 않게 잘라낸다.
  overflow: 'hidden',

  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `linear-gradient(90deg, transparent 0%, ${theme.skeletonHighlight} 50%, transparent 100%)`,
      animation: `${shimmer} 1.6s ease-in-out infinite`,

      '@media': {
        // 모션 최소화 설정에서는 움직임 없이 회색 블록만 남긴다.
        '(prefers-reduced-motion: reduce)': {
          content: 'none',
        },
      },
    },
  },
});

export const variant = styleVariants({
  text: [base, { backgroundColor: theme.skeleton, borderRadius: radius.full }],
  image: [
    base,
    { backgroundColor: theme.skeletonStrong, borderRadius: radius.sm },
  ],
  circle: [
    base,
    { backgroundColor: theme.skeleton, borderRadius: radius.full },
  ],
});
