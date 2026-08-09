import { useEffect, useState } from 'react';

/** 값이 delay(ms) 동안 멈췄을 때만 갱신되는 디바운스 값. */
export const useDebouncedValue = <T>(value: T, delay = 200): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
