import { style } from '@vanilla-extract/css';
import { flex, layout } from '@/styles';

export const wrapper = style([flex.COLUMN_FLEX, { minHeight: '100vh' }]);

/*
 * 모바일 전용 앱이라 본문은 기준 프레임(393px)을 넘지 않는다.
 * 레시피 화면처럼 자체 maxWidth 가 없는 페이지가 데스크톱에서
 * 화면 전체로 늘어나던 문제를 여기서 한 번에 막는다.
 */
export const main = style({
  flex: 1,
  width: '100%',
  maxWidth: layout.frame.width,
  margin: '0 auto',
});
