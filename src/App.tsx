import { RouterProvider } from 'react-router-dom';
import QueryProvider from '@/providers/QueryProvider';
import ErrorPopupProvider from '@/providers/ErrorPopupProvider';
import { router } from '@/router';

function App() {
  return (
    <QueryProvider>
      <ErrorPopupProvider>
        <RouterProvider router={router} />
      </ErrorPopupProvider>
    </QueryProvider>
  );
}

export default App;
