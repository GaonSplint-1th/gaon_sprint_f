/**
 * 라우트 경로 상수. Link/navigate 에서 문자열 하드코딩 대신 사용.
 */
export const ROUTES = {
  HOME: '/',
  INGREDIENT_REGISTER: '/ingredient-register',
  RECIPE: '/recipe/:id',
  /** 식단 작성 — 추천받은 식단을 하루씩 확정해 일주일을 채운다. */
  MENU_PLAN: '/plan',
  /** 식단 수정 — 쓰고 있는 식단에서 한두 끼를 고친다. */
  MENU_EDIT: '/edit',
  SHOPPING: '/shopping',
} as const;
