import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

export const backButton = style([
  flex.CENTER,
  {
    alignSelf: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: 'transparent',
  },
]);

export const infoButton = style([
  flex.CENTER,
  {
    alignSelf: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    backgroundColor: 'transparent',
  },
]);

// Figma Title/Medium: Pretendard 20px / SemiBold(600) / line-height auto
export const title = style({
  alignSelf: 'center',
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: 'normal',
  color: theme.textPrimary, // Neutral/900 (#241F1F)
});
