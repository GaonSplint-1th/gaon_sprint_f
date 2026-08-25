import { useEffect, useRef, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { WarningIcon } from '@/components/icons';
import * as s from './style.css';

interface ErrorPopupProps {
  message: string;
  code?: string | number;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ErrorPopup = ({
  message,
  code,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ErrorPopupProps) => {
  const hasCancel = Boolean(cancelText && onCancel);
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  // 열려 있는 동안: 배경 스크롤 잠금 + 확인 버튼 자동 포커스 + 닫힐 때 이전 포커스 복원
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    confirmRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // ESC = 취소(있으면)/확인, Tab = 다이얼로그 안에서만 포커스 순환(포커스 트랩)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      (hasCancel ? onCancel : onConfirm)?.();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusables =
      dialogRef.current?.querySelectorAll<HTMLElement>('button');
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div className={s.overlay}>
      <div
        ref={dialogRef}
        className={s.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-describedby="error-popup-message"
        onKeyDown={handleKeyDown}
      >
        <div className={s.content}>
          <WarningIcon size={35} />
          <p id="error-popup-message" className={s.message}>
            {message}
          </p>
          {code !== undefined && <p className={s.code}>오류 코드: {code}</p>}
        </div>

        <div className={s.actions}>
          {hasCancel && (
            <button type="button" className={s.cancelButton} onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button
            ref={confirmRef}
            type="button"
            className={hasCancel ? s.confirmButtonWithCancel : s.confirmButton}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ErrorPopup;
