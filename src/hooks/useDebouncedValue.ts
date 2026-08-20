import { useEffect, useState } from 'react';

/**
 * 값이 delay 동안 더 바뀌지 않을 때만 반영한다.
 * 검색어처럼 타이핑마다 요청이 나가면 곤란한 값에 쓴다.
 */
export const useDebouncedValue = <T>(value: T, delay = 250): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
