import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getTodayDayOfWeek,
  parseDayOfWeek,
  shiftDayOfWeek,
} from '@/utils/menu';
import type { DayOfWeek } from '@/types';

/**
 * 화면이 보고 있는 요일.
 *
 * 주소(`?day=3`)에 실어 둔다. 홈과 식단 수정이 서로 오갈 때 보던 날이 따라가야 하고,
 * 라우터 state 와 달리 새로고침·뒤로가기에도 살아남기 때문이다.
 * 값이 없거나 1~7 밖이면 오늘로 연다.
 */
export const useDayOfWeekParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>(
    () => parseDayOfWeek(searchParams.get('day')) ?? getTodayDayOfWeek(),
  );

  /*
   * 요일이 바뀌면 주소를 맞춰 둔다.
   * replace 로 둔다 — 날짜를 넘길 때마다 뒤로가기가 한 칸씩 쌓이면 안 된다.
   */
  useEffect(() => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.set('day', String(dayOfWeek));
        return next;
      },
      { replace: true },
    );
  }, [dayOfWeek, setSearchParams]);

  /*
   * 이동은 반드시 직전 값에서 센다. 화살표를 연달아 누르면 두 번 다 같은
   * 렌더의 dayOfWeek 를 보게 되어 하루밖에 안 넘어간다.
   */
  const shiftDay = (delta: number) =>
    setDayOfWeek((current) => shiftDayOfWeek(current, delta));

  return { dayOfWeek, shiftDay };
};
