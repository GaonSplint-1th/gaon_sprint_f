import { createPortal } from 'react-dom';
import { WarningOutline } from '@/components/icons';
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

  return createPortal(
    <div className={s.overlay}>
      <div
        className={s.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-describedby="error-popup-message"
      >
        <div className={s.content}>
          <WarningOutline size={35} />
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
