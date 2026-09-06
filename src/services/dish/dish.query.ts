import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import type { DishListParams } from '@/types';
import { getDish, getDishes } from './dish.api';

/** 크롤링해 둔 정적 자료라 한 번 받으면 세션 동안 다시 부를 이유가 없다. */
const DISH_CACHE_TIME = 30 * 60 * 1000;

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

/**
 * 여러 요리의 대표 이미지 주소를 한 번에 얻는다.
 *
 * 식단·템플릿 응답에는 dishId 와 이름만 있고 이미지가 없어 요리 상세로 따로 받아 온다.
 * 같은 dishId 는 캐시를 공유하므로 화면을 오가도 다시 부르지 않는다.
 *
 * @returns dishId → 이미지 주소(없으면 null) 맵과, 아직 받아오는 중인지 여부.
 */
export const useDishImages = (dishIds: (number | null | undefined)[]) => {
  // 같은 요리가 여러 끼니에 겹쳐도 요청은 한 번만 나가게 중복을 걷어낸다.
  const ids = [...new Set(dishIds.filter((id): id is number => id != null))];

  return useQueries({
    queries: ids.map((dishId) => ({
      queryKey: queryKeys.dishes.detail(dishId),
      queryFn: () => getDish(dishId),
      staleTime: DISH_CACHE_TIME,
      gcTime: DISH_CACHE_TIME,
    })),
    combine: (results) => ({
      images: Object.fromEntries(
        ids.map((id, index) => [id, results[index].data?.dishImageUrl ?? null]),
      ) as Record<number, string | null>,
      isLoading: results.some((result) => result.isLoading),
    }),
  });
};
