import { RouterProvider } from 'react-router-dom';
import QueryProvider from '@/providers/QueryProvider';
import SessionProvider from '@/providers/SessionProvider';
import ErrorPopupProvider from '@/providers/ErrorPopupProvider';
import { router } from '@/router';

function App() {
  return (
    <QueryProvider>
      <ErrorPopupProvider>
        {/* 앱 첫 실행에 기기 인증(POST /auth/device)으로 토큰을 받아 둔다. */}
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </ErrorPopupProvider>
    </QueryProvider>
  );
}

export default App;
