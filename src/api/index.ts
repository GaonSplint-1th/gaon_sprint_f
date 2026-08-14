import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { showErrorPopup } from '@/libs/errorPopupBridge';

/**
 * 공용 axios 인스턴스.
 * baseURL 은 .env 의 VITE_SERVER_URL 로 주입한다.
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 15_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 요청 인터셉터 — 필요 시 토큰 주입 등 */
http.interceptors.request.use((config) => {
  return config;
});

/*
 * 응답 인터셉터 — 공통 에러 로깅 + 연결 자체가 안 되는 에러는 여기서 바로 팝업을 띄운다.
 * 4xx(비즈니스 로직) 에러는 페이지마다 처리 방식이 다를 수 있어 여기서 임의로 팝업을 띄우지 않고,
 * 호출부에서 useErrorPopup으로 필요할 때만 띄운다.
 */
http.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('[API ERROR]', error.response?.status, error.config?.url);
    }

    if (!error.response) {
      showErrorPopup({ type: 'NETWORK_ERROR' });
    } else if (error.response.status === 503) {
      showErrorPopup({ type: 'SERVER_UNAVAILABLE', code: error.response.status });
    }

    return Promise.reject(error);
  },
);

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
