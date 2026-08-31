import { api } from '@/api';
import type { Dish, DishListParams, DishSummary, PageResponse } from '@/types';

/** 요리(레시피) 상세 조회. */
export const getDish = (dishId: number) =>
  api.get<Dish>(`/api/v1/dishes/${dishId}`);

/** 요리 목록 조회 (페이지네이션). */
export const getDishes = (params: DishListParams = {}) =>
  api.get<PageResponse<DishSummary>>('/api/v1/dishes', { params });
