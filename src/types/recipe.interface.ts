/** 조리순서 한 단계. */
export interface CookingStep {
  order: number;
  description: string;
  imageUrl?: string;
}

/** 재료 한 항목 (재료명 + 양). */
export interface Ingredient {
  name: string;
  amount: string;
}

/** 레시피 상세 정보. */
export interface Recipe {
  id: string;
  name: string;
  imageUrl?: string;
  steps: CookingStep[];
  ingredients: Ingredient[];
}

/** GET /api/v1/dishes/{dishId} 응답 바디 (API 명세서 "식사 조회" 기준). */
export interface DishResponse {
  dishId: string;
  dishName: string;
  dishDescription?: string;
  dishImageUrl?: string;
  cookingTimeMinutes?: number;
  servings?: number;
  sourceName?: string;
  sourceUrl?: string;
  externalRecipeId?: string;
  crawledAt?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  steps: DishRecipeStepResponse[];
  ingredients: DishIngredientResponse[];
}

export interface DishRecipeStepResponse {
  dishRecipeStepId: string;
  dishId: string;
  stepNumber: number;
  description: string;
  stepImageUrl?: string;
  timerSeconds?: number;
  cookingTip?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DishIngredientResponse {
  dishIngredientId: string;
  dishId: string;
  ingredientId?: string;
  ingredientName?: string;
  ingredientCategory?: string;
  rawIngredientName: string;
  rawAmountText?: string;
  quantity?: number;
  unit?: string;
  requiredGrams?: number;
  optional: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
