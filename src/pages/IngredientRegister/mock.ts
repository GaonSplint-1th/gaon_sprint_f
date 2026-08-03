/** 카테고리별 식재료 목록 (임시 목업 데이터) */
export interface IngredientCategory {
  label: string;
  items: string[];
}

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  { label: '육류', items: ['돼지 앞다리살', '냉동 차돌박이'] },
  { label: '채소', items: ['양파', '대파', '당근'] },
  { label: '기타', items: ['계란', '두부'] },
];
