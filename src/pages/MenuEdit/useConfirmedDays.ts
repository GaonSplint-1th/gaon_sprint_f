import { useCallback, useState } from 'react';
import type { DayOfWeek } from '@/types';

const STORAGE_PREFIX = 'gaon.confirmedDays.';

/**
 * 확정한 요일을 기억한다. 확정하기(n/7) 의 n 이 이 개수다.
 *
 * 백엔드에 요일별 확정 상태를 저장하는 API 가 아직 없어 localStorage 로만 둔다.
 * 식단(weeklyMenuId)이 바뀌면 다시 0 부터 센다 — 다른 식단의 확정 기록을
 * 이어받으면 안 되기 때문이다.
 *
 * TODO: 확정 상태 저장 API 가 생기면 그쪽으로 옮긴다.
 */
export const useConfirmedDays = (weeklyMenuId: number | undefined) => {
  const storageKey = STORAGE_PREFIX + (weeklyMenuId ?? 'none');

  const read = (key: string): DayOfWeek[] => {
    try {
      const raw = globalThis.localStorage?.getItem(key);
      return raw ? (JSON.parse(raw) as DayOfWeek[]) : [];
    } catch {
      return [];
    }
  };

  const [days, setDays] = useState<DayOfWeek[]>(() => read(storageKey));
  const [loadedKey, setLoadedKey] = useState(storageKey);

  // 식단이 바뀌면 그 식단의 기록으로 갈아끼운다 (effect 없이 렌더 중 조정).
  if (storageKey !== loadedKey) {
    setLoadedKey(storageKey);
    setDays(read(storageKey));
  }

  const add = useCallback(
    (day: DayOfWeek) => {
      setDays((current) => {
        if (current.includes(day)) return current;
        const next = [...current, day];
        try {
          globalThis.localStorage?.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* 저장 실패는 무시 — 이번 세션에서만 유지된다. */
        }
        return next;
      });
    },
    [storageKey],
  );

  return {
    count: days.length,
    has: (day: DayOfWeek) => days.includes(day),
    add,
  };
};
