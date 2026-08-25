import { forwardRef } from 'react';
import { ArrowLeftIcon } from '@/components/icons';
import * as s from './style.css';

interface DateNavigatorProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * 날짜 이동 바. 홈과 식단 수정이 같은 모양을 쓴다.
 * ref 는 이전 버튼으로 간다 — 온보딩 안내가 그 아이콘을 짚기 때문이다.
 */
const DateNavigator = forwardRef<HTMLButtonElement, DateNavigatorProps>(
  ({ label, onPrev, onNext }, prevRef) => (
    <div className={s.bar}>
      <button
        ref={prevRef}
        type="button"
        className={s.arrow}
        aria-label="이전 날짜"
        onClick={onPrev}
      >
        <ArrowLeftIcon />
      </button>
      <strong>{label}</strong>
      <button
        type="button"
        className={`${s.arrow} ${s.arrowNext}`}
        aria-label="다음 날짜"
        onClick={onNext}
      >
        <ArrowLeftIcon />
      </button>
    </div>
  ),
);
DateNavigator.displayName = 'DateNavigator';

export default DateNavigator;
