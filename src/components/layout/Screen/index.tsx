import type { ReactNode } from 'react';
import * as s from './style.css';

interface ScreenProps {
  children: ReactNode;
  /**
   * 하단에 고정할 주요 버튼.
   * 넘기면 화면 하단에 고정 도크 + 페이드 그라디언트가 함께 붙고,
   * 스크롤 끝에서 콘텐츠가 가려지지 않도록 여백도 자동으로 확보된다.
   */
  bottomCta?: ReactNode;
}

/**
 * 화면 공통 셸 (393 프레임 / 좌우 16 마진 / 콘텐츠 폭 361).
 * 페이지 컴포넌트는 자체적으로 maxWidth·배경·좌우 패딩을 잡지 않는다.
 */
const Screen = ({ children, bottomCta }: ScreenProps) => {
  const className = bottomCta ? `${s.screen} ${s.withBottomCta}` : s.screen;

  return (
    <main className={className}>
      <div className={s.content}>{children}</div>

      {bottomCta && (
        <>
          <div className={s.ctaGradient} aria-hidden="true" />
          <div className={s.ctaDock}>{bottomCta}</div>
        </>
      )}
    </main>
  );
};

export default Screen;
