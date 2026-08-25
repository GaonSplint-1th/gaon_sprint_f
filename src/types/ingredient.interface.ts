import type { PageParams } from './common.interface';

/* ── 공용 식재료 마스터 (GET /api/v1/ingredients) ─────────────── */

/** 공용 ingredient master 한 건. */
export interface Ingredient {
  ingredientId: number;
  ingredientName: string;
  normalizedName: string;
  category: string | null;
  ingredientImageUrl: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

/** 식재료 검색 파라미터. */
export interface IngredientSearchParams extends PageParams {
  /** ingredientName / normalizedName / category LIKE 검색. */
  keyword?: string;
  /** true 면 활성 재료만. 기본 false. */
  activeOnly?: boolean;
}

/* ── 유저 보유 식재료 (/users/{userId}/ingredients) ───────────── */

/** 유저가 보유한 식재료 한 건. */
export interface UserIngredient {
  ingredientId: number;
  ingredientName: string;
  category: string | null;
  ownedGrams: number | null;
  memo: string | null;
}

/** 유저 보유 식재료 목록 응답. */
export interface UserIngredientsResponse {
  userId: string;
  items: UserIngredient[];
}

/** 유저 식재료 추가/수정 요청 (이미 있으면 ownedGrams/memo 갱신). */
export interface UserIngredientUpsertRequest {
  ingredientId: number;
  ownedGrams?: number;
  memo?: string;
}

/* ── 식재료 요청 (마스터에 없는 재료 요청) ───────────────────── */

export interface IngredientRequestCreateRequest {
  ingredientName: string;
  memo?: string;
}

export interface IngredientRequest {
  requestId: number;
  userId: string;
  ingredientName: string;
  memo: string | null;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}
