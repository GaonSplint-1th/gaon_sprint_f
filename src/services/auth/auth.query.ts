import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { ensureSession } from './auth.api';

/**
 * 기기 인증 세션.
 * 앱 어디서든 이 훅을 부르면 같은 캐시를 공유하고, 최초 1회만 실제 인증이 나간다.
 */
export const useSession = () =>
  useQuery({
    queryKey: queryKeys.session,
    queryFn: ensureSession,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

/** 현재 로그인된 유저의 userId (세션 준비 전이면 undefined). */
export const useUserId = (): string | undefined => useSession().data?.userId;
