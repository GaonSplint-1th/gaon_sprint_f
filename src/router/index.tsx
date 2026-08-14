import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import ErrorCheckPage from '@/pages/ErrorCheck';
import NotFoundPage from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ERROR_CHECK.slice(1), element: <ErrorCheckPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
