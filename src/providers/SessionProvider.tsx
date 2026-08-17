import type { PropsWithChildren } from 'react';
import { useSession } from '@/services/auth';

/**
 * 앱 부팅 시 기기 인증을 시작한다.
 * 세션 준비 여부와 무관하게 children 을 즉시 렌더하고,
 * userId 가 필요한 쿼리는 각 훅에서 enabled 로 대기했다가 세션이 준비되면 실행된다.
 */
const SessionProvider = ({ children }: PropsWithChildren) => {
  useSession();
  return <>{children}</>;
};

export default SessionProvider;
