import { style } from '@vanilla-extract/css';
import { flex, font, theme, spacing, elevation, layout } from '@/styles';

const CTA_HEIGHT = 48;
const SEARCH_HEIGHT = 48;

const touchTarget = style({
  position: 'relative',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '44px',
      height: '44px',
      transform: 'translate(-50%, -50%)',
    },
  },
});

/* ── 화면 셸 (모바일 393px) ── */
export const screen = style([
  flex.COLUMN_FLEX,
  {
    position: 'relative',
    width: '100%',
    maxWidth: layout.frame.width,
    minHeight: '100vh',
    marginInline: 'auto',
    paddingTop: '44px',
    // 하단 고정 CTA + 그라디언트 영역 확보 (safe area 포함)
    paddingBottom: `calc(${CTA_HEIGHT + 64}px + env(safe-area-inset-bottom))`,
    backgroundColor: theme.background,
  },
]);

/* ── 앱 바 (뒤로가기는 모양만: 실제 이동 없음 / 타이틀 / 안내 아이콘) ── */
export const appBar = style([
  flex.BETWEEN,
  {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    height: '44px',
    // 좌우 16 안쪽 (16~377, 폭 361) 둥근 카드
    marginInline: spacing.md,
    borderRadius: '8px',
    paddingInline: spacing.md,
    backgroundColor: theme.surface,
  },
]);

export const appBarLeft = style([flex.VERTICAL, { gap: spacing.sm }]);

export const backButton = style([
  touchTarget,
  flex.CENTER,
  {
    width: '18px',
    height: '18px',
    flex: 'none',
    color: theme.textPrimary,
    // 아이콘 18×18, 클릭 범위 44×44 (Material Design 3 터치 타깃)
  },
]);

export const appBarTitle = style([
  font.titleSmall,
  { color: theme.textPrimary },
]);

export const appBarInfoIcon = style({
  width: '20px',
  height: '20px',
  flex: 'none',
  color: theme.primary,
});

/* ── 본문 ── */
export const body = style([
  flex.COLUMN_FLEX,
  { gap: spacing.lg, padding: `${spacing.lg} ${spacing.md} 0` },
]);

export const leadRow = style([
  flex.FLEX,
  { gap: spacing.xs, alignItems: 'center', marginBottom: spacing.md },
]);

export const lead = style([font.caption, { color: theme.textPrimary }]);

export const leadInfoIcon = style({
  width: '16px',
  height: '16px',
  flex: 'none',
  color: theme.primary,
});

/* ── 검색 + 자동완성 (입력창 + 구분선 + 목록이 하나의 카드) ── */
export const searchArea = style({
  position: 'relative',
  height: `${SEARCH_HEIGHT}px`,
});

// 입력창과 목록을 감싸는 단일 카드. 열리면 아래로 확장되며 콘텐츠 위에 겹친다.
export const searchCard = style({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  zIndex: 20,
  borderRadius: '8px',
  border: `1px solid ${theme.neutral[200]}`,
  backgroundColor: theme.surface,
  overflow: 'hidden',
});

export const searchCardOpen = style({ boxShadow: elevation[3] });

export const searchField = style([
  flex.VERTICAL,
  // 카드 테두리 1px×2 포함 총 높이 = SEARCH_HEIGHT
  { gap: spacing.sm, height: `${SEARCH_HEIGHT - 2}px`, paddingInline: spacing.sm },
]);

export const searchInput = style([
  font.caption,
  {
    flex: 1,
    minWidth: 0,
    backgroundColor: 'transparent',
    color: theme.textPrimary,
    '::placeholder': { color: theme.textSecondary },
  },
]);

export const searchIcon = style([
  flex.CENTER,
  { width: '24px', height: '24px', flex: 'none', color: theme.textSecondary },
]);

// 입력창과 목록을 나누는 구분선
export const divider = style({
  height: '1px',
  backgroundColor: theme.neutral[400],
  margin: `0 ${spacing.sm}`,
});

export const suggestionList = style({
  margin: 0,
  padding: spacing.sm,
  maxHeight: '176px',
  overflowY: 'auto',
});

export const suggestionItem = style([
  flex.BETWEEN,
  font.caption,
  {
    gap: spacing.sm,
    width: '100%',
    padding: `${spacing.sm} ${spacing.xs}`,
    color: theme.textSecondary,
    transition: 'color 0.1s',
    ':hover': { color: theme.textPrimary },
  },
]);

export const suggestionItemActive = style({ color: theme.textPrimary });

// 이미 담은 항목 — 목록에는 남되 흐리게 표시하고 재등록 안 됨
export const suggestionItemOwned = style({
  color: theme.textTertiary,
  cursor: 'default',
  ':hover': { color: theme.textTertiary },
});

export const ownedBadge = style({ flex: 'none', color: theme.textTertiary });

export const emptyResult = style([
  font.caption,
  { padding: `14px ${spacing.sm}`, color: theme.textSecondary },
]);

/* ── 하단 그라디언트 (콘텐츠를 배경색으로 자연스럽게 페이드) ── */
export const ctaGradient = style({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: 0,
  width: `min(${layout.frame.width}, 100%)`,
  height: '112px',
  background: `linear-gradient(to top, ${theme.background} 0%, ${theme.background} 75%, rgba(255, 255, 255, 0) 100%)`,
  pointerEvents: 'none',
  zIndex: 25,
});

/* ── 하단 고정 CTA (튜토리얼 안내용: 색상 항상 활성 상태, 동작 없음) ── */
export const ctaDock = style({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
  // safe area(홈 인디케이터)만큼 띄움 — 기기마다 env 값이 자동 적용
  bottom: 'calc(24px + env(safe-area-inset-bottom))',
  width: 'min(361px, calc(100% - 32px))',
  zIndex: 30,
});

export const cta = style([
  flex.CENTER,
  font.labelMedium,
  {
    width: '100%',
    height: `${CTA_HEIGHT}px`,
    borderRadius: '8px',
    backgroundColor: theme.primary,
    color: theme.surface,
    cursor: 'default',
  },
]);

/* ── 화면 전체를 덮는 블로킹 오버레이 (트리거 미정, 기본 숨김) ── */
export const guideOverlay = style({
  position: 'fixed',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)',
  width: `min(${layout.frame.width}, 100%)`,
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  pointerEvents: 'auto',
  zIndex: 40,
});
