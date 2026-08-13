import type { CSSProperties } from '@vanilla-extract/css';

const fontGenerator = (
  weight: number,
  sizePx: number,
  lineHeightPx: number,
): CSSProperties => ({
  fontWeight: weight,
  fontSize: `${sizePx / 16}rem`,
  lineHeight: `${lineHeightPx / 16}rem`,
});

// Typography tokens from the design guide: Body small 14/20, Body large 16/24.
const font = {
  titleLarge: fontGenerator(700, 24, 34),
  titleMedium: fontGenerator(700, 22, 30),
  titleSmall: fontGenerator(600, 20, 28),
  bodyLarge: fontGenerator(400, 16, 24),
  bodySmall: fontGenerator(400, 14, 20),
  labelMedium: fontGenerator(600, 16, 20),
  caption: fontGenerator(400, 14, 20),
} as const;

export default font;
