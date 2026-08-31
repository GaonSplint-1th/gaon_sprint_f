import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import ErrorPopup from '@/components/common/ErrorPopup';
import { ERROR_POPUP_PRESETS } from '@/constants';
import { registerErrorPopupBridge } from '@/libs/errorPopupBridge';
import type { ErrorPopupOptions, ErrorPopupType } from '@/types';

interface ErrorPopupState {
  isOpen: boolean;
  type: ErrorPopupType;
  message: string;
  code?: string | number;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const INITIAL_STATE: ErrorPopupState = {
  isOpen: false,
  type: 'API_ERROR',
  message: '',
  confirmText: '확인',
};

const ErrorPopupProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ErrorPopupState>(INITIAL_STATE);

  const hideError = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const showError = useCallback((options: ErrorPopupOptions) => {
    setState((prev) => {
      // 한 번에 하나만 띄운다 — 이미 팝업이 떠 있으면 이후 요청은 무시한다.
      if (prev.isOpen) return prev;

      const preset = ERROR_POPUP_PRESETS[options.type];
      return {
        isOpen: true,
        type: options.type,
        message: options.message ?? preset.message,
        code: options.code,
        confirmText: options.confirmText ?? preset.confirmText,
        cancelText: options.cancelText ?? preset.cancelText,
        onConfirm: options.onConfirm,
        onCancel: options.onCancel,
      };
    });
  }, []);

  useEffect(() => {
    registerErrorPopupBridge(showError);
    return () => registerErrorPopupBridge(null);
  }, [showError]);

  return (
    <>
      {children}
      {state.isOpen && (
        <ErrorPopup
          message={state.message}
          code={state.code}
          confirmText={state.confirmText}
          cancelText={state.cancelText}
          onConfirm={() => {
            state.onConfirm?.();
            hideError();
          }}
          onCancel={
            state.cancelText
              ? () => {
                  state.onCancel?.();
                  hideError();
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default ErrorPopupProvider;
