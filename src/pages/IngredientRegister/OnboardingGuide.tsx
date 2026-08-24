import { useEffect, useState, type RefObject } from 'react';
import { CloseIcon } from '@/components/icons';
import * as s from './guide.css';

/** 하이라이트 테두리가 대상보다 바깥으로 물러나는 여백(px). */
const HIGHLIGHT_PADDING = 4;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const toRect = (el: Element | null): Rect | null => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top: r.top - HIGHLIGHT_PADDING,
    left: r.left - HIGHLIGHT_PADDING,
    width: r.width + HIGHLIGHT_PADDING * 2,
    height: r.height + HIGHLIGHT_PADDING * 2,
  };
};

interface OnboardingGuideProps {
  /** 하이라이트할 검색 필드. */
  searchRef: RefObject<HTMLElement | null>;
  /** 하이라이트할 등록하기 버튼. */
  ctaRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

/**
 * 식재료 등록 화면의 온보딩 안내(시안 "안내").
 *
 * 좌표를 시안 값으로 박아 두지 않고 실제 요소를 measure 해서 그 위에 얹는다.
 * 등록된 식재료 수에 따라 버튼 위치가 달라지므로 고정 좌표는 금방 어긋난다.
 */
const OnboardingGuide = ({
  searchRef,
  ctaRef,
  onClose,
}: OnboardingGuideProps) => {
  const [search, setSearch] = useState<Rect | null>(null);
  const [cta, setCta] = useState<Rect | null>(null);

  useEffect(() => {
    const measure = () => {
      setSearch(toRect(searchRef.current));
      setCta(toRect(ctaRef.current));
    };
    measure();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('resize', measure);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('resize', measure);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [searchRef, ctaRef, onClose]);

  return (
    <div
      className={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="식재료 등록 안내"
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

      {search && (
        <>
          <span
            className={s.highlight}
            style={{
              top: search.top,
              left: search.left,
              width: search.width,
              height: search.height,
            }}
            aria-hidden="true"
          />
          {/* 검색 필드 왼쪽 아래로 흐르는 연결선. */}
          <svg
            className={s.connector}
            style={{ top: search.top + search.height, left: search.left + 8 }}
            width="60"
            height="76"
            viewBox="0 0 60 76"
            aria-hidden="true"
          >
            <path
              d="M2 0 V52 Q2 68 18 68 H56"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M50 63 L57 68 L50 73"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div
            className={s.callout}
            style={{
              top: search.top + search.height + 52,
              left: search.left + 72,
            }}
          >
            <p className={s.calloutTitle}>식재료 검색</p>
            <p className={s.calloutBody}>
              보유 중인 식재료를 검색하고 선택하세요.
              <br />
              입력값에 기반하여 식단을 추천해드립니다.
            </p>
          </div>
        </>
      )}

      {cta && (
        <>
          <span
            className={`${s.highlight} ${s.highlightFilled}`}
            style={{
              top: cta.top,
              left: cta.left,
              width: cta.width,
              height: cta.height,
            }}
            aria-hidden="true"
          />
          {/* 설명에서 버튼 오른쪽으로 내려가는 연결선. */}
          <svg
            className={s.connector}
            style={{ top: cta.top - 56, left: cta.left + cta.width - 40 }}
            width="40"
            height="60"
            viewBox="0 0 40 60"
            aria-hidden="true"
          >
            <path
              d="M0 6 H22 Q38 6 38 22 V58"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div
            className={`${s.callout} ${s.calloutRight}`}
            style={{ top: cta.top - 74, left: 16, width: cta.width - 48 }}
          >
            <p className={s.calloutTitle}>등록하기</p>
            <p className={s.calloutBody}>
              등록하기를 선택하여 다음으로 넘어갑니다.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OnboardingGuide;
