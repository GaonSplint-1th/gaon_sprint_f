import { useCallback, useState } from 'react';

const STORAGE_PREFIX = 'gaon.guideSeen.';

/** 저장소가 막힌 환경(사파리 프라이빗 등)에서도 죽지 않게 감싼다. */
const hasSeen = (storageKey: string): boolean => {
  try {
    return globalThis.localStorage?.getItem(storageKey) === '1';
  } catch {
    return false;
  }
};

/**
 * 화면을 처음 열었을 때 한 번만 안내를 띄운다.
 *
 * 본 적이 있으면 자동으로 열지 않고, 앱바의 안내 버튼으로만 다시 열 수 있다.
 * 열림 여부는 effect 가 아니라 초기값에서 정한다 — 첫 렌더부터 확정돼 있어야
 * 안내가 떴다가 사라지는 깜빡임이 없다.
 */
export const useFirstVisitGuide = (key: string) => {
  const storageKey = STORAGE_PREFIX + key;
  const [open, setOpen] = useState(() => !hasSeen(storageKey));

  const close = useCallback(() => {
    setOpen(false);
    try {
      globalThis.localStorage?.setItem(storageKey, '1');
    } catch {
      /* 저장 실패는 무시 — 이번 세션에서는 닫힌 상태로 유지된다. */
    }
  }, [storageKey]);

  /** 안내 버튼으로 다시 열 때 사용. */
  const reopen = useCallback(() => setOpen(true), []);

  return { open, close, reopen };
};
