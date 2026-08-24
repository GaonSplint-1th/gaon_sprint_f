import { useEffect, useState, type RefObject } from 'react';
import { CloseIcon } from '@/components/icons';
import * as s from './style.css';

/** 하이라이트 테두리가 대상보다 바깥으로 물러나는 여백(px). */
const HIGHLIGHT_PADDING = 4;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface GuideStep {
  /** 짚어 줄 실제 요소. */
  target: RefObject<HTMLElement | null>;
  title: string;
  body: string;
  /** 설명을 대상 아래에 둘지 위에 둘지. 기본 아래. */
  placement?: 'below' | 'above';
  /** 버튼·카드처럼 면이 있는 대상은 안쪽을 옅은 초록으로 채운다. */
  filled?: boolean;
}

const toRect = (el: Element | null): Rect | null => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  return {
    top: r.top - HIGHLIGHT_PADDING,
    left: r.left - HIGHLIGHT_PADDING,
    width: r.width + HIGHLIGHT_PADDING * 2,
    height: r.height + HIGHLIGHT_PADDING * 2,
  };
};

interface OnboardingGuideProps {
  steps: GuideStep[];
  /** 스크린리더가 읽을 안내 이름. */
  label: string;
  onClose: () => void;
}

/**
 * 화면 위에 얹는 온보딩 안내(시안 "안내").
 *
 * 좌표를 시안 값으로 박지 않고 실제 요소를 measure 해서 그 위에 얹는다.
 * 데이터에 따라 카드·버튼 위치가 달라지므로 고정 좌표는 금방 어긋난다.
 */
const OnboardingGuide = ({ steps, label, onClose }: OnboardingGuideProps) => {
  const [rects, setRects] = useState<(Rect | null)[]>([]);

  useEffect(() => {
    const measure = () =>
      setRects(steps.map((step) => toRect(step.target.current)));
    // 대상이 아직 그려지기 전일 수 있어 다음 프레임에 한 번 더 잰다.
    measure();
    const raf = requestAnimationFrame(measure);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('resize', measure);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', measure);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [steps, onClose]);

  return (
    <div
      className={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <button
        type="button"
        className={s.close}
        aria-label="안내 닫기"
        onClick={onClose}
        autoFocus
      >
        <CloseIcon />
      </button>

      {steps.map((step, index) => {
        const rect = rects[index];
        if (!rect) return null;
        const above = step.placement === 'above';
        // 단계마다 조금씩 늦게 나타나 시선이 순서대로 따라가게 한다.
        const delay = `${index * 120}ms`;
        return (
          <div key={step.title}>
            <span
              className={`${s.highlight} ${step.filled ? s.highlightFilled : ''}`}
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                animationDelay: delay,
              }}
              aria-hidden="true"
            />
            <div
              className={s.callout}
              style={{
                ...(above
                  ? { bottom: `calc(100% - ${rect.top - 12}px)` }
                  : { top: rect.top + rect.height + 12 }),
                left: 24,
                animationDelay: `calc(${delay} + 80ms)`,
              }}
            >
              <p className={s.calloutTitle}>{step.title}</p>
              <p className={s.calloutBody}>{step.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingGuide;
