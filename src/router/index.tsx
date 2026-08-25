import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import RecipePage from '@/pages/Recipe';
import DietRecommendPage from '@/pages/DietRecommend';
import MenuEditPage from '@/pages/MenuEdit';
import IngredientRegisterPage from '@/pages/IngredientRegister';
import ErrorCheckPage from '@/pages/ErrorCheck';
import NotFoundPage from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.RECIPE, element: <RecipePage /> },
      { path: 'recommend', element: <DietRecommendPage /> },
      { path: 'recommend/loading', element: <DietRecommendPage /> },
      { path: 'edit', element: <MenuEditPage /> },
      { path: ROUTES.INGREDIENT_REGISTER, element: <IngredientRegisterPage /> },
      { path: ROUTES.ERROR_CHECK, element: <ErrorCheckPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
