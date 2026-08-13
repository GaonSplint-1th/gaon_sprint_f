import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import IngredientRegisterPage from '@/pages/IngredientRegister';
import NotFoundPage from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'recommend', element: <HomePage /> },
      { path: 'recommend/loading', element: <HomePage /> },
      { path: 'edit', element: <HomePage /> },
    ],
  },
  // 자체 앱바를 가진 모바일 전용 화면 (RootLayout 미적용)
  { path: ROUTES.INGREDIENT_REGISTER, element: <IngredientRegisterPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
