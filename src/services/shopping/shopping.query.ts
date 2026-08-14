import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import { getShoppingList } from './shopping.api';

/** 장보기 체크리스트. */
export const useShoppingList = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.shoppingList(userId ?? ''),
    queryFn: () => getShoppingList(userId as string),
    enabled: !!userId,
  });
};
