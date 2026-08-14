import type { DayOfWeek } from '@/types';
import type { IngredientSearchParams } from '@/types';
import type { DishListParams } from '@/types';

/**
 * React Query 키를 한곳에서 관리한다.
 * 팩토리 함수로 파라미터별 키를 안정적으로 생성해 캐시 무효화 범위를 예측 가능하게 한다.
 */
export const queryKeys = {
  /** 기기 인증 세션. */
  session: ['session'] as const,

  user: {
    all: ['users'] as const,
    detail: (userId: string) => [...queryKeys.user.all, userId] as const,
    preferences: (userId: string) =>
      [...queryKeys.user.all, userId, 'preferences'] as const,
  },

  ingredients: {
    all: ['ingredients'] as const,
    search: (params: IngredientSearchParams) =>
      [...queryKeys.ingredients.all, 'search', params] as const,
    detail: (ingredientId: number) =>
      [...queryKeys.ingredients.all, ingredientId] as const,
    /** 유저가 보유한 식재료. */
    owned: (userId: string) =>
      [...queryKeys.user.all, userId, 'ingredients'] as const,
  },

  currentMenu: {
    root: (userId: string) =>
      [...queryKeys.user.all, userId, 'current-menu'] as const,
    day: (userId: string, dayOfWeek: DayOfWeek) =>
      [...queryKeys.currentMenu.root(userId), 'days', dayOfWeek] as const,
  },

  weeklyMenus: {
    all: ['weekly-menus'] as const,
    /** 공개 + 내 템플릿 목록. */
    templates: () => [...queryKeys.weeklyMenus.all] as const,
    detail: (weeklyMenuId: number) =>
      [...queryKeys.weeklyMenus.all, weeklyMenuId] as const,
    /** 내가 만들거나 수정한 개인 템플릿 목록. */
    mine: (userId: string) =>
      [...queryKeys.user.all, userId, 'weekly-menus'] as const,
    price: (userId: string, weeklyMenuId: number, dayOfWeek?: DayOfWeek) =>
      [
        ...queryKeys.user.all,
        userId,
        'weekly-menus',
        weeklyMenuId,
        'price',
        { dayOfWeek: dayOfWeek ?? null },
      ] as const,
  },

  favorites: (userId: string) =>
    [...queryKeys.user.all, userId, 'favorite-menus'] as const,

  shoppingList: (userId: string) =>
    [...queryKeys.user.all, userId, 'shopping-list-items'] as const,

  dishes: {
    all: ['dishes'] as const,
    list: (params: DishListParams) =>
      [...queryKeys.dishes.all, 'list', params] as const,
    detail: (dishId: number) => [...queryKeys.dishes.all, dishId] as const,
  },
} as const;
