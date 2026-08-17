import type { ErrorPopupOptions } from '@/types';

/**
 * axios 인터셉터처럼 React 트리 밖에서도 에러 팝업을 띄울 수 있도록 하는 통로.
 * ErrorPopupProvider가 마운트될 때 showError를 등록하고, 언마운트 시 해제한다.
 */
type ShowErrorFn = (options: ErrorPopupOptions) => void;

let showErrorFn: ShowErrorFn | null = null;

export const registerErrorPopupBridge = (fn: ShowErrorFn | null) => {
  showErrorFn = fn;
};

export const showErrorPopup = (options: ErrorPopupOptions) => {
  showErrorFn?.(options);
};
