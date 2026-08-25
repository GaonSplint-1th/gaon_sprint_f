import { style } from '@vanilla-extract/css';
import { flex, font, layout, radius, spacing, theme } from '@/styles';

/**
 * 공용 모달 (App Bar.svg 4번째 변형 = 모달 헤더).
 * 패널 폭 361, radius 16 / 헤더 높이 64, primary 배경, 흰 제목 + 24 닫기 아이콘.
 */
export const overlay = style([
  flex.CENTER,
  {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    padding: spacing.md,
    backgroundColor: theme.dim,
  },
]);

export const panel = style([
  flex.COLUMN_FLEX,
  {
    width: layout.contentWidth,
    maxWidth: '100%',
    // 시안 07 기준 623. 화면이 더 짧으면 90dvh 로 줄어든다.
    maxHeight: 'min(623px, 90dvh)',
    borderRadius: radius.lg,
    backgroundColor: theme.surface,
    overflow: 'hidden',
  },
]);

export const header = style([
  flex.BETWEEN,
  {
    flexShrink: 0,
    gap: spacing.sm,
    minHeight: layout.size.modalHeader,
    padding: spacing.md,
    backgroundColor: theme.primary,
  },
]);

export const title = style([
  font.titleLarge,
  {
    flex: 1,
    minWidth: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    color: theme.onPrimary,
  },
]);

export const closeButton = style([
  flex.CENTER,
  {
    flexShrink: 0,
    width: layout.size.icon,
    height: layout.size.icon,
    color: theme.onPrimary,
  },
]);

export const body = style([
  flex.COLUMN_FLEX,
  {
    gap: spacing.md,
    flex: 1,
    minHeight: 0,
    padding: `${spacing.lg} ${spacing.md}`,
    overflowY: 'auto',
    overscrollBehavior: 'contain',
  },
]);

/** footer 가 있을 때는 스크롤 끝이 버튼 뒤로 자연스럽게 사라지도록 여백을 더 준다. */
export const bodyWithFooter = style({
  paddingBottom: '96px',
});

export const footer = style([
  flex.CENTER,
  {
    // 버튼을 페이드 영역 가운데가 아니라 패널 바닥에서 24 위에 둔다.
    alignItems: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '128px',
    paddingBottom: spacing.lg,
    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${theme.surface} 25%)`,
    pointerEvents: 'none',
  },
]);

export const footerInner = style({
  pointerEvents: 'auto',
});

export const bodyWrap = style({
  position: 'relative',
  flex: 1,
  minHeight: 0,
  display: 'flex',
});
