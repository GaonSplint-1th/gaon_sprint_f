import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import RecipePage from '@/pages/Recipe';
import NotFoundPage from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.RECIPE, element: <RecipePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
