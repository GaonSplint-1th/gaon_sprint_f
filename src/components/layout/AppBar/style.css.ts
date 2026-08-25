import { style } from '@vanilla-extract/css';
import { flex, font, layout, radius, spacing, theme } from '@/styles';

/**
 * 공용 App Bar (App Bar.svg).
 * 폭 361 x 높이 44, radius 8, 흰 배경, 좌우 패딩 16, 요소 간격 8.
 * 뒤로가기 / 우측 액션은 선택이며, 없으면 제목이 좌측 16 에서 시작한다.
 */
export const container = style([
  flex.VERTICAL,
  {
    flexShrink: 0,
    gap: spacing.sm,
    width: '100%',
    height: layout.size.appBar,
    paddingInline: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: theme.surface,
  },
]);

/** 아이콘 24 x 24, 실제 터치 범위는 44 x 44 (Material Design 3). */
export const iconButton = style([
  flex.CENTER,
  {
    position: 'relative',
    flexShrink: 0,
    width: layout.size.icon,
    height: layout.size.icon,
    color: theme.textPrimary,

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

export const infoButton = style({
  color: theme.primary,
});

export const title = style([
  font.titleMedium,
  {
    // 안내(i) 버튼이 제목 바로 뒤에 붙는 배치(05·08·10 시안). 늘어나지 않고 필요할 때만 줄어든다.
    flex: '0 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.textPrimary,
  },
]);
