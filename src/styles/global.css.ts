import { globalStyle, globalFontFace } from '@vanilla-extract/css';
import theme from './theme';

export const pretendard = 'Pretendard';

globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2") format("woff2-variations")',
  fontWeight: '45 920',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalStyle('*, *::before, *::after', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html, body, #root', {
  width: '100%',
  // 모바일 브라우저에서 100vh 는 주소창을 포함한 '큰' 높이라
  // 내용이 화면에 다 들어가도 스크롤이 생긴다. dvh 로 통일한다.
  minHeight: '100dvh',
});

globalStyle('html', {
  fontSize: '16px',
});

globalStyle('body', {
  fontFamily: `${pretendard}, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', sans-serif`,
  color: theme.textPrimary,
  backgroundColor: theme.background,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  color: 'inherit',
});

globalStyle('input, textarea', {
  border: 'none',
  outline: 'none',
  fontFamily: 'inherit',
});

globalStyle('ul, ol', {
  listStyle: 'none',
});

globalStyle('img', {
  display: 'block',
  maxWidth: '100%',
});
