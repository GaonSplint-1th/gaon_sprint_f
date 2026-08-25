import { useEffect, useState } from 'react';
import * as s from './style.css';

/** 준비가 끝나도 로고가 깜빡이고 사라지지 않도록 최소한 이만큼은 보여준다(ms). */
const MIN_VISIBLE_MS = 900;
/** 사라지는 애니메이션 길이. style.css 의 fadeOut 과 같아야 한다. */
const FADE_MS = 320;

interface SplashScreenProps {
  /** 앱이 쓸 준비가 됐는지. false 면 계속 머문다. */
  ready: boolean;
}

/**
 * 부팅 화면.
 *
 * 기기 인증이 끝날 때까지 로고를 보여준다. 인증이 빨리 끝나도 최소 시간은
 * 유지해, 로고가 번쩍이고 사라지는 인상을 주지 않게 했다.
 */
const SplashScreen = ({ ready }: SplashScreenProps) => {
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setMinTimePassed(true),
      MIN_VISIBLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  const leaving = ready && minTimePassed;

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setHidden(true), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  if (hidden) return null;

  return (
    <div
      className={`${s.screen} ${leaving ? s.leaving : ''}`}
      role="status"
      aria-label="앱을 준비하는 중"
      aria-hidden={leaving}
    >
      <img className={s.logo} src="/favicon.svg" alt="MEAL PICK" />
    </div>
  );
};

export default SplashScreen;
