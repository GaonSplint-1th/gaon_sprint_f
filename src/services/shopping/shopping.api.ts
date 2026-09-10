import { api } from '@/api';
import type {
  ShoppingList,
  ShoppingListAddRequest,
  ShoppingListItem,
  ShoppingListItemStatusRequest,
} from '@/types';

const base = (userId: string) => `/api/v1/users/${userId}/shopping-list-items`;

/** 현재 식단의 영수증. 현재 식단이 없으면 404. */
export const getShoppingList = (userId: string) =>
  api.get<ShoppingList>(base(userId));

/** 영수증 발행 — 성공 시 갱신된 전체 목록을 반환한다. */
export const addShoppingListItems = (
  userId: string,
  body: ShoppingListAddRequest,
) => api.post<ShoppingList>(base(userId), body);

/** 한 줄의 상태 변경 (필요량·가격은 건드리지 않는다). */
export const changeShoppingListItemStatus = (
  userId: string,
  itemId: number,
  body: ShoppingListItemStatusRequest,
) => api.patch<ShoppingListItem>(`${base(userId)}/${itemId}`, body);

/** 장보기 항목 삭제 (hard delete). 화면에서는 SKIPPED 로 대신한다. */
export const removeShoppingListItem = (userId: string, itemId: number) =>
  api.delete<void>(`${base(userId)}/${itemId}`);
