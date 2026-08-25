import { useEffect, type RefObject } from 'react';

/** 포커스를 받을 수 있는 요소를 고르는 선택자. */
const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Options {
  /** 레이어의 바깥 상자. 포커스를 가둘 때 필요하다. */
  containerRef?: RefObject<HTMLElement | null>;
  /** Tab 이 레이어 밖으로 나가지 않게 가둘지. 기본 false. */
  trapFocus?: boolean;
}

/**
 * 화면을 덮는 레이어(모달·팝업·안내)의 공통 동작.
 *
 * 열려 있는 동안 뒤 화면 스크롤을 잠그고, Esc 로 닫고,
 * 필요하면 Tab 포커스를 레이어 안에 가둔다.
 *
 * 같은 코드가 에러 팝업·온보딩 안내·재료 팝업·미리보기 모달 네 곳에
 * 각자 들어가 있어 하나로 모았다.
 */
export const useDismissableLayer = (
  onDismiss: () => void,
  { containerRef, trapFocus = false }: Options = {},
) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusable = trapFocus
      ? containerRef?.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      : undefined;
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss();
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      // 레이어를 닫으면 열기 전에 보던 자리로 포커스를 돌려준다.
      previouslyFocused?.focus?.();
    };
  }, [onDismiss, containerRef, trapFocus]);
};
