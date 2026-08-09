import type { AuthSession, DeviceAuthResponse } from '@/types';

/**
 * 인증 세션 저장소.
 *
 * - deviceId: 기기 최초 실행 시 한 번 생성해 영구 보관한다. 이 값이 곧 계정 열쇠다.
 * - accessToken / userId: 기기 인증 응답을 받아 저장하고, axios 인터셉터가 토큰을 주입한다.
 *
 * localStorage 에 직접 붙지 않고 이 모듈만 거치게 해서 키 이름과 만료 계산을 한곳에 모은다.
 */

const STORAGE_KEYS = {
  deviceId: 'gaon.deviceId',
  session: 'gaon.session',
} as const;

/** 만료 임박으로 간주하는 여유 시간(ms). 이 안쪽이면 토큰을 새로 받는다. */
const EXPIRY_LEEWAY_MS = 60_000;

/** localStorage 접근이 막힌 환경(사파리 프라이빗 등)에서도 죽지 않도록 감싼다. */
const storage = {
  get(key: string): string | null {
    try {
      return globalThis.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch {
      /* 저장 실패는 조용히 무시 — 메모리 세션으로만 동작 */
    }
  },
  remove(key: string): void {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      /* noop */
    }
  },
};

const createDeviceId = (): string => {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  // 구형 브라우저 폴백.
  return `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

let memoized: AuthSession | null | undefined;

const readSession = (): AuthSession | null => {
  if (memoized !== undefined) return memoized;
  const raw = storage.get(STORAGE_KEYS.session);
  if (!raw) return (memoized = null);
  try {
    memoized = JSON.parse(raw) as AuthSession;
  } catch {
    memoized = null;
  }
  return memoized;
};

export const session = {
  /** 기기 식별자. 없으면 만들어 저장한 뒤 반환한다. */
  getDeviceId(): string {
    const existing = storage.get(STORAGE_KEYS.deviceId);
    if (existing) return existing;
    const created = createDeviceId();
    storage.set(STORAGE_KEYS.deviceId, created);
    return created;
  },

  /** 저장된 세션(없으면 null). */
  get(): AuthSession | null {
    return readSession();
  },

  getToken(): string | null {
    return readSession()?.accessToken ?? null;
  },

  getUserId(): string | null {
    return readSession()?.userId ?? null;
  },

  /** 토큰이 있고 만료 여유 시간 안쪽이 아닌지. */
  isValid(): boolean {
    const current = readSession();
    return !!current && current.expiresAt - EXPIRY_LEEWAY_MS > Date.now();
  },

  /** 기기 인증 응답을 세션으로 저장한다. */
  save(res: DeviceAuthResponse): AuthSession {
    const next: AuthSession = {
      accessToken: res.accessToken,
      userId: res.userId,
      userName: res.userName,
      expiresAt: Date.now() + res.expiresInSeconds * 1000,
    };
    memoized = next;
    storage.set(STORAGE_KEYS.session, JSON.stringify(next));
    return next;
  },

  /** 세션만 지운다. deviceId 는 유지해 다음 인증에서 같은 계정으로 복귀한다. */
  clear(): void {
    memoized = null;
    storage.remove(STORAGE_KEYS.session);
  },
};
