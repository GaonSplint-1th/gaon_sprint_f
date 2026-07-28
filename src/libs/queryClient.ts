import { QueryClient } from '@tanstack/react-query';

/**
 * 앱 전역에서 재사용하는 QueryClient 기본 설정.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분 동안은 fresh 취급
      gcTime: 5 * 60 * 1000, // 5분 뒤 캐시 GC
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
