import { keyframes, style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

const pulse = keyframes({
  '0%, 100%': { opacity: 0.5 },
  '50%': { opacity: 1 },
});

const block = style({
  borderRadius: '8px',
  backgroundColor: theme.neutral[200],
  animation: `${pulse} 1.4s ease-in-out infinite`,
});

// RecipeCard.imageArea 자리 (185px)
export const imageArea = style([block, { height: '185px', width: '100%' }]);

// RecipeCard.header 자리
export const header = style([
  flex.BETWEEN,
  { width: '100%', borderBottom: `1px solid ${theme.outline}`, paddingBottom: '16px' },
]);

export const nameBar = style([block, { width: '112px', height: '24px' }]);
export const buttonBar = style([block, { width: '64px', height: '24px' }]);

// CookingStepList.title 자리
export const sectionTitleBar = style([block, { width: '88px', height: '24px' }]);

export const list = style([flex.COLUMN_FLEX, { gap: '16px', width: '100%', listStyle: 'none' }]);

// CookingStepItem 자리
export const item = style([
  flex.BETWEEN,
  { alignItems: 'flex-start', alignSelf: 'stretch', width: '100%', height: '101px' },
]);

export const textGroup = style([
  flex.COLUMN_FLEX,
  { gap: '8px', flex: 1, paddingRight: '16px', paddingTop: '4px' },
]);

export const textLine = style([block, { height: '16px', width: '100%' }]);
export const textLineShort = style([block, { height: '16px', width: '60%' }]);

export const photo = style([block, { flexShrink: 0, width: '102px', height: '102px' }]);
