import type { Dish, Recipe } from '@/types';

/** rawAmountText 가 없으면 quantity + unit 으로 대체 표기한다. */
const formatAmount = (ingredient: Dish['ingredients'][number]): string => {
  if (ingredient.rawAmountText) return ingredient.rawAmountText;
  if (ingredient.quantity != null) {
    return `${ingredient.quantity}${ingredient.unit ?? ''}`;
  }
  return '';
};

/**
 * GET /dishes/{dishId} 응답을 레시피 화면이 쓰는 형태로 바꾼다.
 * 조리순서와 재료는 백엔드 정렬을 믿지 않고 여기서 다시 정렬한다.
 */
export const toRecipe = (dish: Dish): Recipe => ({
  id: String(dish.dishId),
  name: dish.dishName,
  imageUrl: dish.dishImageUrl ?? undefined,
  steps: dish.steps
    .slice()
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map((step) => ({
      order: step.stepNumber,
      description: step.description,
      imageUrl: step.stepImageUrl ?? undefined,
    })),
  ingredients: dish.ingredients
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((ingredient) => ({
      // 마스터 재료와 매칭되지 않았으면 원문 이름으로 대체한다.
      name: ingredient.ingredientName || ingredient.rawIngredientName,
      amount: formatAmount(ingredient),
    })),
});
