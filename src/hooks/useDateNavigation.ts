import { useCallback, useMemo, useState } from 'react';
import { formatDateLabel } from '@/utils/menu';

const addDays = (date: Date, amount: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

/**
 * 날짜 이동 바(DateNavigator)와 짝을 이루는 하루 단위 이동 상태.
 * 오늘의 식단 / 식단 수정 화면이 같은 규칙을 쓰도록 훅으로 뺐다.
 */
export const useDateNavigation = (initialDate?: Date) => {
  const [date, setDate] = useState(() => initialDate ?? new Date());

  const goPrev = useCallback(
    () => setDate((current) => addDays(current, -1)),
    [],
  );
  const goNext = useCallback(
    () => setDate((current) => addDays(current, 1)),
    [],
  );

  const label = useMemo(() => formatDateLabel(date), [date]);

  return { date, label, goPrev, goNext };
};
