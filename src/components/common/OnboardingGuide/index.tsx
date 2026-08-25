import { useEffect, useState, type RefObject } from 'react';
import { CloseIcon } from '@/components/icons';
import * as s from './style.css';

/** 하이라이트 테두리가 대상보다 바깥으로 물러나는 여백(px). */
const HIGHLIGHT_PADDING = 4;

/** 곡선 크기 (시안 14.49×46.81 을 실제 px 로 환산). */
const CURVE = { width: 19, height: 63 };

/** 시안의 곡선 경로. 위에서 내려와 오른쪽 아래로 휘어 점에 닿는다. */
const CURVE_PATH =
  'M0.406516 0C0.406547 19.9051 -1.06788 43.1277 14.4138 46.4453';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface GuideStep {
  /** 짚어 줄 실제 요소. */
  target: RefObject<HTMLElement | null>;
  title: string;
  body: string;
  /**
   * 설명 위치. 기본은 대상 아래(below).
   * - above: 대상 위 (하단 버튼처럼 화면 끝에 붙은 대상)
   * - inside: 대상 안쪽 위 (목록처럼 세로로 긴 대상. 아래에 두면 화면을 넘어간다)
   */
  placement?: 'below' | 'above' | 'inside';
  /** 버튼처럼 면이 있는 대상은 안쪽을 옅은 초록으로 채운다. */
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

/**
 * 시안 기준 배치.
 *
 * - below: 대상 왼쪽 아래에서 곡선이 내려와 오른쪽으로 휘고, 그 끝에 설명이 붙는다.
 * - above: 같은 곡선을 180° 돌려 설명에서 대상 오른쪽 위로 이어진다.
 */
const layout = (rect: Rect, placement: GuideStep['placement']) => {
  if (placement === 'above') {
    return {
      curve: { left: rect.left + rect.width - 24.5, top: rect.top - 63.5 },
      dot: { left: rect.left + rect.width - 28, top: rect.top - 66 },
      callout: { left: rect.left + rect.width - 240, top: rect.top - 99 },
    };
  }
  // 세로로 긴 대상은 아래가 아니라 대상 위쪽 안에서 설명을 띄운다.
  const from = placement === 'inside' ? rect.top : rect.top + rect.height;
  return {
    curve: { left: rect.left + 5, top: from - 1 },
    dot: { left: rect.left + 22.5, top: from + 59.5 },
    callout: { left: rect.left + 37, top: from + 50 },
  };
};

interface OnboardingGuideProps {
  steps: GuideStep[];
  /** 스크린리더가 읽을 안내 이름. */
  label: string;
  onClose: () => void;
}

/**
 * 화면 위에 얹는 온보딩 안내.
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
        const place = layout(rect, step.placement);
        return (
          <div key={step.title}>
            <span
              className={`${s.highlight} ${step.filled ? s.highlightFilled : ''}`}
              style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              }}
              aria-hidden="true"
            />
            <svg
              className={s.connector}
              style={{
                ...place.curve,
                transform: above ? 'rotate(180deg)' : undefined,
              }}
              width={CURVE.width}
              height={CURVE.height}
              viewBox="0 0 14.4911 46.8057"
              aria-hidden="true"
            >
              <path
                d={CURVE_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <span className={s.dot} style={place.dot} aria-hidden="true" />
            <div className={s.callout} style={place.callout}>
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
