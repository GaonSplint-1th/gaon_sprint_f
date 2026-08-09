import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

/** 4xx(클라이언트 오류)는 재시도해도 결과가 같으므로 걸러낸다. */
const isClientError = (error: unknown): boolean => {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  return status !== undefined && status >= 400 && status < 500;
};

/**
 * 앱 전역에서 재사용하는 QueryClient 기본 설정.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분 동안은 fresh 취급
      gcTime: 5 * 60 * 1000, // 5분 뒤 캐시 GC
      // 네트워크/5xx 는 한 번 재시도, 4xx(404·400·403·409 등)는 즉시 실패 처리.
      retry: (failureCount, error) => !isClientError(error) && failureCount < 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
