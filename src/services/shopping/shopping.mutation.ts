import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type { ShoppingList, ShoppingListAddRequest } from '@/types';
import {
  addShoppingListItems,
  checkShoppingListItem,
  removeShoppingListItem,
} from './shopping.api';

/** 장보기 항목 추가. 응답으로 온 전체 목록을 캐시에 반영한다. */
export const useAddShoppingListItems = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ShoppingListAddRequest) =>
      addShoppingListItems(userId as string, body),
    onSuccess: (data) =>
      queryClient.setQueryData<ShoppingList>(
        queryKeys.shoppingList(userId ?? ''),
        data,
      ),
  });
};

/** 장보기 항목 체크/해제. */
export const useCheckShoppingListItem = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, checked }: { itemId: number; checked: boolean }) =>
      checkShoppingListItem(userId as string, itemId, { checked }),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: queryKeys.shoppingList(userId ?? ''),
      }),
  });
};

/** 장보기 항목 삭제. */
export const useRemoveShoppingListItem = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: number) =>
      removeShoppingListItem(userId as string, itemId),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: queryKeys.shoppingList(userId ?? ''),
      }),
  });
};
