import { api } from '@/api';
import { session } from '@/libs/session';
import type {
  AuthSession,
  DeviceAuthRequest,
  DeviceAuthResponse,
} from '@/types';

/** 기기 인증 요청 (자동 가입 + 토큰 발급). */
export const requestDeviceAuth = (body: DeviceAuthRequest) =>
  api.post<DeviceAuthResponse>('/api/v1/auth/device', body);

/**
 * 유효한 세션을 보장한다.
 * 저장된 토큰이 살아 있으면 그대로 쓰고, 없거나 만료됐으면 기기 인증으로 새로 발급받는다.
 * 앱 부팅 시 한 번, 401 로 세션이 무효화됐을 때 다시 호출된다.
 */
export const ensureSession = async (): Promise<AuthSession> => {
  const current = session.get();
  if (current && session.isValid()) return current;

  const res = await requestDeviceAuth({ deviceId: session.getDeviceId() });
  return session.save(res);
};
