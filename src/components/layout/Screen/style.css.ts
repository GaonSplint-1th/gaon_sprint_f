import { style } from '@vanilla-extract/css';
import { flex, layout, radius, spacing, theme } from '@/styles';

/** 하단 고정 CTA 가 차지하는 높이(버튼 48 + 아래 여백 44). 시안 y=760 / 프레임 852 기준. */
const CTA_DOCK_HEIGHT = 92;

/**
 * 모든 화면의 공통 셸.
 * 기준 프레임 393 폭 안에서 좌우 16 마진을 잡아 콘텐츠 폭 361 을 만든다.
 * 화면마다 maxWidth/padding/background 를 따로 잡으면 화면끼리 크기가 틀어지므로
 * 새 화면은 반드시 이 컴포넌트로 감싼다.
 */
export const screen = style([
  flex.COLUMN_FLEX,
  {
    position: 'relative',
    width: '100%',
    maxWidth: layout.frame.width,
    minHeight: '100dvh',
    marginInline: 'auto',
    paddingTop: '44px',
    paddingInline: layout.sideMargin,
    paddingBottom: spacing.xl,
    backgroundColor: theme.background,
  },
]);

/** 하단 고정 CTA 가 있는 화면은 그만큼 스크롤 여백을 더 확보한다. */
export const withBottomCta = style({
  paddingBottom: `calc(${CTA_DOCK_HEIGHT + 24}px + env(safe-area-inset-bottom))`,
});

export const content = style([
  flex.COLUMN_FLEX,
  {
    flex: 1,
    gap: spacing.lg,
    width: '100%',
  },
]);

/**
 * 콘텐츠가 CTA 뒤로 사라지지 않도록 배경색으로 자연스럽게 페이드시킨다.
 * (elevation 대신 그라디언트를 쓰는 건 IngredientRegister 원안 그대로)
 */
export const ctaGradient = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: `min(${layout.frame.width}, 100%)`,
  height: '112px',
  background: `linear-gradient(to top, ${theme.background} 0%, ${theme.background} 75%, rgba(246, 246, 246, 0) 100%)`,
  pointerEvents: 'none',
  zIndex: 25,
});

export const ctaDock = style({
  position: 'fixed',
  // 시안 기준 바닥에서 44. 홈 인디케이터가 더 큰 기기에서는 safe-area 만큼 더 띄운다.
  bottom: 'max(44px, calc(10px + env(safe-area-inset-bottom)))',
  left: '50%',
  transform: 'translateX(-50%)',
  width: `min(${layout.contentWidth}, calc(100% - 32px))`,
  borderRadius: radius.sm,
  zIndex: 30,
});
