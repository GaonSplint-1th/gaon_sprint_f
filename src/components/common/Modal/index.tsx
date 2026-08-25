import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@/components/icons';
import * as s from './style.css';

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** 하단에 고정할 버튼 등. 있으면 본문 스크롤 끝이 흰색으로 페이드된다. */
  footer?: ReactNode;
}

/**
 * 공용 모달.
 * 배경 스크롤 잠금 · ESC 닫기 · 포커스 트랩 · 포커스 복원을 한곳에서 처리한다.
 * 화면마다 오버레이를 새로 만들지 말고 이 컴포넌트를 쓴다.
 */
const Modal = ({ title, onClose, children, footer }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // onClose 가 매 렌더 새로 만들어져도 아래 effect 가 다시 돌지 않도록 최신 값만 ref 에 담아둔다.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;

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

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={s.panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={s.header}>
          <p className={s.title}>{title}</p>
          <button
            type="button"
            className={s.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={s.bodyWrap}>
          <div className={footer ? `${s.body} ${s.bodyWithFooter}` : s.body}>
            {children}
          </div>

          {footer && (
            <div className={s.footer}>
              <div className={s.footerInner}>{footer}</div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
