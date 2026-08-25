import { style, styleVariants } from '@vanilla-extract/css';
import { flex, font, layout, radius, spacing, theme } from '@/styles';

/**
 * 날짜 이동 바 (Frame 62.svg).
 * 폭 361 x 높이 60, radius 8, 좌우 패딩 16, 양 끝 24 아이콘.
 * 흰 배경 / primary 배경 두 가지 톤이 있다.
 */
const base = style([
  flex.BETWEEN,
  {
    flexShrink: 0,
    width: '100%',
    height: layout.size.dateBar,
    paddingInline: spacing.md,
    borderRadius: radius.sm,
  },
]);

export const tone = styleVariants({
  surface: [base, { backgroundColor: theme.surface, color: theme.textPrimary }],
  primary: [base, { backgroundColor: theme.primary, color: theme.onPrimary }],
});

export const arrow = style([
  flex.CENTER,
  {
    flexShrink: 0,
    width: layout.size.icon,
    height: layout.size.icon,
    color: 'inherit',

    ':disabled': { opacity: 0.4, cursor: 'default' },
  },
]);

export const label = style([
  font.titleMedium,
  {
    flex: 1,
    textAlign: 'center',
    color: 'inherit',
  },
]);
