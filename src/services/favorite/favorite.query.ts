import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import { getFavorites } from './favorite.api';

/** 즐겨찾기 목록. */
export const useFavorites = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.favorites(userId ?? ''),
    queryFn: () => getFavorites(userId as string),
    enabled: !!userId,
  });
};
