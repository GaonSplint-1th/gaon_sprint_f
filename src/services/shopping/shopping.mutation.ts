import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import { getWeeklyMenuPrice } from '@/services/weeklyMenu';
import { toShoppingListItems } from '@/utils/shopping';
import type {
  ShoppingList,
  ShoppingListAddRequest,
  ShoppingListItemStatus,
} from '@/types';
import {
  addShoppingListItems,
  changeShoppingListItemStatus,
  removeShoppingListItem,
} from './shopping.api';

/** 영수증 발행. 응답으로 온 전체 목록을 캐시에 반영한다. */
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

/**
 * 식단 전체의 영수증을 뽑는다.
 *
 * 가격 계산(21끼 내역)을 받아 재료 단위로 접은 뒤 한 번에 올린다.
 * 이미 있는 재료는 백엔드가 필요량·가격만 갱신하므로, 장을 보던 중에
 * 식단을 손봐 다시 발행해도 담음/안 삼 상태는 살아남는다.
 */
export const useIssueShoppingList = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (weeklyMenuId: number) => {
      const price = await getWeeklyMenuPrice(userId as string, weeklyMenuId);
      return addShoppingListItems(userId as string, {
        weeklyMenuId,
        items: toShoppingListItems(price),
      });
    },
    onSuccess: (data) =>
      queryClient.setQueryData<ShoppingList>(
        queryKeys.shoppingList(userId ?? ''),
        data,
      ),
  });
};

/**
 * 한 줄의 상태 변경.
 *
 * 마트에서 한 줄씩 누르는 동작이라 응답을 기다리지 않고 먼저 그린다.
 * 실패하면 직전 목록으로 되돌린다.
 */
export const useChangeShoppingListItemStatus = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();
  const listKey = queryKeys.shoppingList(userId ?? '');

  return useMutation({
    mutationFn: ({
      itemId,
      status,
    }: {
      itemId: number;
      status: ShoppingListItemStatus;
    }) => changeShoppingListItemStatus(userId as string, itemId, { status }),

    onMutate: async ({ itemId, status }) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const previous = queryClient.getQueryData<ShoppingList>(listKey);
      if (previous) {
        queryClient.setQueryData<ShoppingList>(listKey, {
          ...previous,
          items: previous.items.map((item) =>
            item.shoppingListItemId === itemId ? { ...item, status } : item,
          ),
        });
      }
      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData<ShoppingList>(listKey, context.previous);
      }
    },

    onSettled: () => void queryClient.invalidateQueries({ queryKey: listKey }),
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
