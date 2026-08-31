import type { CSSProperties } from '@vanilla-extract/css';

/**
 * 타이포그래피 토큰 (Pretendard).
 * 여기의 토큰은 앱 전체에서 공유하므로 화면별 스타일에서 임의로 변경하지 않습니다.
 *
 * Title  : 화면/섹션/카드 제목
 * Body   : 본문
 * Label  : 버튼
 * Caption: 조건문·도움말
 */
const REM_BASE = 16;

const fontGenerator = (
  weight: number,
  sizePx: number,
  lineHeight: number,
): CSSProperties => ({
  fontWeight: weight,
  fontSize: `${sizePx / REM_BASE}rem`,
  lineHeight: `${lineHeight}%`,
});

const font = {
  titleLarge: fontGenerator(700, 32, 140), // 화면 제목
  titleMedium: fontGenerator(700, 28, 140), // 섹션 제목
  titleSmall: fontGenerator(600, 24, 140), // 카드/메뉴 제목
  bodyLarge: fontGenerator(400, 24, 160), // 주요 본문
  bodySmall: fontGenerator(400, 20, 160), // 보조 본문
  labelMedium: fontGenerator(600, 20, 130), // 버튼
  caption: fontGenerator(500, 16, 140), // 조건문·도움말
} as const;

export default font;
