import { api } from '@/api';
import type {
  FavoriteMenuAddRequest,
  FavoriteMenuAdded,
  FavoriteMenus,
} from '@/types';

/** 즐겨찾기 목록 조회 (weekly_menu 템플릿 기준). */
export const getFavorites = (userId: string) =>
  api.get<FavoriteMenus>(`/api/v1/users/${userId}/favorite-menus`);

/** 즐겨찾기 등록 (이미 찜한 템플릿이면 409). */
export const addFavorite = (userId: string, body: FavoriteMenuAddRequest) =>
  api.post<FavoriteMenuAdded>(`/api/v1/users/${userId}/favorite-menus`, body);

/** 즐겨찾기 해제. */
export const removeFavorite = (userId: string, weeklyMenuId: number) =>
  api.delete<void>(`/api/v1/users/${userId}/favorite-menus/${weeklyMenuId}`);
