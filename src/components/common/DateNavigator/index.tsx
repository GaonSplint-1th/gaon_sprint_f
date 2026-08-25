import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import * as s from './style.css';

interface DateNavigatorProps {
  /** 가운데에 보여줄 날짜 문구. 예) 7/30(목) */
  label: string;
  tone?: 'surface' | 'primary';
  onPrev?: () => void;
  onNext?: () => void;
}

/** 날짜 이동 바 (Frame 62.svg). */
const DateNavigator = ({
  label,
  tone = 'primary',
  onPrev,
  onNext,
}: DateNavigatorProps) => {
  return (
    <div className={s.tone[tone]}>
      <button
        type="button"
        className={s.arrow}
        onClick={onPrev}
        disabled={!onPrev}
        aria-label="이전 날짜"
      >
        <ChevronLeftIcon />
      </button>

      <strong className={s.label}>{label}</strong>

      <button
        type="button"
        className={s.arrow}
        onClick={onNext}
        disabled={!onNext}
        aria-label="다음 날짜"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default DateNavigator;
