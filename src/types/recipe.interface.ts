/** 조리순서 한 단계. */
export interface CookingStep {
  order: number;
  description: string;
  imageUrl?: string;
}

/** 레시피 상세 정보. */
export interface Recipe {
  id: string;
  name: string;
  imageUrl?: string;
  steps: CookingStep[];
}
