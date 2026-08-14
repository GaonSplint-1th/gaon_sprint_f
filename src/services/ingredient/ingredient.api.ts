import { api } from '@/api';
import type {
  Ingredient,
  IngredientRequest,
  IngredientRequestCreateRequest,
  IngredientSearchParams,
  PageResponse,
  UserIngredientsResponse,
  UserIngredientUpsertRequest,
} from '@/types';

/* ── 공용 식재료 마스터 ───────────────────────────────────────── */

/** 식재료 검색 (공용 마스터, 페이지네이션). */
export const searchIngredients = (params: IngredientSearchParams = {}) =>
  api.get<PageResponse<Ingredient>>('/api/v1/ingredients', { params });

/** 식재료 단건 조회. */
export const getIngredient = (ingredientId: number) =>
  api.get<Ingredient>(`/api/v1/ingredients/${ingredientId}`);

/* ── 유저 보유 식재료 ─────────────────────────────────────────── */

/** 유저가 보유한 식재료 목록. */
export const getUserIngredients = (userId: string) =>
  api.get<UserIngredientsResponse>(`/api/v1/users/${userId}/ingredients`);

/** 식재료 추가/수정 — 성공 시 갱신된 전체 보유 목록을 반환한다. */
export const addUserIngredient = (
  userId: string,
  body: UserIngredientUpsertRequest,
) =>
  api.post<UserIngredientsResponse>(
    `/api/v1/users/${userId}/ingredients`,
    body,
  );

/** 유저 보유 식재료 삭제 (공용 마스터는 유지). */
export const removeUserIngredient = (userId: string, ingredientId: number) =>
  api.delete<void>(`/api/v1/users/${userId}/ingredients/${ingredientId}`);

/** 마스터에 없는 식재료 등록 요청. */
export const createIngredientRequest = (
  userId: string,
  body: IngredientRequestCreateRequest,
) =>
  api.post<IngredientRequest>(
    `/api/v1/users/${userId}/ingredient-requests`,
    body,
  );
