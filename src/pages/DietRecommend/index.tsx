import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CloseIcon, InfoIcon } from '@/components/icons';
import * as s from '../Home/style.css';

const Skeleton = ({ done }: { done: () => void }) => {
  useEffect(() => {
    const timer = window.setTimeout(done, 900);
    return () => window.clearTimeout(timer);
  }, [done]);
  return (
    <div
      className={s.screen}
      aria-busy="true"
      aria-label="식단 추천을 불러오는 중"
    >
      <div className={s.skeletonTitle}>
        <span className={s.skeletonCircle} />
        <span className={s.skeletonTitleLine} />
      </div>
      {[1, 2, 3].map((item) => (
        <div className={s.skeletonCard} key={item}>
          <span className={s.skeletonImage} />
          <span className={s.skeletonLine} />
          <span className={s.skeletonSideImage} />
        </div>
      ))}
    </div>
  );
};

const DietRecommendPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!preview) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const modal = modalRef.current;
    const focusable = modal?.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(false);
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
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', keydown);
    };
  }, [preview]);
  if (loading) return <Skeleton done={() => setLoading(false)} />;
  return (
    <div className={s.screen}>
      <header className={s.pageTitle}>
        <button
          type="button"
          className={s.backButton}
          onClick={() => navigate('/')}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={s.title}>식단 추천</h1>
        <span className={s.infoIcon} aria-label="식단 추천 안내">
          <InfoIcon />
        </span>
      </header>
      <div className={s.recommendList}>
        {[0, 1, 2].map((item) => (
          <article
            key={item}
            className={`${s.recommendCard} ${selected === item ? s.selectedCard : ''}`}
            onClick={() => setSelected(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelected(item);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={selected === item}
          >
            <div className={s.recommendTop}>
              <strong>육류 위주 A</strong>
              <span>예상 118,000원</span>
            </div>
            <div className={s.imageRow}>
              {[1, 2, 3].map((image) => (
                <div className={s.placeholder} key={image}>
                  이미지
                </div>
              ))}
            </div>
            <p className={s.ingredients}>
              <span className={s.ingredientIcon} aria-hidden="true">
                ★
              </span>
              제육볶음 · 김치찌개 · 계란찜
            </p>
            <button
              type="button"
              className={s.previewButton}
              onClick={(event) => {
                event.stopPropagation();
                setPreview(true);
              }}
            >
              미리보기 ›
            </button>
          </article>
        ))}
      </div>
      <button
        type="button"
        className={s.bottomButton}
        onClick={() => navigate('/edit')}
      >
        메뉴 수정하기
      </button>
      {preview && (
        <div className={s.modalBackdrop} onClick={() => setPreview(false)}>
          <div
            ref={modalRef}
            className={s.previewModal}
            role="dialog"
            aria-modal="true"
            aria-label="식단 미리보기"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={s.modalHeader}>
              <strong>육류 위주 A</strong>
              <button
                type="button"
                aria-label="미리보기 닫기"
                onClick={() => setPreview(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className={s.modalBody}>
              {[1, 2, 3].map((day) => (
                <div key={day}>
                  <p>월/일(요일)</p>
                  <div className={s.dayMeals}>
                    {['아침메뉴', '점심메뉴', '저녁메뉴'].map((meal) => (
                      <div className={s.dayMeal} key={meal}>
                        <div className={s.modalPlaceholder} />
                        {meal}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DietRecommendPage;
