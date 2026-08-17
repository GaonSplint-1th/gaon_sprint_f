import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import { getPreferences } from './preference.api';

/** 현재 유저의 선호 음식. */
export const usePreferences = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.user.preferences(userId ?? ''),
    queryFn: () => getPreferences(userId as string),
    enabled: !!userId,
  });
};
