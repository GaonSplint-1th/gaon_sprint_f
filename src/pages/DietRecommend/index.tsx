import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from '../Home/style.css';

const Header = ({ onBack }: { onBack: () => void }) => (
  <header className={s.pageTitle}>
    <button
      type="button"
      className={s.backButton}
      onClick={onBack}
      aria-label="뒤로가기"
    >
      ‹
    </button>
    <h1 className={s.title}>식단 추천</h1>
    <span className={s.infoIcon} aria-label="식단 추천 안내">
      i
    </span>
  </header>
);

const Skeleton = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 900);
    return () => window.clearTimeout(timer);
  }, [onDone]);
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
          <div>
            <span className={s.skeletonLine} />
            <span className={s.skeletonLine} />
            <span className={s.skeletonLine} />
          </div>
          <span className={s.skeletonSideImage} />
          <span className={s.skeletonLine} />
        </div>
      ))}
      <div className={s.skeletonButton} />
    </div>
  );
};

const DietRecommendPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (!preview) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [preview]);
  if (loading) return <Skeleton onDone={() => setLoading(false)} />;
  return (
    <div className={s.screen}>
      <Header onBack={() => navigate('/')} />
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
              aria-label="식단 미리보기 열기"
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
                ×
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
            <button
              type="button"
              className={s.modalClose}
              onClick={() => setPreview(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DietRecommendPage;
