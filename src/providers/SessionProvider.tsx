import type { PropsWithChildren } from 'react';
import { SplashScreen } from '@/components/common';
import { useSession } from '@/services/auth';

/**
 * 앱 부팅 시 기기 인증을 시작한다.
 * 세션 준비 여부와 무관하게 children 을 즉시 렌더하고,
 * userId 가 필요한 쿼리는 각 훅에서 enabled 로 대기했다가 세션이 준비되면 실행된다.
 *
 * 그동안 화면이 빈 채로 보이지 않도록 위에 부팅 화면을 덮는다.
 * 인증이 실패해도(isError) 스플래시에 갇히지 않게 함께 걷어낸다.
 */
const SessionProvider = ({ children }: PropsWithChildren) => {
  const session = useSession();
  return (
    <>
      {children}
      <SplashScreen ready={session.isSuccess || session.isError} />
    </>
  );
};

export default SessionProvider;
