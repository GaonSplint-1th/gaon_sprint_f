import type { CSSProperties } from '@vanilla-extract/css';

/**
 * 타이포그래피 토큰 (Pretendard).
 * 393 x 852 모바일 프레임 기준이며, 디자이너가 준 컴포넌트 SVG에서 실측한 값이다.
 * (앱바 제목 20, 버튼 라벨 18, 카드 제목 18, 본문 16, 캡션 12)
 *
 * 화면별 style.css.ts 에서 fontSize/fontWeight 를 직접 쓰지 말고 반드시 이 토큰을 조합할 것.
 * 값이 안 맞으면 화면에서 덮어쓰지 말고 여기서 토큰을 고친다.
 *
 * title*  : 화면/섹션/카드 제목
 * body*   : 본문
 * label*  : 버튼·탭 등 조작 요소
 * caption : 보조 설명·도움말
 */
const REM_BASE = 16;

const fontGenerator = (
  weight: number,
  sizePx: number,
  lineHeightPx: number,
): CSSProperties => ({
  fontWeight: weight,
  fontSize: `${sizePx / REM_BASE}rem`,
  lineHeight: `${lineHeightPx / REM_BASE}rem`,
});

const font = {
  /** 24/32 SemiBold — 모달 제목 */
  titleLarge: fontGenerator(600, 24, 32),
  /** 20/28 SemiBold — 앱바 제목, 날짜 바 */
  titleMedium: fontGenerator(600, 20, 28),
  /** 18/24 SemiBold — 카드 제목, 섹션 제목 */
  titleSmall: fontGenerator(600, 18, 24),

  /** 16/24 Regular — 기본 본문 */
  bodyLarge: fontGenerator(400, 16, 24),
  /** 16/24 SemiBold — 강조 본문 (조리 순서 등) */
  bodyStrong: fontGenerator(600, 16, 24),
  /** 14/20 Regular — 보조 본문 */
  bodySmall: fontGenerator(400, 14, 20),

  /** 18/24 SemiBold — 기본 버튼 라벨 */
  label: fontGenerator(600, 18, 24),
  /** 14/20 SemiBold — 작은 버튼·인라인 링크 */
  labelSmall: fontGenerator(600, 14, 20),

  /** 12/16 Medium — 캡션·도움말 */
  caption: fontGenerator(500, 12, 16),
  /** 12/16 SemiBold — 강조 캡션 (뱃지 등) */
  captionStrong: fontGenerator(600, 12, 16),
} as const;

export default font;
