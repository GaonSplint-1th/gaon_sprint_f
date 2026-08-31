import { RouterProvider } from 'react-router-dom';
import QueryProvider from '@/providers/QueryProvider';
import ErrorPopupProvider from '@/providers/ErrorPopupProvider';
import SessionProvider from '@/providers/SessionProvider';
import { router } from '@/router';

function App() {
  return (
    <QueryProvider>
      <ErrorPopupProvider>
        {/* 기기 인증을 앱 부팅 시 한 번 실행한다. userId 가 필요한 쿼리는 이 세션이 준비되면 깨어난다. */}
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </ErrorPopupProvider>
    </QueryProvider>
  );
}

export default App;
