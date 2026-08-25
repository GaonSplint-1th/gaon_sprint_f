import { style, styleVariants } from '@vanilla-extract/css';
import { flex, font, layout, radius, theme } from '@/styles';

/**
 * 공용 버튼 (Component 15.svg).
 * 높이 48, radius 8, 라벨 18/24 SemiBold.
 * 비활성은 배경 #D9D9D9 + 글자 #A3A3A3.
 */
const base = style([
  flex.CENTER,
  font.label,
  {
    height: layout.size.button,
    paddingInline: '12px',
    borderRadius: radius.sm,
    transition: 'opacity 0.15s',

    ':hover': { opacity: 0.9 },
    ':disabled': {
      backgroundColor: theme.disabled,
      color: theme.onDisabled,
      cursor: 'default',
      opacity: 1,
    },
  },
]);

export const size = styleVariants({
  /** 화면 폭을 꽉 채우는 기본 버튼 (361). */
  full: [base, { width: '100%' }],
  /** 모달 안 등 좁은 자리 (180). */
  half: [base, { width: '180px' }],
});

export const tone = styleVariants({
  primary: { backgroundColor: theme.primary, color: theme.onPrimary },
  /** 흰 배경 위 보조 액션. */
  neutral: {
    backgroundColor: theme.surface,
    color: theme.textSecondary,
    border: `1px solid ${theme.border}`,
  },
});
