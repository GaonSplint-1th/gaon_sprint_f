import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import type { DishListParams } from '@/types';
import { getDish, getDishes } from './dish.api';

/** 요리 상세. */
export const useDish = (dishId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.dishes.detail(dishId ?? -1),
    queryFn: () => getDish(dishId as number),
    enabled: dishId != null,
  });

/** 요리 목록. */
export const useDishes = (
  params: DishListParams = {},
  options?: { enabled?: boolean },
) =>
  useQuery({
    queryKey: queryKeys.dishes.list(params),
    queryFn: () => getDishes(params),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
  });
