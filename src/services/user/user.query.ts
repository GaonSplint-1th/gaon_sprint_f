import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import { getUser } from './user.api';

/** 현재 로그인된 유저 정보. */
export const useUser = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.user.detail(userId ?? ''),
    queryFn: () => getUser(userId as string),
    enabled: !!userId,
  });
};
