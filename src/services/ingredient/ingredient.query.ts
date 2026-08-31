import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import { useUserId } from '@/services/auth';
import type { IngredientSearchParams } from '@/types';
import {
  getIngredient,
  getUserIngredients,
  searchIngredients,
} from './ingredient.api';

/** 식재료 검색 (자동완성 등). 타이핑 중 이전 결과를 유지해 깜빡임을 줄인다. */
export const useIngredientSearch = (
  params: IngredientSearchParams,
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: queryKeys.ingredients.search(params),
    queryFn: () => searchIngredients(params),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
  });

/** 식재료 단건 조회. */
export const useIngredient = (ingredientId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.ingredients.detail(ingredientId ?? -1),
    queryFn: () => getIngredient(ingredientId as number),
    enabled: ingredientId != null,
  });

/** 현재 유저의 보유 식재료 목록. */
export const useUserIngredients = () => {
  const userId = useUserId();
  return useQuery({
    queryKey: queryKeys.ingredients.owned(userId ?? ''),
    queryFn: () => getUserIngredients(userId as string),
    enabled: !!userId,
  });
};
