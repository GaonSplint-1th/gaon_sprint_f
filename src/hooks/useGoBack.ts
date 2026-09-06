import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

/** 브라우저 history 에 react-router 가 남기는 항목 순번. */
const getHistoryIndex = (): number | undefined =>
  (window.history.state as { idx?: number } | null)?.idx;

/**
 * 앱바의 뒤로가기 동작.
 *
 * 기본은 브라우저 기록 한 칸 뒤로다. 다만 새로고침이나 링크로 화면에 바로 들어오면
 * 앱 안에 쌓인 기록이 없어 navigate(-1) 이 앱 밖으로 나가 버린다.
 * react-router 가 history.state 에 남기는 순번(idx)이 0 이면 그 경우라, fallback 으로 보낸다.
 */
export const useGoBack = (fallback: string = ROUTES.HOME) => {
  const navigate = useNavigate();

  return useCallback(() => {
    const idx = getHistoryIndex();
    if (idx === undefined || idx > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  }, [navigate, fallback]);
};
