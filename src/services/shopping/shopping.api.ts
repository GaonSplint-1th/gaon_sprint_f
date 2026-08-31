import { api } from '@/api';
import type {
  ShoppingList,
  ShoppingListAddRequest,
  ShoppingListItem,
  ShoppingListItemCheckRequest,
} from '@/types';

const base = (userId: string) => `/api/v1/users/${userId}/shopping-list-items`;

/** 장보기 체크리스트 조회. */
export const getShoppingList = (userId: string) =>
  api.get<ShoppingList>(base(userId));

/** 장보기 항목 추가 — 성공 시 갱신된 전체 목록을 반환한다. */
export const addShoppingListItems = (
  userId: string,
  body: ShoppingListAddRequest,
) => api.post<ShoppingList>(base(userId), body);

/** 장보기 항목 체크/해제 (수량·가격은 건드리지 않는다). */
export const checkShoppingListItem = (
  userId: string,
  itemId: number,
  body: ShoppingListItemCheckRequest,
) => api.patch<ShoppingListItem>(`${base(userId)}/${itemId}`, body);

/** 장보기 항목 삭제 (hard delete). */
export const removeShoppingListItem = (userId: string, itemId: number) =>
  api.delete<void>(`${base(userId)}/${itemId}`);
