import { api } from '@/api';
import type { DishResponse, Recipe } from '@/types';

// TODO: 실제 엔드포인트로 교체
const MOCK_RECIPE: Omit<Recipe, 'id'> = {
  name: '계란토스트',
  // 백엔드에서 실제 메뉴 이미지 URL을 내려주면 이 값으로 대체
  imageUrl: 'https://picsum.photos/seed/egg',
  steps: [
    {
      order: 1,
      description:
        '볼에 계란 2개, 우유 50ml, 설탕 1큰술을 넣고 골고루 풀어줍니다.',
      imageUrl: 'https://picsum.photos/seed/egg-toast-step1/300/300',
    },
    { order: 2, description: '식빵 2장을 계란물에 앞뒤로 충분히 적셔줍니다.' },
    {
      order: 3,
      description: '팬을 중약불로 달군 뒤 버터 1작은술을 녹입니다.',
      imageUrl: 'https://picsum.photos/seed/egg-toast-step3/300/300',
    },
    {
      order: 4,
      description: '식빵을 올려 양면이 노릇해질 때까지 2~3분씩 구워줍니다.',
    },
    {
      order: 5,
      description:
        '한 김 식힌 뒤 먹기 좋은 크기로 잘라 접시에 담아 완성합니다.',
      imageUrl: 'https://picsum.photos/seed/egg-toast-step5/300/300',
    },
  ],
  ingredients: [
    { name: '식빵', amount: '2장' },
    { name: '계란', amount: '2개' },
    { name: '우유', amount: '50ml' },
    { name: '설탕', amount: '1큰술' },
    { name: '버터', amount: '1작은술' },
    { name: '소금', amount: '한 꼬집' },
  ],
};

const USE_MOCK_RECIPE = import.meta.env.VITE_USE_MOCK_RECIPE === 'true';

/** rawAmountText가 없으면 quantity+unit으로 대체 표기한다. */
const formatAmount = (
  ingredient: DishResponse['ingredients'][number],
): string => {
  if (ingredient.rawAmountText) return ingredient.rawAmountText;
  if (ingredient.quantity != null) {
    return `${ingredient.quantity}${ingredient.unit ?? ''}`;
  }
  return '';
};

/** API 명세서 "식사 조회"(GET /api/v1/dishes/{dishId}) 응답을 화면에서 쓰는 Recipe로 변환. */
const mapDishToRecipe = (dish: DishResponse): Recipe => ({
  id: dish.dishId,
  name: dish.dishName,
  imageUrl: dish.dishImageUrl,
  steps: dish.steps
    .slice()
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map((step) => ({
      order: step.stepNumber,
      description: step.description,
      imageUrl: step.stepImageUrl,
    })),
  ingredients: dish.ingredients
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((ingredient) => ({
      // 마스터 재료(ingredient_id)와 매칭되지 않은 경우 ingredientName이 비어 있어 원문(rawIngredientName)으로 대체
      name: ingredient.ingredientName || ingredient.rawIngredientName,
      amount: formatAmount(ingredient),
    })),
});

export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const dish = await api.get<DishResponse>(`/api/v1/dishes/${id}`);
    return mapDishToRecipe(dish);
  } catch (error) {
    // 백엔드 dish 데이터가 비어있는 개발 구간 임시 대응. 데이터 채워지면 이 catch와 VITE_USE_MOCK_RECIPE 제거.
    if (USE_MOCK_RECIPE) {
      console.warn('[getRecipeById] API 실패, 목데이터로 대체합니다.', error);
      return { id, ...MOCK_RECIPE };
    }
    throw error;
  }
};
