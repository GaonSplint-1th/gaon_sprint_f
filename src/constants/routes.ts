/**
 * 라우트 경로 상수. Link/navigate 에서 문자열 하드코딩 대신 사용.
 */
export const ROUTES = {
  HOME: '/',
  INGREDIENT_REGISTER: '/ingredient-register',
  RECIPE: '/recipe/:id',
  MENU_EDIT: '/edit',
  SHOPPING: '/shopping',
} as const;
