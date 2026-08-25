import { style } from '@vanilla-extract/css';
import { flex, font, layout, radius, spacing, theme } from '@/styles';

/** 선택된 항목을 보여주는 칩. 우측 X 로 제거한다. */
export const chip = style([
  flex.VERTICAL,
  font.bodySmall,
  {
    gap: spacing.xs,
    padding: `${spacing.sm} ${spacing.sm} ${spacing.sm} ${spacing.md}`,
    borderRadius: radius.md,
    backgroundColor: theme.primaryScale[400],
    color: theme.neutral[50],
  },
]);

/** 아이콘은 16 이지만 터치 범위는 44 를 확보한다. */
export const removeButton = style([
  flex.CENTER,
  {
    position: 'relative',
    flexShrink: 0,
    width: '16px',
    height: '16px',
    color: 'inherit',

    selectors: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: layout.size.touchTarget,
        height: layout.size.touchTarget,
        transform: 'translate(-50%, -50%)',
      },
    },
  },
]);
