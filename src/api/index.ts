import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { showErrorPopup } from '@/libs/errorPopupBridge';
import { session } from '@/libs/session';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/constants/queryKeys';
import type { ApiErrorBody } from '@/types';

/** 기기 인증 엔드포인트 — 여기서 나는 401 은 만료가 아니라 인증 자체 실패다. */
const DEVICE_AUTH_PATH = '/api/v1/auth/device';

/**
 * 공용 axios 인스턴스.
 * baseURL 은 .env 의 VITE_SERVER_URL 로 주입한다. (게이트웨이를 거치면 빈 값=상대경로)
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 15_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 요청 인터셉터 — 저장된 액세스 토큰을 Authorization 헤더로 주입한다. */
http.interceptors.request.use((config) => {
  const token = session.getToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

/* 응답 인터셉터 — 401 이면 세션을 비우고 재인증을 유도, 공통 에러 로깅. */
http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';

    if (status === 401 && !url.includes(DEVICE_AUTH_PATH)) {
      // 만료/무효 토큰. 세션을 비우고 세션 쿼리를 무효화하면 재부팅 시 다시 기기 인증한다.
      session.clear();
      void queryClient.invalidateQueries({ queryKey: queryKeys.session });
    }

    // 연결 자체가 안 되는 에러/서버 점검은 전역 팝업으로 안내
    if (!error.response) {
      showErrorPopup({ type: 'NETWORK_ERROR' });
    } else if (status === 503) {
      showErrorPopup({ type: 'SERVER_UNAVAILABLE', code: status });
    }

    if (import.meta.env.DEV) {
      console.error(
        '[API ERROR]',
        status,
        url,
        error.response?.data?.message ?? error.message,
      );
    }
    return Promise.reject(error);
  },
);

/**
 * 실패 응답에서 사람이 읽을 메시지를 뽑아낸다.
 * 백엔드가 통일된 {@link ApiErrorBody} 를 주므로 그 message 를 우선 사용한다.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.',
): string => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

/** 실패 응답의 HTTP 상태 코드 (없으면 undefined). */
export const getApiErrorStatus = (error: unknown): number | undefined =>
  axios.isAxiosError(error) ? error.response?.status : undefined;

/* 응답의 data 만 바로 꺼내 쓰는 얇은 헬퍼들 */
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    http.get<T>(url, config).then((res: AxiosResponse<T>) => res.data),
  post: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    http.post<T>(url, body, config).then((res: AxiosResponse<T>) => res.data),
  put: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    http.put<T>(url, body, config).then((res: AxiosResponse<T>) => res.data),
  patch: <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    http.patch<T>(url, body, config).then((res: AxiosResponse<T>) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    http.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data),
};
