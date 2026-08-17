export type ErrorPopupType =
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'SERVER_UNAVAILABLE'
  | 'UPDATE_REQUIRED';

export interface ErrorPopupOptions {
  type: ErrorPopupType;
  /** 여러 줄인 경우 '\n'으로 구분한다. */
  message?: string;
  /** 서버 응답 status 등 특정 에러를 식별할 코드. 있을 때만 "오류 코드: n"으로 표시한다. */
  code?: string | number;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
