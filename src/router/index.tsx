import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import RecipePage from '@/pages/Recipe';
import DietRecommendPage from '@/pages/DietRecommend';
import MenuEditPage from '@/pages/MenuEdit';
import MenuPlanPage from '@/pages/MenuPlan';
import ShoppingPage from '@/pages/Shopping';
import IngredientRegisterPage from '@/pages/IngredientRegister';
import NotFoundPage from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.RECIPE, element: <RecipePage /> },
      // 로딩(04 스켈레톤)은 별도 경로가 아니라 목록 조회 중 상태로 처리한다.
      { path: 'recommend', element: <DietRecommendPage /> },
      { path: 'plan', element: <MenuPlanPage /> },
      { path: 'edit', element: <MenuEditPage /> },
      { path: 'shopping', element: <ShoppingPage /> },
    ],
  },
  // 자체 앱바를 가진 모바일 전용 화면 (RootLayout 미적용)
  { path: ROUTES.INGREDIENT_REGISTER, element: <IngredientRegisterPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
