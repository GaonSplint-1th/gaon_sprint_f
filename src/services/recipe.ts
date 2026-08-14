import { api } from '@/api';
import type { Recipe } from '@/types';

// TODO: 실제 엔드포인트로 교체
const MOCK_RECIPE: Omit<Recipe, 'id'> = {
  name: '계란토스트',
  steps: [{ order: 1, description: '레시피' }],
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    return await api.get<Recipe>(`/recipes/${id}`);
  } catch (error) {
    // 백엔드 /recipes/:id 미구현 구간 임시 대응. 엔드포인트 완성되면 이 catch 제거.
    if (import.meta.env.DEV) {
      console.warn('[getRecipeById] API 실패, 목데이터로 대체합니다.', error);
      return { id, ...MOCK_RECIPE };
    }
    throw error;
  }
};
