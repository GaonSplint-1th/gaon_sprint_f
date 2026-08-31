import type { PageParams } from './common.interface';

/** 레시피 조리 단계. */
export interface RecipeStep {
  dishRecipeStepId: number;
  dishId: number;
  stepNumber: number;
  description: string;
  stepImageUrl: string | null;
  timerSeconds: number | null;
  cookingTip: string | null;
  createdAt: string;
  updatedAt: string;
}

/** 레시피 재료. */
export interface RecipeIngredient {
  dishIngredientId: number;
  dishId: number;
  ingredientId: number | null;
  ingredientName: string | null;
  ingredientCategory: string | null;
  rawIngredientName: string;
  rawAmountText: string | null;
  quantity: number | null;
  unit: string | null;
  requiredGrams: number | null;
  optional: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

/** 요리(레시피 카드) 상세. */
export interface Dish {
  dishId: number;
  dishName: string;
  dishDescription: string | null;
  dishImageUrl: string | null;
  cookingTimeMinutes: number | null;
  servings: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  externalRecipeId: string | null;
  crawledAt: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
}

/** 요리 목록 항목 (steps/ingredients 제외). */
export type DishSummary = Omit<Dish, 'steps' | 'ingredients'>;

/** 요리 목록 검색 파라미터. */
export interface DishListParams extends PageParams {
  keyword?: string;
  sourceName?: string;
  activeOnly?: boolean;
}
