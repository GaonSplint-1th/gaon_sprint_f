import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type { FavoriteMenuAddRequest } from '@/types';
import { addFavorite, removeFavorite } from './favorite.api';

/** 즐겨찾기 등록. */
export const useAddFavorite = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: FavoriteMenuAddRequest) =>
      addFavorite(userId as string, body),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: queryKeys.favorites(userId ?? ''),
      }),
  });
};

/** 즐겨찾기 해제. */
export const useRemoveFavorite = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weeklyMenuId: number) =>
      removeFavorite(userId as string, weeklyMenuId),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: queryKeys.favorites(userId ?? ''),
      }),
  });
};
