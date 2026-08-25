import type { PropsWithChildren } from 'react';
import * as s from './style.css';

/**
 * 화면 껍데기.
 *
 * 지금까지는 각 페이지가 Home/style.css 의 screen 을 끌어다 썼다.
 * 페이지가 남의 스타일 파일에 의존하지 않도록 여기로 옮긴다.
 */
const Screen = ({ children }: PropsWithChildren) => (
  <div className={s.screen}>{children}</div>
);

export default Screen;
